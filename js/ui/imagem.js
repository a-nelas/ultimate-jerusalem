// Miniatura de uma personagem para a grelha. Só pede imagens que existem (ver js/data/imagens.js),
// em versão leve, e só quando a linha se aproxima do ecrã.
import { IMAGENS } from '../data/imagens.js';

export const PLACEHOLDER = 'assets/placeholder.svg';

export function imagemPapel(id, alt = '') {
  const img = document.createElement('img');
  img.alt = alt;
  img.width = 44;
  img.height = 62;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.src = IMAGENS[id]?.mini ?? PLACEHOLDER;
  return img;
}
