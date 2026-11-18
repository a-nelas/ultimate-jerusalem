// Disposição das cartas numa folha A4 para imprimir e recortar. Puro (sem DOM): medidas em milímetros.
import { SANGRIA_MM } from './formatos.js';

export const A4 = [210, 297];
/** Margem mínima à volta da grelha quando as cartas ficam encostadas (espaço para as marcas de corte). */
export const MARGEM_MIN = 6;
/** Distância entre a grelha e o início das marcas de corte na margem. */
export const FOLGA_MARCA = 1;
/** Comprimento máximo das marcas de corte na margem e dentro da sangria. */
export const MARCA_MM = 7;
export const MARCA_SANGRIA_MM = 2.5;

/**
 * Grelha de cartas numa folha A4 (ao alto).
 * - encostadas (sangria = false): as cartas tocam-se, cada linha de corte serve duas cartas;
 * - com sangria: cada carta leva os 3 mm de sangria e cortam-se as duas margens de cada intervalo.
 * @param {{mm:[number,number], sangria?:boolean}} o
 */
export function folha({ mm, sangria = false }) {
  const [w, h] = mm;
  const s = sangria ? SANGRIA_MM : 0;
  const cw = w + 2 * s;
  const ch = h + 2 * s;
  const m = sangria ? 0 : MARGEM_MIN;
  const cols = Math.max(1, Math.floor((A4[0] - 2 * m) / cw));
  const linhas = Math.max(1, Math.floor((A4[1] - 2 * m) / ch));
  const x0 = (A4[0] - cols * cw) / 2;
  const y0 = (A4[1] - linhas * ch) / 2;
  const celulas = [];
  for (let l = 0; l < linhas; l++) {
    for (let c = 0; c < cols; c++) {
      const x = x0 + c * cw;
      const y = y0 + l * ch;
      celulas.push({ col: c, linha: l, x, y, w: cw, h: ch, corte: { x: x + s, y: y + s, w, h } });
    }
  }
  const unicos = (v) => [...new Set(v.map((n) => Math.round(n * 1000) / 1000))].sort((a, b) => a - b);
  return {
    mm: [w, h], sangria: !!sangria, cols, linhas, porFolha: cols * linhas, celulas,
    grelha: { x: x0, y: y0, w: cols * cw, h: linhas * ch },
    cortesX: unicos(celulas.flatMap((k) => [k.corte.x, k.corte.x + w])),
    cortesY: unicos(celulas.flatMap((k) => [k.corte.y, k.corte.y + h])),
  };
}

/** Divide uma lista em folhas. */
export function paginar(lista, porFolha) {
  const folhas = [];
  for (let i = 0; i < lista.length; i += porFolha) folhas.push(lista.slice(i, i + porFolha));
  return folhas;
}

/**
 * Posição do verso da carta i, para imprimir frente e verso virando a folha pela margem comprida:
 * cada linha fica espelhada (a 1.ª coluna da frente passa a ser a última do verso).
 */
export const posicaoVerso = (i, cols) => Math.floor(i / cols) * cols + (cols - 1 - (i % cols));

/**
 * Marcas de corte na margem: segmentos [x1, y1, x2, y2] em mm, fora da grelha.
 * Só se desenham onde a margem tem espaço (pelo menos 2 mm depois da folga).
 */
export function marcasNaMargem(f) {
  const { x, y, w, h } = f.grelha;
  const out = [];
  const compY = Math.min(MARCA_MM, y - FOLGA_MARCA);
  const compX = Math.min(MARCA_MM, x - FOLGA_MARCA);
  if (compY >= 2) {
    for (const cx of f.cortesX) {
      out.push([cx, y - FOLGA_MARCA - compY, cx, y - FOLGA_MARCA]);
      out.push([cx, y + h + FOLGA_MARCA, cx, y + h + FOLGA_MARCA + compY]);
    }
  }
  if (compX >= 2) {
    for (const cy of f.cortesY) {
      out.push([x - FOLGA_MARCA - compX, cy, x - FOLGA_MARCA, cy]);
      out.push([x + w + FOLGA_MARCA, cy, x + w + FOLGA_MARCA + compX, cy]);
    }
  }
  return out;
}

/** Marcas nos cantos de cada carta, dentro da sangria (só no modo com sangria). */
export function marcasNaSangria(f) {
  if (!f.sangria) return [];
  const L = MARCA_SANGRIA_MM;
  return f.celulas.flatMap(({ corte: { x, y, w, h } }) => [
    [x, y - L, x, y], [x - L, y, x, y],
    [x + w, y - L, x + w, y], [x + w, y, x + w + L, y],
    [x, y + h, x, y + h + L], [x - L, y + h, x, y + h],
    [x + w, y + h, x + w, y + h + L], [x + w, y + h, x + w + L, y + h],
  ]);
}
