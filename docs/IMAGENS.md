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

## Prompts por personagem

### Israelita · `israelita`

```text
Minimalist flat cartoon illustration of a friendly Israelite villager with short dark hair under a simple head scarf, a simple striped tunic, smiling, carrying a clay water jar, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Profeta Isaías · `isaias`

```text
Minimalist flat cartoon illustration of the prophet Isaiah, an old man with a long white beard and a blue mantle, looking up in awe at a glowing star, holding a scroll, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Profeta Jeremias · `jeremias`

```text
Minimalist flat cartoon illustration of the young adult prophet Jeremiah, a slim young man with thick wavy dark brown hair and a short beard, sad and thoughtful, holding a scroll and a small blossoming almond branch, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Profeta Elias · `elias`

```text
Minimalist flat cartoon illustration of the prophet Elijah, a wild-haired bearded man in a rough brown fur cloak, determined look, both arms raised, a small flame on a little stone altar beside him, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Profeta Eliseu · `eliseu`

```text
Minimalist flat cartoon illustration of the prophet Elisha, a kind bald old man with a gentle smile, holding a walking staff, wearing a big cloak slightly too large for him, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Sumo Sacerdote Zadoque · `zadoque`

```text
Minimalist flat cartoon illustration of Zadok the high priest, a calm man with a grey beard and grey hair under a white turban, white robes, a breastplate of colorful square gems, holding a small incense burner, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Rei Salomão · `salomao`

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

### Rainha Ester · `ester`

```text
Minimalist flat cartoon illustration of Queen Esther, a brave young woman with long wavy black hair and a small crown, a royal robe, hopeful look, reaching toward a golden scepter, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Eleazar · `eleazar`

```text
Minimalist flat cartoon illustration of Eleazar, a tired but determined warrior with messy brown hair and a short beard, gripping a sword with both hands, a few golden barley stalks at his feet, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
```

### Príncipe Jónatas · `jonatas`

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

### Construtor · `construtor`

```text
Minimalist flat cartoon illustration of a builder with short brown hair and a beard, confident smile, holding a trowel and a limestone block, a sword on his belt, a small stack of stones beside him, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of slate blue, sage green and warm sand, soft pale blue background
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

### Filisteu · `filisteu`

```text
Minimalist flat cartoon illustration of a sneaky Philistine soldier with a sly sideways glance, wearing a tall feathered helmet over short black hair and a dark cloak, holding a bronze sword, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of oxblood red, bronze and charcoal, soft dusty red background
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

### Agente Caldeu · `caldeu`

```text
Minimalist flat cartoon illustration of a Babylonian agent with a curled black beard and a tall cap, blue and gold robes, sly smile, holding a clay tablet, with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, small expressive mouth and soft rosy cheeks, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of violet, lapis blue and gold, soft lavender background
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

### Manto do Profeta · `manto`

```text
Minimalist flat cartoon illustration of a prophet's brown woven cloak floating in a swirl of wind and golden light, no people, no face, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of umber brown and gold, soft tan background
```

### Narrador · `narrador`

```text
Minimalist flat cartoon illustration of an old storyteller with white hair, a white beard and round glasses, friendly smile, holding a big open book and a lit candle, no people, no face, thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, children's storybook style, vector art, no text, no letters, no border, limited palette of umber brown and gold, soft tan background
```
