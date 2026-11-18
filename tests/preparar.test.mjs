import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  MIN_JOGADORES, MAX_JOGADORES, maxCopias, contarCartas, cartasNecessarias, equilibrio, inimigos, avisos,
  classificar, sugerirSimples, sugerirAleatoria, aplicarCenario, ordemDaNoite, codificar, descodificar,
} from '../js/engine/preparar.js';
import { CENARIOS } from '../js/data/cenarios.js';
import { inimigosRecomendados, ROLES } from '../js/data/roles.js';

const erros = (b) => avisos(b).filter((a) => a.nivel === 'erro');
// Com 5 jogadores só há Israelitas, Isaías e Filisteus disponíveis: o melhor possível é +4.
const tolerancia = (n) => (n === 5 ? 4 : 2);

function baralhoValido(b, rotulo) {
  assert.equal(contarCartas(b), cartasNecessarias(b), `${rotulo}: n.º de cartas`);
  assert.deepEqual(erros(b), [], `${rotulo}: erros`);
  assert.ok(Math.abs(equilibrio(b)) <= tolerancia(b.jogadores), `${rotulo}: equilíbrio ${equilibrio(b)}`);
  for (const [id, n] of Object.entries(b.cartas)) assert.ok(n <= maxCopias(id), `${rotulo}: ${id}×${n}`);
  assert.equal(avisos(b).filter((a) => a.nivel === 'aviso').length, 0, `${rotulo}: ${avisos(b).map((a) => a.texto)}`);
}

test('a sugestão simples é válida, equilibrada e sempre igual', () => {
  for (let n = MIN_JOGADORES; n <= MAX_JOGADORES; n++) {
    const b = sugerirSimples(n);
    baralhoValido(b, `simples ${n}`);
    assert.ok(Math.abs(inimigos(b) - inimigosRecomendados(n)) <= 1, `simples ${n}: inimigos`);
    assert.deepEqual(sugerirSimples(n), b, `simples ${n}: determinística`);
  }
});

test('a sugestão aleatória é válida para várias sementes e varia', () => {
  for (let n = MIN_JOGADORES; n <= MAX_JOGADORES; n++) {
    const vistos = new Set();
    for (let s = 1; s <= 25; s++) {
      const b = sugerirAleatoria(n, s);
      baralhoValido(b, `aleatória ${n}/${s}`);
      assert.ok(Math.abs(inimigos(b) - inimigosRecomendados(n)) <= 1, `aleatória ${n}/${s}: inimigos`);
      vistos.add(codificar(b));
    }
    if (n >= 10) assert.ok(vistos.size > 5, `aleatória ${n}: pouca variedade (${vistos.size})`);
  }
});

test('os cenários são válidos em todo o seu intervalo', () => {
  for (const c of CENARIOS) {
    assert.ok(c.min >= MIN_JOGADORES && c.max <= MAX_JOGADORES && c.min <= c.max, c.id);
    for (let n = c.min; n <= c.max; n++) baralhoValido(aplicarCenario(c, n), `${c.id} ${n}`);
  }
});

test('os avisos apanham combinações incompletas', () => {
  const texto = (b) => avisos(b).map((a) => a.texto).join(' ');
  const base = { jogadores: 8, cartas: { filisteu: 1, isaias: 1, israelita: 6 } };
  assert.deepEqual(erros(base), []);
  assert.match(texto({ ...base, cartas: { ...base.cartas, israelita: 4 } }), /Faltam 2 cartas/);
  assert.match(texto({ ...base, cartas: { ...base.cartas, israelita: 7 } }), /1 carta a mais/);
  assert.match(texto({ ...base, cartas: { isaias: 1, israelita: 7 } }), /ninguém ataca/);
  assert.match(texto({ jogadores: 12, cartas: { filisteu: 3, jeremias: 1, israelita: 8 } }), /Jeremias/);
  assert.match(texto({ jogadores: 12, cartas: { filisteu: 3, isaias: 1, construtor: 1, israelita: 7 } }), /Construtor sozinho/);
  assert.match(texto({ jogadores: 8, cartas: { filisteu: 1, isaias: 1, golias: 1, israelita: 5 } }), /a partir de 15/);
});

test('o Manto não é carta e Joás precisa de uma carta a mais', () => {
  const b = { jogadores: 18, cartas: { filisteu: 4, isaias: 1, manto: 1, joas: 1, israelita: 13 } };
  assert.equal(contarCartas(b), 19);            // o Manto fica de fora
  assert.equal(cartasNecessarias(b), 19);       // 18 jogadores + 1 posta de parte para Joás
  assert.deepEqual(erros(b), []);
  assert.equal(equilibrio(b), -24 + 7 + 1 - 3 + 13);
});

test('classificação do equilíbrio', () => {
  assert.equal(classificar(0).id, 'equilibrado');
  assert.equal(classificar(-2).id, 'equilibrado');
  assert.equal(classificar(4).id, 'jerusalem');
  assert.equal(classificar(-4).id, 'inimigos');
  assert.equal(classificar(9).id, 'desequilibrado');
});

test('a ligação guarda e recupera o baralho', () => {
  const b = sugerirAleatoria(17, 42);
  assert.deepEqual(descodificar('#' + codificar(b)), b);
  assert.equal(descodificar('lixo'), null);
  assert.deepEqual(descodificar('#99/israelita*2,naoexiste').jogadores, MAX_JOGADORES);
});

test('a ordem da noite filtra as personagens do baralho', () => {
  const todas = ordemDaNoite();
  assert.ok(todas.length > 15);
  assert.ok(todas.flat().every((r, i, a) => i === 0 || a[i - 1].ordemNoite <= r.ordemNoite));
  const so = ordemDaNoite(['isaias', 'filisteu', 'israelita']).map((g) => g.map((r) => r.id));
  assert.deepEqual(so, [['filisteu'], ['isaias']]);
  assert.ok(!todas.flat().some((r) => r.id === 'narrador'));
  assert.equal(todas.flat().length, ROLES.filter((r) => r.ordemNoite != null).length);
});
