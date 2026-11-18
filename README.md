# Ultimate Jerusalém

Assistente do **Narrador** (moderador) para um jogo de dedução social com várias noites, baseado nas regras de
*Ultimate Werewolf: Ultimate Edition*, re-tematizado: **Jerusalém cercada**, defendida por figuras bíblicas
(David, Salomão, Isaías, Jeremias…) contra infiltrados **Filisteus** e agentes da **Babilónia**.

Site estático em português de Portugal, pronto para o GitHub Pages, sem passo de compilação.

## Estado

| Marco | Conteúdo | Estado |
|---|---|---|
| 1 | Lista de papéis convertidos + grelha de poder (`papeis.html`, [docs/PAPEIS.md](docs/PAPEIS.md)) | ✅ para revisão |
| 2 | Oficina de cartas em tamanho TCG, com modelos, prompts para gerar a arte e impressão em folhas A4 com marcas de corte (`cartas.html`, [docs/IMAGENS.md](docs/IMAGENS.md)) | ✅ disponível |
| 3 | Preparar partida: baralho equilibrado por n.º de jogadores, com sugestões, equilíbrio desejado e avisos (`preparar.html`) | ✅ disponível |
| 4 | Moderar: guião da noite, amanhecer, votações, vitória | por fazer |
| 5 | Versão *Uma Noite* (One Night) | futuro |

## Estrutura

```
index.html, papeis.html, preparar.html, cartas.html   páginas
css/vendor/mistfold-1.0.0.css   sistema de design Mistfold (não editar)
css/app.css, css/papeis.css, css/preparar.css, css/cartas.css   camada da aplicação, só com tokens --mf-*
js/data/roles.js             fonte única de todas as personagens
js/data/regras.js            regras da casa (votação a apontar)
js/data/arte.js              descrições e prompts da arte de cada personagem
js/engine/preparar.js        contas do baralho: equilíbrio, avisos, sugestões, ordem da noite
js/cartas/                   geometria das cartas, desenho em canvas, folhas A4 para imprimir, armazenamento local da arte
js/ui/                       código de cada página
js/vendor/mistfold-1.0.0.js  script do sistema (revelação dos cartões, títulos em WebGL)
assets/roles/<id>.png         arte das personagens (fornecida pelo autor); mini/ tem as miniaturas
docs/                        documentação gerada a partir de roles.js
tools/gerar-docs.mjs         gera docs/PAPEIS.md e docs/IMAGENS.md
tools/imagens.py             miniaturas e lista das imagens (js/data/imagens.js)
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

Depois de juntar ou trocar imagens em `assets/roles/`, corre `npm run imagens` (Python com Pillow): cria as miniaturas
leves da grelha e atualiza `js/data/imagens.js`, a lista que evita pedidos a imagens que não existem.

## Design

O aspeto visual usa o sistema de design **Mistfold** (`mistfold@1.0.0`, InstaLanding), copiado para `css/vendor/` e
`js/vendor/` com a versão fixada. Regras:

- Usa sempre os tokens `var(--mf-…)`; um token novo fica em `css/app.css` com o mesmo esquema de nomes
  (por exemplo `--mf-team-filisteus`).
- Cores das equipas: Jerusalém `--mf-blue`, Filisteus `--mf-oxblood`, Babilónios `--mf-violet`,
  Independentes `--mf-ochre`, Flutuante `--mf-moss`, Objeto `--mf-umber`.
- Cada página inclui uma vez o `<svg id="mf-defs">` com o gradiente e os ícones.
- Para atualizar o sistema, substitui os ficheiros em `vendor/` pela nova versão e muda o nome do ficheiro.

## Publicar no GitHub Pages

1. Cria um repositório no GitHub e faz *push* do ramo `main`.
2. Em **Settings → Pages**, escolhe *Deploy from a branch*, ramo `main`, pasta `/ (root)`.
3. O ficheiro `.nojekyll` garante que tudo é servido tal como está.

## Créditos

Mecânicas e valores de equilíbrio inspirados em *Ultimate Werewolf: Ultimate Edition* (2008). Os valores marcados com **?** ainda não foram
confirmados numa carta impressa.
