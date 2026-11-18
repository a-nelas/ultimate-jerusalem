// Motor de "Preparar a Partida": contas do baralho, equilíbrio, avisos e sugestões.
// Funções puras (sem DOM), testadas em tests/preparar.test.mjs.
// Um baralho é { jogadores: number, cartas: { [id]: copias } }.
import { ROLES, papel, inimigosRecomendados } from '../data/roles.js';

export const MIN_JOGADORES = 5;
export const MAX_JOGADORES = 30;

/** Personagens que podem entrar no baralho (o Narrador não joga). */
export const JOGAVEIS = ROLES.filter((r) => r.id !== 'narrador');

/** Personagens que matam de noite e contam como inimigos para o n.º recomendado. */
export const ASSASSINOS = ['filisteu', 'golias', 'caldeu', 'absalao'];

/** Objetos: entram no equilíbrio, mas não são cartas distribuídas. */
const OBJETOS = new Set(['manto']);

export const maxCopias = (id) => Math.max(1, papel(id)?.recomendado.max ?? 1);
export const copias = (b, id) => b.cartas[id] ?? 0;

/** Cópia limpa (sem zeros nem ids desconhecidos). */
export function normalizar(b) {
  const cartas = {};
  for (const [id, n] of Object.entries(b.cartas ?? {})) {
    if (n > 0 && papel(id) && id !== 'narrador') cartas[id] = Math.floor(n);
  }
  const jogadores = Math.min(MAX_JOGADORES, Math.max(MIN_JOGADORES, Math.floor(b.jogadores) || MIN_JOGADORES));
  return { jogadores, cartas };
}

/** N.º de cartas físicas no baralho (o Manto é um objeto à parte). */
export const contarCartas = (b) =>
  Object.entries(b.cartas).reduce((s, [id, n]) => s + (OBJETOS.has(id) ? 0 : n), 0);

/** Cartas necessárias: uma por jogador, mais uma posta de parte para Joás. */
export const cartasNecessarias = (b) => b.jogadores + (copias(b, 'joas') ? 1 : 0);

/** Soma dos valores de equilíbrio (positivo ajuda Jerusalém). */
export const equilibrio = (b) =>
  Object.entries(b.cartas).reduce((s, [id, n]) => s + papel(id).valor * n, 0);

export const inimigos = (b) => ASSASSINOS.reduce((s, id) => s + copias(b, id), 0);

/** Classifica o total de equilíbrio. */
export function classificar(total) {
  const a = Math.abs(total);
  if (a <= 2) return { id: 'equilibrado', texto: 'Equilibrado' };
  if (a > 5) return { id: 'desequilibrado', texto: total > 0 ? 'Muito a favor de Jerusalém' : 'Muito a favor dos inimigos' };
  return { id: total > 0 ? 'jerusalem' : 'inimigos', texto: total > 0 ? 'A favor de Jerusalém' : 'A favor dos inimigos' };
}

const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;

/** Avisos sobre o baralho: 'erro' impede um jogo normal, 'aviso' é uma recomendação. */
export function avisos(b) {
  const out = [];
  const erro = (texto) => out.push({ nivel: 'erro', texto });
  const aviso = (texto) => out.push({ nivel: 'aviso', texto });
  const tem = (id) => copias(b, id) > 0;

  const total = contarCartas(b);
  const precisa = cartasNecessarias(b);
  if (total < precisa) erro(`Faltam ${plural(precisa - total, 'carta', 'cartas')}: são precisas ${precisa}${tem('joas') ? ` (${b.jogadores} jogadores e mais uma posta de parte para Joás)` : ''}.`);
  if (total > precisa) erro(`Há ${plural(total - precisa, 'carta', 'cartas')} a mais: são precisas ${precisa}.`);
  if (!tem('filisteu') && !tem('golias')) erro('Não há Filisteus nem Golias: ninguém ataca de noite.');

  const rec = inimigosRecomendados(b.jogadores);
  const ini = inimigos(b);
  if (ini < rec - 1) aviso(`Poucos inimigos: para ${b.jogadores} jogadores recomendam-se ${rec} (há ${ini}).`);
  if (ini > rec + 1) aviso(`Inimigos a mais: para ${b.jogadores} jogadores recomendam-se ${rec} (há ${ini}).`);

  for (const [id, n] of Object.entries(b.cartas)) {
    const p = papel(id);
    if (n > maxCopias(id)) aviso(`${p.nome}: no máximo ${maxCopias(id)} ${maxCopias(id) === 1 ? 'cópia' : 'cópias'}.`);
    if (p.recomendado.aPartirDe > b.jogadores) aviso(`${p.nome} costuma entrar só a partir de ${p.recomendado.aPartirDe} jogadores.`);
  }
  if (tem('jeremias') && !tem('isaias')) aviso('O Profeta Jeremias só acorda depois de Isaías morrer: sem Isaías, nunca joga.');
  if ((tem('dalila') || tem('espia')) && !tem('filisteu') && !tem('golias')) aviso('Dalila e o Espia ajudam os Filisteus: sem eles não têm a quem ajudar.');
  if (copias(b, 'construtor') === 1) aviso('Um Construtor sozinho não tem com quem se reconhecer: usa 2 ou mais.');
  if (tem('nabal')) aviso('Nabal não é recomendado com a votação a apontar.');
  if (tem('caldeu') && !tem('filisteu') && !tem('golias')) aviso('Os Caldeus são uma terceira fação: joga-os com Filisteus.');
  if (!tem('israelita')) aviso('Não há Israelitas: inclui alguns para o baralho não revelar demasiado.');
  return out;
}

// ── Sugestões ──

/** Gerador pseudoaleatório com semente (mulberry32). */
export function prng(semente) {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Personagens especiais (não inimigos, não Israelita) adequadas a n jogadores. */
const elegiveis = (n, excluir = []) => JOGAVEIS.filter((r) =>
  r.recomendado.max > 0 && r.recomendado.aPartirDe <= n &&
  !['israelita', 'narrador', 'joas', ...ASSASSINOS, ...excluir].includes(r.id));

/** Ordem clássica da sugestão simples: as personagens mais conhecidas primeiro. */
const CLASSICOS = ['benaia', 'sansao', 'david', 'elias', 'jeremias', 'espia', 'rute', 'debora', 'daniel', 'jonatas',
  'zadoque', 'salomao', 'construtor', 'noemi', 'aca', 'absalao', 'calebe', 'ester', 'eleazar', 'baruque', 'trombeteiro',
  'ezequias', 'abigail', 'dalila', 'jaco', 'golias', 'matusalem'];

/** Completa com Israelitas até ao n.º de cartas necessário. */
function completar(b) {
  const falta = cartasNecessarias(b) - contarCartas(b);
  if (falta) b.cartas.israelita = Math.max(0, copias(b, 'israelita') + falta);
  if (!b.cartas.israelita) delete b.cartas.israelita;
  return b;
}

const blocoDe = (id) => (id === 'construtor' ? 2 : 1);

/**
 * Aproxima o equilíbrio de zero trocando Israelitas por personagens (ou o contrário).
 * `candidatos` é a lista de personagens que se podem acrescentar, por ordem de preferência.
 * `fixos` não se tiram. Isaías e os `preferidos` (as personagens de um cenário) só saem em último caso.
 */
function equilibrar(b, candidatos, fixos, rnd, preferidos = []) {
  const pontos = (x) => Math.abs(equilibrio(x)) + (copias(x, 'isaias') ? 0 : 2.5)
    + Math.max(0, inimigos(x) - inimigosRecomendados(x.jogadores)) * 1.5
    + preferidos.filter((id) => !copias(x, id)).length * 2;   // tirar uma personagem do cenário custa mais
  for (let volta = 0; volta < 40 && Math.abs(equilibrio(b)) > 1; volta++) {
    const opcoes = [];
    const isr = copias(b, 'israelita');
    for (const id of candidatos) {
      const k = blocoDe(id);
      if (copias(b, id) + k > maxCopias(id) || isr <= k) continue;
      opcoes.push({ ...b, cartas: { ...b.cartas, [id]: copias(b, id) + k, israelita: isr - k } });
    }
    for (const id of Object.keys(b.cartas)) {
      if (id === 'israelita' || fixos.includes(id)) continue;
      const k = copias(b, id);
      const cartas = { ...b.cartas, israelita: isr + k };
      delete cartas[id];
      opcoes.push({ ...b, cartas });
    }
    if (inimigos(b) <= inimigosRecomendados(b.jogadores) && isr > 1) {
      opcoes.push({ ...b, cartas: { ...b.cartas, filisteu: copias(b, 'filisteu') + 1, israelita: isr - 1 } });
    }
    if (!opcoes.length) break;
    if (rnd) opcoes.sort(() => rnd() - 0.5);
    const melhor = opcoes.reduce((m, o) => (pontos(o) < pontos(m) ? o : m));
    if (pontos(melhor) >= pontos(b)) break;
    b = melhor;
  }
  return b;
}

/** Sugestão simples: sempre a mesma para cada n.º de jogadores, com as personagens clássicas. */
export function sugerirSimples(jogadores) {
  const n = normalizar({ jogadores }).jogadores;
  const b = { jogadores: n, cartas: { filisteu: inimigosRecomendados(n), isaias: 1 } };
  const lista = CLASSICOS.filter((id) => elegiveis(n).some((r) => r.id === id));
  const especiais = Math.floor((n - inimigosRecomendados(n) - 1) * 0.45);
  for (const id of lista.filter((x) => papel(x).valor > 0).slice(0, especiais)) b.cartas[id] = blocoDe(id);
  completar(b);
  return normalizar(equilibrar(b, lista, ['filisteu', 'isaias'], null));
}

/** Sugestão aleatória: varia com a semente, mantendo o n.º de inimigos e o equilíbrio. */
export function sugerirAleatoria(jogadores, semente = Date.now()) {
  const rnd = prng(semente);
  const n = normalizar({ jogadores }).jogadores;
  const rec = inimigosRecomendados(n);
  const b = { jogadores: n, cartas: { filisteu: rec } };
  const trocar = (id, k = 1) => {
    if (copias(b, 'filisteu') - k < 1) return;
    b.cartas.filisteu -= k;
    b.cartas[id] = copias(b, id) + k;
  };
  if (n >= 15 && rnd() < 0.4) trocar('golias');
  if (n >= 20 && rnd() < 0.5) trocar('caldeu', Math.min(2, rec - 1));
  if (n >= 11 && rnd() < 0.25) trocar('absalao');
  if (rnd() < 0.9) b.cartas.isaias = 1;
  if (n >= 10 && rnd() < 0.3) b.cartas.manto = 1;

  const fora = ['isaias', 'manto', ...(b.cartas.isaias ? [] : ['jeremias'])];   // Jeremias só faz sentido com Isaías
  const lista = elegiveis(n, fora).map((r) => r.id).sort(() => rnd() - 0.5);
  const alvo = Math.floor((n - rec - 1) * (0.35 + rnd() * 0.25));
  for (const id of lista) {
    if (contarCartas(b) - rec + blocoDe(id) > alvo) continue;
    b.cartas[id] = blocoDe(id);
  }
  completar(b);
  const fixos = ['filisteu', 'golias', 'caldeu', 'absalao', 'isaias'];
  return normalizar(equilibrar(b, lista, fixos, rnd));
}

/** Monta um cenário de js/data/cenarios.js para n jogadores (fora do intervalo usa o mais próximo). */
export function aplicarCenario(c, jogadores) {
  const n = normalizar({ jogadores }).jogadores;
  const b = { jogadores: n, cartas: { ...c.inimigos(n, inimigosRecomendados(n)) } };
  const cabe = (id) => papel(id).recomendado.aPartirDe <= n;
  for (const id of c.papeis.filter(cabe)) b.cartas[id] = blocoDe(id);
  completar(b);
  const presentes = c.papeis.filter(cabe);
  return normalizar(equilibrar(b, c.reserva.filter(cabe), [...ASSASSINOS, 'isaias'], null, presentes));
}

// ── Noite ──

/** Passos da noite (agrupados por ordem), só com as personagens indicadas, ou todas. */
export function ordemDaNoite(ids) {
  const so = ids ? new Set(ids) : null;
  const grupos = new Map();
  for (const r of JOGAVEIS.filter((p) => p.ordemNoite != null && (!so || so.has(p.id))).sort((a, b) => a.ordemNoite - b.ordemNoite)) {
    if (!grupos.has(r.ordemNoite)) grupos.set(r.ordemNoite, []);
    grupos.get(r.ordemNoite).push(r);
  }
  return [...grupos.values()];
}

// ── Partilhar por ligação: #12/isaias,filisteu*2,israelita*7 ──

export function codificar(b) {
  const partes = Object.entries(b.cartas).filter(([, n]) => n > 0).map(([id, n]) => (n > 1 ? `${id}*${n}` : id));
  return `${b.jogadores}/${partes.join(',')}`;
}

export function descodificar(texto) {
  const m = /^#?(\d+)\/(.*)$/.exec(String(texto ?? '').trim());
  if (!m) return null;
  const cartas = {};
  for (const parte of m[2].split(',').filter(Boolean)) {
    const [id, n] = parte.split('*');
    if (papel(id)) cartas[id] = (cartas[id] ?? 0) + (Number(n) || 1);
  }
  return normalizar({ jogadores: Number(m[1]), cartas });
}
