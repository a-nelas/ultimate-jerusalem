// Cenários prontos de "Ultimate Jerusalém" (criados para este projeto).
// Cada cenário adapta-se ao n.º de jogadores: as personagens só entram a partir do n.º
// recomendado (recomendado.aPartirDe em roles.js), o resto completa-se com Israelitas
// e a reserva serve para acertar o equilíbrio.
//   inimigos(n, rec): os inimigos que matam de noite, com rec = n.º recomendado para n jogadores
//   papeis:  personagens do cenário (entram se o n.º de jogadores chegar)
//   reserva: personagens que podem entrar para equilibrar

export const CENARIOS = [
  {
    id: 'primeira',
    nome: 'Primeira Partida',
    descricao: 'Para quem nunca jogou: só o Profeta Isaías, Filisteus escondidos e o povo de Jerusalém.',
    min: 5, max: 10,
    inimigos: (n, rec) => ({ filisteu: rec }),
    papeis: ['isaias'],
    reserva: ['benaia', 'sansao', 'david'],
  },
  {
    id: 'vigilia',
    nome: 'A Cidade em Vigília',
    descricao: 'Muitos profetas e juízes: a cidade sabe mais, mas os Filisteus também têm olhos.',
    min: 8, max: 15,
    inimigos: (n, rec) => ({ filisteu: rec }),
    papeis: ['isaias', 'jeremias', 'elias', 'benaia', 'debora', 'espia'],
    reserva: ['daniel', 'david', 'rute', 'sansao'],
  },
  {
    id: 'gate',
    nome: 'O Cerco de Gate',
    descricao: 'Golias marcha com os Filisteus e o Espia vigia o templo. Os valentes de David defendem as muralhas.',
    min: 12, max: 20,
    inimigos: (n, rec) => (n >= 15 ? { golias: 1, filisteu: rec - 1 } : { filisteu: rec }),
    papeis: ['isaias', 'benaia', 'sansao', 'eleazar', 'jonatas', 'espia'],
    reserva: ['dalila', 'david', 'elias', 'daniel', 'salomao', 'zadoque', 'rute'],
  },
  {
    id: 'babilonia',
    nome: 'Babilónia às Portas',
    descricao: 'Para grupos grandes: os Caldeus de Nabucodonosor são uma terceira fação, inimiga de todos.',
    min: 20, max: 30,
    inimigos: (n, rec) => ({ caldeu: n >= 26 ? 3 : 2, filisteu: rec - (n >= 26 ? 3 : 2) }),
    papeis: ['isaias', 'jeremias', 'daniel', 'elias', 'zadoque', 'salomao', 'benaia', 'espia'],
    reserva: ['david', 'debora', 'jonatas', 'sansao', 'dalila', 'rute', 'abigail', 'calebe'],
  },
  {
    id: 'traicao',
    nome: 'Fé e Traição',
    descricao: 'Ninguém está seguro do seu lado: Jacó toma o lugar de outro, Acã pode mudar de lado e o Manto passa de mão em mão.',
    min: 15, max: 24,
    inimigos: (n, rec) => ({ filisteu: rec }),
    papeis: ['isaias', 'jaco', 'aca', 'manto', 'noemi', 'benaia', 'elias'],
    reserva: ['david', 'sansao', 'daniel', 'jonatas', 'rute', 'abigail', 'ester'],
  },
];

export const cenario = (id) => CENARIOS.find((c) => c.id === id);
