// Jogar (jogar.html): monta e equilibra o baralho. As contas estão em js/engine/preparar.js.
import { EQUIPAS, ACORDA, inimigosRecomendados } from '../data/roles.js';
import {
  MIN_JOGADORES, MAX_JOGADORES, JOGAVEIS, ASSASSINOS, maxCopias, copias, normalizar, contarCartas, cartasNecessarias,
  equilibrio, inimigos, classificar, avisos, sugerirSimples, sugerirAleatoria, ordemDaNoite,
  codificar, descodificar,
} from '../engine/preparar.js';
import { imagemPapel } from './imagem.js';

const $ = (sel) => document.querySelector(sel);
const el = (tag, attrs = {}, ...filhos) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (k === 'style') n.style.cssText = v;
    else n.setAttribute(k, v);
  }
  for (const f of filhos.flat()) if (f != null) n.append(f instanceof Node ? f : document.createTextNode(String(f)));
  return n;
};
const acento = (eq) => `--mf-accent:var(--mf-team-${eq})`;
const marca = (eq) => el('span', { class: 'mf-dot', style: acento(eq), 'aria-hidden': 'true' });
const sinal = (v) => (v > 0 ? `+${v}` : v < 0 ? `−${Math.abs(v)}` : '0');

// ── Estado ──
// O baralho fica em localStorage ('uj:preparar'), que a impressão em Cartas também lê. A ligação (#…) tem prioridade.
// `origem` lembra de onde veio o baralho, para o refazer quando muda o n.º de jogadores.
const CHAVE = 'uj:preparar';
let baralho = null;
let origem = null;   // { tipo: 'simples' | 'aleatoria', semente? }
let alvo = 0;        // equilíbrio desejado para as sugestões e os cenários

function carregar() {
  const daLigacao = descodificar(location.hash);
  let alvoGuardado = 0;
  try { alvoGuardado = JSON.parse(localStorage.getItem(CHAVE) || 'null')?.alvo ?? 0; } catch { /* sem armazenamento */ }
  if (daLigacao) return { baralho: daLigacao, origem: null, alvo: alvoGuardado };
  try {
    const g = JSON.parse(localStorage.getItem(CHAVE) || 'null');
    if (g?.jogadores) return { baralho: normalizar(g), origem: ['simples', 'aleatoria'].includes(g.origem?.tipo) ? g.origem : null, alvo: g.alvo ?? 0 };
  } catch { /* sem armazenamento */ }
  return { baralho: sugerirSimples(10), origem: { tipo: 'simples' }, alvo: 0 };
}

function guardar() {
  try { localStorage.setItem(CHAVE, JSON.stringify({ ...baralho, origem, alvo })); } catch { /* ignorar */ }
  history.replaceState(null, '', `#${codificar(baralho)}`);
}

/** Refaz o baralho a partir da sugestão de origem para o n.º de jogadores atual. */
function gerar(o, n = baralho.jogadores) {
  if (o.tipo === 'simples') return sugerirSimples(n, alvo);
  return sugerirAleatoria(n, o.semente, alvo);
}

function usar(o) {
  origem = o;
  baralho = gerar(o);
  atualizar();
}

function mudarJogadores(n) {
  const j = Math.min(MAX_JOGADORES, Math.max(MIN_JOGADORES, Math.round(n) || MIN_JOGADORES));
  baralho = origem ? gerar(origem, j) : { ...baralho, jogadores: j };
  atualizar();
}

function mudarCopias(id, delta) {
  const n = Math.max(0, copias(baralho, id) + delta);
  const cartas = { ...baralho.cartas, [id]: n };
  if (!n) delete cartas[id];
  baralho = { ...baralho, cartas };
  origem = null;   // editado à mão: já não se refaz sozinho
  atualizar();
}

// ── Montagem ──
const linhas = new Map();   // id → { linha, num, menos, mais }

function montarEquipas() {
  const caixa = $('#equipas');
  for (const [eq, info] of Object.entries(EQUIPAS)) {
    const papeis = JOGAVEIS.filter((r) => r.equipa === eq);
    if (!papeis.length) continue;
    const lista = el('ul', { class: 'lista' });
    for (const r of papeis) {
      const num = el('output', { class: 'copias', 'aria-live': 'off' }, '0');
      const menos = el('button', { type: 'button', class: 'mf-btn passo', 'aria-label': `Tirar ${r.nome}` }, '−');
      const mais = el('button', { type: 'button', class: 'mf-btn passo', 'aria-label': `Juntar ${r.nome}` }, '+');
      menos.addEventListener('click', () => mudarCopias(r.id, -1));
      mais.addEventListener('click', () => mudarCopias(r.id, +1));
      const extra = r.id === 'manto' ? ' · objeto, não conta como carta' : r.id === 'joas' ? ' · precisa de mais uma carta' : '';
      const linha = el('li', { class: 'linha-papel', style: acento(eq) },
        imagemPapel(r.id),
        el('div', { class: 'linha-info' },
          el('span', { class: 'papel-nome' }, r.nome),
          el('span', { class: 'linha-meta' },
            el('b', { class: `valor-num ${r.valor > 0 ? 'pos' : r.valor < 0 ? 'neg' : ''}` }, sinal(r.valor)),
            ` · a partir de ${r.recomendado.aPartirDe}${extra}`)),
        el('div', { class: 'contador' }, menos, num, mais));
      linha.title = r.habilidade;
      linhas.set(r.id, { linha, num, menos, mais });
      lista.append(linha);
    }
    caixa.append(el('div', { class: 'equipa', style: acento(eq) },
      el('h3', { class: 'equipa-titulo' }, el('span', { class: 'mf-team' }, marca(eq), info.nome), el('span', { class: 'equipa-conta', 'data-equipa': eq })),
      lista));
  }
}

// ── Atualização ──
function atualizar() {
  baralho = normalizar(baralho);
  const n = baralho.jogadores;
  $('#jogadores').value = n;
  $('#menos').disabled = n <= MIN_JOGADORES;
  $('#mais').disabled = n >= MAX_JOGADORES;

  // botões de sugestão
  $('#simples').setAttribute('aria-pressed', String(origem?.tipo === 'simples'));
  $('#aleatoria').setAttribute('aria-pressed', String(origem?.tipo === 'aleatoria'));
  $('#aleatoria').textContent = origem?.tipo === 'aleatoria' ? 'Outra sugestão' : 'Sugestão aleatória';
  $('#origem').textContent = textoOrigem();

  // linhas
  for (const [id, { linha, num, menos, mais }] of linhas) {
    const k = copias(baralho, id);
    const r = JOGAVEIS.find((x) => x.id === id);
    num.value = num.textContent = k;
    menos.disabled = k === 0;
    mais.disabled = k >= maxCopias(id) && id !== 'nabal';
    linha.classList.toggle('no-baralho', k > 0);
    linha.classList.toggle('fora', r.recomendado.aPartirDe > n);
  }
  for (const s of document.querySelectorAll('.equipa-conta')) {
    const t = Object.entries(baralho.cartas).filter(([id]) => JOGAVEIS.find((r) => r.id === id).equipa === s.dataset.equipa)
      .reduce((a, [, k]) => a + k, 0);
    s.textContent = t ? `${t} no baralho` : '';
  }

  // medidor e contagens
  const total = equilibrio(baralho);
  const cl = classificar(total);
  $('#total').textContent = sinal(total);
  $('#classe').textContent = cl.texto;
  document.querySelector('.medidor').dataset.classe = cl.id;
  const pos = (v) => `${50 + (Math.max(-15, Math.min(15, v)) / 15) * 50}%`;
  $('#marca').style.left = pos(total);
  $('#zona').style.left = `calc(${pos(alvo)} - 2 / 15 * 50%)`;   // faixa de ±2 à volta do equilíbrio desejado
  $('#alvo').value = alvo;
  $('#alvo-val').textContent = textoAlvo(alvo);
  const cartas = contarCartas(baralho);
  const precisa = cartasNecessarias(baralho);
  $('#contagem').innerHTML = `<strong>${cartas}</strong> de <strong>${precisa}</strong> cartas · <strong>${inimigos(baralho)}</strong> ${inimigos(baralho) === 1 ? 'inimigo' : 'inimigos'} (recomendado: ${inimigosRecomendados(n)})`;
  const lista = avisos(baralho);
  $('#avisos').replaceChildren(...(lista.length
    ? lista.map((a) => el('li', { class: a.nivel }, a.texto))
    : [el('li', { class: 'ok' }, 'Pronto a jogar: nada a assinalar.')]));

  $('#st-cartas').textContent = `${cartas}/${precisa}`;
  $('#st-inimigos').textContent = inimigos(baralho);
  $('#st-especiais').textContent = Object.keys(baralho.cartas).filter((id) => id !== 'israelita' && !ASSASSINOS.includes(id)).length;
  $('#st-equilibrio').textContent = sinal(total);

  // noite
  const grupos = ordemDaNoite(Object.keys(baralho.cartas));
  $('#noite').replaceChildren(...grupos.map(([p, ...outros]) => el('li', {},
    el('span', { class: 'mf-team' }, marca(p.equipa), outros.length ? `${p.nome} (com ${outros.map((o) => o.nome).join(' e ')})` : p.nome),
    ' ', el('span', { class: 'mf-when' }, `· ${ACORDA[p.acorda].toLowerCase()}`))));
  $('#noite-vazia').hidden = grupos.length > 0;

  guardar();
}

function textoAlvo(a) {
  if (!a) return '0 · justo';
  return `${sinal(a)} · ${a > 0 ? 'a favor de Jerusalém' : 'a favor dos inimigos'}`;
}

function textoOrigem() {
  if (!origem) return 'Baralho montado à mão. Escolhe uma sugestão para recomeçar.';
  if (origem.tipo === 'simples') return 'Sugestão simples: as personagens clássicas, sempre iguais para este número de jogadores.';
  return 'Sugestão aleatória: carrega em “Outra sugestão” para variar.';
}

// ── Eventos ──
$('#menos').addEventListener('click', () => mudarJogadores(baralho.jogadores - 1));
$('#mais').addEventListener('click', () => mudarJogadores(baralho.jogadores + 1));
$('#jogadores').addEventListener('change', (e) => mudarJogadores(Number(e.target.value)));
$('#alvo').addEventListener('input', (e) => {
  alvo = Number(e.target.value) || 0;
  if (origem) baralho = gerar(origem);   // a sugestão refaz-se com o novo alvo
  atualizar();
});
$('#simples').addEventListener('click', () => usar({ tipo: 'simples' }));
$('#aleatoria').addEventListener('click', () => usar({ tipo: 'aleatoria', semente: (Math.random() * 2 ** 32) >>> 0 }));
$('#limpar').addEventListener('click', () => { origem = null; baralho = { jogadores: baralho.jogadores, cartas: {} }; atualizar(); });
$('#copiar').addEventListener('click', async () => {
  const b = $('#copiar');
  try {
    await navigator.clipboard.writeText(location.href);
    b.textContent = 'Ligação copiada';
  } catch {
    window.prompt('Copia esta ligação:', location.href);
  }
  setTimeout(() => { b.textContent = 'Copiar ligação'; }, 1800);
});
window.addEventListener('hashchange', () => {
  const b = descodificar(location.hash);
  if (b && codificar(b) !== codificar(baralho)) { baralho = b; origem = null; atualizar(); }
});

({ baralho, origem, alvo } = carregar());
montarEquipas();
atualizar();
