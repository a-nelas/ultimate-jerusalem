<!-- Ficheiro gerado por tools/gerar-docs.mjs a partir de js/data/roles.js. Não editar à mão. -->
# Guia de imagens das cartas

As cartas compõem-se na **[Oficina de Cartas](../cartas.html)**: a Oficina desenha a moldura, o nome, a habilidade
e a medalha de valor; só a **arte da personagem** é gerada à parte (no ComfyUI).
Os modelos de imagem estragam letras e acentos, por isso a arte deve ser gerada **sem texto**.

## Fluxo de trabalho

1. Na Oficina, escolhe o papel, o tamanho e o esquema. Descarrega o **modelo** (PNG com a área da arte transparente),
   a **máscara** (branco = arte) e a **ficha** (.txt) com o prompt e o tamanho de geração.
2. Gera a imagem no ComfyUI no tamanho sugerido e aumenta-a (upscale) até pelo menos a área da arte.
3. Guarda-a como `assets/roles/<id>.webp` (ou .png / .jpg) — ou carrega-a diretamente na Oficina,
   onde fica guardada só nesse navegador.
4. Enquadra-a (arrastar, setas, zoom) e descarrega a frente e o verso em PNG para imprimir.

## Tamanhos de carta

| Tamanho | mm | a 300 dpi | com sangria (3 mm) |
|---|---|---|---|
| TCG padrão — Riftbound, Magic, Pokémon, Lorcana | 63 × 88 | 744 × 1039 px | 814 × 1109 px |
| Japonês — Yu-Gi-Oh!, Vanguard | 59 × 86 | 697 × 1016 px | 767 × 1086 px |
| Bridge — baralho de cartas estreito | 57 × 89 | 673 × 1051 px | 743 × 1121 px |
| Tarot | 70 × 120 | 827 × 1417 px | 897 × 1487 px |
| Mini europeu | 44 × 68 | 520 × 803 px | 590 × 873 px |

O tamanho padrão é o dos jogos de cartas colecionáveis (Riftbound, Magic, Pokémon, Lorcana): **63 × 88 mm**.

## Área da arte (carta padrão, 300 dpi, com sangria)

| Esquema | Área da arte | Proporção | Gerar em SDXL | Gerar em Flux |
|---|---|---|---|---|
| Arte em janela | 677 × 447 px | 1,51 : 1 | 1216 × 832 | 1264 × 832 |
| Arte completa (até à margem) | 814 × 1109 px | 0,73 : 1 | 896 × 1152 | 880 × 1200 |

Na **janela** a arte fica num painel horizontal no topo; na **arte completa** ocupa a carta inteira (até à sangria)
e o texto assenta numa placa semitransparente — põe a personagem na metade de cima.
A 600 dpi as áreas duplicam; a Oficina mostra sempre os valores exatos do formato escolhido.

## Estilo

Desenho animado minimalista: formas simples, contornos limpos, cores planas e fundo liso na cor da equipa.
Todos os prompts começam por *Minimalist flat cartoon illustration of* e terminam com o mesmo estilo, para as cartas parecerem uma coleção:

> simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border

Prompt negativo comum (só tem efeito com CFG acima de 1):

> text, letters, words, caption, watermark, signature, logo, frame, border, card template, photorealistic, photo, realistic, 3d render, detailed background, intricate details, oil painting, painterly texture, heavy shading, blood, gore, wounds, nudity, modern clothing, deformed hands, extra fingers, extra limbs, lowres, blurry

## Lista de imagens a produzir

| ✓ | Ficheiro | Papel | Personagem | Equipa |
|---|---|---|---|---|
| ☐ | `israelita.webp` | Israelita | Povo da Cidade Santa | Jerusalém |
| ☐ | `isaias.webp` | Profeta Isaías | O Vidente de Jerusalém | Jerusalém |
| ☐ | `jeremias.webp` | Profeta Jeremias | O Aprendiz do Profeta | Jerusalém |
| ☐ | `elias.webp` | Profeta Elias | Fogo do Céu e Vida Restaurada | Jerusalém |
| ☐ | `eliseu.webp` | Profeta Eliseu | Porção Dobrada do Espírito | Jerusalém |
| ☐ | `zadoque.webp` | Sumo Sacerdote Zadoque | A Bênção do Templo | Jerusalém |
| ☐ | `salomao.webp` | Rei Salomão | O Coração Sábio | Jerusalém |
| ☐ | `calebe.webp` | Calebe | O Espia de Canaã | Jerusalém |
| ☐ | `benaia.webp` | Benaia | Capitão da Guarda do Rei | Jerusalém |
| ☐ | `sansao.webp` | Sansão | A Força do Nazireu | Jerusalém |
| ☐ | `ester.webp` | Rainha Ester | "Se eu perecer, pereci" | Jerusalém |
| ☐ | `eleazar.webp` | Eleazar | Valente de David | Jerusalém |
| ☐ | `jonatas.webp` | Príncipe Jónatas | Resgatado pelo Povo | Jerusalém |
| ☐ | `daniel.webp` | Daniel | Na Cova dos Leões | Jerusalém |
| ☐ | `david.webp` | Rei David | O Pastor Ungido | Jerusalém |
| ☐ | `trombeteiro.webp` | Trombeteiro | O Toque do Shofar | Jerusalém |
| ☐ | `baruque.webp` | Baruque | O Escriba e o seu Rolo | Jerusalém |
| ☐ | `construtor.webp` | Construtor | Reconstrutor do Muro de Neemias | Jerusalém |
| ☐ | `nabal.webp` | Nabal | O Insensato | Jerusalém |
| ☐ | `debora.webp` | Juíza Débora | Sob a Palmeira | Jerusalém |
| ☐ | `ezequias.webp` | Rei Ezequias | "Não lhe respondais" | Jerusalém |
| ☐ | `rute.webp` | Rute | A Moabita Fiel | Jerusalém |
| ☐ | `noemi.webp` | Noemi | A Casamenteira | Jerusalém |
| ☐ | `matusalem.webp` | Matusalém | O Ancião | Jerusalém |
| ☐ | `abigail.webp` | Abigail | A Pacificadora | Jerusalém |
| ☐ | `filisteu.webp` | Filisteu | Guerreiro Infiltrado | Filisteus |
| ☐ | `golias.webp` | Golias | O Gigante de Gate | Filisteus |
| ☐ | `dalila.webp` | Dalila | A Traidora de Soreque | Filisteus |
| ☐ | `espia.webp` | Espia Filisteu | Batedor do Templo de Dagom | Filisteus |
| ☐ | `caldeu.webp` | Agente Caldeu | Ao Serviço de Nabucodonosor | Babilónios |
| ☐ | `absalao.webp` | Absalão | O Filho Rebelde | Independentes |
| ☐ | `hananias.webp` | Hananias | O Falso Profeta | Independentes |
| ☐ | `jonas.webp` | Jonas | "Lançai-me ao mar" | Independentes |
| ☐ | `barrabas.webp` | Barrabás | O Salteador | Independentes |
| ☐ | `jaco.webp` | Jacó | O que Tomou o Lugar | Flutuante |
| ☐ | `aca.webp` | Acã | O Cobiçoso | Flutuante |
| ☐ | `joas.webp` | Joás | O Rei Escondido | Flutuante |
| ☐ | `manto.webp` | Manto do Profeta | Passado de mão em mão | Objeto |
| ☐ | `narrador.webp` | Narrador | Quem conta a história | Objeto |

O verso é desenhado pela Oficina e não precisa de imagem.

## Prompts por papel

### Israelita — `israelita`

```text
Minimalist flat cartoon illustration of a friendly Israelite villager in a simple striped tunic and head scarf, carrying a clay water jar, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Profeta Isaías — `isaias`

```text
Minimalist flat cartoon illustration of the prophet Isaiah, an old man with a long white beard and a blue mantle, looking up at a glowing star, holding a scroll, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Profeta Jeremias — `jeremias`

```text
Minimalist flat cartoon illustration of the young prophet Jeremiah with a sad thoughtful face, holding a scroll and a small blossoming almond branch, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Profeta Elias — `elias`

```text
Minimalist flat cartoon illustration of the prophet Elijah in a rough brown fur cloak, both arms raised, a small flame burning on a stone altar beside him, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Profeta Eliseu — `eliseu`

```text
Minimalist flat cartoon illustration of the prophet Elisha, a kind bald old man with a walking staff, wearing a big cloak that is slightly too large for him, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Sumo Sacerdote Zadoque — `zadoque`

```text
Minimalist flat cartoon illustration of Zadok the high priest in white robes and a turban, a breastplate of twelve colorful square gems, holding a small incense burner, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Rei Salomão — `salomao`

```text
Minimalist flat cartoon illustration of King Solomon, calm and wise, wearing a golden crown and sitting on a throne with a small lion statue, holding a scroll, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Calebe — `calebe`

```text
Minimalist flat cartoon illustration of Caleb the scout carrying a giant bunch of purple grapes hanging from a pole over his shoulder, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Benaia — `benaia`

```text
Minimalist flat cartoon illustration of Benaiah the royal bodyguard in a bronze helmet, holding a round shield and a spear, standing guard, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Sansão — `sansao`

```text
Minimalist flat cartoon illustration of Samson, a very strong man with extremely long braided hair, pushing two stone pillars apart, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Rainha Ester — `ester`

```text
Minimalist flat cartoon illustration of Queen Esther in a royal robe and a small crown, bravely reaching toward a golden scepter, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Eleazar — `eleazar`

```text
Minimalist flat cartoon illustration of Eleazar, a determined warrior holding a sword with both hands, standing in a golden barley field, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Príncipe Jónatas — `jonatas`

```text
Minimalist flat cartoon illustration of Prince Jonathan, a young archer with a bow and a quiver of arrows, kind smile, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Daniel — `daniel`

```text
Minimalist flat cartoon illustration of Daniel kneeling peacefully in prayer next to a calm sleeping lion, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Rei David — `david`

```text
Minimalist flat cartoon illustration of King David, a young red-haired king with a golden crown, playing a small harp, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Trombeteiro — `trombeteiro`

```text
Minimalist flat cartoon illustration of a trumpeter blowing a long curved ram's horn shofar on top of a stone city wall, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Baruque — `baruque`

```text
Minimalist flat cartoon illustration of Baruch the scribe writing on a long scroll with a reed pen beside a small oil lamp, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Construtor — `construtor`

```text
Minimalist flat cartoon illustration of a builder holding a trowel and a limestone block, a sword on his belt, a half-built wall behind him, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Nabal — `nabal`

```text
Minimalist flat cartoon illustration of Nabal, a chubby rich man with a smug face holding a big golden goblet, a fluffy sheep beside him, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Juíza Débora — `debora`

```text
Minimalist flat cartoon illustration of Deborah the judge, a wise woman with a calm face sitting under a palm tree, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Rei Ezequias — `ezequias`

```text
Minimalist flat cartoon illustration of King Hezekiah, a crowned king holding one finger to his lips, asking for silence, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Rute — `rute`

```text
Minimalist flat cartoon illustration of Ruth, a gentle young woman carrying a bundle of golden barley in her arms, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Noemi — `noemi`

```text
Minimalist flat cartoon illustration of Naomi, a kind older woman smiling as she joins the hands of a young man and a young woman, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Matusalém — `matusalem`

```text
Minimalist flat cartoon illustration of Methuselah, a tiny very old man with an extremely long white beard reaching the ground, leaning on a cane, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Abigail — `abigail`

```text
Minimalist flat cartoon illustration of Abigail, a gentle woman offering a basket of bread and figs with a peaceful pleading gesture, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Filisteu — `filisteu`

```text
Minimalist flat cartoon illustration of a sneaky Philistine soldier with a tall feathered helmet, half his face hidden behind a dark cloak, holding a bronze sword, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of oxblood red, bronze and charcoal, soft dusty red background
```

### Golias — `golias`

```text
Minimalist flat cartoon illustration of Goliath, a huge giant in bronze scale armor with a feathered helmet and an enormous spear, seen from below, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of oxblood red, bronze and charcoal, soft dusty red background
```

### Dalila — `dalila`

```text
Minimalist flat cartoon illustration of Delilah, a sly woman with dark eyes, holding a pair of scissors and a small pouch of coins, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of oxblood red, bronze and charcoal, soft dusty red background
```

### Espia Filisteu — `espia`

```text
Minimalist flat cartoon illustration of a hooded Philistine spy peeking around a corner, holding a small fish-tailed idol, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of oxblood red, bronze and charcoal, soft dusty red background
```

### Agente Caldeu — `caldeu`

```text
Minimalist flat cartoon illustration of a Babylonian agent with a curled black beard and a tall cap, blue and gold robes, holding a clay tablet, sly smile, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of violet, lapis blue and gold, soft lavender background
```

### Absalão — `absalao`

```text
Minimalist flat cartoon illustration of Absalom, a proud handsome prince with very long flowing hair and a small crown, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of ochre, olive and cream, soft ochre background
```

### Hananias — `hananias`

```text
Minimalist flat cartoon illustration of Hananiah the false prophet breaking a wooden yoke over his knee, smug grin, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of ochre, olive and cream, soft ochre background
```

### Jonas — `jonas`

```text
Minimalist flat cartoon illustration of Jonah in a tiny boat on big curly waves, a friendly whale tail rising behind him, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of ochre, olive and cream, soft ochre background
```

### Barrabás — `barrabas`

```text
Minimalist flat cartoon illustration of Barabbas, a scruffy bandit with broken iron chains hanging from his wrists, defiant grin, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of ochre, olive and cream, soft ochre background
```

### Jacó — `jaco`

```text
Minimalist flat cartoon illustration of Jacob with goat skins on his arms, carrying a bowl of stew, sneaky expression, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of moss green, grey and cream, soft moss green background
```

### Acã — `aca`

```text
Minimalist flat cartoon illustration of Achan nervously hiding a gold bar behind his back, glancing sideways, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of moss green, grey and cream, soft moss green background
```

### Joás — `joas`

```text
Minimalist flat cartoon illustration of the boy king Joash, a small child wearing a crown that is too big for him, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of moss green, grey and cream, soft moss green background
```

### Manto do Profeta — `manto`

```text
Minimalist flat cartoon illustration of a prophet's brown woven cloak floating in a swirl of wind and golden light, no person, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of umber brown and gold, soft tan background
```

### Narrador — `narrador`

```text
Minimalist flat cartoon illustration of an old storyteller with a big open book and a lit candle, simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, friendly readable silhouette, one character centered, plain uncluttered background, children's storybook style, vector art, no text, no letters, no border, limited palette of umber brown and gold, soft tan background
```
