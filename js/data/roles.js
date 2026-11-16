// Fonte única de verdade dos papéis de "Ultimate Jerusalém".
// Mecânicas: Ultimate Werewolf — Ultimate Edition (Bézier Games), re-tematizadas.
// `valor` = número de equilíbrio impresso no canto da carta original
//   (positivo ajuda Jerusalém, negativo ajuda os inimigos).
// `verificar: true` = valor ainda não confirmado numa carta impressa.

/** Equipas e respetivas cores (usadas na grelha e nas cartas). */
export const EQUIPAS = {
  jerusalem:     { nome: 'Jerusalém',     cor: '#2f5d8a', descricao: 'Os habitantes e defensores da Cidade Santa. Vencem quando todos os inimigos forem descobertos.' },
  filisteus:     { nome: 'Filisteus',     cor: '#a3352b', descricao: 'Infiltrados de Gate e Gaza. Vencem quando igualam em número os restantes jogadores.' },
  babilonios:    { nome: 'Babilónios',    cor: '#6b3fa0', descricao: 'Agentes caldeus de Nabucodonosor. Inimigos tanto de Jerusalém como dos Filisteus.' },
  independentes: { nome: 'Independentes', cor: '#6b6b6b', descricao: 'Jogam sozinhos, com uma condição de vitória própria.' },
  flutuante:     { nome: 'Flutuante',     cor: '#2c7a7b', descricao: 'Começam numa equipa, mas podem mudar durante o jogo.' },
  objeto:        { nome: 'Objeto',        cor: '#9a7b2f', descricao: 'Não é um papel: é um objeto passado entre jogadores.' },
};

/** Quando o papel acorda. */
export const ACORDA = {
  nunca: 'Nunca',
  '1noite': 'Só na 1.ª noite',
  todas: 'Todas as noites',
  condicional: 'Quando ativado',
};

/** Tipo de poder (para filtrar a grelha). */
export const TIPOS = {
  info: 'Informação',
  proteger: 'Proteção',
  matar: 'Eliminação',
  manipular: 'Manipulação',
  passivo: 'Passivo',
  nenhum: 'Sem poder',
};

/**
 * @typedef {Object} Papel
 * @property {string} id            identificador estável (nome do ficheiro da imagem)
 * @property {string} nome          nome na carta
 * @property {string} personagem    subtítulo / figura bíblica
 * @property {string} refBiblica
 * @property {keyof EQUIPAS} equipa
 * @property {number} valor
 * @property {boolean} [verificar]
 * @property {keyof ACORDA} acorda
 * @property {number|null} ordemNoite  posição no guião da noite (menor = primeiro)
 * @property {(keyof TIPOS)[]} tipo
 * @property {{min:number,max:number,aPartirDe:number}} recomendado
 *           min/max cópias quando incluído; aPartirDe = n.º de jogadores a partir do qual se recomenda
 * @property {'filisteu'|'nao'} profetaVe   resposta que Isaías recebe
 * @property {string} habilidade    texto curto da carta
 * @property {string|null} guiaoNoite  texto para o Cronista ler em voz alta
 * @property {string} notaModerador
 * @property {string} original      nome original em Ultimate Werewolf
 */

/** @type {Papel[]} */
export const ROLES = [
  // ───────────────────────── JERUSALÉM ─────────────────────────
  {
    id: 'habitante', nome: 'Habitante de Jerusalém', personagem: 'Povo da Cidade Santa', refBiblica: 'Salmo 122:6',
    equipa: 'jerusalem', valor: 1, acorda: 'nunca', ordemNoite: null, tipo: ['nenhum'],
    recomendado: { min: 2, max: 20, aPartirDe: 5 }, profetaVe: 'nao',
    habilidade: 'Não tens poder especial. Usa a tua sabedoria para descobrir os inimigos escondidos na cidade.',
    guiaoNoite: null,
    notaModerador: 'Inclui sempre alguns Habitantes: completam o baralho e servem para afinar o equilíbrio.',
    original: 'Villager',
  },
  {
    id: 'isaias', nome: 'Profeta Isaías', personagem: 'O Vidente de Jerusalém', refBiblica: 'Isaías 6:8',
    equipa: 'jerusalem', valor: 7, acorda: 'todas', ordemNoite: 70, tipo: ['info'],
    recomendado: { min: 1, max: 1, aPartirDe: 5 }, profetaVe: 'nao',
    habilidade: 'Todas as noites, aponta para um jogador. O Cronista revela-te se esse jogador é Filisteu.',
    guiaoNoite: 'Profeta Isaías, acorda. Aponta para um jogador sobre quem queres receber uma visão. (Polegar para cima: é Filisteu. Abanar a cabeça: não é.) Profeta Isaías, adormece.',
    notaModerador: 'Papel mais forte de Jerusalém — inclui-o em quase todas as partidas. Rute aparece como Filisteu; Dalila e o Espia aparecem como não-Filisteus.',
    original: 'Seer',
  },
  {
    id: 'jeremias', nome: 'Profeta Jeremias', personagem: 'O Aprendiz do Profeta', refBiblica: 'Jeremias 1:5',
    equipa: 'jerusalem', valor: 4, acorda: 'condicional', ordemNoite: 71, tipo: ['info'],
    recomendado: { min: 1, max: 1, aPartirDe: 10 }, profetaVe: 'nao',
    habilidade: 'Quando o Profeta Isaías morrer, herdas o seu dom e passas a receber visões todas as noites.',
    guiaoNoite: 'Profeta Jeremias, acorda. Aponta para um jogador sobre quem queres receber uma visão. Profeta Jeremias, adormece.',
    notaModerador: 'Só acorda depois da morte de Isaías. Na noite seguinte, toca-lhe no ombro para o avisar.',
    original: 'Apprentice Seer',
  },
  {
    id: 'elias', nome: 'Profeta Elias', personagem: 'Fogo do Céu e Vida Restaurada', refBiblica: '1 Reis 17:22; 18:38',
    equipa: 'jerusalem', valor: 4, acorda: 'todas', ordemNoite: 60, tipo: ['proteger', 'matar'],
    recomendado: { min: 1, max: 1, aPartirDe: 9 }, profetaVe: 'nao',
    habilidade: 'Uma vez por jogo, podes salvar a vítima da noite. Uma vez por jogo, podes fazer descer fogo sobre um jogador. Podes usar ambos na mesma noite.',
    guiaoNoite: 'Profeta Elias, acorda. Esta é a vítima desta noite (aponta). Queres salvá-la? Queres fazer descer fogo sobre alguém? Profeta Elias, adormece.',
    notaModerador: 'Equivalente à Bruxa. Regista quais dos dois poderes já foram usados.',
    original: 'Witch',
  },
  {
    id: 'eliseu', nome: 'Profeta Eliseu', personagem: 'Porção Dobrada do Espírito', refBiblica: '2 Reis 2:9; 4:35',
    equipa: 'jerusalem', valor: 4, acorda: 'todas', ordemNoite: 61, tipo: ['proteger', 'matar'],
    recomendado: { min: 0, max: 1, aPartirDe: 20 }, profetaVe: 'nao',
    habilidade: 'Tal como Elias: uma vez por jogo salvas a vítima da noite e uma vez por jogo eliminas um jogador.',
    guiaoNoite: 'Profeta Eliseu, acorda. Esta é a vítima desta noite (aponta). Queres salvá-la? Queres eliminar alguém? Profeta Eliseu, adormece.',
    notaModerador: 'Equivalente ao Feiticeiro (Sorcerer). Usa só em aldeias grandes, ao lado de Elias.',
    original: 'Sorcerer',
  },
  {
    id: 'zadoque', nome: 'Sumo Sacerdote Zadoque', personagem: 'A Bênção do Templo', refBiblica: 'Números 6:24',
    equipa: 'jerusalem', valor: 3, acorda: 'todas', ordemNoite: 20, tipo: ['proteger'],
    recomendado: { min: 1, max: 1, aPartirDe: 12 }, profetaVe: 'nao',
    habilidade: 'Uma vez por jogo, abençoa um jogador. Da próxima vez que ele devesse morrer, sobrevive e perde a bênção.',
    guiaoNoite: 'Sumo Sacerdote Zadoque, acorda. Queres abençoar alguém? Aponta para essa pessoa. Sumo Sacerdote, adormece.',
    notaModerador: 'A bênção protege contra qualquer morte (noite ou execução) uma única vez.',
    original: 'Priest',
  },
  {
    id: 'salomao', nome: 'Rei Salomão', personagem: 'O Coração Sábio', refBiblica: '1 Reis 3:9',
    equipa: 'jerusalem', valor: 3, verificar: true, acorda: 'todas', ordemNoite: 80, tipo: ['info'],
    recomendado: { min: 1, max: 1, aPartirDe: 12 }, profetaVe: 'nao',
    habilidade: 'Todas as noites, aponta para um jogador. O Cronista revela-te se esse jogador tem um papel especial.',
    guiaoNoite: 'Rei Salomão, acorda. Aponta para um jogador. (Polegar para cima: tem papel especial. Abanar a cabeça: é Habitante.) Rei Salomão, adormece.',
    notaModerador: 'Equivalente ao Medium. Confirmar o texto exato na carta original.',
    original: 'Medium',
  },
  {
    id: 'calebe', nome: 'Calebe', personagem: 'O Espia de Canaã', refBiblica: 'Números 13:30',
    equipa: 'jerusalem', valor: 3, verificar: true, acorda: 'todas', ordemNoite: 75, tipo: ['info'],
    recomendado: { min: 1, max: 1, aPartirDe: 15 }, profetaVe: 'nao',
    habilidade: 'Uma vez por jogo, aponta para um jogador. Descobres se há um Filisteu entre ele e os seus dois vizinhos.',
    guiaoNoite: 'Calebe, acorda. Queres espiar esta noite? Aponta para um jogador. (Polegar para cima: há um Filisteu entre ele e os vizinhos.) Calebe, adormece.',
    notaModerador: 'Equivalente ao Psychic Detective. Só pode usar o poder uma vez.',
    original: 'Psychic Detective',
  },
  {
    id: 'benaia', nome: 'Benaia', personagem: 'Capitão da Guarda do Rei', refBiblica: '2 Samuel 23:20-23',
    equipa: 'jerusalem', valor: 3, acorda: 'todas', ordemNoite: 30, tipo: ['proteger'],
    recomendado: { min: 1, max: 1, aPartirDe: 8 }, profetaVe: 'nao',
    habilidade: 'Todas as noites, escolhe um jogador para proteger dos ataques. Não podes proteger o mesmo jogador duas noites seguidas.',
    guiaoNoite: 'Benaia, acorda. Aponta para o jogador que queres proteger esta noite. Benaia, adormece.',
    notaModerador: 'Equivalente ao Guarda-costas. Pode proteger-se a si próprio (mas não duas noites seguidas).',
    original: 'Bodyguard',
  },
  {
    id: 'sansao', nome: 'Sansão', personagem: 'A Força do Nazireu', refBiblica: 'Juízes 16:30',
    equipa: 'jerusalem', valor: 3, acorda: 'nunca', ordemNoite: null, tipo: ['matar'],
    recomendado: { min: 1, max: 1, aPartirDe: 8 }, profetaVe: 'nao',
    habilidade: 'Se morreres, de dia ou de noite, apontas imediatamente para um jogador que morre contigo.',
    guiaoNoite: null,
    notaModerador: 'Equivalente ao Caçador. Resolve a sua escolha logo que a morte é anunciada.',
    original: 'Hunter',
  },
  {
    id: 'ester', nome: 'Rainha Ester', personagem: '"Se eu perecer, pereci"', refBiblica: 'Ester 4:16',
    equipa: 'jerusalem', valor: 3, acorda: 'nunca', ordemNoite: null, tipo: ['proteger'],
    recomendado: { min: 1, max: 1, aPartirDe: 15 }, profetaVe: 'nao',
    habilidade: 'Depois de um jogador ser condenado, podes revelar-te e morrer no seu lugar.',
    guiaoNoite: null,
    notaModerador: 'Equivalente ao Mártir. Pergunta "Alguém se oferece em lugar do condenado?" antes de cada execução.',
    original: 'Martyr',
  },
  {
    id: 'eleazar', nome: 'Eleazar', personagem: 'Valente de David', refBiblica: '2 Samuel 23:9-10',
    equipa: 'jerusalem', valor: 3, verificar: true, acorda: 'nunca', ordemNoite: null, tipo: ['passivo'],
    recomendado: { min: 1, max: 1, aPartirDe: 15 }, profetaVe: 'nao',
    habilidade: 'Se fores atacado pelos Filisteus, resistes até ao fim e só morres na noite seguinte.',
    guiaoNoite: null,
    notaModerador: 'Equivalente ao Stalwart. Regista o ataque e anuncia a morte uma noite mais tarde.',
    original: 'Stalwart',
  },
  {
    id: 'jonatas', nome: 'Príncipe Jónatas', personagem: 'Resgatado pelo Povo', refBiblica: '1 Samuel 14:45',
    equipa: 'jerusalem', valor: 3, acorda: 'nunca', ordemNoite: null, tipo: ['passivo'],
    recomendado: { min: 1, max: 1, aPartirDe: 12 }, profetaVe: 'nao',
    habilidade: 'Se fores condenado à execução, revelas a tua carta e sobrevives.',
    guiaoNoite: null,
    notaModerador: 'Equivalente ao Príncipe. Só funciona contra a execução de dia, uma vez (fica revelado).',
    original: 'Prince',
  },
  {
    id: 'daniel', nome: 'Daniel', personagem: 'Na Cova dos Leões', refBiblica: 'Daniel 6:22',
    equipa: 'jerusalem', valor: 3, acorda: 'nunca', ordemNoite: null, tipo: ['passivo'],
    recomendado: { min: 1, max: 1, aPartirDe: 12 }, profetaVe: 'nao',
    habilidade: 'Se fores morto pelos Filisteus, as suas bocas fecham-se: na noite seguinte não atacam ninguém.',
    guiaoNoite: null,
    notaModerador: 'Equivalente ao Doente (Diseased). Na noite seguinte, salta o passo dos Filisteus (acordam, mas não escolhem).',
    original: 'Diseased',
  },
  {
    id: 'david', nome: 'Rei David', personagem: 'O Pastor Ungido', refBiblica: '1 Samuel 16:13',
    equipa: 'jerusalem', valor: 2, acorda: 'nunca', ordemNoite: null, tipo: ['manipular'],
    recomendado: { min: 1, max: 1, aPartirDe: 9 }, profetaVe: 'nao',
    habilidade: 'O teu voto conta a dobrar. O Cronista conta-o em segredo.',
    guiaoNoite: null,
    notaModerador: 'Equivalente ao Presidente (Mayor). Mostra-lhe a carta no início para ele saber; nas votações, conta o voto dele duas vezes.',
    original: 'Mayor',
  },
  {
    id: 'trombeteiro', nome: 'Trombeteiro', personagem: 'O Toque do Shofar', refBiblica: 'Josué 6:20',
    equipa: 'jerusalem', valor: 2, acorda: 'todas', ordemNoite: 105, tipo: ['manipular'],
    recomendado: { min: 1, max: 1, aPartirDe: 15 }, profetaVe: 'nao',
    habilidade: 'Uma vez por jogo, de noite, tocas o shofar: no dia seguinte haverá duas execuções.',
    guiaoNoite: 'Trombeteiro, acorda. Queres tocar o shofar para que amanhã haja duas execuções? Trombeteiro, adormece.',
    notaModerador: 'Equivalente ao Trouble Maker.',
    original: 'Trouble Maker',
  },
  {
    id: 'abel', nome: 'Abel', personagem: '"Depois de morto, ainda fala"', refBiblica: 'Hebreus 11:4',
    equipa: 'jerusalem', valor: 2, acorda: 'todas', ordemNoite: 110, tipo: ['info'],
    recomendado: { min: 1, max: 1, aPartirDe: 15 }, profetaVe: 'nao',
    habilidade: 'Morres na primeira noite. Depois, todas as noites deixas uma única letra como pista para os vivos. Não podes falar de dia.',
    guiaoNoite: 'Abel, acorda. Escreve uma letra como pista para Jerusalém. Abel, adormece.',
    notaModerador: 'Equivalente ao Fantasma. Anuncia a morte de Abel na primeira manhã. As letras não podem formar nomes óbvios de propósito (decisão do Cronista).',
    original: 'Ghost',
  },
  {
    id: 'construtor', nome: 'Construtor de Neemias', personagem: 'Os Reconstrutores do Muro', refBiblica: 'Neemias 4:17',
    equipa: 'jerusalem', valor: 2, acorda: '1noite', ordemNoite: 8, tipo: ['info'],
    recomendado: { min: 2, max: 3, aPartirDe: 12 }, profetaVe: 'nao',
    habilidade: 'Na primeira noite, conheces os outros Construtores. Trabalham juntos para reconstruir o muro.',
    guiaoNoite: 'Construtores de Neemias, acordem e olhem uns para os outros. Construtores, adormeçam.',
    notaModerador: 'Equivalente ao Maçon. Inclui sempre 2 ou 3 — nunca apenas um.',
    original: 'Mason',
  },
  {
    id: 'nabal', nome: 'Nabal', personagem: 'O Insensato', refBiblica: '1 Samuel 25:25',
    equipa: 'jerusalem', valor: 2, verificar: true, acorda: 'nunca', ordemNoite: null, tipo: ['passivo'],
    recomendado: { min: 0, max: 1, aPartirDe: 18 }, profetaVe: 'nao',
    habilidade: 'Votas sempre a favor da execução.',
    guiaoNoite: null,
    notaModerador: 'Equivalente ao Tolo (Fool / Village Idiot).',
    original: 'Fool',
  },
  {
    id: 'debora', nome: 'Juíza Débora', personagem: 'Sob a Palmeira', refBiblica: 'Juízes 4:5',
    equipa: 'jerusalem', valor: 1, acorda: 'todas', ordemNoite: 95, tipo: ['manipular'],
    recomendado: { min: 1, max: 1, aPartirDe: 9 }, profetaVe: 'nao',
    habilidade: 'Todas as noites, escolhe um jogador para ser desterrado: no dia seguinte sai da cidade e não fala nem vota.',
    guiaoNoite: 'Juíza Débora, acorda. Aponta para o jogador que vais desterrar amanhã. Juíza Débora, adormece.',
    notaModerador: 'Equivalente à Velha Bruxa (Old Hag). Não pode escolher o mesmo jogador duas noites seguidas.',
    original: 'Old Hag',
  },
  {
    id: 'gabriel', nome: 'Anjo Gabriel', personagem: 'Mensageiro que emudece', refBiblica: 'Lucas 1:20',
    equipa: 'jerusalem', valor: 1, verificar: true, acorda: 'todas', ordemNoite: 90, tipo: ['manipular'],
    recomendado: { min: 1, max: 1, aPartirDe: 15 }, profetaVe: 'nao',
    habilidade: 'Todas as noites, escolhe um jogador que fica mudo no dia seguinte (pode votar, mas não falar). Cada jogador só pode ser silenciado uma vez.',
    guiaoNoite: 'Anjo Gabriel, acorda. Aponta para o jogador que ficará em silêncio amanhã. Anjo Gabriel, adormece.',
    notaModerador: 'Equivalente à Encantadora (Enchantress).',
    original: 'Enchantress',
  },
  {
    id: 'rute', nome: 'Rute', personagem: 'A Moabita Fiel', refBiblica: 'Rute 1:16',
    equipa: 'jerusalem', valor: -1, acorda: 'nunca', ordemNoite: null, tipo: ['passivo'],
    recomendado: { min: 1, max: 1, aPartirDe: 10 }, profetaVe: 'filisteu',
    habilidade: 'És fiel a Jerusalém, mas como estrangeira o Profeta vê-te como Filisteu.',
    guiaoNoite: null,
    notaModerador: 'Equivalente ao Licantropo (Lycan). Isaías e Jeremias recebem "Filisteu" ao apontar para ela.',
    original: 'Lycan',
  },
  {
    id: 'noemi', nome: 'Noemi', personagem: 'A Casamenteira', refBiblica: 'Rute 3:1',
    equipa: 'jerusalem', valor: -3, acorda: '1noite', ordemNoite: 6, tipo: ['manipular'],
    recomendado: { min: 1, max: 1, aPartirDe: 12 }, profetaVe: 'nao',
    habilidade: 'Na primeira noite, escolhe dois jogadores (podes incluir-te) que ficam unidos numa Aliança: se um morrer, o outro morre de desgosto.',
    guiaoNoite: 'Noemi, acorda. Aponta para os dois jogadores que ficarão unidos em Aliança. Noemi, adormece. (Toca nos dois escolhidos.) Aliados, acordem e olhem um para o outro. Aliados, adormeçam.',
    notaModerador: 'Equivalente ao Cupido. Se os Aliados forem de equipas inimigas, vencem só se forem os dois últimos sobreviventes.',
    original: 'Cupid',
  },
  {
    id: 'matusalem', nome: 'Matusalém', personagem: 'O Ancião', refBiblica: 'Génesis 5:27',
    equipa: 'jerusalem', valor: 0, verificar: true, acorda: 'nunca', ordemNoite: null, tipo: ['passivo'],
    recomendado: { min: 0, max: 1, aPartirDe: 18 }, profetaVe: 'nao',
    habilidade: 'Vives longos dias, mas não para sempre: morres de velhice numa noite determinada pelo número de inimigos.',
    guiaoNoite: null,
    notaModerador: 'Equivalente ao Ancião (Elder). Morre na noite n.º (Filisteus em jogo + 1); a contagem encurta quando os Filisteus morrem.',
    original: 'Elder',
  },
  {
    id: 'abigail', nome: 'Abigail', personagem: 'A Pacificadora', refBiblica: '1 Samuel 25:32-33',
    equipa: 'jerusalem', valor: -2, acorda: 'nunca', ordemNoite: null, tipo: ['passivo'],
    recomendado: { min: 0, max: 1, aPartirDe: 15 }, profetaVe: 'nao',
    habilidade: 'Votas sempre contra a execução.',
    guiaoNoite: null,
    notaModerador: 'Equivalente ao Pacifista.',
    original: 'Pacifist',
  },

  // ───────────────────────── FILISTEUS ─────────────────────────
  {
    id: 'filisteu', nome: 'Guerreiro Filisteu', personagem: 'Infiltrado de Gate', refBiblica: '1 Samuel 13:5',
    equipa: 'filisteus', valor: -6, acorda: 'todas', ordemNoite: 40, tipo: ['matar'],
    recomendado: { min: 1, max: 6, aPartirDe: 5 }, profetaVe: 'filisteu',
    habilidade: 'Todas as noites, os Filisteus escolhem juntos um habitante para eliminar. Vencem quando igualam o número dos restantes.',
    guiaoNoite: 'Filisteus, acordem. Escolham juntos, em silêncio, a vítima desta noite e apontem para ela. Filisteus, adormeçam.',
    notaModerador: 'Equivalente ao Lobisomem. Na 1.ª noite apenas se reconhecem (salvo regra da casa). Têm de concordar numa só vítima.',
    original: 'Werewolf',
  },
  {
    id: 'golias', nome: 'Golias de Gate', personagem: 'O Gigante', refBiblica: '1 Samuel 17:4',
    equipa: 'filisteus', valor: -8, acorda: 'todas', ordemNoite: 40, tipo: ['matar'],
    recomendado: { min: 0, max: 1, aPartirDe: 15 }, profetaVe: 'filisteu',
    habilidade: 'Acordas com os Filisteus. Se morreres, a fúria dos Filisteus faz com que eliminem duas vítimas na noite seguinte.',
    guiaoNoite: null,
    notaModerador: 'Equivalente à Cria de Lobisomem (Wolf Cub). Acorda com os Filisteus — não tem passo próprio.',
    original: 'Wolf Cub',
  },
  {
    id: 'dalila', nome: 'Dalila', personagem: 'A Traidora de Soreque', refBiblica: 'Juízes 16:5',
    equipa: 'filisteus', valor: -6, acorda: '1noite', ordemNoite: 41, tipo: ['info'],
    recomendado: { min: 0, max: 1, aPartirDe: 12 }, profetaVe: 'nao',
    habilidade: 'Ganhas com os Filisteus. Na primeira noite descobres quem eles são, mas eles não sabem quem tu és.',
    guiaoNoite: 'Filisteus, levantem o polegar sem abrir os olhos. Dalila, acorda e vê quem são os Filisteus. Dalila, adormece. Filisteus, baixem o polegar.',
    notaModerador: 'Equivalente ao Lacaio (Minion). Isaías vê-a como não-Filisteu. Não conta como Filisteu para a vitória por números.',
    original: 'Minion',
  },
  {
    id: 'espia', nome: 'Espia Filisteu', personagem: 'Batedor do Templo de Dagom', refBiblica: 'Juízes 16:23',
    equipa: 'filisteus', valor: -3, acorda: 'todas', ordemNoite: 85, tipo: ['info'],
    recomendado: { min: 1, max: 1, aPartirDe: 10 }, profetaVe: 'nao',
    habilidade: 'Ganhas com os Filisteus. Todas as noites, procuras o Profeta: aponta para um jogador e o Cronista revela-te se é ele.',
    guiaoNoite: 'Espia, acorda. Aponta para quem achas que é o Profeta. (Polegar para cima: é o Profeta.) Espia, adormece.',
    notaModerador: 'Equivalente à Feiticeira (Sorceress). Não acorda com os Filisteus e Isaías vê-o como não-Filisteu.',
    original: 'Sorceress',
  },

  // ───────────────────────── BABILÓNIOS ─────────────────────────
  {
    id: 'caldeu', nome: 'Agente Caldeu', personagem: 'Ao Serviço de Nabucodonosor', refBiblica: '2 Reis 25:8-10',
    equipa: 'babilonios', valor: -7, verificar: true, acorda: 'todas', ordemNoite: 50, tipo: ['matar'],
    recomendado: { min: 1, max: 3, aPartirDe: 20 }, profetaVe: 'nao',
    habilidade: 'Todas as noites, os Caldeus escolhem juntos uma vítima. Os Filisteus não te podem matar. Vencem quando forem os únicos inimigos e igualarem os restantes.',
    guiaoNoite: 'Caldeus, acordem. Escolham juntos a vítima desta noite. Caldeus, adormeçam.',
    notaModerador: 'Equivalente ao Vampiro. Valor −8 no livro da Ultimate Edition, −7 em edições posteriores — confirmar.',
    original: 'Vampire',
  },

  // ───────────────────────── INDEPENDENTES ─────────────────────────
  {
    id: 'absalao', nome: 'Absalão', personagem: 'O Filho Rebelde', refBiblica: '2 Samuel 15:10',
    equipa: 'independentes', valor: -5, acorda: 'todas', ordemNoite: 40, tipo: ['matar'],
    recomendado: { min: 0, max: 1, aPartirDe: 11 }, profetaVe: 'filisteu',
    habilidade: 'Acordas e ataca com os Filisteus, mas só ganhas se fores o último sobrevivente (ou com apenas um outro jogador não-Filisteu).',
    guiaoNoite: null,
    notaModerador: 'Equivalente ao Lobo Solitário. Acorda com os Filisteus; Isaías vê-o como Filisteu.',
    original: 'Lone Wolf',
  },
  {
    id: 'hananias', nome: 'Hananias', personagem: 'O Falso Profeta', refBiblica: 'Jeremias 28:15',
    equipa: 'independentes', valor: 1, acorda: 'todas', ordemNoite: 100, tipo: ['manipular'],
    recomendado: { min: 0, max: 1, aPartirDe: 15 }, profetaVe: 'nao',
    habilidade: 'Todas as noites, convences um jogador a seguir-te (o Cronista toca-lhe no ombro). Ganhas se todos os vivos forem teus seguidores.',
    guiaoNoite: 'Hananias, acorda. Aponta para o jogador que queres seduzir com falsas profecias. Hananias, adormece. (Toca no ombro do escolhido.)',
    notaModerador: 'Equivalente ao Líder de Culto. Os seguidores continuam na equipa original; apenas Hananias tem a condição extra de vitória.',
    original: 'Cult Leader',
  },
  {
    id: 'jonas', nome: 'Jonas', personagem: '"Lançai-me ao mar"', refBiblica: 'Jonas 1:12',
    equipa: 'independentes', valor: 1, acorda: 'nunca', ordemNoite: null, tipo: ['passivo'],
    recomendado: { min: 0, max: 1, aPartirDe: 12 }, profetaVe: 'nao',
    habilidade: 'Só ganhas se fores executado pela cidade.',
    guiaoNoite: null,
    notaModerador: 'Equivalente ao Curtidor (Tanner). Se for executado, Jonas ganha (e o jogo pode continuar para os restantes, se o grupo quiser).',
    original: 'Tanner',
  },
  {
    id: 'barrabas', nome: 'Barrabás', personagem: 'O Salteador', refBiblica: 'João 18:40',
    equipa: 'independentes', valor: 0, verificar: true, acorda: '1noite', ordemNoite: 9, tipo: ['manipular'],
    recomendado: { min: 0, max: 1, aPartirDe: 20 }, profetaVe: 'nao',
    habilidade: 'Na primeira noite, escolhe dois jogadores. Ganhas se ambos morrerem e tu continuares vivo.',
    guiaoNoite: 'Barrabás, acorda. Aponta para os dois jogadores que queres ver cair. Barrabás, adormece.',
    notaModerador: 'Equivalente ao Bandido (Bandit).',
    original: 'Bandit',
  },

  // ───────────────────────── FLUTUANTES ─────────────────────────
  {
    id: 'jaco', nome: 'Jacó', personagem: 'O que Tomou o Lugar', refBiblica: 'Génesis 27:19',
    equipa: 'flutuante', valor: -2, acorda: 'condicional', ordemNoite: 5, tipo: ['manipular'],
    recomendado: { min: 0, max: 1, aPartirDe: 15 }, profetaVe: 'nao',
    habilidade: 'Na primeira noite, escolhe um jogador. Quando ele morrer, tomas o seu papel e a sua equipa.',
    guiaoNoite: 'Jacó, acorda. Aponta para o jogador cujo lugar queres tomar quando ele cair. Jacó, adormece.',
    notaModerador: 'Equivalente ao Doppelgänger. Quando o escolhido morre, toca no ombro de Jacó e mostra-lhe a nova carta.',
    original: 'Doppelgänger',
  },
  {
    id: 'aca', nome: 'Acã', personagem: 'O Cobiçoso', refBiblica: 'Josué 7:21',
    equipa: 'flutuante', valor: -3, acorda: 'condicional', ordemNoite: null, tipo: ['passivo'],
    recomendado: { min: 0, max: 1, aPartirDe: 12 }, profetaVe: 'nao',
    habilidade: 'Começas em Jerusalém. Se os Filisteus te atacarem, não morres: passas a ser Filisteu e acordas com eles.',
    guiaoNoite: null,
    notaModerador: 'Equivalente ao Amaldiçoado (Cursed). Depois da conversão, Isaías vê-o como Filisteu.',
    original: 'Cursed',
  },
  {
    id: 'joas', nome: 'Joás', personagem: 'O Rei Escondido', refBiblica: '2 Reis 11:2-3',
    equipa: 'flutuante', valor: -3, acorda: 'condicional', ordemNoite: 115, tipo: ['passivo'],
    recomendado: { min: 0, max: 1, aPartirDe: 18 }, profetaVe: 'nao',
    habilidade: 'Recebes uma carta de Habitante. Na terceira noite, o Cronista revela-te a tua verdadeira identidade.',
    guiaoNoite: 'Joás, acorda. Esta é a tua verdadeira identidade (mostra a carta guardada). Joás, adormece.',
    notaModerador: 'Equivalente ao Bêbado (Drunk). Separa uma carta aleatória do baralho para ele no início.',
    original: 'Drunk',
  },

  // ───────────────────────── OBJETOS / MODERADOR ─────────────────────────
  {
    id: 'manto', nome: 'Manto do Profeta', personagem: 'Passado de mão em mão', refBiblica: '2 Reis 2:13',
    equipa: 'objeto', valor: 1, verificar: true, acorda: 'todas', ordemNoite: 990, tipo: ['proteger'],
    recomendado: { min: 0, max: 1, aPartirDe: 10 }, profetaVe: 'nao',
    habilidade: 'Quem guarda o Manto não pode morrer. No fim de cada noite, tem de o passar a outro jogador.',
    guiaoNoite: 'Portador do Manto, acorda. Aponta para quem vai receber o Manto. Adormece. (Toca no ombro do novo portador.)',
    notaModerador: 'Equivalente ao Amuleto (Charm). Não é um papel: dá-se a um jogador além da sua carta. Chamado sempre em último lugar.',
    original: 'Charm',
  },
  {
    id: 'cronista', nome: 'Cronista', personagem: 'O Narrador das Crónicas', refBiblica: '1 Crónicas 29:29',
    equipa: 'objeto', valor: 0, acorda: 'nunca', ordemNoite: null, tipo: ['nenhum'],
    recomendado: { min: 0, max: 0, aPartirDe: 5 }, profetaVe: 'nao',
    habilidade: 'Conduzes o jogo: chamas os papéis de noite e orientas as votações de dia. Não jogas.',
    guiaoNoite: null,
    notaModerador: 'Carta do moderador. Não entra no baralho dos jogadores.',
    original: 'Moderator',
  },
];

/** Procura um papel pelo id. */
export const papel = (id) => ROLES.find((r) => r.id === id);

/** N.º recomendado de inimigos (Filisteus + Golias + Caldeus + Absalão) por n.º de jogadores.
 *  6–15: livro de regras; restantes: extrapolado (~1 por 5 jogadores). */
export function inimigosRecomendados(jogadores) {
  if (jogadores <= 8) return 1;
  if (jogadores <= 11) return 2;
  if (jogadores <= 15) return 3;
  if (jogadores <= 21) return 4;
  if (jogadores <= 26) return 5;
  return 6;
}
