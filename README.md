# Ultimate Jerusalém

Assistente do **Cronista** (moderador) para um jogo de dedução social com várias noites, baseado nas regras de
*Ultimate Werewolf: Ultimate Edition*, re-tematizado: **Jerusalém cercada**, defendida por figuras bíblicas
(David, Salomão, Isaías, Jeremias…) contra infiltrados **Filisteus** e agentes da **Babilónia**.

Site estático em português de Portugal, pronto para o GitHub Pages — sem passo de compilação.

## Estado

| Marco | Conteúdo | Estado |
|---|---|---|
| 1 | Lista de papéis convertidos + grelha de poder (`papeis.html`, [docs/PAPEIS.md](docs/PAPEIS.md)) | ✅ para revisão |
| 2 | Modelo de cartas para imprimir (`cartas.html`) — ver [docs/IMAGENS.md](docs/IMAGENS.md) | por fazer |
| 3 | Preparar partida: baralho equilibrado por n.º de jogadores | por fazer |
| 4 | Moderar: guião da noite, amanhecer, votações, vitória | por fazer |
| 5 | Versão *Uma Noite* (One Night) | futuro |

## Estrutura

```
index.html, papeis.html     páginas
css/                         estilos
js/data/roles.js             fonte única de todos os papéis
js/ui/                       código de cada página
assets/roles/<id>.webp       imagens das cartas (fornecidas pelo autor)
docs/                        documentação gerada a partir de roles.js
tools/gerar-docs.mjs         gera docs/PAPEIS.md e docs/IMAGENS.md
tests/                       testes (node --test)
```

## Desenvolvimento

O site usa módulos ES, por isso tem de ser servido por HTTP (não abre com duplo clique):

```bash
python -m http.server 8000
```

Depois abre <http://localhost:8000>.

O Node só é necessário para os testes e para regenerar a documentação:

```bash
npm test
```

```bash
npm run docs
```

Depois de alterar `js/data/roles.js`, corre `npm run docs` para atualizar `docs/PAPEIS.md` e `docs/IMAGENS.md`.

## Publicar no GitHub Pages

1. Cria um repositório no GitHub e faz *push* do ramo `main`.
2. Em **Settings → Pages**, escolhe *Deploy from a branch*, ramo `main`, pasta `/ (root)`.
3. O ficheiro `.nojekyll` garante que tudo é servido tal como está.

## Créditos

Projeto de fãs, sem ligação à Bézier Games. Mecânicas e valores de equilíbrio baseados em
*Ultimate Werewolf: Ultimate Edition* (Ted Alspach / Bézier Games). Os valores marcados com **?** ainda não foram
confirmados numa carta impressa.
