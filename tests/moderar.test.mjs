import { test } from 'node:test';
import assert from 'node:assert/strict';
import { passosDaNoite, passosDoDia, preparacao, vitorias, papeisDoBaralho } from '../js/engine/moderar.js';
import { sugerirAleatoria, MIN_JOGADORES, MAX_JOGADORES } from '../js/engine/preparar.js';

const chaves = (b, n, e) => passosDaNoite(b, n, e).map((p) => p.chave);
const base = { jogadores: 12, cartas: { filisteu: 2, golias: 1, isaias: 1, jeremias: 1, construtor: 2, noemi: 1, elias: 1, joas: 1, manto: 1, israelita: 3 } };

test('a noite só chama quem está no baralho e quando deve acordar', () => {
  const n1 = chaves(base, 1);
  assert.equal(n1[0], 'adormecer');
  assert.ok(n1.includes('construtor') && n1.includes('noemi'), 'só na 1.ª noite');
  assert.ok(!n1.includes('joas'), 'Joás só na 3.ª noite');
  assert.equal(n1.at(-1), 'manto', 'o Manto é sempre o último');
  assert.ok(!n1.includes('golias'), 'Golias acorda com os Filisteus');
  assert.ok(!n1.includes('benaia'), 'quem não está no baralho não acorda');
  const n2 = chaves(base, 2);
  assert.ok(!n2.includes('construtor') && !n2.includes('noemi'));
  assert.ok(chaves(base, 3).includes('joas'));
  // ordem: Noemi (6) < Construtores (8) < Filisteus (40) < Elias (60) < Isaías (70)
  const ordem = ['noemi', 'construtor', 'filisteu', 'elias', 'isaias'].map((k) => n1.indexOf(k));
  assert.deepEqual([...ordem].sort((a, b) => a - b), ordem);
});

test('os Filisteus: reconhecimento, Daniel e Golias', () => {
  const fil = (n, e) => passosDaNoite(base, n, e).find((p) => p.chave === 'filisteu');
  assert.match(fil(1).texto, /não há vítima/);
  assert.match(fil(1).notas.join(' '), /Golias acorda com os Filisteus/);
  assert.match(fil(2).texto, /vítima desta noite/);
  assert.match(fil(3, { acontecimentos: { goliasMorto: 3 } }).texto, /duas vítimas/);
  assert.match(fil(3, { acontecimentos: { danielMorto: 3 } }).texto, /não atacam/);
  assert.match(fil(4, { acontecimentos: { danielMorto: 3 } }).texto, /vítima desta noite/, 'só a noite seguinte');
  // Golias sem Filisteus simples continua a ter o passo
  assert.ok(chaves({ jogadores: 8, cartas: { golias: 1, isaias: 1, israelita: 6 } }, 2).includes('filisteu'));
});

test('Jeremias espera por Isaías e os poderes únicos ficam marcados', () => {
  const jer = (e) => passosDaNoite(base, 2, e).find((p) => p.chave === 'jeremias');
  assert.equal(jer().estado, 'espera');
  assert.equal(jer({ acontecimentos: { isaiasMorto: true } }).estado, 'normal');
  const eli = (n, usados) => passosDaNoite(base, n, { usados }).find((p) => p.chave === 'elias');
  assert.equal(eli(2, { 'elias-salvar': 1 }).estado, 'normal');
  assert.match(eli(2, { 'elias-salvar': 1 }).notas.join(' '), /não pode voltar a salvar/);
  assert.equal(eli(3, { 'elias-salvar': 1, 'elias-fogo': 2 }).estado, 'usado');
  assert.equal(eli(2, { 'elias-salvar': 2 }).notas.join(' ').includes('não pode voltar'), false, 'na própria noite ainda conta como disponível');
});

test('o dia junta lembretes, votação e execução do baralho', () => {
  const b = { jogadores: 10, cartas: { filisteu: 2, isaias: 1, david: 1, ester: 1, trombeteiro: 1, israelita: 4 } };
  const dia = passosDoDia(b, 2, { usados: { trombeteiro: 2 } });
  assert.deepEqual(dia.map((s) => s.chave), ['amanhecer', 'discussao', 'votacao', 'execucao']);
  const txt = (k) => dia.find((s) => s.chave === k).itens.join(' ');
  assert.match(txt('votacao'), /Rei David/);
  assert.doesNotMatch(txt('votacao'), /Abigail/);
  assert.match(txt('execucao'), /duas execuções/);
  assert.match(txt('execucao'), /Alguém se oferece/);
  assert.doesNotMatch(passosDoDia(b, 3, { usados: { trombeteiro: 2 } }).at(-1).itens.join(' '), /duas execuções/);
  assert.match(passosDoDia(b, 1, { votacao: 'polegar' })[2].titulo, /clássica/);
});

test('preparação e vitórias', () => {
  const prep = preparacao({ jogadores: 12, cartas: { filisteu: 3, matusalem: 1, joas: 1, manto: 1, israelita: 8 } }).join(' ');
  assert.match(prep, /13 cartas/);
  assert.match(prep, /4\.ª noite/);
  assert.match(prep, /Joás/);
  assert.match(prep, /Manto/);
  const v = vitorias({ jogadores: 20, cartas: { filisteu: 3, caldeu: 2, jonas: 1, israelita: 14 } }).map((x) => x.equipa);
  assert.deepEqual(v, ['jerusalem', 'filisteus', 'babilonios', 'independentes']);
});

test('qualquer baralho sugerido dá um guião sem passos vazios', () => {
  for (let n = MIN_JOGADORES; n <= MAX_JOGADORES; n++) {
    for (let s = 1; s <= 5; s++) {
      const b = sugerirAleatoria(n, s);
      assert.ok(papeisDoBaralho(b).length > 0);
      for (let noite = 1; noite <= 4; noite++) {
        for (const p of passosDaNoite(b, noite)) assert.ok(p.texto && p.titulo, `${n}/${s} noite ${noite}: ${p.chave}`);
      }
      for (const sec of passosDoDia(b, 1)) assert.ok(sec.itens.length > 0);
    }
  }
});
