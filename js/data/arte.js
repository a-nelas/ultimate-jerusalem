// Prompts (em inglês, que é como os modelos de imagem funcionam melhor) para gerar a arte
// de cada papel no ComfyUI, num estilo de desenho animado minimalista.
// Mantêm o tema cristão: sem sangue, sem violência explícita.

/** Início do prompt: o estilo vem primeiro, porque os modelos dão mais peso às primeiras palavras. */
export const PREFIXO = 'Minimalist flat cartoon illustration of';

export const ESTILO =
  'simple clean shapes, bold smooth outlines, flat colors with very soft minimal shading, cute stylized proportions, ' +
  'friendly readable silhouette, one character centered, plain uncluttered background, children\'s storybook style, ' +
  'vector art, no text, no letters, no border';

/** Só tem efeito com CFG acima de 1 (no Z-Image Turbo, com CFG 1, é ignorado — o "no text" já vai no prompt). */
export const NEGATIVO =
  'text, letters, words, caption, watermark, signature, logo, frame, border, card template, photorealistic, photo, ' +
  'realistic, 3d render, detailed background, intricate details, oil painting, painterly texture, heavy shading, ' +
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
  israelita: 'a friendly Israelite villager in a simple striped tunic and head scarf, carrying a clay water jar',
  isaias: 'the prophet Isaiah, an old man with a long white beard and a blue mantle, looking up at a glowing star, holding a scroll',
  jeremias: 'the young prophet Jeremiah with a sad thoughtful face, holding a scroll and a small blossoming almond branch',
  elias: 'the prophet Elijah in a rough brown fur cloak, both arms raised, a small flame burning on a stone altar beside him',
  eliseu: 'the prophet Elisha, a kind bald old man with a walking staff, wearing a big cloak that is slightly too large for him',
  zadoque: 'Zadok the high priest in white robes and a turban, a breastplate of twelve colorful square gems, holding a small incense burner',
  salomao: 'King Solomon, calm and wise, wearing a golden crown and sitting on a throne with a small lion statue, holding a scroll',
  calebe: 'Caleb the scout carrying a giant bunch of purple grapes hanging from a pole over his shoulder',
  benaia: 'Benaiah the royal bodyguard in a bronze helmet, holding a round shield and a spear, standing guard',
  sansao: 'Samson, a very strong man with extremely long braided hair, pushing two stone pillars apart',
  ester: 'Queen Esther in a royal robe and a small crown, bravely reaching toward a golden scepter',
  eleazar: 'Eleazar, a determined warrior holding a sword with both hands, standing in a golden barley field',
  jonatas: 'Prince Jonathan, a young archer with a bow and a quiver of arrows, kind smile',
  daniel: 'Daniel kneeling peacefully in prayer next to a calm sleeping lion',
  david: 'King David, a young red-haired king with a golden crown, playing a small harp',
  trombeteiro: 'a trumpeter blowing a long curved ram\'s horn shofar on top of a stone city wall',
  baruque: 'Baruch the scribe writing on a long scroll with a reed pen beside a small oil lamp',
  construtor: 'a builder holding a trowel and a limestone block, a sword on his belt, a half-built wall behind him',
  nabal: 'Nabal, a chubby rich man with a smug face holding a big golden goblet, a fluffy sheep beside him',
  debora: 'Deborah the judge, a wise woman with a calm face sitting under a palm tree',
  ezequias: 'King Hezekiah, a crowned king holding one finger to his lips, asking for silence',
  rute: 'Ruth, a gentle young woman carrying a bundle of golden barley in her arms',
  noemi: 'Naomi, a kind older woman smiling as she joins the hands of a young man and a young woman',
  matusalem: 'Methuselah, a tiny very old man with an extremely long white beard reaching the ground, leaning on a cane',
  abigail: 'Abigail, a gentle woman offering a basket of bread and figs with a peaceful pleading gesture',
  filisteu: 'a sneaky Philistine soldier with a tall feathered helmet, half his face hidden behind a dark cloak, holding a bronze sword',
  golias: 'Goliath, a huge giant in bronze scale armor with a feathered helmet and an enormous spear, seen from below',
  dalila: 'Delilah, a sly woman with dark eyes, holding a pair of scissors and a small pouch of coins',
  espia: 'a hooded Philistine spy peeking around a corner, holding a small fish-tailed idol',
  caldeu: 'a Babylonian agent with a curled black beard and a tall cap, blue and gold robes, holding a clay tablet, sly smile',
  absalao: 'Absalom, a proud handsome prince with very long flowing hair and a small crown',
  hananias: 'Hananiah the false prophet breaking a wooden yoke over his knee, smug grin',
  jonas: 'Jonah in a tiny boat on big curly waves, a friendly whale tail rising behind him',
  barrabas: 'Barabbas, a scruffy bandit with broken iron chains hanging from his wrists, defiant grin',
  jaco: 'Jacob with goat skins on his arms, carrying a bowl of stew, sneaky expression',
  aca: 'Achan nervously hiding a gold bar behind his back, glancing sideways',
  joas: 'the boy king Joash, a small child wearing a crown that is too big for him',
  manto: 'a prophet\'s brown woven cloak floating in a swirl of wind and golden light, no person',
  narrador: 'an old storyteller with a big open book and a lit candle',
};

/** Prompt completo para um papel (aceita uma descrição alternativa). */
export function promptPara(papel, descricao) {
  const base = (descricao ?? ARTE[papel?.id] ?? 'a biblical figure in ancient Jerusalem').trim().replace(/[.,;\s]+$/, '');
  const acento = ACENTO_EQUIPA[papel?.equipa] ?? '';
  return [`${PREFIXO} ${base}`, ESTILO, acento].filter(Boolean).join(', ');
}
