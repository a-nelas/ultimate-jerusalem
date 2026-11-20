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
  assert.equal(variante('israelita').nome, 'Aguadeira');
  assert.equal(variante('israelita-1').nome, 'Aguadeira');
  assert.deepEqual(['israelita', ...IDS_VARIANTES.filter((i) => i.startsWith('israelita-'))].map((i) => variante(i).nome),
    ['Aguadeira', 'Oleiro', 'Lavrador', 'Pastora', 'Padeira', 'Pescador', 'Pastor', 'Tecelã']);
  for (const id of IDS_VARIANTES) {
    const v = variante(id);
    assert.ok(v.descricao && v.n >= 2, id);
    assert.ok(promptPara({ id: v.papel, equipa: papel(v.papel).equipa }, v.descricao).includes(v.descricao), id);
  }
});

test('folha A4: as cartas cabem, ficam centradas e as marcas de corte ficam fora das cartas', async () => {
  const { folha, paginar, posicaoVerso, marcasNaMargem, marcasNaSangria, A4 } = await import('../js/cartas/folha.js');
  const { TAMANHOS } = await import('../js/cartas/formatos.js');
  const f = folha({ mm: [63, 88] });
  assert.equal(f.cols, 3);
  assert.equal(f.linhas, 3);
  assert.equal(f.porFolha, 9);
  assert.ok(Math.abs(f.grelha.x * 2 + f.grelha.w - A4[0]) < 1e-9 && Math.abs(f.grelha.y * 2 + f.grelha.h - A4[1]) < 1e-9, 'centrada');
  assert.deepEqual(f.cortesX.length, 4);
  assert.deepEqual(f.cortesY.length, 4);
  const s = folha({ mm: [63, 88], sangria: true });
  assert.equal(s.porFolha, 9);
  assert.equal(s.cortesX.length, 6);
  for (const t of Object.values(TAMANHOS)) {
    for (const sangria of [false, true]) {
      const g = folha({ mm: t.mm, sangria });
      assert.ok(g.porFolha >= 1, t.nome);
      for (const c of g.celulas) assert.ok(c.x >= 0 && c.y >= 0 && c.x + c.w <= A4[0] + 1e-9 && c.y + c.h <= A4[1] + 1e-9, `${t.nome} dentro da folha`);
      for (const [x1, y1, x2, y2] of marcasNaMargem(g)) {
        assert.ok(Math.min(x1, x2) >= 0 && Math.max(x1, x2) <= A4[0] && Math.min(y1, y2) >= 0 && Math.max(y1, y2) <= A4[1], 'marca dentro da folha');
        const dentro = g.celulas.some((k) => Math.max(x1, x2) > k.corte.x && Math.min(x1, x2) < k.corte.x + k.corte.w && Math.max(y1, y2) > k.corte.y && Math.min(y1, y2) < k.corte.y + k.corte.h);
        assert.ok(!dentro, 'marca sobre uma carta');
      }
    }
  }
  assert.equal(marcasNaSangria(f).length, 0);
  assert.equal(marcasNaSangria(s).length, 9 * 8);
  assert.deepEqual(paginar([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.deepEqual([0, 1, 2, 3, 4, 5].map((i) => posicaoVerso(i, 3)), [2, 1, 0, 5, 4, 3]);
});
