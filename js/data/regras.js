// Regras da casa de "Ultimate Jerusalém" usadas por defeito.
// A votação a apontar é a escolhida pelo grupo; a votação clássica fica como alternativa.

export const VOTACAO_PADRAO = 'apontar';

export const VOTACOES = {
  apontar: {
    nome: 'Votação a apontar',
    resumo: 'Todos apontam ao mesmo tempo; quem tiver mais votos é condenado.',
    passos: [
      'Terminada a discussão, o Narrador diz: "Um, dois, três… apontem!"',
      'Ao mesmo tempo, cada jogador vivo aponta para um jogador, ou para o céu, se não quiser acusar ninguém (abstenção).',
      'O Narrador conta os votos. O voto do Rei David conta a dobrar, sem o anunciar.',
      'Quem tiver mais votos é condenado. Antes da execução, Ester pode oferecer-se para morrer no seu lugar.',
      'Empate: nova votação só entre os empatados (os outros apontam para um deles ou para o céu). Se voltar a haver empate, ninguém é executado nesse dia.',
      'Se ninguém tiver votos (todos apontam para o céu), ninguém é executado.',
    ],
    papeis: [
      'Rei David: o seu voto conta como dois.',
      'Abigail: aponta para qualquer jogador exceto o mais votado ou para o céu / vota sempre com o polegar para cima (não recomendado para jogar: apontar).',
      'Nabal: aponta sempre para o jogador mais votado / vota sempre com o polegar para baixo (não recomendado para jogar: apontar).',
      'Rei Ezequias: o jogador silenciado não fala, mas aponta.',
      'Juíza Débora: o jogador expulso não vota nem recebe votos.',
      'Jónatas: se for o mais votado, revela a carta e sobrevive.',
      'Trombeteiro: no dia a seguir ao toque do shofar, faz-se uma segunda votação depois da primeira execução.',
      'Manto: o portador condenado revela o Manto e sobrevive.',
    ],
  },
  polegar: {
    nome: 'Votação clássica (polegar)',
    resumo: 'Um jogador é acusado e apoiado; todos votam com o polegar se ele é executado.',
    passos: [
      'Um jogador acusa outro; se alguém apoiar a acusação, o acusado defende-se.',
      'Ao "três", todos votam: polegar para baixo executa, polegar para cima poupa.',
      'Se mais de metade dos vivos votar a executar, o acusado é condenado.',
    ],
    papeis: [
      'Rei David: o seu voto conta como dois.',
      'Abigail: vota sempre a poupar.',
      'Nabal: vota sempre a executar.',
    ],
  },
};
