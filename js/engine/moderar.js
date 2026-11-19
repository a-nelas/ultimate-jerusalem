// Moderar a Partida: o guião do Narrador, noite a noite e dia a dia, para as personagens do baralho.
// Puro (sem DOM). Não regista jogadores: só o que o Narrador tem de ler e lembrar.
import { papel } from '../data/roles.js';
import { VOTACOES } from '../data/regras.js';
import { copias, inimigos, ordemDaNoite } from './preparar.js';

/** Poderes que só se usam uma vez por jogo: o Narrador marca a noite em que foram usados. */
export const PODERES_UNICOS = {
  'elias-salvar': { papel: 'elias', nome: 'Elias salvou a vítima' },
  'elias-fogo': { papel: 'elias', nome: 'Elias fez descer fogo' },
  'eliseu-salvar': { papel: 'eliseu', nome: 'Eliseu salvou a vítima' },
  'eliseu-eliminar': { papel: 'eliseu', nome: 'Eliseu eliminou alguém' },
  zadoque: { papel: 'zadoque', nome: 'Zadoque abençoou alguém' },
  calebe: { papel: 'calebe', nome: 'Calebe espiou' },
  trombeteiro: { papel: 'trombeteiro', nome: 'O Trombeteiro tocou o shofar' },
};

/**
 * Acontecimentos que mudam o guião. O Narrador marca-os de dia (depois de anunciar as mortes).
 * `noite: true` = só afetam a noite seguinte.
 */
export const ACONTECIMENTOS = {
  isaiasMorto: { papel: 'isaias', precisa: 'jeremias', nome: 'O Profeta Isaías morreu', efeito: 'Jeremias passa a acordar.' },
  danielMorto: { papel: 'daniel', nome: 'Daniel foi morto pelos Filisteus esta noite', efeito: 'Na próxima noite, os Filisteus não atacam.', noite: true },
  goliasMorto: { papel: 'golias', nome: 'Golias morreu hoje ou esta noite', efeito: 'Na próxima noite, os Filisteus escolhem duas vítimas.', noite: true },
  acaConvertido: { papel: 'aca', nome: 'Acã foi atacado pelos Filisteus', efeito: 'Passa a ser Filisteu e acorda com eles.' },
};

/** Ids das personagens do baralho (o Manto incluído). */
export const papeisDoBaralho = (b) => Object.keys(b?.cartas ?? {}).filter((id) => copias(b, id) > 0 && papel(id));

const tem = (ids, id) => ids.includes(id);
/** Quem acorda no passo dos Filisteus. */
const FILISTEUS_DA_NOITE = ['filisteu', 'golias', 'absalao'];
const ordinal = (n) => `${n}.ª`;

/** Lista de preparação antes da 1.ª noite. */
export function preparacao(b, votacao = 'apontar') {
  const ids = papeisDoBaralho(b);
  const cartas = Object.entries(b.cartas).filter(([id]) => id !== 'manto').reduce((s, [, n]) => s + n, 0);
  const passos = [
    `Junta as ${cartas} cartas do baralho, baralha-as e dá uma, virada para baixo, a cada um dos ${b.jogadores} jogadores.`,
    'Cada jogador vê a sua carta em segredo e volta a pousá-la virada para baixo.',
    `Explica a votação: ${VOTACOES[votacao].resumo}`,
    'Explica as regras: de noite todos fecham os olhos; quem morre revela a carta e deixa de falar.',
  ];
  if (tem(ids, 'joas')) passos.splice(1, 0, 'Joás: antes de dar as cartas, separa uma ao acaso e guarda-a. Dá a esse jogador uma carta de Israelita; na 3.ª noite mostras-lhe a carta guardada.');
  if (tem(ids, 'manto')) passos.push('Manto do Profeta: na 1.ª noite vais tocar no ombro de um jogador ao acaso, que fica com o Manto além da sua carta.');
  if (tem(ids, 'baruque')) passos.push('Baruque morre na 1.ª noite: anuncia-o na primeira manhã. Ele continua a deixar uma letra por noite.');
  if (tem(ids, 'matusalem')) {
    const n = inimigos(b) + 1;
    passos.push(`Matusalém morre de velhice na ${ordinal(n)} noite (inimigos em jogo + 1). Se morrerem inimigos, a contagem encurta.`);
  }
  if (tem(ids, 'nabal') && votacao === 'apontar') passos.push('Nabal não tem efeito com a votação a apontar: diz-lhe que joga como Israelita.');
  return passos;
}

/**
 * Passos da noite n.º `noite`, só com as personagens do baralho.
 * @param {{cartas:object}} b
 * @param {number} noite
 * @param {{acontecimentos?:object, usados?:object}} estado
 * @returns {{chave:string, titulo:string, equipa:string, texto:string, notas:string[], estado:'normal'|'espera'|'usado'}[]}
 */
export function passosDaNoite(b, noite, { acontecimentos = {}, usados = {} } = {}) {
  const ids = papeisDoBaralho(b);
  const ac = (k) => acontecimentos[k] === true || acontecimentos[k] === noite;
  const passos = [{
    chave: 'adormecer', titulo: 'A cidade adormece', equipa: null, estado: 'normal', notas: [],
    texto: noite === 1
      ? 'Cai a primeira noite sobre Jerusalém. Todos fecham os olhos. Cidade, adormece.'
      : `Cai a ${ordinal(noite)} noite. Todos fecham os olhos. Cidade, adormece.`,
  }];

  for (const grupo of ordemDaNoite(ids)) {
    const [p] = grupo;
    const passo = { chave: p.id, titulo: p.nome, equipa: p.equipa, texto: p.guiaoNoite ?? '', notas: [], estado: 'normal' };
    const chave = grupo.some((r) => FILISTEUS_DA_NOITE.includes(r.id)) ? 'filisteu' : p.id;
    if (chave === 'filisteu') Object.assign(passo, { chave, texto: papel('filisteu').guiaoNoite });

    switch (chave) {
      case 'construtor': case 'noemi': case 'dalila': case 'barrabas': case 'jaco':
        if (noite !== 1) continue;
        break;
      case 'joas':
        if (noite !== 3) continue;
        break;
      case 'jeremias':
        if (!tem(ids, 'isaias') || ac('isaiasMorto')) {
          if (tem(ids, 'isaias')) passo.notas.push('Isaías morreu: na primeira noite toca-lhe no ombro para o avisar.');
        } else {
          passo.estado = 'espera';
          passo.notas.push('Só acorda depois de Isaías morrer. Marca a morte de Isaías nos acontecimentos.');
        }
        break;
      case 'filisteu': {
        const juntos = grupo.filter((r) => r.id !== 'filisteu').map((r) => r.nome);
        passo.titulo = 'Filisteus';
        if (juntos.length) passo.notas.push(`${juntos.join(' e ')} acorda${juntos.length > 1 ? 'm' : ''} com os Filisteus.`);
        if (noite === 1) {
          passo.texto = 'Filisteus, acordem e olhem uns para os outros. Esta noite não há vítima. Filisteus, adormeçam.';
          passo.notas.push('Na 1.ª noite os Filisteus apenas se reconhecem.');
        }
        if (ac('danielMorto')) {
          passo.texto = 'Filisteus, acordem. As vossas bocas estão fechadas: esta noite não atacam ninguém. Filisteus, adormeçam.';
          passo.notas.push('Daniel morreu às mãos dos Filisteus: esta noite não há vítima.');
        } else if (ac('goliasMorto') && noite > 1) {
          passo.texto = 'Filisteus, acordem. A fúria por Golias move-vos: escolham juntos duas vítimas e apontem para elas. Filisteus, adormeçam.';
          passo.notas.push('Golias morreu: esta noite há duas vítimas.');
        }
        if (tem(ids, 'aca') && ac('acaConvertido')) passo.notas.push('Acã acorda agora com os Filisteus.');
        if (tem(ids, 'caldeu')) passo.notas.push('Os Filisteus não podem matar um Caldeu: se apontarem para um, ninguém morre.');
        break;
      }
      case 'caldeu':
        passo.titulo = 'Caldeus';
        if (noite === 1) passo.notas.push('Na 1.ª noite, os Caldeus reconhecem-se e escolhem já a primeira vítima.');
        break;
      case 'elias': case 'eliseu': {
        const [salvar, outro] = p.id === 'elias' ? ['elias-salvar', 'elias-fogo'] : ['eliseu-salvar', 'eliseu-eliminar'];
        const feitos = [salvar, outro].filter((k) => usados[k] != null && usados[k] < noite);
        if (feitos.includes(salvar)) passo.notas.push('Já salvou uma vítima: não pode voltar a salvar.');
        if (feitos.includes(outro)) passo.notas.push(p.id === 'elias' ? 'Já fez descer fogo: não pode voltar a fazê-lo.' : 'Já eliminou alguém: não pode voltar a fazê-lo.');
        if (feitos.length === 2) { passo.estado = 'usado'; passo.notas.push('Já usou os dois poderes: chama-o na mesma, para não dar pistas.'); }
        passo.notas.push('Mostra-lhe a vítima dos inimigos antes de perguntar.');
        break;
      }
      case 'zadoque': case 'calebe': case 'trombeteiro':
        if (usados[p.id] != null && usados[p.id] < noite) {
          passo.estado = 'usado';
          passo.notas.push('Já usou o poder: chama-o na mesma, para não dar pistas.');
        }
        break;
      case 'benaia':
        if (noite > 1) passo.notas.push('Não pode proteger o mesmo jogador da noite passada.');
        break;
      case 'debora':
        if (noite > 1) passo.notas.push('Não pode expulsar o mesmo jogador da noite passada.');
        break;
      case 'ezequias':
        passo.notas.push('Cada jogador só pode ser silenciado uma vez.');
        break;
      case 'baruque':
        if (noite === 1) passo.notas.push('Baruque morre esta noite: anuncia-o de manhã.');
        break;
      case 'manto':
        if (noite === 1) {
          passo.titulo = 'Manto do Profeta';
          passo.texto = '(Toca no ombro de um jogador ao acaso: fica com o Manto do Profeta até ao fim da próxima noite.)';
        } else {
          passo.notas.push('Regra da casa: não pode devolver o Manto a quem lho deu.');
        }
        break;
      default:
        if (!p.guiaoNoite) continue;
    }
    if (!passo.texto) continue;
    passos.push(passo);
  }
  return passos;
}

/** Lembretes que só valem se a personagem estiver no baralho. */
const AMANHECER = [
  ['baruque', (n) => (n === 1 ? 'Baruque morreu esta noite: anuncia a morte e revela a carta.' : 'Lê a letra de Baruque: "Entre os papéis de Baruque encontrou-se mais uma letra: …"')],
  ['eleazar', () => 'Eleazar atacado pelos Filisteus só morre na noite seguinte: anuncia-o um dia mais tarde.'],
  ['matusalem', () => 'Matusalém: confirma se é esta a noite em que morre de velhice (inimigos vivos + 1).'],
  ['sansao', () => 'Se Sansão morreu, aponta já para quem morre com ele.'],
  ['noemi', () => 'Se morreu um Aliado de Noemi, o outro morre de desgosto.'],
  ['jaco', () => 'Se morreu o escolhido de Jacó, toca no ombro de Jacó e mostra-lhe a nova carta (na próxima noite).'],
  ['zadoque', () => 'Quem tinha a bênção de Zadoque sobreviveu a um ataque? Perde a bênção.'],
  ['daniel', () => 'Se Daniel foi morto pelos Filisteus, marca-o nos acontecimentos.'],
  ['golias', () => 'Se Golias morreu, marca-o nos acontecimentos.'],
  ['aca', () => 'Se Acã foi atacado pelos Filisteus, não morre: marca-o nos acontecimentos.'],
  ['isaias', (n, ids) => (tem(ids, 'jeremias') ? 'Se Isaías morreu, marca-o nos acontecimentos: Jeremias passa a acordar.' : null)],
  ['debora', () => 'Anuncia quem foi expulso pela Juíza Débora: hoje não fala, não vota e não pode ser acusado.'],
  ['ezequias', () => 'Anuncia quem foi silenciado pelo Rei Ezequias: hoje pode votar, mas não falar.'],
  ['hananias', () => 'Hananias ganha se todos os vivos forem seus seguidores: confirma se aconteceu.'],
  ['manto', () => 'Quem tem o Manto não pode morrer: se foi atacado, sobrevive.'],
];

const EXECUCAO = [
  ['ester', 'Antes de executar, pergunta: "Alguém se oferece em lugar do condenado?" (Rainha Ester).'],
  ['jonatas', 'Se o condenado for o Príncipe Jónatas, revela a carta e sobrevive (uma vez).'],
  ['manto', 'Se o condenado tiver o Manto, revela-o e sobrevive.'],
  ['zadoque', 'Se o condenado tiver a bênção de Zadoque, sobrevive e perde a bênção.'],
  ['jonas', 'Se for executado Jonas, ele ganha.'],
  ['sansao', 'Se for executado Sansão, aponta já para quem morre com ele.'],
];

/** Condições de vitória das equipas e independentes do baralho. */
export function vitorias(b) {
  const ids = papeisDoBaralho(b);
  const out = [];
  const equipas = new Set(ids.map((id) => papel(id).equipa));
  if (equipas.has('jerusalem') || equipas.has('flutuante')) out.push({ equipa: 'jerusalem', texto: 'Jerusalém vence quando todos os inimigos tiverem sido expulsos ou mortos.' });
  if (equipas.has('filisteus')) {
    const naoContam = ['dalila', 'espia'].filter((id) => tem(ids, id)).map((id) => papel(id).nome);
    const nota = naoContam.length ? ` (${naoContam.join(' e ')} não conta${naoContam.length > 1 ? 'm' : ''})` : '';
    out.push({ equipa: 'filisteus', texto: `Os Filisteus vencem quando forem tantos como os restantes jogadores vivos${nota}.` });
  }
  if (equipas.has('babilonios')) out.push({ equipa: 'babilonios', texto: 'Os Caldeus vencem quando forem os únicos inimigos e igualarem os restantes.' });
  for (const id of ['absalao', 'hananias', 'jonas', 'barrabas']) {
    if (tem(ids, id)) out.push({ equipa: 'independentes', texto: `${papel(id).nome}: ${papel(id).habilidade}` });
  }
  if (tem(ids, 'noemi')) out.push({ equipa: 'jerusalem', texto: 'Aliados de Noemi de equipas inimigas vencem só se forem os dois últimos sobreviventes.' });
  return out;
}

/**
 * O dia n.º `dia` (depois da noite com o mesmo número): amanhecer, discussão, votação, execução e vitória.
 */
export function passosDoDia(b, dia, { votacao = 'apontar', usados = {} } = {}) {
  const ids = papeisDoBaralho(b);
  const v = VOTACOES[votacao] ?? VOTACOES.apontar;
  const amanhecer = [
    'Cidade, acorda! Todos abrem os olhos.',
    'Anuncia quem morreu esta noite (ou que ninguém morreu). Cada morto revela a sua carta e deixa de falar.',
    ...AMANHECER.filter(([id]) => tem(ids, id)).map(([, f]) => f(dia, ids)).filter(Boolean),
  ];
  const votoPapeis = v.papeis.filter((t) => ids.some((id) => t.startsWith(papel(id).nome)));
  const duas = usados.trombeteiro === dia;
  const execucao = [
    duas ? 'O shofar tocou: hoje há duas execuções. Depois da primeira, faz-se uma segunda votação.' : null,
    ...EXECUCAO.filter(([id]) => tem(ids, id)).map(([, t]) => t),
    'O condenado revela a sua carta.',
    'Verifica se alguém venceu. Se não, anoitece.',
  ].filter(Boolean);
  return [
    { chave: 'amanhecer', titulo: 'Amanhecer', itens: amanhecer },
    { chave: 'discussao', titulo: 'Discussão', itens: ['A cidade discute quem pode ser o inimigo. Quem morreu não fala.', 'Quando a discussão esmorecer, passa à votação.'] },
    { chave: 'votacao', titulo: v.nome, itens: [...v.passos, ...votoPapeis] },
    { chave: 'execucao', titulo: duas ? 'Execuções' : 'Execução', itens: execucao },
  ];
}
