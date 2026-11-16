import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROLES, EQUIPAS, ACORDA, TIPOS, papel, inimigosRecomendados } from '../js/data/roles.js';

test('ids são únicos e seguros para nomes de ficheiro', () => {
  const ids = ROLES.map((r) => r.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z0-9-]+$/, id);
});

test('cada papel tem os campos obrigatórios com valores válidos', () => {
  for (const r of ROLES) {
    for (const campo of ['nome', 'personagem', 'refBiblica', 'habilidade', 'notaModerador', 'original']) {
      assert.ok(typeof r[campo] === 'string' && r[campo].length > 0, `${r.id}.${campo}`);
    }
    assert.ok(r.equipa in EQUIPAS, `${r.id}.equipa`);
    assert.ok(r.acorda in ACORDA, `${r.id}.acorda`);
    assert.ok(Number.isInteger(r.valor) && r.valor >= -10 && r.valor <= 10, `${r.id}.valor`);
    assert.ok(r.tipo.length > 0 && r.tipo.every((t) => t in TIPOS), `${r.id}.tipo`);
    assert.ok(['filisteu', 'nao'].includes(r.profetaVe), `${r.id}.profetaVe`);
    const { min, max, aPartirDe } = r.recomendado;
    assert.ok(min >= 0 && max >= min && aPartirDe >= 5 && aPartirDe <= 30, `${r.id}.recomendado`);
  }
});

test('papéis que nunca acordam não têm lugar na ordem da noite', () => {
  for (const r of ROLES) {
    if (r.acorda === 'nunca') assert.equal(r.ordemNoite, null, r.id);
    if (r.ordemNoite != null) assert.notEqual(r.acorda, 'nunca', r.id);
  }
});

test('cada passo da noite tem um guião para o Narrador ler', () => {
  const passos = new Map();
  for (const r of ROLES.filter((p) => p.ordemNoite != null)) {
    passos.set(r.ordemNoite, [...(passos.get(r.ordemNoite) ?? []), r]);
  }
  for (const [ordem, papeis] of passos) {
    assert.ok(papeis.some((p) => p.guiaoNoite), `passo ${ordem} (${papeis.map((p) => p.id)}) sem guião`);
  }
});

test('os inimigos têm valor negativo e o Profeta só deteta quem deve', () => {
  for (const id of ['filisteu', 'golias', 'dalila', 'espia', 'caldeu', 'absalao']) assert.ok(papel(id).valor < 0, id);
  const vistos = ROLES.filter((r) => r.profetaVe === 'filisteu').map((r) => r.id).sort();
  assert.deepEqual(vistos, ['absalao', 'filisteu', 'golias', 'rute']);
});

test('os papéis originais da Ultimate Edition estão todos convertidos', () => {
  const originais = ['Villager', 'Seer', 'Apprentice Seer', 'Witch', 'Sorcerer', 'Priest', 'Medium', 'Psychic Detective',
    'Bodyguard', 'Hunter', 'Martyr', 'Stalwart', 'Prince', 'Diseased', 'Mayor', 'Trouble Maker', 'Ghost', 'Mason',
    'Fool', 'Old Hag', 'Enchantress', 'Lycan', 'Cupid', 'Elder', 'Pacifist', 'Werewolf', 'Wolf Cub', 'Minion',
    'Sorceress', 'Lone Wolf', 'Vampire', 'Cult Leader', 'Tanner', 'Bandit', 'Doppelgänger', 'Cursed', 'Drunk',
    'Charm', 'Moderator'];
  assert.deepEqual(ROLES.map((r) => r.original).sort(), [...originais].sort());
});

test('inimigos recomendados crescem com o número de jogadores', () => {
  assert.equal(inimigosRecomendados(7), 1);
  assert.equal(inimigosRecomendados(10), 2);
  assert.equal(inimigosRecomendados(14), 3);
  let anterior = 0;
  for (let n = 5; n <= 30; n++) {
    const v = inimigosRecomendados(n);
    assert.ok(v >= anterior && v <= Math.ceil(n / 4), `n=${n}`);
    anterior = v;
  }
});

test('a votação por defeito é a apontar e cita só papéis que existem', async () => {
  const { VOTACOES, VOTACAO_PADRAO } = await import('../js/data/regras.js');
  assert.equal(VOTACAO_PADRAO, 'apontar');
  const nomes = ROLES.map((r) => r.nome);
  for (const linha of VOTACOES.apontar.papeis) {
    const nome = linha.split(' — ')[0];
    assert.ok(nomes.includes(nome), `papel desconhecido na votação: ${nome}`);
  }
  assert.equal(papel('nabal').recomendado.max, 0, 'Nabal não deve ser recomendado com a votação a apontar');
});
