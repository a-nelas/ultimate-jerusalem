// Imprimir em A4: dispõe as cartas em folhas com marcas de corte e abre a janela de impressão.
// A disposição (em mm) está em js/cartas/folha.js; o desenho de cada carta em js/cartas/render.js.
import { ROLES } from '../data/roles.js';
import { VARIANTES } from '../data/arte.js';
import { geometria, mmParaPx } from '../cartas/formatos.js';
import { carregarFontes, desenharFrente, desenharVerso } from '../cartas/render.js';
import { A4, folha, paginar, posicaoVerso, marcasNaMargem, marcasNaSangria } from '../cartas/folha.js';

const $ = (s) => document.querySelector(s);
const DPI_IMPRESSAO = 300;
const DPI_PREVISUALIZACAO = 60;

/** Ids das cópias de uma personagem, a rodar pelos desenhos alternativos: israelita, israelita-2, … */
function idsDasCopias(id, k) {
  const total = (VARIANTES[id]?.length ?? 0) + 1;
  return Array.from({ length: k }, (_, j) => (j % total === 0 ? id : `${id}-${(j % total) + 1}`));
}

/** Baralho guardado em Preparar (localStorage 'uj:preparar'). */
function baralhoDePreparar() {
  try { return JSON.parse(localStorage.getItem('uj:preparar') || 'null')?.cartas ?? null; } catch { return null; }
}

/**
 * @param {{ tema: () => object, prefs: object, mm: () => [number, number], dadosDe: (id:string) => object,
 *           arteDe: (id:string) => Promise<{img, corte}|null>, aviso: (msg:string) => void }} o
 */
export function montarImpressao({ tema, prefs, mm, dadosDe, arteDe, aviso }) {
  const opcoes = () => ({
    conjunto: $('#imp-conjunto').value,
    sangria: $('#imp-disposicao').value === 'sangria',
    versos: $('#imp-versos').checked,
  });

  function lista(o, porFolha) {
    if (o.conjunto === 'todas') return ROLES.map((r) => r.id);
    if (o.conjunto === 'variantes') return ROLES.flatMap((r) => idsDasCopias(r.id, (VARIANTES[r.id]?.length ?? 0) + 1));
    if (o.conjunto === 'atual') return Array(porFolha).fill(prefs.id);
    const cartas = baralhoDePreparar();
    if (!cartas) return [];
    return ROLES.flatMap((r) => idsDasCopias(r.id, cartas[r.id] ?? 0));
  }

  /** Desenha uma folha A4 num canvas. `verso` desenha os versos nas posições espelhadas. */
  async function desenharFolha(ids, f, dpi, verso, artes) {
    const px = (v) => (v / 25.4) * dpi;
    const tela = document.createElement('canvas');
    tela.width = mmParaPx(A4[0], dpi);
    tela.height = mmParaPx(A4[1], dpi);
    const ctx = tela.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, tela.width, tela.height);
    ctx.imageSmoothingQuality = 'high';

    const g = geometria({ mm: f.mm, dpi, sangria: true, esquema: prefs.esquema });
    const carta = document.createElement('canvas');
    carta.width = g.W;
    carta.height = g.H;
    const cc = carta.getContext('2d');
    if (verso) desenharVerso(cc, g, tema());

    for (const [i, id] of ids.entries()) {
      const cel = f.celulas[verso ? posicaoVerso(i, f.cols) : i];
      if (!verso) {
        if (!artes.has(id)) artes.set(id, arteDe(id));
        const a = await artes.get(id);
        desenharFrente(cc, g, dadosDe(id), tema(), { arte: a?.img ?? null, corte: a?.corte ?? {} });
      }
      if (f.sangria) ctx.drawImage(carta, 0, 0, g.W, g.H, px(cel.x), px(cel.y), px(cel.w), px(cel.h));
      else ctx.drawImage(carta, g.b, g.b, g.w, g.h, px(cel.corte.x), px(cel.corte.y), px(cel.corte.w), px(cel.corte.h));
    }

    // Marcas de corte: na margem (pretas) e, com sangria, nos cantos de cada carta (com contorno branco).
    const traco = (segs, largura, cor) => {
      ctx.beginPath();
      for (const [x1, y1, x2, y2] of segs) { ctx.moveTo(px(x1), px(y1)); ctx.lineTo(px(x2), px(y2)); }
      ctx.lineWidth = Math.max(1, px(largura));
      ctx.strokeStyle = cor;
      ctx.stroke();
    };
    ctx.lineCap = 'butt';
    traco(marcasNaMargem(f), 0.2, '#000');
    const cantos = marcasNaSangria(f);
    if (cantos.length) { traco(cantos, 0.7, '#fff'); traco(cantos, 0.25, '#000'); }
    return tela;
  }

  // ── pré-visualização da primeira folha ──
  let visivel = false;
  let pedido = 0;
  async function previsualizar() {
    if (!visivel) return;
    const n = ++pedido;
    const o = opcoes();
    const f = folha({ mm: mm(), sangria: o.sangria });
    const ids = lista(o, f.porFolha);
    resumo(o, f, ids);
    const tela = $('#imp-tela');
    const c = await desenharFolha(ids.slice(0, f.porFolha), f, DPI_PREVISUALIZACAO, false, new Map());
    if (n !== pedido) return;
    tela.width = c.width;
    tela.height = c.height;
    tela.getContext('2d').drawImage(c, 0, 0);
  }

  function resumo(o, f, ids) {
    const folhas = Math.ceil(ids.length / f.porFolha);
    const [w, h] = f.mm;
    $('#imp-info').textContent = `Primeira folha · ${f.cols} × ${f.linhas} cartas de ${w} × ${h} mm`;
    if (!ids.length) {
      $('#imp-resumo').innerHTML = o.conjunto === 'baralho'
        ? 'Ainda não há baralho: monta-o em <a href="preparar.html">Preparar</a>.'
        : 'Não há cartas para imprimir.';
      $('#imprimir').disabled = true;
      return;
    }
    $('#imprimir').disabled = false;
    const versos = o.versos ? `, mais ${folhas} ${folhas === 1 ? 'folha' : 'folhas'} de versos` : '';
    $('#imp-resumo').textContent = `${ids.length} ${ids.length === 1 ? 'carta' : 'cartas'} em ${folhas} ${folhas === 1 ? 'folha' : 'folhas'} A4 (${f.porFolha} por folha)${versos}. Tamanho e esquema: os da bancada.`;
  }

  // ── imprimir ──
  async function imprimir() {
    const botao = $('#imprimir');
    const o = opcoes();
    const f = folha({ mm: mm(), sangria: o.sangria });
    const ids = lista(o, f.porFolha);
    if (!ids.length) return;
    botao.disabled = true;
    const urls = [];
    try {
      await carregarFontes(tema());
      const folhas = paginar(ids, f.porFolha);
      const artes = new Map();
      for (const [k, grupo] of folhas.entries()) {
        aviso(`A preparar a folha ${k + 1} de ${folhas.length}…`);
        urls.push(await urlDe(await desenharFolha(grupo, f, DPI_IMPRESSAO, false, artes)));
        if (o.versos) urls.push(await urlDe(await desenharFolha(grupo, f, DPI_IMPRESSAO, true, artes)));
      }
      aviso('A abrir a janela de impressão…');
      await abrirImpressao(urls);
      aviso('');
    } catch (e) {
      console.error(e);
      aviso('Não foi possível preparar as folhas.');
      urls.forEach((u) => URL.revokeObjectURL(u));
    } finally {
      botao.disabled = false;
    }
  }

  const urlDe = (c) => new Promise((res, rej) => c.toBlob((b) => (b ? res(URL.createObjectURL(b)) : rej(new Error('folha vazia'))), 'image/jpeg', 0.95));

  async function abrirImpressao(urls) {
    const quadro = document.createElement('iframe');
    quadro.setAttribute('aria-hidden', 'true');
    quadro.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
    document.body.append(quadro);
    const doc = quadro.contentDocument;
    doc.open();
    doc.write(`<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><title>Cartas · Ultimate Jerusalém</title>
<style>@page{size:A4 portrait;margin:0}html,body{margin:0;padding:0;background:#fff}
img{display:block;width:210mm;height:297mm;break-after:page;page-break-after:always}
img:last-child{break-after:auto;page-break-after:auto}</style></head>
<body>${urls.map((u) => `<img src="${u}" alt="">`).join('')}</body></html>`);
    doc.close();
    await Promise.all([...doc.images].map((i) => i.decode().catch(() => {})));
    const limpar = () => {
      setTimeout(() => { urls.forEach((u) => URL.revokeObjectURL(u)); quadro.remove(); }, 1000);
    };
    quadro.contentWindow.addEventListener('afterprint', limpar, { once: true });
    quadro.contentWindow.focus();
    quadro.contentWindow.print();
  }

  // ── eventos ──
  for (const s of ['#imp-conjunto', '#imp-disposicao', '#imp-versos']) $(s).addEventListener('change', previsualizar);
  $('#imprimir').addEventListener('click', imprimir);
  new IntersectionObserver((entradas) => {
    const antes = visivel;
    visivel = entradas.some((e) => e.isIntersecting);
    if (visivel && !antes) previsualizar();
  }, { rootMargin: '200px' }).observe($('#imp-tela'));

  let espera;
  /** Chamado pela bancada quando muda o formato, o texto ou a arte. */
  return { atualizar() { clearTimeout(espera); espera = setTimeout(previsualizar, 400); } };
}
