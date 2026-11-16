// Gera docs/PAPEIS.md e docs/IMAGENS.md a partir de js/data/roles.js.
// Uso: node tools/gerar-docs.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ROLES, EQUIPAS, ACORDA, TIPOS, inimigosRecomendados } from '../js/data/roles.js';
import { VOTACOES, VOTACAO_PADRAO } from '../js/data/regras.js';

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
const img = `${aviso}
# Guia de imagens das cartas

As imagens são fornecidas pelo autor do projeto, depois de aprovada a lista de papéis.

## Especificação

| | |
|---|---|
| **Pasta** | \`assets/roles/\` |
| **Nome do ficheiro** | \`<id>.webp\` (aceita também \`.png\` e \`.jpg\`, por esta ordem) |
| **Tamanho** | **750 × 1050 px**, vertical (carta de 63 × 88 mm a 300 dpi) |
| **Zona segura** | manter o essencial a 60 px das margens (corte e cantos arredondados) |
| **Zona do texto** | o terço inferior da carta leva nome e habilidade por cima — deixar fundo mais calmo |
| **Peso** | idealmente menos de 400 KB por imagem (WebP qualidade 80) |

Enquanto uma imagem não existir, o site mostra \`assets/placeholder.svg\`.

## Estilo sugerido

- Ilustração pintada, tons de pedra calcária e ouro de Jerusalém.
- Personagens bíblicas com vestuário da época (Idade do Ferro / período do Segundo Templo — com liberdade).
- Inimigos reconhecíveis pela equipa: **Filisteus** em vermelho/bronze (elmos de penas), **Babilónios** em púrpura/azul (tijolo vidrado, estilo Porta de Ishtar).
- Sem violência explícita: insinuar o perigo em vez de o mostrar.

## Lista de imagens a produzir

| ✓ | Ficheiro | Papel | Personagem | Equipa |
|---|---|---|---|---|
${ROLES.map((r) => `| ☐ | \`${r.id}.webp\` | ${r.nome} | ${r.personagem} | ${EQUIPAS[r.equipa].nome} |`).join('\n')}
| ☐ | \`verso.webp\` | Verso comum de todas as cartas | — | — |
`;
writeFileSync(join(raiz, 'docs', 'IMAGENS.md'), img);
console.log(`Gerados docs/PAPEIS.md (${papeis.length} papéis) e docs/IMAGENS.md (${ROLES.length + 1} imagens).`);
