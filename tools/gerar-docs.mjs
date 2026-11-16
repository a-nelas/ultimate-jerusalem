// Gera docs/PAPEIS.md e docs/IMAGENS.md a partir de js/data/roles.js, arte.js e cartas/formatos.js.
// Uso: node tools/gerar-docs.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ROLES, EQUIPAS, ACORDA, TIPOS, inimigosRecomendados } from '../js/data/roles.js';
import { VOTACOES, VOTACAO_PADRAO } from '../js/data/regras.js';
import { PREFIXO, ESTILO, NEGATIVO, promptPara } from '../js/data/arte.js';
import { TAMANHOS, ESQUEMAS, SANGRIA_MM, geometria, proporcao, sugestaoGeracao, mmParaPx } from '../js/cartas/formatos.js';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const fmtValor = (v) => (v > 0 ? `+${v}` : v < 0 ? `−${Math.abs(v)}` : '0');
const fmtRec = (r) => {
  const { min, max, aPartirDe } = r.recomendado;
  if (r.id === 'israelita') return `o restante (mín. ${min})`;
  if (r.id === 'filisteu') return '~1 por 5 jogadores';
  if (max === 0) return 'não recomendado (votação a apontar)';
  return `${min === max ? max : `${min}–${max}`}, a partir de ${aPartirDe}`;
};
const papeis = ROLES.filter((r) => r.id !== 'narrador');
const aviso = '<!-- Ficheiro gerado por tools/gerar-docs.mjs a partir de js/data/roles.js. Não editar à mão. -->';

// ── PAPEIS.md ──
let md = `${aviso}
# Ultimate Jerusalém — Papéis e Grelha de Poder

Conversão dos papéis de *Ultimate Werewolf: Ultimate Edition* para o tema **Jerusalém cercada**.
As mecânicas mantêm-se; muda o nome, a personagem e o texto.

- **Valor**: número de equilíbrio (positivo ajuda Jerusalém, negativo ajuda os inimigos). Um baralho equilibrado soma entre −2 e +2.
- **?** = valor por confirmar numa carta impressa.

## Equipas

| Equipa | Descrição |
|---|---|
${Object.values(EQUIPAS).map((e) => `| **${e.nome}** | ${e.descricao} |`).join('\n')}

## Grelha de poder

| # | Papel | Personagem | Original | Equipa | Valor | Acorda | Poder | Recomendado |
|---|---|---|---|---|---|---|---|---|
${papeis.map((r, i) => `| ${i + 1} | **${r.nome}** | ${r.personagem} (${r.refBiblica}) | ${r.original} | ${EQUIPAS[r.equipa].nome} | ${fmtValor(r.valor)}${r.verificar ? ' ?' : ''} | ${ACORDA[r.acorda]} | ${r.tipo.map((t) => TIPOS[t]).join(', ')} | ${fmtRec(r)} |`).join('\n')}

## Inimigos recomendados por número de jogadores

Inclui Filisteus, Golias, Absalão e Caldeus. Valores de 6 a 15 jogadores segundo o livro de regras; os restantes são extrapolados (~1 por 5).

| Jogadores | ${[5, 8, 11, 15, 21, 26, 30].map((n) => `até ${n}`).join(' | ')} |
|---|${'---|'.repeat(7)}
| Inimigos | ${[5, 8, 11, 15, 21, 26, 30].map((n) => inimigosRecomendados(n)).join(' | ')} |

Orientação do livro de regras: se os jogadores não se conhecem, junta +5 a favor de Jerusalém; se é um grupo experiente, junta −5. Abaixo de 15 jogadores, cerca de 1 papel especial por cada Israelita; acima, até 3 por 1.

## Ordem de chamada da noite

${(() => {
  const grupos = new Map();
  for (const r of papeis.filter((p) => p.ordemNoite != null).sort((a, b) => a.ordemNoite - b.ordemNoite)) {
    grupos.set(r.ordemNoite, [...(grupos.get(r.ordemNoite) ?? []), r]);
  }
  return [...grupos.values()].map(([p, ...o], i) => `${i + 1}. **${p.nome}**${o.length ? ` (com ${o.map((x) => x.nome).join(' e ')})` : ''} — ${ACORDA[p.acorda].toLowerCase()}`).join('\n');
})()}

## ${VOTACOES[VOTACAO_PADRAO].nome} (regra por defeito)

${VOTACOES[VOTACAO_PADRAO].resumo}

${VOTACOES[VOTACAO_PADRAO].passos.map((p, i) => `${i + 1}. ${p}`).join('\n')}

**Papéis que mexem no voto:**

${VOTACOES[VOTACAO_PADRAO].papeis.map((p) => `- ${p}`).join('\n')}

## Descrição de cada papel

${papeis.map((r) => `### ${r.nome}
*${r.personagem}* · ${r.refBiblica} · ${EQUIPAS[r.equipa].nome} · ${fmtValor(r.valor)}${r.verificar ? ' (por confirmar)' : ''} · original: ${r.original}

**Carta:** ${r.habilidade}
${r.guiaoNoite ? `\n**Guião:** _“${r.guiaoNoite}”_\n` : ''}
**Nota do Narrador:** ${r.notaModerador}
`).join('\n')}`;
writeFileSync(join(raiz, 'docs', 'PAPEIS.md'), md);

// ── IMAGENS.md ──
const fmt = (n) => String(n).replace('.', ',');
const linhaEsquema = (esquema) => {
  const g = geometria({ mm: TAMANHOS.padrao.mm, dpi: 300, sangria: true, esquema });
  const p = proporcao(g);
  const s = sugestaoGeracao(p);
  return `| ${ESQUEMAS[esquema]} | ${g.arte.w} × ${g.arte.h} px | ${fmt(p.toFixed(2))} : 1 | ${s.sdxl.join(' × ')} | ${s.flux.join(' × ')} |`;
};
const img = `${aviso}
# Guia de imagens das cartas

As cartas compõem-se na **[Oficina de Cartas](../cartas.html)**: a Oficina desenha a moldura, o nome, a habilidade
e a medalha de valor; só a **arte da personagem** é gerada à parte (no ComfyUI).
Os modelos de imagem estragam letras e acentos, por isso a arte deve ser gerada **sem texto**.

## Fluxo de trabalho

1. Na Oficina, escolhe o papel, o tamanho e o esquema. Descarrega o **modelo** (PNG com a área da arte transparente),
   a **máscara** (branco = arte) e a **ficha** (.txt) com o prompt e o tamanho de geração.
2. Gera a imagem no ComfyUI no tamanho sugerido e aumenta-a (upscale) até pelo menos a área da arte.
3. Guarda-a como \`assets/roles/<id>.webp\` (ou .png / .jpg) — ou carrega-a diretamente na Oficina,
   onde fica guardada só nesse navegador.
4. Enquadra-a (arrastar, setas, zoom) e descarrega a frente e o verso em PNG para imprimir.

## Tamanhos de carta

| Tamanho | mm | a 300 dpi | com sangria (${SANGRIA_MM} mm) |
|---|---|---|---|
${Object.values(TAMANHOS).map((t) => { const g = geometria({ mm: t.mm, dpi: 300, sangria: true }); return `| ${t.nome} | ${fmt(t.mm[0])} × ${fmt(t.mm[1])} | ${mmParaPx(t.mm[0], 300)} × ${mmParaPx(t.mm[1], 300)} px | ${g.W} × ${g.H} px |`; }).join('\n')}

O tamanho padrão é o dos jogos de cartas colecionáveis (Riftbound, Magic, Pokémon, Lorcana): **63 × 88 mm**.

## Área da arte (carta padrão, 300 dpi, com sangria)

| Esquema | Área da arte | Proporção | Gerar em SDXL | Gerar em Flux |
|---|---|---|---|---|
${Object.keys(ESQUEMAS).map(linhaEsquema).join('\n')}

Na **janela** a arte fica num painel horizontal no topo; na **arte completa** ocupa a carta inteira (até à sangria)
e o texto assenta numa placa semitransparente — põe a personagem na metade de cima.
A 600 dpi as áreas duplicam; a Oficina mostra sempre os valores exatos do formato escolhido.

## Estilo

Desenho animado minimalista: formas simples, contornos limpos, cores planas e fundo liso na cor da equipa.
Todos os prompts começam por *${PREFIXO}* e terminam com o mesmo estilo, para as cartas parecerem uma coleção:

> ${ESTILO}

Prompt negativo comum (só tem efeito com CFG acima de 1):

> ${NEGATIVO}

## Lista de imagens a produzir

| ✓ | Ficheiro | Papel | Personagem | Equipa |
|---|---|---|---|---|
${ROLES.map((r) => `| ☐ | \`${r.id}.webp\` | ${r.nome} | ${r.personagem} | ${EQUIPAS[r.equipa].nome} |`).join('\n')}

O verso é desenhado pela Oficina e não precisa de imagem.

## Prompts por papel

${ROLES.map((r) => `### ${r.nome} — \`${r.id}\`

\`\`\`text
${promptPara(r)}
\`\`\`
`).join('\n')}`;
writeFileSync(join(raiz, 'docs', 'IMAGENS.md'), img);
console.log(`Gerados docs/PAPEIS.md (${papeis.length} papéis) e docs/IMAGENS.md (${ROLES.length} imagens).`);
