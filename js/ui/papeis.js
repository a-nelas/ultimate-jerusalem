import { ROLES, EQUIPAS, ACORDA, TIPOS, inimigosRecomendados } from '../data/roles.js';
import { imagemPapel } from './imagem.js';
import { ordemDaNoite } from '../engine/preparar.js';

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

const ORDEM_EQUIPAS = Object.keys(EQUIPAS);
const VALOR_MAX = Math.max(...ROLES.map((r) => Math.abs(r.valor)));
const PAPEIS = ROLES.filter((r) => r.id !== 'narrador').map((r, i) => ({ ...r, ordem: i + 1 }));
const acento = (eq) => `--mf-accent:var(--mf-team-${eq})`;
const marca = (eq) => el('span', { class: 'mf-dot', style: acento(eq), 'aria-hidden': 'true' });

const estado = {
  equipas: new Set(),
  texto: '',
  acorda: '',
  tipo: '',
  jogadores: null,
  ordenar: { chave: 'ordem', dir: 1 },
  aberto: null,
};

// ── Preferências guardadas (só conveniência; funciona sem elas) ──
const CHAVE = 'uj:papeis:filtros';
try {
  const g = JSON.parse(localStorage.getItem(CHAVE) || 'null');
  if (g) {
    estado.jogadores = g.jogadores ?? null;
    if (g.ordenar) estado.ordenar = g.ordenar;
  }
} catch { /* sem armazenamento */ }
const guardar = () => {
  try { localStorage.setItem(CHAVE, JSON.stringify({ jogadores: estado.jogadores, ordenar: estado.ordenar })); } catch { /* ignorar */ }
};

// ── Filtros ──
function montarFiltros() {
  const caixa = $('#filtro-equipas');
  for (const [id, eq] of Object.entries(EQUIPAS)) {
    const b = el('button', { class: 'mf-btn mf-chip', type: 'button', 'aria-pressed': 'false', 'data-equipa': id },
      marca(id), eq.nome);
    b.title = eq.descricao;
    b.addEventListener('click', () => {
      estado.equipas.has(id) ? estado.equipas.delete(id) : estado.equipas.add(id);
      b.setAttribute('aria-pressed', String(estado.equipas.has(id)));
      render();
    });
    caixa.append(b);
  }
  for (const [k, v] of Object.entries(ACORDA)) $('#filtro-acorda').append(el('option', { value: k }, v));
  for (const [k, v] of Object.entries(TIPOS)) $('#filtro-tipo').append(el('option', { value: k }, v));

  $('#filtro-texto').addEventListener('input', (e) => { estado.texto = e.target.value.trim().toLowerCase(); render(); });
  $('#filtro-acorda').addEventListener('change', (e) => { estado.acorda = e.target.value; render(); });
  $('#filtro-tipo').addEventListener('change', (e) => { estado.tipo = e.target.value; render(); });
  const nj = $('#filtro-jogadores');
  if (estado.jogadores) nj.value = estado.jogadores;
  nj.addEventListener('input', (e) => {
    const n = parseInt(e.target.value, 10);
    estado.jogadores = n >= 5 && n <= 30 ? n : null;
    guardar(); render();
  });

  for (const th of document.querySelectorAll('th[data-ordenar]')) {
    th.querySelector('button').addEventListener('click', () => {
      const chave = th.dataset.ordenar;
      estado.ordenar = { chave, dir: estado.ordenar.chave === chave ? -estado.ordenar.dir : (chave === 'valor' ? -1 : 1) };
      guardar(); render();
    });
  }
}

const sem = (s) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

function filtrar(r) {
  if (estado.equipas.size && !estado.equipas.has(r.equipa)) return false;
  if (estado.acorda && r.acorda !== estado.acorda) return false;
  if (estado.tipo && !r.tipo.includes(estado.tipo)) return false;
  if (estado.texto) {
    const t = sem(estado.texto);
    const alvo = sem([r.nome, r.personagem, r.original, r.refBiblica, r.habilidade].join(' '));
    if (!alvo.includes(t)) return false;
  }
  return true;
}

function comparar(a, b) {
  const { chave, dir } = estado.ordenar;
  const val = (r) => {
    switch (chave) {
      case 'nome': return sem(r.nome);
      case 'equipa': return ORDEM_EQUIPAS.indexOf(r.equipa);
      case 'valor': return r.valor;
      case 'noite': return r.ordemNoite ?? 9999;
      case 'aPartirDe': return r.recomendado.aPartirDe;
      default: return r.ordem;
    }
  };
  const va = val(a), vb = val(b);
  const c = typeof va === 'string' ? va.localeCompare(vb, 'pt') : va - vb;
  return c * dir || a.ordem - b.ordem;
}

// ── Células ──
function celValor(r) {
  const pct = (Math.abs(r.valor) / VALOR_MAX) * 50;
  const barra = el('i', {
    style: r.valor >= 0
      ? `left:50%;width:${pct}%;background:var(--mf-pos)`
      : `right:50%;width:${pct}%;background:var(--mf-neg)`,
  });
  const num = el('span', { class: `valor-num ${r.valor > 0 ? 'pos' : r.valor < 0 ? 'neg' : ''}` },
    r.valor > 0 ? `+${r.valor}` : r.valor < 0 ? `−${Math.abs(r.valor)}` : '0');
  const cel = el('div', { class: 'valor-cel' }, num, el('span', { class: 'barra', 'aria-hidden': 'true' }, barra));
  if (r.verificar) cel.append(el('span', { class: 'verificar', title: 'Valor por confirmar numa carta impressa' }, '?'));
  return cel;
}

function textoRecomendado(r) {
  const { min, max, aPartirDe } = r.recomendado;
  if (r.id === 'filisteu') return ['~1 por 5 jogadores', 'ver resumo acima'];
  if (r.id === 'israelita') return ['O restante', `mínimo ${min}`];
  if (max === 0) return ['Não recomendado', 'com a votação a apontar'];
  const copias = min === max ? `${max}` : `${min}–${max}`;
  return [`${copias} ${max === 1 ? 'cópia' : 'cópias'}`, `a partir de ${aPartirDe} jogadores`];
}

function linha(r) {
  const n = estado.jogadores;
  const recomendado = n != null && r.recomendado.aPartirDe <= n && r.recomendado.max > 0;
  const tr = el('tr', {
    class: `papel${n != null ? (recomendado ? ' recomendado' : ' fora') : ''}`,
    tabindex: '0', 'aria-expanded': String(estado.aberto === r.id), 'data-id': r.id, style: acento(r.equipa),
  });
  const [rec1, rec2] = textoRecomendado(r);
  tr.append(
    el('td', { class: 'c-num num' }, r.ordem),
    el('td', { class: 'c-papel' }, el('div', { class: 'papel-cel' },
      imagemPapel(r.id, ''),
      el('div', {},
        el('div', { class: 'papel-nome' }, r.nome),
        el('div', { class: 'papel-sub' }, r.personagem),
        el('div', { class: 'papel-orig' }, `Original: ${r.original}`)))),
    el('td', { class: 'c-equipa' }, el('span', { class: 'mf-team' }, marca(r.equipa), EQUIPAS[r.equipa].nome)),
    el('td', { class: 'c-valor' }, celValor(r)),
    el('td', { class: 'c-acorda', 'data-rotulo': 'Acorda' }, ACORDA[r.acorda]),
    el('td', { class: 'c-tipo' }, el('div', { class: 'tipos' }, r.tipo.map((t) => el('span', { class: 'tipo' }, TIPOS[t])))),
    el('td', { class: 'c-rec' }, el('div', { class: 'rec' }, rec1, el('small', {}, rec2))),
  );
  const alternar = () => { estado.aberto = estado.aberto === r.id ? null : r.id; render(); };
  tr.addEventListener('click', alternar);
  tr.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alternar(); } });
  return tr;
}

function detalhe(r) {
  const dl = el('dl', {},
    el('dt', {}, 'Habilidade'), el('dd', {}, r.habilidade),
    el('dt', {}, 'Referência'), el('dd', {}, r.refBiblica),
    r.guiaoNoite ? [el('dt', {}, 'Guião da noite'), el('dd', { class: 'guiao' }, `“${r.guiaoNoite}”`)] : null,
    el('dt', {}, 'Nota do Narrador'), el('dd', {}, r.notaModerador),
    el('dt', {}, 'Isaías vê'), el('dd', {}, r.profetaVe === 'filisteu' ? 'Filisteu' : 'Israelita'),
  );
  return el('tr', { class: 'detalhe', style: acento(r.equipa) }, el('td', { colspan: '7' }, dl));
}

function resumo(lista) {
  const n = estado.jogadores;
  const partes = [`<strong>${lista.length}</strong> de ${PAPEIS.length} personagens`];
  if (n) {
    const rec = PAPEIS.filter((r) => r.recomendado.aPartirDe <= n && r.recomendado.max > 0).length;
    partes.push(`Para <strong>${n}</strong> jogadores: <strong>${inimigosRecomendados(n)}</strong> inimigo(s) (Filisteus, Golias, Absalão ou Caldeus) e <strong>${rec}</strong> personagens adequadas (destacadas).`);
  } else {
    partes.push('Indica o número de jogadores para destacar as personagens recomendadas.');
  }
  $('#resumo').innerHTML = partes.join(' · ');
}

function render() {
  for (const th of document.querySelectorAll('th[data-ordenar]')) {
    th.setAttribute('aria-sort', th.dataset.ordenar === estado.ordenar.chave
      ? (estado.ordenar.dir === 1 ? 'ascending' : 'descending') : 'none');
  }
  const lista = PAPEIS.filter(filtrar).sort(comparar);
  const tbody = $('#grelha tbody');
  tbody.replaceChildren();
  for (const r of lista) {
    tbody.append(linha(r));
    if (estado.aberto === r.id) tbody.append(detalhe(r));
  }
  if (!lista.length) tbody.append(el('tr', {}, el('td', { colspan: '7' }, 'Nenhum papel corresponde aos filtros.')));
  resumo(lista);
}

function ordemNoite() {
  const ol = $('#ordem-noite');
  for (const papeis of ordemDaNoite()) {
    const [p, ...outros] = papeis;
    const nome = outros.length ? `${p.nome} (com ${outros.map((o) => o.nome).join(' e ')})` : p.nome;
    ol.append(el('li', {},
      el('span', { class: 'mf-team' }, marca(p.equipa), nome),
      ' ', el('span', { class: 'mf-when' }, `· ${ACORDA[p.acorda].toLowerCase()}`)));
  }
}

montarFiltros();
render();
ordemNoite();
