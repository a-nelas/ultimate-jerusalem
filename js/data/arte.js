// Prompts (em inglês, que é como os modelos de imagem funcionam melhor) para gerar a arte
// de cada personagem num gerador de imagens, num estilo de desenho animado minimalista.
// Mantêm o tema cristão: sem sangue, sem violência explícita.

/** Início do prompt: o estilo vem primeiro, porque os modelos dão mais peso às primeiras palavras. */
export const PREFIXO = 'Minimalist flat cartoon illustration of';

/**
 * Rosto: sem isto o modelo às vezes desenha as personagens sem cara.
 * Segue o estilo das primeiras artes aprovadas (Isaías, Jeremias, Israelita).
 */
export const ROSTO =
  'with a clearly visible cute face and visible hair or headwear: two black dot eyes, small eyebrows, tiny nose, ' +
  'small expressive mouth and soft rosy cheeks';

export const ESTILO =
  'thick dark navy outlines, simple clean rounded shapes, flat soft pastel colors with very little shading, ' +
  'cute chibi-like proportions, one character centered, plain uncluttered background with only a soft ground shadow, ' +
  'children\'s storybook style, vector art, no text, no letters, no border';

/** Só tem efeito com CFG acima de 1 (no Z-Image Turbo, com CFG 1, é ignorado; o "no text" já vai no prompt). */
export const NEGATIVO =
  'text, letters, words, caption, watermark, signature, logo, frame, border, card template, photorealistic, photo, ' +
  'realistic, 3d render, faceless, blank face, face hidden, back view, baby, detailed background, intricate details, oil painting, painterly texture, heavy shading, ' +
  'blood, gore, wounds, nudity, modern clothing, deformed hands, extra fingers, extra limbs, lowres, blurry';

/** Paleta e fundo por equipa, alinhados com os tokens --mf-team-*: as cartas de cada equipa ficam com o mesmo ar. */
export const ACENTO_EQUIPA = {
  jerusalem: 'limited palette of slate blue, sage green and warm sand, soft pale blue background',
  filisteus: 'limited palette of oxblood red, bronze and charcoal, soft dusty red background',
  babilonios: 'limited palette of violet, lapis blue and gold, soft lavender background',
  independentes: 'limited palette of ochre, olive and cream, soft ochre background',
  flutuante: 'limited palette of moss green, grey and cream, soft moss green background',
  objeto: 'limited palette of umber brown and gold, soft tan background',
};

/** Descrição visual de cada papel (id → texto). */
export const ARTE = {
  israelita: 'a friendly Israelite villager with short dark hair under a simple head scarf, a simple striped tunic, smiling, carrying a clay water jar',
  isaias: 'the prophet Isaiah, an old man with a long white beard and a blue mantle, looking up in awe at a glowing star, holding a scroll',
  jeremias: 'the young adult prophet Jeremiah, a slim young man with thick wavy dark brown hair and a short beard, sad and thoughtful, holding a scroll and a small blossoming almond branch',
  elias: 'the prophet Elijah, a wild-haired bearded man in a rough brown fur cloak, determined look, both arms raised, a small flame on a little stone altar beside him',
  eliseu: 'the prophet Elisha, a kind bald old man with a gentle smile, holding a walking staff, wearing a big cloak slightly too large for him',
  zadoque: 'Zadok the high priest, a calm man with a grey beard and grey hair under a white turban, white robes, a breastplate of colorful square gems, holding a small incense burner',
  salomao: 'King Solomon, a calm wise king with long dark hair, a neat black beard and a golden crown, sitting on a small throne, holding a scroll, thoughtful look',
  calebe: 'Caleb the scout, a cheerful sturdy man with short brown hair and a brown beard, carrying a giant bunch of purple grapes hanging from a pole over his shoulder',
  benaia: 'Benaiah the royal bodyguard, a serious alert soldier with a black beard, a bronze helmet that leaves his face uncovered, holding a round shield and a spear',
  sansao: 'Samson, a very strong man with extremely long braided hair, straining face, pushing two short stone pillars apart',
  ester: 'Queen Esther, a brave young woman with long wavy black hair and a small crown, a royal robe, hopeful look, reaching toward a golden scepter',
  eleazar: 'Eleazar, a tired but determined warrior with messy brown hair and a short beard, gripping a sword with both hands, a few golden barley stalks at his feet',
  jonatas: 'Prince Jonathan, a young adult archer with curly brown hair and a kind smile, holding a bow, a quiver of arrows on his back',
  daniel: 'Daniel, a young adult man with short black hair and a short beard, kneeling in prayer with a peaceful face, next to a calm sleeping lion',
  david: 'King David, a young adult king with curly red hair and a golden crown, happy smile, playing a small harp',
  trombeteiro: 'a trumpeter with curly black hair and a short beard, puffed cheeks, blowing a long curved ram\'s horn shofar',
  baruque: 'Baruch the scribe, a focused young adult man with short dark hair, writing on a long scroll with a reed pen, a small oil lamp beside him',
  construtor: 'a builder with short brown hair and a beard, confident smile, holding a trowel and a limestone block, a sword on his belt, a small stack of stones beside him',
  nabal: 'Nabal, a chubby rich man with greasy black hair and a curly beard, smug face, holding a big golden goblet, a fluffy sheep beside him',
  debora: 'Deborah the judge, a wise woman with long grey-streaked hair under a light veil, calm kind face, sitting under a small palm tree',
  ezequias: 'King Hezekiah, a crowned king with dark hair and a full beard, stern face, holding one finger to his lips asking for silence',
  rute: 'Ruth, a gentle young woman with a long brown braid, warm smile, carrying a bundle of golden barley in her arms',
  noemi: 'Naomi, a kind older woman with grey hair in a bun under a shawl, warm smile, holding a long red ribbon tied into a bow between two small rings',
  matusalem: 'Methuselah, a tiny very old man with sleepy happy eyes and an extremely long white beard reaching the ground, leaning on a cane',
  abigail: 'Abigail, a gentle woman with long dark hair, pleading peaceful face, offering a basket of bread and figs',
  filisteu: 'a sneaky Philistine soldier with a sly sideways glance, wearing a tall feathered helmet over short black hair and a dark cloak, holding a bronze sword',
  golias: 'Goliath, a huge grumpy giant with a thick black beard and a frowning face, in bronze scale armor and a feathered helmet, holding an enormous spear',
  dalila: 'Delilah, a sly woman with long glossy black hair, dark eyes and a mischievous smile, holding a pair of scissors and a small pouch of coins',
  espia: 'a Philistine spy with short black hair, a hood pushed back to show his face, narrow suspicious eyes, holding a small fish-tailed idol',
  caldeu: 'a Babylonian agent with a curled black beard and a tall cap, blue and gold robes, sly smile, holding a clay tablet',
  absalao: 'Absalom, a proud handsome prince with a smug smile, very long flowing hair and a small crown',
  hananias: 'Hananiah the false prophet, a man with slicked dark hair and a pointy beard, smug grin, breaking a wooden yoke over his knee',
  jonas: 'Jonah, a man with messy brown hair and a short beard, worried face, sitting in a tiny boat on big curly waves, a friendly whale tail rising behind him',
  barrabas: 'Barabbas, a scruffy bandit with shaggy black hair and stubble, defiant grin, broken iron chains hanging from his wrists',
  jaco: 'Jacob, a young adult man with smooth brown hair and no beard, sneaky smile, goat skins on his arms, carrying a bowl of stew',
  aca: 'Achan, a man with short curly hair and a short beard, nervous face, glancing sideways, hiding a gold bar behind his back',
  joas: 'the boy king Joash, a small child with short dark hair and big surprised eyes, wearing a crown that is too big for him',
  manto: 'a prophet\'s brown woven cloak floating in a swirl of wind and golden light',
  narrador: 'an old storyteller with white hair, a white beard and round glasses, friendly smile, holding a big open book and a lit candle',
};

/** Prompt completo para uma personagem (aceita uma descrição alternativa). O Manto é um objeto: não leva rosto. */
export function promptPara(papel, descricao) {
  const base = (descricao ?? ARTE[papel?.id] ?? 'a biblical figure in ancient Jerusalem').trim().replace(/[.,;\s]+$/, '');
  const rosto = papel?.equipa === 'objeto' ? 'no people, no face' : ROSTO;
  const acento = ACENTO_EQUIPA[papel?.equipa] ?? '';
  return [`${PREFIXO} ${base}`, rosto, ESTILO, acento].filter(Boolean).join(', ');
}
