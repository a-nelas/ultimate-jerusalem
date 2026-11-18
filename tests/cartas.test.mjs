import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROLES } from '../js/data/roles.js';
import { ARTE, PREFIXO, ROSTO, promptPara } from '../js/data/arte.js';
import { TAMANHOS, ESQUEMAS, geometria, proporcao, sugestaoGeracao, mmParaPx } from '../js/cartas/formatos.js';

test('63 mm a 300 dpi são 744 px', () => {
  assert.equal(mmParaPx(63, 300), 744);
  assert.equal(mmParaPx(88, 300), 1039);
});

test('o tamanho padrão é o TCG de 63 × 88 mm', () => {
  assert.deepEqual(TAMANHOS.padrao.mm, [63, 88]);
});

test('a sangria acrescenta 3 mm de cada lado', () => {
  const sem = geometria({ mm: [63, 88], sangria: false });
  const com = geometria({ mm: [63, 88], sangria: true });
  assert.equal(com.W - sem.W, 2 * mmParaPx(3, 300));
});

test('a área da arte cabe dentro da carta, em todos os tamanhos e esquemas', () => {
  for (const t of Object.values(TAMANHOS)) {
    for (const esquema of Object.keys(ESQUEMAS)) {
      for (const dpi of [300, 600]) {
        const g = geometria({ mm: t.mm, dpi, esquema });
        const { x, y, w, h } = g.arte;
        assert.ok(x >= 0 && y >= 0 && w > 0 && h > 0, `${t.nome}/${esquema}`);
        assert.ok(x + w <= g.W && y + h <= g.H, `${t.nome}/${esquema}`);
        assert.ok(g.texto.y + g.texto.h <= g.H, `texto dentro: ${t.nome}/${esquema}`);
      }
    }
  }
});

test('as sugestões de geração são múltiplos de 16 e perto de 1 MP', () => {
  for (const esquema of Object.keys(ESQUEMAS)) {
    const p = proporcao(geometria({ mm: [63, 88], esquema }));
    const s = sugestaoGeracao(p);
    for (const [w, h] of [s]) {
      assert.equal(w % 16, 0);
      assert.equal(h % 16, 0);
      assert.ok(w * h > 0.8e6 && w * h < 1.3e6, `${w}×${h}`);
      assert.ok(Math.abs(w / h - p) / p < 0.12, `proporção ${w}×${h} vs ${p}`);
    }
  }
});

test('todos os papéis têm descrição de arte e prompt', () => {
  for (const r of ROLES) {
    assert.ok(ARTE[r.id], `falta ARTE.${r.id}`);
    const prompt = promptPara(r);
    assert.ok(prompt.startsWith(PREFIXO), r.id);
    assert.ok(prompt.includes(ARTE[r.id]), r.id);
    assert.ok(prompt.includes('no text'), r.id);
    if (r.id === 'manto') assert.ok(!prompt.includes(ROSTO) && !prompt.includes('chibi'), 'o Manto não leva rosto');
    else assert.ok(prompt.includes(ROSTO), `sem rosto: ${r.id}`);
  }
});

test('a medalha fica centrada no canto: à mesma distância da margem esquerda e da de baixo', () => {
  for (const t of Object.values(TAMANHOS)) {
    const g = geometria({ mm: t.mm, esquema: 'janela' });
    const esq = g.medalha.cx - (g.b + g.borda);
    const baixo = g.b + g.h - g.borda - g.medalha.cy;
    assert.ok(Math.abs(esq - baixo) <= 1, `${t.nome}: ${esq} vs ${baixo}`);
    assert.ok(esq - g.medalha.r > g.w * 0.03, `${t.nome}: medalha demasiado perto da margem`);
    const c = geometria({ mm: t.mm, esquema: 'completa' });
    assert.ok(Math.abs((c.medalha.cx - c.painel.x) - (c.painel.y + c.painel.h - c.medalha.cy)) <= 1, t.nome);
  }
});

test('a lista de imagens está em dia com assets/roles/ (corre npm run imagens)', async () => {
  const { readdirSync, existsSync } = await import('node:fs');
  const { IMAGENS } = await import('../js/data/imagens.js');
  const { ROLES } = await import('../js/data/roles.js');
  const { IDS_VARIANTES } = await import('../js/data/arte.js');
  const ids = new Set([...ROLES.map((r) => r.id), ...IDS_VARIANTES]);
  const ficheiros = readdirSync(new URL('../assets/roles/', import.meta.url))
    .filter((f) => /\.(webp|png|jpe?g)$/i.test(f));
  const naPasta = new Set(ficheiros.map((f) => f.replace(/\.[^.]+$/, '').replace(/-1$/, '')));
  assert.deepEqual([...naPasta].sort(), Object.keys(IMAGENS).sort());
  for (const [id, { arte, mini }] of Object.entries(IMAGENS)) {
    assert.ok(ids.has(id), `imagem sem personagem: ${id}`);
    assert.ok(existsSync(new URL(`../${arte}`, import.meta.url)), arte);
    assert.ok(existsSync(new URL(`../${mini}`, import.meta.url)), mini);
  }
});

test('as variantes de arte pertencem a personagens com várias cópias e têm prompt', async () => {
  const { VARIANTES, IDS_VARIANTES, variante, promptPara } = await import('../js/data/arte.js');
  const { papel } = await import('../js/data/roles.js');
  const { NOMES_PRINCIPAIS } = await import('../js/data/arte.js');
  assert.deepEqual(Object.keys(NOMES_PRINCIPAIS).sort(), Object.keys(VARIANTES).sort(), 'cada personagem com variantes tem nome para a n.º 1');
  for (const id of Object.keys(VARIANTES)) {
    assert.ok(papel(id), `variante de personagem desconhecida: ${id}`);
    assert.ok(papel(id).recomendado.max > 1, `${id} não costuma ter várias cartas`);
  }
  assert.equal(variante('israelita').n, 1);
  assert.equal(variante('israelita-1').descricao, variante('israelita').descricao);
  assert.equal(variante('israelita-2').nome, 'Oleiro');
  assert.equal(variante('israelita').nome, 'Aguadeiro');
  assert.equal(variante('israelita-1').nome, 'Aguadeiro');
  for (const id of IDS_VARIANTES) {
    const v = variante(id);
    assert.ok(v.descricao && v.n >= 2, id);
    assert.ok(promptPara({ id: v.papel, equipa: papel(v.papel).equipa }, v.descricao).includes(v.descricao), id);
  }
});
