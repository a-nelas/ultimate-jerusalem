import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROLES } from '../js/data/roles.js';
import { ARTE, PREFIXO, promptPara } from '../js/data/arte.js';
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
    for (const [w, h] of [s.sdxl, s.flux]) {
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
