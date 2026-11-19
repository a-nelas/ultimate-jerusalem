// Tema claro / escuro. O <head> de cada página já pôs data-theme no <html> antes de pintar;
// aqui fica o botão da barra, a escolha guardada ('uj:tema') e o seguir do sistema enquanto não há escolha.
const raiz = document.documentElement;
const CHAVE = 'uj:tema';
const sistema = matchMedia('(prefers-color-scheme: dark)');

function guardado() {
  try { return localStorage.getItem(CHAVE); } catch { return null; }
}

function aplicar(tema) {
  raiz.dataset.theme = tema;
  const b = document.getElementById('tema');
  if (b) {
    const escuro = tema === 'dark';
    b.setAttribute('aria-pressed', String(escuro));
    b.setAttribute('aria-label', escuro ? 'Mudar para o tema claro' : 'Mudar para o tema escuro');
    b.title = b.getAttribute('aria-label');
  }
  window.dispatchEvent(new Event('mf-tema'));   // os títulos (WebGL) voltam a ler as cores
}

aplicar(raiz.dataset.theme === 'dark' ? 'dark' : 'light');

document.getElementById('tema')?.addEventListener('click', () => {
  const novo = raiz.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem(CHAVE, novo); } catch {}
  aplicar(novo);
});

sistema.addEventListener('change', (e) => { if (!guardado()) aplicar(e.matches ? 'dark' : 'light'); });
