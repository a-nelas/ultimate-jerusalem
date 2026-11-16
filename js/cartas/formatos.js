// Formatos de carta e geometria da composição. Puro (sem DOM): usado pela Oficina, pelos testes e pela documentação.

/** Tamanhos comuns de cartas de jogo, em milímetros (largura × altura). */
export const TAMANHOS = {
  padrao:  { nome: 'TCG padrão — Riftbound, Magic, Pokémon, Lorcana', mm: [63, 88] },
  japones: { nome: 'Japonês — Yu-Gi-Oh!, Vanguard', mm: [59, 86] },
  bridge:  { nome: 'Bridge — baralho de cartas estreito', mm: [57, 89] },
  taro:    { nome: 'Tarot', mm: [70, 120] },
  mini:    { nome: 'Mini europeu', mm: [44, 68] },
};

export const ESQUEMAS = {
  janela: 'Arte em janela',
  completa: 'Arte completa (até à margem)',
};

export const RESOLUCOES = [300, 600];
export const SANGRIA_MM = 3;

export const mmParaPx = (mm, dpi) => Math.round((mm / 25.4) * dpi);

const r = (n) => Math.round(n);
const rect = (x, y, w, h) => ({ x: r(x), y: r(y), w: r(w), h: r(h) });

/**
 * Geometria de uma carta em píxeis.
 * @param {{mm:[number,number], dpi?:number, sangria?:boolean, esquema?:'janela'|'completa'}} o
 */
export function geometria({ mm, dpi = 300, sangria = true, esquema = 'janela' }) {
  const [wmm, hmm] = mm;
  const b = sangria ? mmParaPx(SANGRIA_MM, dpi) : 0;
  const w = mmParaPx(wmm, dpi);
  const h = mmParaPx(hmm, dpi);
  const W = w + 2 * b;
  const H = h + 2 * b;
  const g = { W, H, b, w, h, dpi, esquema, corte: rect(b, b, w, h) };

  if (esquema === 'completa') {
    const borda = 0.014 * w;
    const ins = borda + 0.04 * w;
    const placa = rect(b + ins - 0.02 * w, b + borda + 0.022 * h, w - 2 * ins + 0.04 * w, 0.125 * h);
    const painel = rect(b + borda + 0.03 * w, b + 0.6 * h, w - 2 * (borda + 0.03 * w), 0.4 * h - borda - 0.022 * h);
    const pin = 0.045 * w;
    const sub = rect(painel.x + pin, painel.y + 0.02 * h, painel.w - 2 * pin, 0.045 * h);
    const fleuronY = sub.y + sub.h + 0.015 * h;
    const medR = 0.058 * w;
    const rodapeY = painel.y + painel.h - medR - 0.012 * h;
    const texto = rect(painel.x + pin, fleuronY + 0.018 * h, painel.w - 2 * pin, rodapeY - medR - 0.045 * h - (fleuronY + 0.018 * h));
    return {
      ...g, borda, raio: 0.045 * w,
      arte: rect(0, 0, W, H),
      placa, painel,
      nome: rect(placa.x + 0.03 * w, placa.y, placa.w - 0.06 * w, placa.h),
      sub, fleuronY: r(fleuronY), texto,
      ref: rect(texto.x, texto.y + texto.h + 0.006 * h, texto.w, 0.032 * h),
      medalha: { cx: r(painel.x + pin + medR * 0.6), cy: r(rodapeY), r: r(medR) },
      equipa: { x: r(painel.x + painel.w - pin), y: r(rodapeY) },
    };
  }

  // Arte em janela
  const borda = 0.02 * w;
  const ins = borda + 0.03 * w;
  const nome = rect(b + ins, b + borda + 0.01 * h, w - 2 * ins, 0.115 * h);
  const arte = rect(b + borda + 0.025 * w, nome.y + nome.h + 0.004 * h, w - 2 * (borda + 0.025 * w), 0.43 * h);
  const sub = rect(b + ins, arte.y + arte.h + 0.012 * h, w - 2 * ins, 0.05 * h);
  const fleuronY = sub.y + sub.h + 0.012 * h;
  const medR = 0.06 * w;
  const rodapeY = b + h - borda - 0.052 * h;
  const textoY = fleuronY + 0.02 * h;
  const texto = rect(b + ins + 0.02 * w, textoY, w - 2 * ins - 0.04 * w, rodapeY - medR - 0.045 * h - textoY);
  return {
    ...g, borda, raio: 0.05 * w,
    arte, nome, sub, fleuronY: r(fleuronY), texto,
    ref: rect(texto.x, texto.y + texto.h + 0.006 * h, texto.w, 0.032 * h),
    medalha: { cx: r(b + borda + 0.092 * w), cy: r(rodapeY), r: r(medR) },
    equipa: { x: r(b + w - borda - 0.05 * w), y: r(rodapeY) },
  };
}

/** Proporção (largura / altura) da área de arte. */
export const proporcao = (g) => g.arte.w / g.arte.h;

const SDXL = [[1024, 1024], [1152, 896], [896, 1152], [1216, 832], [832, 1216], [1344, 768], [768, 1344], [1536, 640], [640, 1536]];

/** Tamanhos de geração sugeridos para a proporção dada (SDXL: grelhas oficiais; Flux: ~1 MP, múltiplos de 16). */
export function sugestaoGeracao(prop) {
  const sdxl = SDXL.reduce((m, s) => (Math.abs(Math.log(s[0] / s[1] / prop)) < Math.abs(Math.log(m[0] / m[1] / prop)) ? s : m));
  const fw = Math.round(Math.sqrt(1024 * 1024 * prop) / 16) * 16;
  const fh = Math.round(fw / prop / 16) * 16;
  return { sdxl, flux: [fw, fh] };
}
