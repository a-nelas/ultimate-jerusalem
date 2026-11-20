<!-- Ficheiro gerado por tools/gerar-docs.mjs a partir de js/data/roles.js. Não editar à mão. -->
# Guia de imagens das cartas

As cartas compõem-se na **[Oficina de Cartas](../cartas.html)**: a Oficina desenha a moldura, o nome, a habilidade
e a medalha de valor; só a **arte da personagem** é gerada à parte, num gerador de imagens.
Os modelos de imagem estragam letras e acentos, por isso a arte deve ser gerada **sem texto**.

## Fluxo de trabalho

1. Na Oficina, escolhe a personagem, o tamanho e o esquema. Descarrega o **modelo** (PNG com a área da arte transparente)
   e a **máscara** (branco = arte), e copia o prompt e o tamanho de geração.
2. Gera a imagem no tamanho sugerido e aumenta-a (upscale) até pelo menos a área da arte.
3. Guarda-a como `assets/roles/<id>.png` (ou .webp / .jpg) e corre `npm run imagens`, ou carrega-a diretamente na Oficina,
   onde fica guardada só nesse navegador.
4. Enquadra-a (arrastar, setas, zoom) e descarrega a frente e o verso em PNG para imprimir.

## Tamanhos de carta

| Tamanho | mm | a 300 dpi | com sangria (3 mm) |
|---|---|---|---|
| TCG padrão: Riftbound, Magic, Pokémon, Lorcana | 63 × 88 | 744 × 1039 px | 814 × 1109 px |
| Japonês: Yu-Gi-Oh!, Vanguard | 59 × 86 | 697 × 1016 px | 767 × 1086 px |
| Bridge: baralho de cartas estreito | 57 × 89 | 673 × 1051 px | 743 × 1121 px |
| Tarot | 70 × 120 | 827 × 1417 px | 897 × 1487 px |
| Mini europeu | 44 × 68 | 520 × 803 px | 590 × 873 px |

O tamanho padrão é o dos jogos de cartas colecionáveis (Riftbound, Magic, Pokémon, Lorcana): **63 × 88 mm**.

## Área da arte (carta padrão, 300 dpi, com sangria)

| Esquema | Área da arte | Proporção | Gerar em |
|---|---|---|---|
| Arte em janela | 677 × 447 px | 1,51 : 1 | 1264 × 832 px |
| Arte completa | 814 × 1109 px | 0,73 : 1 | 880 × 1200 px |

Na **janela** a arte fica num painel horizontal no topo; na **arte completa** ocupa a carta inteira (até à sangria)
e o texto assenta numa placa semitransparente: põe a personagem na metade de cima.
A 600 dpi as áreas duplicam; a Oficina mostra sempre os valores exatos do formato escolhido.

## Estilo

Desenho animado minimalista: formas simples, contornos limpos, cores planas e fundo liso na cor da equipa.
Todos os prompts começam por *Minimalist flat cartoon illustration of* e terminam com o mesmo estilo, para as cartas parecerem uma coleção:

> thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border

Prompt negativo comum (só tem efeito com CFG acima de 1):

> text, letters, words, caption, watermark, signature, logo, frame, border, card template, photorealistic, photo, realistic, 3d render, faceless, blank face, face hidden, back view, baby, detailed background, intricate details, oil painting, painterly texture, heavy shading, blood, gore, wounds, nudity, modern clothing, deformed hands, extra fingers, extra limbs, lowres, blurry

## Lista de imagens a produzir

| ✓ | Ficheiro | Personagem | Subtítulo | Equipa |
|---|---|---|---|---|
| ☐ | `israelita.png` | Israelita · 1 (Aguadeira) | Povo | Jerusalém |
| ☐ | `israelita-2.png` | Israelita · 2 (Oleiro) | Povo | Jerusalém |
| ☐ | `israelita-3.png` | Israelita · 3 (Lavrador) | Povo | Jerusalém |
| ☐ | `israelita-4.png` | Israelita · 4 (Pastora) | Povo | Jerusalém |
| ☐ | `israelita-5.png` | Israelita · 5 (Padeira) | Povo | Jerusalém |
| ☐ | `israelita-6.png` | Israelita · 6 (Pescador) | Povo | Jerusalém |
| ☐ | `israelita-7.png` | Israelita · 7 (Pastor) | Povo | Jerusalém |
| ☐ | `israelita-8.png` | Israelita · 8 (Tecelã) | Povo | Jerusalém |
| ☐ | `isaias.png` | Isaías | O Profeta | Jerusalém |
| ☐ | `jeremias.png` | Jeremias | O Aprendiz do Profeta | Jerusalém |
| ☐ | `elias.png` | Elias | Fogo do Céu | Jerusalém |
| ☐ | `eliseu.png` | Eliseu | Porção Dobrada do Espírito | Jerusalém |
| ☐ | `zadoque.png` | Zadoque | Sumo Sacerdote | Jerusalém |
| ☐ | `salomao.png` | Salomão | O Rei Sábio | Jerusalém |
| ☐ | `calebe.png` | Calebe | O Espia de Canaã | Jerusalém |
| ☐ | `benaia.png` | Benaia | Capitão da Guarda do Rei | Jerusalém |
| ☐ | `sansao.png` | Sansão | A Força do Nazireu | Jerusalém |
| ☐ | `ester.png` | Ester | A Rainha do Povo | Jerusalém |
| ☐ | `eleazar.png` | Eleazar | Valente de David | Jerusalém |
| ☐ | `jonatas.png` | Jónatas | O Príncipe Amigo | Jerusalém |
| ☐ | `daniel.png` | Daniel | Na Cova dos Leões | Jerusalém |
| ☐ | `david.png` | Rei David | O Pastor Ungido | Jerusalém |
| ☐ | `trombeteiro.png` | Trombeteiro | O Toque do Shofar | Jerusalém |
| ☐ | `baruque.png` | Baruque | O Escriba e o seu Rolo | Jerusalém |
| ☐ | `construtor.png` | Construtor · 1 (Pedreiro) | Reconstrutor do Muro de Neemias | Jerusalém |
| ☐ | `construtor-2.png` | Construtor · 2 (Canteiro) | Reconstrutor do Muro de Neemias | Jerusalém |
| ☐ | `construtor-3.png` | Construtor · 3 (Carregadora) | Reconstrutor do Muro de Neemias | Jerusalém |
| ☐ | `construtor-4.png` | Construtor · 4 (Aprendiz) | Reconstrutor do Muro de Neemias | Jerusalém |
| ☐ | `nabal.png` | Nabal | O Insensato | Jerusalém |
| ☐ | `debora.png` | Juíza Débora | Sob a Palmeira | Jerusalém |
| ☐ | `ezequias.png` | Rei Ezequias | "Não lhe respondais" | Jerusalém |
| ☐ | `rute.png` | Rute | A Moabita Fiel | Jerusalém |
| ☐ | `noemi.png` | Noemi | A Casamenteira | Jerusalém |
| ☐ | `matusalem.png` | Matusalém | O Ancião | Jerusalém |
| ☐ | `abigail.png` | Abigail | A Pacificadora | Jerusalém |
| ☐ | `filisteu.png` | Filisteu · 1 (Soldado) | Guerreiro Infiltrado | Filisteus |
| ☐ | `filisteu-2.png` | Filisteu · 2 (Lanceiro) | Guerreiro Infiltrado | Filisteus |
| ☐ | `filisteu-3.png` | Filisteu · 3 (Arqueiro) | Guerreiro Infiltrado | Filisteus |
| ☐ | `filisteu-4.png` | Filisteu · 4 (Guarda) | Guerreiro Infiltrado | Filisteus |
| ☐ | `filisteu-5.png` | Filisteu · 5 (Oficial) | Guerreiro Infiltrado | Filisteus |
| ☐ | `golias.png` | Golias | O Gigante de Gate | Filisteus |
| ☐ | `dalila.png` | Dalila | A Traidora de Soreque | Filisteus |
| ☐ | `espia.png` | Espia Filisteu | Batedor do Templo de Dagom | Filisteus |
| ☐ | `caldeu.png` | Agente Caldeu · 1 (Emissário) | Ao Serviço de Nabucodonosor | Babilónios |
| ☐ | `caldeu-2.png` | Agente Caldeu · 2 (Escriba) | Ao Serviço de Nabucodonosor | Babilónios |
| ☐ | `caldeu-3.png` | Agente Caldeu · 3 (Mercador) | Ao Serviço de Nabucodonosor | Babilónios |
| ☐ | `absalao.png` | Absalão | O Filho Rebelde | Independentes |
| ☐ | `hananias.png` | Hananias | O Falso Profeta | Independentes |
| ☐ | `jonas.png` | Jonas | "Lançai-me ao mar" | Independentes |
| ☐ | `barrabas.png` | Barrabás | O Salteador | Independentes |
| ☐ | `jaco.png` | Jacó | O que Tomou o Lugar | Flutuante |
| ☐ | `aca.png` | Acã | O Cobiçoso | Flutuante |
| ☐ | `joas.png` | Joás | O Rei Escondido | Flutuante |
| ☐ | `manto.png` | Manto | A Roupa do Profeta | Objeto |
| ☐ | `narrador.png` | Narrador | Quem conta a história | Objeto |

O verso é desenhado pela Oficina e não precisa de imagem.

## Desenhos alternativos

As personagens que costumam ter várias cartas no mesmo jogo (10 a 20 jogadores) têm desenhos alternativos:
Israelita (8), Filisteu (5), Construtor (4), Agente Caldeu (3).
A n.º 1 é a imagem principal (`<id>.png` ou `<id>-1.png`); as outras chamam-se `<id>-2.png`, `<id>-3.png`, …
Na Oficina aparecem na lista de personagens como *Israelita · 1 (Aguadeira)*, *Israelita · 2 (Oleiro)*, etc.

## Prompts por personagem

### Israelita · 1 (Aguadeira) · `israelita`

```text
Minimalist flat cartoon illustration of a friendly Israelite water carrier woman with short dark hair under a simple striped head scarf, a simple striped tunic, smiling, carrying a clay water jar from the well, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

#### Israelita · 2 (Oleiro) · `israelita-2`

```text
Minimalist flat cartoon illustration of a cheerful Israelite potter with short curly black hair and a short beard, clay-stained apron, holding a small clay bowl, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

#### Israelita · 3 (Lavrador) · `israelita-3`

```text
Minimalist flat cartoon illustration of an Israelite farmer with short brown hair and a brown beard, proud smile, holding a sickle and a bundle of wheat, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

#### Israelita · 4 (Pastora) · `israelita-4`

```text
Minimalist flat cartoon illustration of a young adult shepherd girl with a long dark braid and a light head scarf, kind smile, holding a shepherd staff, a fluffy lamb beside her, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

#### Israelita · 5 (Padeira) · `israelita-5`

```text
Minimalist flat cartoon illustration of an older Israelite baker woman with grey hair under a soft shawl, warm smile, holding a round loaf of freshly baked bread, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

#### Israelita · 6 (Pescador) · `israelita-6`

```text
Minimalist flat cartoon illustration of an Israelite fisherman with messy black hair and a short beard, happy grin, holding a small net with one fish, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

#### Israelita · 7 (Pastor) · `israelita-7`

```text
Minimalist flat cartoon illustration of a young Israelite shepherd boy with short curly brown hair, big happy eyes, hugging a little lamb from his flock, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

#### Israelita · 8 (Tecelã) · `israelita-8`

```text
Minimalist flat cartoon illustration of an Israelite weaver woman with dark hair in a bun, focused gentle face, holding a ball of yarn and a small spindle, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Isaías · `isaias`

```text
Minimalist flat cartoon illustration of the prophet Isaiah, an old man with a long white beard and a blue mantle, looking up in awe at a glowing star, holding a scroll, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Jeremias · `jeremias`

```text
Minimalist flat cartoon illustration of the young adult prophet Jeremiah, a slim young man with thick wavy dark brown hair and a short beard, sad and thoughtful, holding a scroll and a small blossoming almond branch, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Elias · `elias`

```text
Minimalist flat cartoon illustration of the prophet Elijah, a wild-haired bearded man in a rough brown fur cloak, determined look, both arms raised, a small flame on a little stone altar beside him, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Eliseu · `eliseu`

```text
Minimalist flat cartoon illustration of the prophet Elisha, a kind bald old man with a gentle smile, holding a walking staff, wearing a big cloak slightly too large for him, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Zadoque · `zadoque`

```text
Minimalist flat cartoon illustration of Zadok the high priest, a calm man with a grey beard and grey hair under a white turban, white robes, a breastplate of colorful square gems, holding a small incense burner, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Salomão · `salomao`

```text
Minimalist flat cartoon illustration of King Solomon, a calm wise king with long dark hair, a neat black beard and a golden crown, sitting on a small throne, holding a scroll, thoughtful look, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Calebe · `calebe`

```text
Minimalist flat cartoon illustration of Caleb the scout, a cheerful sturdy man with short brown hair and a brown beard, carrying a giant bunch of purple grapes hanging from a pole over his shoulder, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Benaia · `benaia`

```text
Minimalist flat cartoon illustration of Benaiah the royal bodyguard, a serious alert soldier with a black beard, a bronze helmet that leaves his face uncovered, holding a round shield and a spear, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Sansão · `sansao`

```text
Minimalist flat cartoon illustration of Samson, a very strong man with extremely long braided hair, straining face, pushing two short stone pillars apart, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Ester · `ester`

```text
Minimalist flat cartoon illustration of Queen Esther, a brave young woman with long wavy black hair and a small crown, a royal robe, hopeful look, reaching toward a golden scepter, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Eleazar · `eleazar`

```text
Minimalist flat cartoon illustration of Eleazar, a tired but determined warrior with messy brown hair and a short beard, gripping a sword with both hands, a few golden barley stalks at his feet, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Jónatas · `jonatas`

```text
Minimalist flat cartoon illustration of Prince Jonathan, a young adult archer with curly brown hair and a kind smile, holding a bow, a quiver of arrows on his back, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Daniel · `daniel`

```text
Minimalist flat cartoon illustration of Daniel, a young adult man with short black hair and a short beard, kneeling in prayer with a peaceful face, next to a calm sleeping lion, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Rei David · `david`

```text
Minimalist flat cartoon illustration of King David, a young adult king with curly red hair and a golden crown, happy smile, playing a small harp, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Trombeteiro · `trombeteiro`

```text
Minimalist flat cartoon illustration of a trumpeter with curly black hair and a short beard, puffed cheeks, blowing a long curved ram's horn shofar, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Baruque · `baruque`

```text
Minimalist flat cartoon illustration of Baruch the scribe, a focused young adult man with short dark hair, writing on a long scroll with a reed pen, a small oil lamp beside him, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Construtor · 1 (Pedreiro) · `construtor`

```text
Minimalist flat cartoon illustration of a builder with short brown hair and a beard, confident smile, holding a trowel and a limestone block, a small stack of stones beside him, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

#### Construtor · 2 (Canteiro) · `construtor-2`

```text
Minimalist flat cartoon illustration of a stonemason with short grey hair and a grey beard, determined smile, holding a hammer and a chisel, a cut limestone block beside him, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

#### Construtor · 3 (Carregadora) · `construtor-3`

```text
Minimalist flat cartoon illustration of a strong young adult woman with a dark braid and a head scarf, cheerful face, carrying a stack of bricks, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

#### Construtor · 4 (Aprendiz) · `construtor-4`

```text
Minimalist flat cartoon illustration of a young adult apprentice builder with messy brown hair and no beard, eager smile, carrying a wooden bucket of mortar and a trowel, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Nabal · `nabal`

```text
Minimalist flat cartoon illustration of Nabal, a chubby rich man with greasy black hair and a curly beard, smug face, holding a big golden goblet, a fluffy sheep beside him, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Juíza Débora · `debora`

```text
Minimalist flat cartoon illustration of Deborah the judge, a wise woman with long grey-streaked hair under a light veil, calm kind face, sitting under a small palm tree, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Rei Ezequias · `ezequias`

```text
Minimalist flat cartoon illustration of King Hezekiah, a crowned king with dark hair and a full beard, stern face, holding one finger to his lips asking for silence, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Rute · `rute`

```text
Minimalist flat cartoon illustration of Ruth, a gentle young woman with a long brown braid, warm smile, carrying a bundle of golden barley in her arms, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Noemi · `noemi`

```text
Minimalist flat cartoon illustration of Naomi, a kind older woman with grey hair in a bun under a shawl, warm smile, holding a long red ribbon tied into a bow between two small rings, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Matusalém · `matusalem`

```text
Minimalist flat cartoon illustration of Methuselah, a tiny very old man with sleepy happy eyes and an extremely long white beard reaching the ground, leaning on a cane, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Abigail · `abigail`

```text
Minimalist flat cartoon illustration of Abigail, a gentle woman with long dark hair, pleading peaceful face, offering a basket of bread and figs, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Filisteu · 1 (Soldado) · `filisteu`

```text
Minimalist flat cartoon illustration of a Philistine soldier with a simple angry face, slanted frowning eyebrows and a small grumpy downturned mouth, wearing a tall feathered helmet over short black hair and a dark cloak, holding a bronze sword, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of oxblood red, bronze and charcoal, soft dusty red background
```

#### Filisteu · 2 (Lanceiro) · `filisteu-2`

```text
Minimalist flat cartoon illustration of a Philistine spearman with a simple angry face, furrowed eyebrows and a tight frowning mouth, short black hair under a tall feathered helmet, holding a long bronze spear, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of oxblood red, bronze and charcoal, soft dusty red background
```

#### Filisteu · 3 (Arqueiro) · `filisteu-3`

```text
Minimalist flat cartoon illustration of a Philistine archer with a simple angry face, sharp V-shaped eyebrows and a small scowling mouth, a feathered headband over black hair, holding a short bow, a quiver on his back, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of oxblood red, bronze and charcoal, soft dusty red background
```

#### Filisteu · 4 (Guarda) · `filisteu-4`

```text
Minimalist flat cartoon illustration of a Philistine guard with a simple angry face, heavy frowning eyebrows and a gritted-teeth mouth, a feathered helmet over short hair, holding a round bronze shield and a short sword, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of oxblood red, bronze and charcoal, soft dusty red background
```

#### Filisteu · 5 (Oficial) · `filisteu-5`

```text
Minimalist flat cartoon illustration of a Philistine officer with a simple angry face, slanted eyebrows and an open shouting mouth, a tall red-plumed feathered helmet over black hair and a pointy beard, holding a bronze sword raised, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of oxblood red, bronze and charcoal, soft dusty red background
```

### Golias · `golias`

```text
Minimalist flat cartoon illustration of Goliath, a huge grumpy giant with a thick black beard and a frowning face, in bronze scale armor and a feathered helmet, holding an enormous spear, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of oxblood red, bronze and charcoal, soft dusty red background
```

### Dalila · `dalila`

```text
Minimalist flat cartoon illustration of Delilah, a sly woman with long glossy black hair, dark eyes and a mischievous smile, holding a pair of scissors and a small pouch of coins, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of oxblood red, bronze and charcoal, soft dusty red background
```

### Espia Filisteu · `espia`

```text
Minimalist flat cartoon illustration of a Philistine spy with short black hair, a hood pushed back to show his face, narrow suspicious eyes, holding a small fish-tailed idol, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of oxblood red, bronze and charcoal, soft dusty red background
```

### Agente Caldeu · 1 (Emissário) · `caldeu`

```text
Minimalist flat cartoon illustration of a Babylonian agent with a curled black beard and a tall cap, blue and gold robes, sly smile, holding a clay tablet, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of violet, lapis blue and gold, soft lavender background
```

#### Agente Caldeu · 2 (Escriba) · `caldeu-2`

```text
Minimalist flat cartoon illustration of a Babylonian scribe agent with a curled black beard and a tall blue cap, sly smile, writing on a clay tablet with a stylus, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of violet, lapis blue and gold, soft lavender background
```

#### Agente Caldeu · 3 (Mercador) · `caldeu-3`

```text
Minimalist flat cartoon illustration of a Babylonian merchant spy with a curled black beard and a gold headband, scheming grin, holding a jingling coin purse, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of violet, lapis blue and gold, soft lavender background
```

### Absalão · `absalao`

```text
Minimalist flat cartoon illustration of Absalom, a proud handsome prince with a smug smile, very long flowing hair and a small crown, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of ochre, olive and cream, soft ochre background
```

### Hananias · `hananias`

```text
Minimalist flat cartoon illustration of Hananiah the false prophet, a man with slicked dark hair and a pointy beard, smug grin, breaking a wooden yoke over his knee, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of ochre, olive and cream, soft ochre background
```

### Jonas · `jonas`

```text
Minimalist flat cartoon illustration of Jonah, a man with messy brown hair and a short beard, worried face, sitting in a tiny boat on big curly waves, a friendly whale tail rising behind him, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of ochre, olive and cream, soft ochre background
```

### Barrabás · `barrabas`

```text
Minimalist flat cartoon illustration of Barabbas, a scruffy bandit with shaggy black hair and stubble, defiant grin, broken iron chains hanging from his wrists, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of ochre, olive and cream, soft ochre background
```

### Jacó · `jaco`

```text
Minimalist flat cartoon illustration of Jacob, a young adult man with smooth brown hair and no beard, sneaky smile, goat skins on his arms, carrying a bowl of stew, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of moss green, grey and cream, soft moss green background
```

### Acã · `aca`

```text
Minimalist flat cartoon illustration of Achan, a man with short curly hair and a short beard, nervous face, glancing sideways, hiding a gold bar behind his back, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of moss green, grey and cream, soft moss green background
```

### Joás · `joas`

```text
Minimalist flat cartoon illustration of the boy king Joash, a small child with short dark hair and big surprised eyes, wearing a crown that is too big for him, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of moss green, grey and cream, soft moss green background
```

### Manto · `manto`

```text
Minimalist flat cartoon illustration of an empty prophet's mantle lying open on its own: a flat brown woven cloak spread out like a blanket, with no one inside, no hood, its loose edges lifted by a swirl of wind and golden light, an inanimate object only, no character, no creature, no head, no face, no eyes, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, one single object centered, still life, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of umber brown and gold, soft tan background
```

### Narrador · `narrador`

```text
Minimalist flat cartoon illustration of an old storyteller with white hair, a white beard and round glasses, friendly smile, holding a big open book and a lit candle, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of umber brown and gold, soft tan background
```
