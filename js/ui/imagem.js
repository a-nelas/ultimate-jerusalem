// Imagem de um papel, com recurso: .webp → .png → .jpg → placeholder.
// O resultado é memorizado por id, para não repetir pedidos 404 a cada redesenho.
const EXTENSOES = ['webp', 'png', 'jpg'];
export const PLACEHOLDER = 'assets/placeholder.svg';
const resolvidas = new Map(); // id → url final

export function imagemPapel(id, alt = '') {
  const img = document.createElement('img');
  img.alt = alt;
  img.decoding = 'async';
  if (resolvidas.has(id)) { img.src = resolvidas.get(id); return img; }

  let i = 0;
  const url = () => `assets/roles/${id}.${EXTENSOES[i]}`;
  img.src = url();
  img.addEventListener('load', () => resolvidas.set(id, img.src), { once: true });
  img.addEventListener('error', function tentar() {
    i += 1;
    if (i < EXTENSOES.length) { img.src = url(); return; }
    img.removeEventListener('error', tentar);
    resolvidas.set(id, PLACEHOLDER);
    img.src = PLACEHOLDER;
  });
  return img;
}
