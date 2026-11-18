import { ROLES, EQUIPAS, papel } from '../data/roles.js';
import { NEGATIVO, NOMES_PRINCIPAIS, VARIANTES, promptPara, variante } from '../data/arte.js';
import { TAMANHOS, ESQUEMAS, RESOLUCOES, SANGRIA_MM, geometria, proporcao, sugestaoGeracao, mmParaPx } from '../cartas/formatos.js';
import { lerTema, carregarFontes, desenharFrente, desenharVerso, desenharMascara, enquadrar } from '../cartas/render.js';
import { lerArte, guardarArte, apagarArte, listarArte, lerJSON, guardarJSON } from '../cartas/armazem.js';
import { IMAGENS } from '../data/imagens.js';
import { montarImpressao } from './impressao.js';

const $ = (s) => document.querySelector(s);
const PREFS = 'uj:cartas:prefs';
const TEXTOS = 'uj:cartas:textos';
const PERSONALIZADA = 'personalizada';
const DPI_MAX_PREVISUALIZACAO = 300;
const DPI_MIN_PREVISUALIZACAO = 200;

const prefs = {
  id: 'isaias', tamanho: 'padrao', mm: [63, 88], dpi: 300, esquema: 'janela', lado: 'frente',
  ...lerJSON(PREFS, {}),
};
const textos = lerJSON(TEXTOS, {});
let tema;
let arte = { img: null, origem: null, nome: '', corte: { cx: 0.5, cy: 0.5, zoom: 1 } };
let geoPrev;
let impressao;

// ── dados da carta atual ──
function base(id) {
  if (id === PERSONALIZADA) {
    return { id, nome: 'Nova Carta', personagem: 'Subtítulo', refBiblica: '', habilidade: 'Escreve aqui a habilidade da carta.', equipa: 'jerusalem', valor: 0 };
  }
  const v = variante(id);
  return { ...papel(v.papel), id };
}
/** Descrição da arte por omissão da carta (principal ou variante). */
const descricaoBase = (id) => variante(id).descricao ?? '';
function dadosDe(id) {
  const d = { ...base(id), ...(textos[id] ?? {}) };
  d.equipaNome = EQUIPAS[d.equipa]?.nome ?? '';
  d.valor = Number(d.valor) || 0;
  return d;
}
const dados = () => dadosDe(prefs.id);
const mmAtual = () => (prefs.tamanho === 'personalizado' ? prefs.mm : TAMANHOS[prefs.tamanho].mm);
const geo = (dpi) => geometria({ mm: mmAtual(), dpi, sangria: true, esquema: prefs.esquema });

// ── controlos ──
async function montarControlos() {
  const sel = $('#papel');
  const comArte = await listarArte();
  sel.replaceChildren();
  for (const [eq, info] of Object.entries(EQUIPAS)) {
    const grupo = document.createElement('optgroup');
    grupo.label = info.nome;
    for (const r of ROLES.filter((x) => x.equipa === eq)) {
      const extra = VARIANTES[r.id];
      grupo.append(new Option(`${r.nome}${extra ? ` · 1 (${NOMES_PRINCIPAIS[r.id]})` : ''}${comArte.has(r.id) ? ' ✓' : ''}`, r.id));
      extra?.forEach((v, i) => {
        const id = `${r.id}-${i + 2}`;
        grupo.append(new Option(`${r.nome} · ${i + 2} (${v.nome})${comArte.has(id) ? ' ✓' : ''}`, id));
      });
    }
    if (grupo.children.length) sel.append(grupo);
  }
  const extra = document.createElement('optgroup');
  extra.label = 'Outra';
  extra.append(new Option(`Carta personalizada${comArte.has(PERSONALIZADA) ? ' ✓' : ''}`, PERSONALIZADA));
  sel.append(extra);
  sel.value = prefs.id;
  if (!sel.value) { prefs.id = 'isaias'; sel.value = 'isaias'; }

  const eqSel = $('#f-equipa');
  if (!eqSel.options.length) for (const [k, v] of Object.entries(EQUIPAS)) eqSel.append(new Option(v.nome, k));
  const tam = $('#tamanho');
  if (!tam.options.length) {
    for (const [k, v] of Object.entries(TAMANHOS)) tam.append(new Option(`${v.nome} · ${v.mm[0]} × ${v.mm[1]} mm`, k));
    tam.append(new Option('Personalizado…', 'personalizado'));
    for (const [k, v] of Object.entries(ESQUEMAS)) $('#esquema').append(new Option(v, k));
    for (const d of RESOLUCOES) $('#dpi').append(new Option(`${d} dpi${d === 300 ? ' (impressão)' : ' (alta)'}`, d));
  }
}

function preencherFormulario() {
  const d = dados();
  $('#f-nome').value = d.nome;
  $('#f-personagem').value = d.personagem;
  $('#f-equipa').value = d.equipa;
  $('#f-valor').value = d.valor;
  $('#f-habilidade').value = d.habilidade;
  $('#f-ref').value = d.refBiblica ?? '';
  $('#descricao').value = textos[prefs.id]?.arte ?? descricaoBase(prefs.id);
  $('#tamanho').value = prefs.tamanho;
  $('#larg').value = prefs.mm[0];
  $('#alt').value = prefs.mm[1];
  $('#campo-larg').hidden = $('#campo-alt').hidden = prefs.tamanho !== 'personalizado';
  $('#esquema').value = prefs.esquema;
  $('#dpi').value = String(prefs.dpi);
  $('#lado').value = prefs.lado;
}

function lerFormulario() {
  const b = base(prefs.id);
  const novo = {
    nome: $('#f-nome').value, personagem: $('#f-personagem').value, equipa: $('#f-equipa').value,
    valor: Number($('#f-valor').value) || 0, habilidade: $('#f-habilidade').value, refBiblica: $('#f-ref').value,
    arte: $('#descricao').value,
  };
  const diff = {};
  for (const [k, v] of Object.entries(novo)) {
    const original = k === 'arte' ? descricaoBase(prefs.id) : b[k];
    if (String(v) !== String(original ?? '')) diff[k] = v;
  }
  if (Object.keys(diff).length) textos[prefs.id] = diff; else delete textos[prefs.id];
  guardarJSON(TEXTOS, textos);
}

function lerFormato() {
  prefs.tamanho = $('#tamanho').value;
  const l = parseFloat($('#larg').value), a = parseFloat($('#alt').value);
  if (l >= 30 && l <= 150 && a >= 40 && a <= 200) prefs.mm = [l, a];
  prefs.esquema = $('#esquema').value;
  prefs.dpi = Number($('#dpi').value) || 300;
  prefs.lado = $('#lado').value;
  $('#campo-larg').hidden = $('#campo-alt').hidden = prefs.tamanho !== 'personalizado';
  guardarJSON(PREFS, prefs);
}

// ── arte ──
function imagemDeBlob(blob) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('imagem inválida')); };
    img.src = url;
  });
}
/** Arte do projeto (assets/roles/), só se existir: sem pedidos a ficheiros em falta. */
function imagemDoProjeto(id) {
  const caminho = IMAGENS[id]?.arte;
  if (!caminho) return Promise.resolve(null);
  return new Promise((res) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => res({ img, nome: caminho });
    img.onerror = () => res(null);
    img.src = caminho;
  });
}

/** Arte de qualquer carta (para imprimir): a guardada no navegador, a do projeto ou a da personagem base. */
async function arteDe(id) {
  const semCorte = { cx: 0.5, cy: 0.5, zoom: 1 };
  try {
    const guardada = await lerArte(id);
    if (guardada) return { img: await imagemDeBlob(guardada.blob), corte: guardada.corte ?? semCorte };
  } catch { /* segue para a arte do projeto */ }
  const proj = await imagemDoProjeto(id);
  if (proj) return { img: proj.img, corte: lerJSON(`uj:cartas:corte:${id}`, semCorte) };
  const papelBase = variante(id).papel;
  return papelBase !== id ? arteDe(papelBase) : null;
}

async function carregarArteDoPapel() {
  const id = prefs.id;
  const guardada = await lerArte(id);
  if (id !== prefs.id) return;
  if (guardada) {
    try {
      arte = { img: await imagemDeBlob(guardada.blob), origem: 'navegador', nome: guardada.nome, corte: guardada.corte ?? { cx: 0.5, cy: 0.5, zoom: 1 } };
    } catch { arte = { img: null, origem: null, nome: '', corte: { cx: 0.5, cy: 0.5, zoom: 1 } }; }
  } else {
    const proj = await imagemDoProjeto(id);
    if (id !== prefs.id) return;
    const corte = lerJSON(`uj:cartas:corte:${id}`, { cx: 0.5, cy: 0.5, zoom: 1 });
    arte = proj ? { img: proj.img, origem: 'projeto', nome: proj.nome, corte } : { img: null, origem: null, nome: '', corte };
  }
  atualizarArteUI();
  desenhar();
}

async function definirArte(ficheiro) {
  if (!ficheiro || !ficheiro.type.startsWith('image/')) { aviso('Esse ficheiro não é uma imagem.'); return; }
  try {
    const img = await imagemDeBlob(ficheiro);
    arte = { img, origem: 'navegador', nome: ficheiro.name || 'imagem colada', corte: { cx: 0.5, cy: 0.5, zoom: 1 } };
    await guardarArte(prefs.id, { blob: ficheiro, nome: arte.nome, corte: arte.corte });
    atualizarArteUI();
    desenhar();
    marcarOpcao(true);
    aviso(`Arte carregada: ${arte.nome}`);
  } catch { aviso('Não foi possível ler essa imagem.'); }
}

let guardarCorteT;
function guardarCorte() {
  clearTimeout(guardarCorteT);
  guardarCorteT = setTimeout(async () => {
    if (arte.origem === 'navegador') {
      const v = await lerArte(prefs.id);
      if (v) await guardarArte(prefs.id, { ...v, corte: arte.corte });
    } else if (arte.origem === 'projeto') {
      guardarJSON(`uj:cartas:corte:${prefs.id}`, arte.corte);
    }
  }, 250);
}

function marcarOpcao(tem) {
  const op = [...$('#papel').options].find((o) => o.value === prefs.id);
  if (op) op.text = op.text.replace(/ ✓$/, '') + (tem ? ' ✓' : '');
}

function atualizarArteUI() {
  const o = $('#arte-origem');
  if (arte.origem === 'navegador') o.innerHTML = `Imagem guardada neste navegador: <code></code>`;
  else if (arte.origem === 'projeto') o.innerHTML = `Imagem do projeto: <code></code>`;
  else o.textContent = 'Ainda sem imagem. Carrega a arte da personagem.';
  if (arte.origem) o.querySelector('code').textContent = arte.nome;
  $('#remover').disabled = arte.origem !== 'navegador';
  $('#centrar').disabled = $('#zoom').disabled = !arte.img;
  $('#zoom').value = arte.corte.zoom ?? 1;
  $('#zoom-val').textContent = `${Math.round((arte.corte.zoom ?? 1) * 100)}%`;
  $('#tela').classList.toggle('arrastavel', !!arte.img && prefs.lado === 'frente');
}

// ── desenho ──
/**
 * Resolução da pré-visualização: o dobro dos píxeis que o ecrã mostra (para a arte e o texto ficarem nítidos),
 * entre 200 e 300 dpi. A exportação usa sempre a resolução escolhida.
 */
function dpiPrevisualizacao(tela) {
  const largura = tela.getBoundingClientRect().width;
  if (!largura) return DPI_MAX_PREVISUALIZACAO;
  const pol = (mmAtual()[0] + 6) / 25.4;
  const ecra = (largura * (window.devicePixelRatio || 1) * 2) / pol;
  return Math.round(Math.max(DPI_MIN_PREVISUALIZACAO, Math.min(DPI_MAX_PREVISUALIZACAO, ecra)));
}

let pedido = 0;
/** Agenda um desenho para o próximo fotograma (vários pedidos seguidos dão um só desenho). */
function desenhar() {
  if (!pedido) pedido = requestAnimationFrame(() => { pedido = 0; desenharJa(); });
}

function desenharJa() {
  if (!tema) return;
  const tela = $('#tela');
  geoPrev = geo(dpiPrevisualizacao(tela));
  tela.width = geoPrev.W;
  tela.height = geoPrev.H;
  const ctx = tela.getContext('2d');
  if (prefs.lado === 'verso') desenharVerso(ctx, geoPrev, tema);
  else {
    desenharFrente(ctx, geoPrev, dados(), tema, { arte: arte.img, corte: arte.corte });
    if (arte.img) arte.corte = enquadrar(arte.img, geoPrev.arte, arte.corte).corte;
  }
  atualizarInfo();
  impressao?.atualizar();
}

function atualizarInfo() {
  const [wmm, hmm] = mmAtual();
  const g = geo(prefs.dpi);
  const comSangria = ` + ${SANGRIA_MM} mm de sangria → ${g.W} × ${g.H} px`;
  $('#tela-info').textContent = `${prefs.lado === 'verso' ? 'Verso' : 'Frente'} · ${wmm} × ${hmm} mm`;
  $('#dimensoes').textContent = `${wmm} × ${hmm} mm a ${prefs.dpi} dpi = ${mmParaPx(wmm, prefs.dpi)} × ${mmParaPx(hmm, prefs.dpi)} px${comSangria}.`;

  const d = dados();
  const p = proporcao(g);
  const s = sugestaoGeracao(p);
  const id = prefs.id;
  const esc = (x) => String(x).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const linhas = [
    ['Personagem', esc(d.nome)],
    ['Guardar como', `<code>assets/roles/${id}.png</code> (ou .webp / .jpg), e depois <code>npm run imagens</code>`],
    ['Área da arte', `${g.arte.w} × ${g.arte.h} px a ${prefs.dpi} dpi${prefs.esquema === 'completa' ? ' (carta inteira, com sangria)' : ''}`],
    ['Proporção', `${p.toFixed(2).replace('.', ',')} : 1`],
    ['Gerar em', `${s[0]} × ${s[1]} px`],
    ['Depois', 'aumenta a resolução (upscale) até pelo menos a área da arte'],
  ];
  $('#ficha').innerHTML = linhas.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
  $('#prompt').value = promptPara({ id: variante(id).papel, equipa: d.equipa }, $('#descricao').value || descricaoBase(id));
  $('#negativo').value = NEGATIVO;
}

// ── exportação ──
function nomeBase() {
  const tam = prefs.tamanho === 'personalizado' ? `${prefs.mm[0]}x${prefs.mm[1]}mm` : prefs.tamanho;
  return `${tam}-${prefs.dpi}dpi`;
}
function descarregar(canvasOuBlob, nome) {
  const ir = (blob) => {
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: nome });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    aviso(`Descarregado: ${nome}`);
  };
  if (canvasOuBlob instanceof Blob) ir(canvasOuBlob);
  else canvasOuBlob.toBlob((b) => (b ? ir(b) : aviso('Não foi possível gerar a imagem.')), 'image/png');
}
async function exportar(tipo) {
  await carregarFontes(tema);
  const g = geo(prefs.dpi);
  const c = document.createElement('canvas');
  c.width = g.W;
  c.height = g.H;
  const ctx = c.getContext('2d');
  const id = prefs.id;
  if (tipo === 'frente') { desenharFrente(ctx, g, dados(), tema, { arte: arte.img, corte: arte.corte }); descarregar(c, `${id}-${nomeBase()}.png`); }
  if (tipo === 'verso') { desenharVerso(ctx, g, tema); descarregar(c, `verso-${nomeBase()}.png`); }
  if (tipo === 'modelo') { desenharFrente(ctx, g, dados(), tema, { modo: 'modelo' }); descarregar(c, `${id}-${prefs.esquema}-${nomeBase()}-modelo.png`); }
  if (tipo === 'mascara') { desenharMascara(ctx, g); descarregar(c, `${id}-${prefs.esquema}-${nomeBase()}-mascara.png`); }
}
let avisoT;
function aviso(msg) {
  $('#estado').textContent = msg;
  clearTimeout(avisoT);
  avisoT = setTimeout(() => { $('#estado').textContent = ''; }, 4000);
}

async function copiar(texto, rotulo) {
  try { await navigator.clipboard.writeText(texto); aviso(`${rotulo} copiado.`); }
  catch { aviso('Não foi possível copiar. Seleciona o texto e copia à mão.'); }
}

// ── enquadramento com o rato / teclado ──
function moverArte(dxTela, dyTela) {
  if (!arte.img || prefs.lado !== 'frente' || !geoPrev) return;
  const e = enquadrar(arte.img, geoPrev.arte, arte.corte);
  arte.corte = enquadrar(arte.img, geoPrev.arte, {
    ...e.corte, cx: e.corte.cx - dxTela / e.dw, cy: e.corte.cy - dyTela / e.dh,
  }).corte;
  desenhar();
  guardarCorte();
}

function ligarEventos() {
  $('#papel').addEventListener('change', () => {
    prefs.id = $('#papel').value;
    guardarJSON(PREFS, prefs);
    preencherFormulario();
    carregarArteDoPapel();
  });
  for (const s of ['#f-nome', '#f-personagem', '#f-equipa', '#f-valor', '#f-habilidade', '#f-ref', '#descricao']) {
    $(s).addEventListener('input', () => { lerFormulario(); desenhar(); });
  }
  $('#repor-texto').addEventListener('click', () => {
    delete textos[prefs.id];
    guardarJSON(TEXTOS, textos);
    preencherFormulario();
    desenhar();
  });
  for (const s of ['#tamanho', '#larg', '#alt', '#esquema', '#dpi', '#lado']) {
    $(s).addEventListener('change', () => { lerFormato(); atualizarArteUI(); desenhar(); });
  }
  $('#ficheiro').addEventListener('change', (e) => { definirArte(e.target.files[0]); e.target.value = ''; });
  $('#centrar').addEventListener('click', () => { arte.corte = { cx: 0.5, cy: 0.5, zoom: 1 }; atualizarArteUI(); desenhar(); guardarCorte(); });
  $('#remover').addEventListener('click', async () => {
    await apagarArte(prefs.id);
    marcarOpcao(false);
    aviso('Imagem removida deste navegador.');
    carregarArteDoPapel();
  });
  $('#zoom').addEventListener('input', (e) => {
    arte.corte = { ...arte.corte, zoom: Number(e.target.value) };
    $('#zoom-val').textContent = `${Math.round(arte.corte.zoom * 100)}%`;
    desenhar();
    guardarCorte();
  });

  let redimT;
  window.addEventListener('resize', () => { clearTimeout(redimT); redimT = setTimeout(desenhar, 150); });

  const tela = $('#tela');
  let arrasto = null;
  tela.addEventListener('pointerdown', (e) => {
    if (!arte.img || prefs.lado !== 'frente') return;
    arrasto = { x: e.clientX, y: e.clientY };
    tela.setPointerCapture(e.pointerId);
  });
  tela.addEventListener('pointermove', (e) => {
    if (!arrasto) return;
    const k = tela.width / tela.getBoundingClientRect().width;
    moverArte((e.clientX - arrasto.x) * k, (e.clientY - arrasto.y) * k);
    arrasto = { x: e.clientX, y: e.clientY };
  });
  const soltar = () => { arrasto = null; };
  tela.addEventListener('pointerup', soltar);
  tela.addEventListener('pointercancel', soltar);
  tela.addEventListener('keydown', (e) => {
    const passo = tela.width * 0.02;
    const mapa = { ArrowLeft: [-passo, 0], ArrowRight: [passo, 0], ArrowUp: [0, -passo], ArrowDown: [0, passo] };
    if (mapa[e.key]) { e.preventDefault(); moverArte(...mapa[e.key]); }
    if (e.key === '+' || e.key === '-') {
      e.preventDefault();
      const z = Math.min(4, Math.max(1, (arte.corte.zoom ?? 1) + (e.key === '+' ? 0.1 : -0.1)));
      arte.corte = { ...arte.corte, zoom: z };
      atualizarArteUI();
      desenhar();
      guardarCorte();
    }
  });
  tela.addEventListener('dragover', (e) => { e.preventDefault(); tela.classList.add('largar'); });
  tela.addEventListener('dragleave', () => tela.classList.remove('largar'));
  tela.addEventListener('drop', (e) => {
    e.preventDefault();
    tela.classList.remove('largar');
    definirArte(e.dataTransfer.files[0]);
  });
  document.addEventListener('paste', (e) => {
    if (e.target.closest?.('input, textarea')) return;
    const item = [...(e.clipboardData?.items ?? [])].find((i) => i.type.startsWith('image/'));
    if (item) { e.preventDefault(); definirArte(item.getAsFile()); }
  });

  $('#exp-frente').addEventListener('click', () => exportar('frente'));
  $('#exp-verso').addEventListener('click', () => exportar('verso'));
  $('#exp-modelo').addEventListener('click', () => exportar('modelo'));
  $('#exp-mascara').addEventListener('click', () => exportar('mascara'));
  $('#copiar-prompt').addEventListener('click', () => copiar($('#prompt').value, 'Prompt'));
  $('#copiar-negativo').addEventListener('click', () => copiar($('#negativo').value, 'Prompt negativo'));
}

// ── arranque ──
(async function iniciar() {
  await montarControlos();
  preencherFormulario();
  ligarEventos();
  tema = lerTema();
  desenhar();                 // primeiro desenho imediato (fontes de recurso)
  await carregarFontes(tema);
  desenhar();                 // e de novo, já com as fontes do sistema
  carregarArteDoPapel();
  impressao = montarImpressao({ tema: () => tema, prefs, mm: mmAtual, dadosDe, arteDe, aviso });
})();
