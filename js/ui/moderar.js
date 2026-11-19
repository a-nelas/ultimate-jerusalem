// Moderar a Partida: o guião do Narrador. As regras do guião estão em js/engine/moderar.js.
import { papel } from '../data/roles.js';
import { VOTACOES, VOTACAO_PADRAO } from '../data/regras.js';
import { normalizar, codificar, descodificar } from '../engine/preparar.js';
import {
  PODERES_UNICOS, ACONTECIMENTOS, papeisDoBaralho, preparacao, passosDaNoite, passosDoDia, vitorias,
} from '../engine/moderar.js';

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
const ordinal = (n, f = true) => `${n}.${f ? 'ª' : 'º'}`;

// ── Estado ──
// O baralho vem de Preparar ('uj:preparar') ou da ligação (#12/…). O progresso fica em 'uj:moderar'.
const CHAVE = 'uj:moderar';
const lerJSON = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; } };

function lerBaralho() {
  const daLigacao = descodificar(location.hash);
  if (daLigacao) return daLigacao;
  const g = lerJSON('uj:preparar');
  return g?.jogadores ? normalizar(g) : null;
}

const novo = (b) => ({ baralho: b ? codificar(b) : null, fase: 'preparar', noite: 1, feitos: {}, usados: {}, acontecimentos: {}, votacao: VOTACAO_PADRAO });

let baralho = lerBaralho();
let jogo = (() => {
  const g = lerJSON(CHAVE);
  if (g && baralho && g.baralho === codificar(baralho)) return { ...novo(baralho), ...g };
  return { ...novo(baralho), votacao: g?.votacao ?? VOTACAO_PADRAO };
})();

function guardar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(jogo)); } catch { /* sem armazenamento */ }
}

// ── Desenho ──
const prefixo = () => `${jogo.fase}${jogo.noite}`;

function botaoFeito(chave, rotulo) {
  const k = `${prefixo()}:${chave}`;
  const b = el('button', { type: 'button', class: 'feito', 'aria-pressed': String(!!jogo.feitos[k]), 'aria-label': `Marcar como feito: ${rotulo}` });
  b.addEventListener('click', () => {
    if (jogo.feitos[k]) delete jogo.feitos[k]; else jogo.feitos[k] = true;
    guardar();
    desenhar();
  });
  return b;
}

const linhaSimples = (chave, texto) => {
  const k = `${prefixo()}:${chave}`;
  return el('li', { class: `item${jogo.feitos[k] ? ' ok' : ''}` }, botaoFeito(chave, texto), el('span', {}, texto));
};

function desenharPreparacao(caixa) {
  caixa.append(el('h3', { class: 'fase-titulo' }, 'Antes de começar'),
    el('ol', { class: 'itens' }, preparacao(baralho, jogo.votacao).map((t, i) => linhaSimples(`p${i}`, t))));
}

function desenharNoite(caixa) {
  const passos = passosDaNoite(baralho, jogo.noite, jogo);
  caixa.append(el('h3', { class: 'fase-titulo' }, `${ordinal(jogo.noite)} Noite`));
  const ol = el('ol', { class: 'passos' });
  for (const p of passos) {
    const k = `${prefixo()}:${p.chave}`;
    const li = el('li', { class: `passo estado-${p.estado}${jogo.feitos[k] ? ' ok' : ''}`, style: p.equipa ? acento(p.equipa) : '' },
      botaoFeito(p.chave, p.titulo),
      el('div', { class: 'passo-corpo' },
        el('div', { class: 'passo-titulo' }, p.equipa ? marca(p.equipa) : null, p.titulo,
          p.estado === 'espera' ? el('span', { class: 'etiqueta' }, 'ainda não') : null,
          p.estado === 'usado' ? el('span', { class: 'etiqueta' }, 'poder gasto') : null),
        el('p', { class: 'guiao' }, p.texto),
        p.notas.length ? el('ul', { class: 'notas' }, p.notas.map((n) => el('li', {}, n))) : null));
    ol.append(li);
  }
  ol.append(el('li', { class: 'passo fim' }, el('span', { class: 'feito-vazio', 'aria-hidden': 'true' }),
    el('div', { class: 'passo-corpo' }, el('div', { class: 'passo-titulo' }, 'Fim da noite'),
      el('p', { class: 'guiao' }, 'Toda a gente, de olhos fechados… Cidade, acorda!'))));
  caixa.append(ol);
}

function desenharDia(caixa) {
  caixa.append(el('h3', { class: 'fase-titulo' }, `${ordinal(jogo.noite, false)} Dia`));
  for (const s of passosDoDia(baralho, jogo.noite, jogo)) {
    caixa.append(el('section', { class: 'bloco-dia' },
      el('h4', {}, s.titulo),
      el('ol', { class: 'itens' }, s.itens.map((t, i) => linhaSimples(`${s.chave}${i}`, t)))));
  }
}

function desenharPainel() {
  const ids = papeisDoBaralho(baralho);
  // progresso
  const rotulo = jogo.fase === 'preparar' ? 'Preparação' : jogo.fase === 'noite' ? `${ordinal(jogo.noite)} Noite` : `${ordinal(jogo.noite, false)} Dia`;
  $('#fase').textContent = rotulo;
  $('#voltar').disabled = jogo.fase === 'preparar';
  $('#avancar').textContent = jogo.fase === 'preparar' ? 'Começar a 1.ª noite' : jogo.fase === 'noite' ? 'Amanhecer' : `Anoitecer (${ordinal(jogo.noite + 1)} noite)`;

  // poderes que só se usam uma vez
  const poderes = Object.entries(PODERES_UNICOS).filter(([, p]) => ids.includes(p.papel));
  $('#poderes-bloco').hidden = !poderes.length;
  $('#poderes').replaceChildren(...poderes.map(([k, p]) => {
    const usado = jogo.usados[k];
    const cb = el('input', { type: 'checkbox' });
    cb.checked = usado != null;
    cb.disabled = jogo.fase === 'preparar';
    cb.addEventListener('change', () => {
      if (cb.checked) jogo.usados[k] = jogo.noite; else delete jogo.usados[k];
      guardar();
      desenhar();
    });
    return el('li', {}, el('label', { class: 'marcar' }, cb, el('span', {}, p.nome,
      usado != null ? el('small', { class: 'quando' }, ` · ${ordinal(usado)} noite`) : null)));
  }));

  // acontecimentos
  const acs = Object.entries(ACONTECIMENTOS).filter(([, a]) => ids.includes(a.papel) && (!a.precisa || ids.includes(a.precisa)));
  $('#acontecimentos-bloco').hidden = !acs.length;
  $('#acontecimentos').replaceChildren(...acs.map(([k, a]) => {
    const v = jogo.acontecimentos[k];
    const ativo = a.noite ? v != null && v >= jogo.noite : !!v;
    const cb = el('input', { type: 'checkbox' });
    cb.checked = ativo;
    cb.disabled = jogo.fase === 'preparar';
    cb.addEventListener('change', () => {
      if (cb.checked) jogo.acontecimentos[k] = a.noite ? jogo.noite + 1 : true;
      else delete jogo.acontecimentos[k];
      guardar();
      desenhar();
    });
    return el('li', {}, el('label', { class: 'marcar' }, cb, el('span', {}, a.nome, el('small', {}, a.efeito))));
  }));

  // vitória
  $('#vitorias').replaceChildren(...vitorias(baralho).map((v) => el('li', { style: acento(v.equipa) }, marca(v.equipa), el('span', {}, v.texto))));
}

function desenhar() {
  const vazio = !baralho || !papeisDoBaralho(baralho).length;
  $('#sem-baralho').hidden = !vazio;
  $('#moderar').hidden = vazio;
  if (vazio) return;
  const n = baralho.jogadores;
  $('#st-jogadores').textContent = n;
  $('#st-noite').textContent = jogo.fase === 'preparar' ? '–' : jogo.noite;
  $('#st-papeis').textContent = papeisDoBaralho(baralho).filter((id) => id !== 'israelita').length;
  $('#baralho-resumo').replaceChildren(...papeisDoBaralho(baralho).map((id) => {
    const p = papel(id);
    const k = baralho.cartas[id];
    return el('li', { style: acento(p.equipa) }, marca(p.equipa), k > 1 ? `${p.nome} ×${k}` : p.nome);
  }));
  $('#votacao').value = jogo.votacao;

  const caixa = $('#guiao');
  caixa.replaceChildren();
  if (jogo.fase === 'preparar') desenharPreparacao(caixa);
  else if (jogo.fase === 'noite') desenharNoite(caixa);
  else desenharDia(caixa);
  desenharPainel();
}

function irPara(fase, noite) {
  jogo.fase = fase;
  jogo.noite = noite;
  guardar();
  desenhar();
  $('#t-guiao').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Eventos ──
$('#avancar').addEventListener('click', () => {
  if (jogo.fase === 'preparar') irPara('noite', 1);
  else if (jogo.fase === 'noite') irPara('dia', jogo.noite);
  else irPara('noite', jogo.noite + 1);
});
$('#voltar').addEventListener('click', () => {
  if (jogo.fase === 'noite') irPara(jogo.noite === 1 ? 'preparar' : 'dia', Math.max(1, jogo.noite - 1));
  else if (jogo.fase === 'dia') irPara('noite', jogo.noite);
});
$('#nova').addEventListener('click', () => {
  if (jogo.fase !== 'preparar' && !confirm('Começar uma nova partida? O progresso desta partida perde-se.')) return;
  jogo = { ...novo(baralho), votacao: jogo.votacao };
  guardar();
  desenhar();
});
$('#votacao').addEventListener('change', (e) => {
  jogo.votacao = VOTACOES[e.target.value] ? e.target.value : VOTACAO_PADRAO;
  guardar();
  desenhar();
});
window.addEventListener('hashchange', () => {
  const b = descodificar(location.hash);
  if (b && codificar(b) !== jogo.baralho) { baralho = b; jogo = { ...novo(b), votacao: jogo.votacao }; guardar(); desenhar(); }
});

if (baralho) $('#ligacao-preparar').href = `preparar.html#${codificar(baralho)}`;
desenhar();
