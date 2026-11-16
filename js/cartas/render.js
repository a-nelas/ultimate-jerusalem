// Desenho das cartas em <canvas>. O que se vê na pré-visualização é exatamente o que se exporta.

const ESTRELA = new Path2D('M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5z');

/** Lê os tokens Mistfold (e de equipa) do documento, para o canvas usar as mesmas cores. */
export function lerTema(raiz = document.documentElement) {
  const cs = getComputedStyle(raiz);
  const v = (n) => cs.getPropertyValue(n).trim();
  const nomes = ['paper', 'card', 'card-deep', 'tint', 'white', 'ink', 'ink-strong', 'ink-soft', 'line', 'line-dark', 'line-faint',
    'sage', 'sage-dark', 'sage-light', 'mint', 'blue', 'violet', 'mauve', 'lilac', 'medal-mid', 'medal-edge', 'pos', 'neg', 'foot'];
  const t = {};
  for (const n of nomes) t[n] = v(`--mf-${n}`);
  t.equipa = (eq) => v(`--mf-team-${eq}`) || t.sage;
  t.fontes = {
    gotica: v('--mf-font-display') || 'UnifrakturMaguntia, serif',
    texto: v('--mf-font-text') || '"Fanwood Text", serif',
    numeral: v('--mf-font-numeral') || 'Cinzel, serif',
  };
  return t;
}

/** Garante que as fontes estão carregadas antes de desenhar texto no canvas. */
export async function carregarFontes(t) {
  if (!document.fonts) return;
  const amostra = 'Jerusalém 0123';
  await Promise.race([
    Promise.all([
      document.fonts.load(`900 40px ${t.fontes.gotica}`, amostra),
      document.fonts.load(`400 20px ${t.fontes.texto}`, amostra),
      document.fonts.load(`italic 400 20px ${t.fontes.texto}`, amostra),
      document.fonts.load(`600 20px ${t.fontes.numeral}`, amostra),
    ]).catch(() => {}),
    new Promise((res) => setTimeout(res, 3000)),
  ]);
}

// ── utilitários de desenho ──
function caminhoRecortado(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arc(x + w, y, r, Math.PI, Math.PI / 2, true);
  ctx.lineTo(x + w, y + h - r);
  ctx.arc(x + w, y + h, r, -Math.PI / 2, Math.PI, true);
  ctx.lineTo(x + r, y + h);
  ctx.arc(x, y + h, r, 0, -Math.PI / 2, true);
  ctx.lineTo(x, y + r);
  ctx.arc(x, y, r, Math.PI / 2, 0, true);
  ctx.closePath();
}

function estrela(ctx, cx, cy, tam, cor) {
  ctx.save();
  ctx.translate(cx - tam / 2, cy - tam / 2);
  ctx.scale(tam / 24, tam / 24);
  ctx.fillStyle = cor;
  ctx.fill(ESTRELA);
  ctx.restore();
}

function quebrarLinhas(ctx, texto, larguraMax) {
  const linhas = [];
  for (const paragrafo of String(texto).split(/\n/)) {
    let linha = '';
    for (const palavra of paragrafo.split(/\s+/).filter(Boolean)) {
      const tentativa = linha ? `${linha} ${palavra}` : palavra;
      if (ctx.measureText(tentativa).width > larguraMax && linha) { linhas.push(linha); linha = palavra; }
      else linha = tentativa;
    }
    linhas.push(linha);
  }
  return linhas;
}

/** Escreve texto centrado numa caixa, reduzindo o tamanho até caber. */
function textoNaCaixa(ctx, texto, caixa, { fonte, tamanho, minimo, altura = 1.3, cor, estilo = '' }) {
  let t = tamanho, linhas;
  for (; t >= minimo; t -= Math.max(1, t * 0.04)) {
    ctx.font = `${estilo} ${t}px ${fonte}`;
    linhas = quebrarLinhas(ctx, texto, caixa.w);
    if (linhas.length * t * altura <= caixa.h) break;
  }
  t = Math.max(t, minimo);
  ctx.font = `${estilo} ${t}px ${fonte}`;
  linhas = quebrarLinhas(ctx, texto, caixa.w);
  const total = linhas.length * t * altura;
  let y = caixa.y + (caixa.h - total) / 2 + t * altura * 0.5;
  ctx.fillStyle = cor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const l of linhas) { ctx.fillText(l, caixa.x + caixa.w / 2, y); y += t * altura; }
}

/** Uma linha de texto que encolhe para caber na largura. */
function linhaAjustada(ctx, texto, cx, cy, larguraMax, { fonte, tamanho, cor, estilo = '', espacamento = 0 }) {
  let t = tamanho;
  const medir = () => { ctx.font = `${estilo} ${t}px ${fonte}`; if ('letterSpacing' in ctx) ctx.letterSpacing = `${espacamento * t}px`; return ctx.measureText(texto).width; };
  while (medir() > larguraMax && t > 6) t *= 0.95;
  ctx.fillStyle = cor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(texto, cx, cy);
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
  return t;
}

function anelConico(ctx, cx, cy, t, inicio = Math.PI * 1.15) {
  if (!ctx.createConicGradient) return t.sage;
  const g = ctx.createConicGradient(inicio, cx, cy);
  [t.sage, t.mint, t.blue, t.violet, t.lilac, t.sage].forEach((c, i, a) => g.addColorStop(i / (a.length - 1), c));
  return g;
}

/**
 * Calcula onde desenhar a imagem para cobrir a área de arte, respeitando o enquadramento.
 * corte = { cx, cy } (ponto focal, 0–1) e zoom (≥ 1). Devolve também o corte já limitado.
 */
export function enquadrar(img, area, corte = {}) {
  const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  const zoom = Math.max(1, corte.zoom ?? 1);
  const escala = Math.max(area.w / iw, area.h / ih) * zoom;
  const meioW = area.w / 2 / (iw * escala), meioH = area.h / 2 / (ih * escala);
  const cx = Math.min(1 - meioW, Math.max(meioW, corte.cx ?? 0.5));
  const cy = Math.min(1 - meioH, Math.max(meioH, corte.cy ?? 0.5));
  const dw = iw * escala, dh = ih * escala;
  return {
    dx: area.x + area.w / 2 - cx * dw, dy: area.y + area.h / 2 - cy * dh, dw, dh, escala,
    corte: { cx, cy, zoom },
  };
}

function desenharArte(ctx, g, t, arte, corte, modo) {
  const a = g.arte;
  ctx.save();
  if (g.esquema === 'janela') { caminhoRecortado(ctx, a.x, a.y, a.w, a.h, g.raio * 0.5); ctx.clip(); }
  if (modo === 'modelo') {
    ctx.clearRect(a.x, a.y, a.w, a.h);
  } else if (arte) {
    const e = enquadrar(arte, a, corte);
    ctx.drawImage(arte, e.dx, e.dy, e.dw, e.dh);
  } else {
    ctx.fillStyle = t.tint;
    ctx.fillRect(a.x, a.y, a.w, a.h);
    estrela(ctx, a.x + a.w / 2, a.y + a.h / 2 - g.w * 0.03, g.w * 0.09, t['line-dark']);
    ctx.font = `italic ${g.w * 0.04}px ${t.fontes.texto}`;
    ctx.fillStyle = t['ink-soft'];
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Arte por gerar', a.x + a.w / 2, a.y + a.h / 2 + g.w * 0.05);
  }
  ctx.restore();
  if (g.esquema === 'janela') {
    ctx.save();
    caminhoRecortado(ctx, a.x, a.y, a.w, a.h, g.raio * 0.5);
    ctx.lineWidth = Math.max(1, g.w * 0.004);
    ctx.strokeStyle = t['line-dark'];
    ctx.stroke();
    ctx.restore();
  }
}

/**
 * Frente da carta.
 * @param {CanvasRenderingContext2D} ctx
 * @param {ReturnType<import('./formatos.js').geometria>} g
 * @param {{nome:string, personagem:string, refBiblica:string, habilidade:string, equipa:string, equipaNome:string, valor:number}} d
 * @param {ReturnType<typeof lerTema>} t
 * @param {{arte?:CanvasImageSource|null, corte?:object, modo?:'final'|'modelo'}} o
 */
export function desenharFrente(ctx, g, d, t, { arte = null, corte = {}, modo = 'final' } = {}) {
  const cor = t.equipa(d.equipa);
  const { W, H, b, w, h } = g;
  ctx.clearRect(0, 0, W, H);

  if (g.esquema === 'completa') {
    desenharArte(ctx, g, t, arte, corte, modo);
    // moldura fina na cor da equipa (até à sangria)
    ctx.save();
    caminhoRecortado(ctx, b + g.borda, b + g.borda, w - 2 * g.borda, h - 2 * g.borda, g.raio);
    ctx.rect(0, 0, W, H);
    ctx.fillStyle = cor;
    ctx.fill('evenodd');
    ctx.restore();
    // placa do nome e painel do texto em pergaminho translúcido
    for (const p of [g.placa, g.painel]) {
      ctx.save();
      caminhoRecortado(ctx, p.x, p.y, p.w, p.h, g.raio * 0.45);
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = t.card;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.lineWidth = Math.max(1, w * 0.003);
      ctx.strokeStyle = t['line-dark'];
      ctx.stroke();
      ctx.restore();
    }
  } else {
    // fundo na cor da equipa (inclui a sangria) e painel de pergaminho recortado
    ctx.fillStyle = cor;
    ctx.fillRect(0, 0, W, H);
    const brilho = ctx.createRadialGradient(W * 0.3, H * 0.2, 0, W * 0.3, H * 0.2, H * 0.9);
    brilho.addColorStop(0, 'rgba(255,255,255,.14)');
    brilho.addColorStop(1, 'rgba(0,0,0,.12)');
    ctx.fillStyle = brilho;
    ctx.fillRect(0, 0, W, H);
    const px = b + g.borda, py = b + g.borda, pw = w - 2 * g.borda, ph = h - 2 * g.borda;
    caminhoRecortado(ctx, px, py, pw, ph, g.raio);
    ctx.fillStyle = t.card;
    ctx.fill();
    const lav = ctx.createRadialGradient(px + pw / 2, py, 0, px + pw / 2, py, ph);
    lav.addColorStop(0, 'rgba(76,114,100,.07)');
    lav.addColorStop(1, 'rgba(76,114,100,0)');
    ctx.fillStyle = lav;
    ctx.fill();
    // filete interior (a "inset hairline" do Mistfold)
    const ins = w * 0.009;
    caminhoRecortado(ctx, px + ins, py + ins, pw - 2 * ins, ph - 2 * ins, Math.max(0, g.raio - ins));
    ctx.lineWidth = Math.max(1, w * 0.0025);
    ctx.strokeStyle = t['line-dark'];
    ctx.stroke();
    desenharArte(ctx, g, t, arte, corte, modo);
  }

  // Nome em letra gótica, na cor da equipa
  linhaAjustada(ctx, d.nome, g.nome.x + g.nome.w / 2, g.nome.y + g.nome.h * 0.56, g.nome.w,
    { fonte: t.fontes.gotica, tamanho: g.nome.h * 0.74, cor: cor, estilo: '900' });

  // Personagem em itálico
  linhaAjustada(ctx, d.personagem, g.sub.x + g.sub.w / 2, g.sub.y + g.sub.h / 2, g.sub.w,
    { fonte: t.fontes.texto, tamanho: g.sub.h * 0.62, cor: t.ink, estilo: 'italic' });

  // Filete que se desvanece nas pontas, entre o subtítulo e a habilidade
  const fy = g.fleuronY, fcx = g.b + g.w / 2, fl = g.texto.w * 0.36;
  const gr = ctx.createLinearGradient(fcx - fl, 0, fcx + fl, 0);
  gr.addColorStop(0, 'rgba(76,114,100,0)');
  gr.addColorStop(0.5, t.sage);
  gr.addColorStop(1, 'rgba(76,114,100,0)');
  ctx.fillStyle = gr;
  ctx.fillRect(fcx - fl, fy - Math.max(0.5, w * 0.0012), 2 * fl, Math.max(1, w * 0.0025));

  // Habilidade
  textoNaCaixa(ctx, d.habilidade, g.texto,
    { fonte: t.fontes.texto, tamanho: w * 0.046, minimo: w * 0.026, altura: 1.28, cor: t['ink-strong'] });

  // Referência bíblica
  if (d.refBiblica) {
    linhaAjustada(ctx, d.refBiblica, g.ref.x + g.ref.w / 2, g.ref.y + g.ref.h / 2, g.ref.w,
      { fonte: t.fontes.texto, tamanho: g.ref.h * 0.75, cor: t['ink-soft'], estilo: 'italic' });
  }

  // Medalha com o valor de equilíbrio
  const m = g.medalha;
  const perola = ctx.createRadialGradient(m.cx - m.r * 0.35, m.cy - m.r * 0.45, 0, m.cx, m.cy, m.r);
  perola.addColorStop(0, t.white);
  perola.addColorStop(0.55, t['medal-mid']);
  perola.addColorStop(1, t['medal-edge']);
  ctx.beginPath();
  ctx.arc(m.cx, m.cy, m.r, 0, Math.PI * 2);
  ctx.fillStyle = perola;
  ctx.fill();
  ctx.lineWidth = Math.max(1.5, m.r * 0.08);
  ctx.strokeStyle = anelConico(ctx, m.cx, m.cy, t);
  ctx.stroke();
  const v = Number(d.valor) || 0;
  const valor = v > 0 ? `+${v}` : v < 0 ? `−${Math.abs(v)}` : '0';
  linhaAjustada(ctx, valor, m.cx, m.cy + m.r * 0.04, m.r * 1.6,
    { fonte: t.fontes.numeral, tamanho: m.r * 0.85, cor: v > 0 ? t.pos : v < 0 ? t.neg : t['ink-strong'], estilo: '600' });

  // Equipa em versaletes, com a estrela
  const tamEq = w * 0.032;
  ctx.font = `${tamEq}px ${t.fontes.texto}`;
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${tamEq * 0.12}px`;
  const rotulo = d.equipaNome.toUpperCase();
  const lw = ctx.measureText(rotulo).width;
  ctx.fillStyle = t['ink-soft'];
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText(rotulo, g.equipa.x, g.equipa.y);
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
  estrela(ctx, g.equipa.x - lw - tamEq * 0.9, g.equipa.y, tamEq * 1.05, cor);
}

/** Verso comum a todas as cartas (não revela a equipa). */
export function desenharVerso(ctx, g, t) {
  const { W, H, b, w, h } = g;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = t.paper;
  ctx.fillRect(0, 0, W, H);
  for (const [x, y, rx, c] of [[0.5, -0.05, 0.9, 'rgba(76,114,100,.16)'], [0.95, 0.55, 0.7, 'rgba(103,90,124,.12)'], [0.05, 0.85, 0.7, 'rgba(76,109,123,.12)']]) {
    const gr = ctx.createRadialGradient(W * x, H * y, 0, W * x, H * y, W * rx);
    gr.addColorStop(0, c);
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gr;
    ctx.fillRect(0, 0, W, H);
  }
  // anel cónico (como a moldura do Mistfold) e filete interior
  const m = w * 0.06, aw = w * 0.012;
  const x = b + m, y = b + m, fw = w - 2 * m, fh = h - 2 * m, raio = w * 0.07;
  caminhoRecortado(ctx, x, y, fw, fh, raio);
  ctx.lineWidth = aw;
  ctx.strokeStyle = anelConico(ctx, b + w / 2, b + h / 2, t, Math.PI * 0.2);
  ctx.stroke();
  const ins = w * 0.03;
  caminhoRecortado(ctx, x + ins, y + ins, fw - 2 * ins, fh - 2 * ins, raio - ins * 0.5);
  ctx.lineWidth = Math.max(1, w * 0.0025);
  ctx.strokeStyle = t['line-dark'];
  ctx.stroke();

  // muralha ameada, discreta, em baixo
  ctx.save();
  caminhoRecortado(ctx, x + ins, y + ins, fw - 2 * ins, fh - 2 * ins, raio - ins * 0.5);
  ctx.clip();
  const baseY = b + h * 0.8, alt = h * 0.08, ameia = w * 0.06;
  ctx.fillStyle = 'rgba(76,114,100,.13)';
  ctx.beginPath();
  ctx.moveTo(x, b + h);
  ctx.lineTo(x, baseY);
  for (let ax = x; ax < x + fw; ax += ameia * 2) {
    ctx.lineTo(ax, baseY - alt * 0.35);
    ctx.lineTo(ax + ameia, baseY - alt * 0.35);
    ctx.lineTo(ax + ameia, baseY);
    ctx.lineTo(ax + ameia * 2, baseY);
  }
  ctx.lineTo(x + fw, b + h);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // "Ultimate" em versaletes e "Jerusalém" em gótico com o gradiente dos títulos
  const cx = b + w / 2, cy = b + h * 0.47;
  linhaAjustada(ctx, 'ULTIMATE', cx, cy - h * 0.1, w * 0.6, { fonte: t.fontes.numeral, tamanho: w * 0.06, cor: t['ink-strong'], estilo: '600', espacamento: 0.35 });
  const tam = w * 0.17;
  ctx.font = `900 ${tam}px ${t.fontes.gotica}`;
  while (ctx.measureText('Jerusalém').width > w * 0.78) ctx.font = `900 ${parseFloat(ctx.font.split(' ')[1]) * 0.95}px ${t.fontes.gotica}`;
  const tw = ctx.measureText('Jerusalém').width;
  const grad = ctx.createLinearGradient(cx - tw / 2, cy, cx + tw / 2, cy + tam * 0.3);
  grad.addColorStop(0.05, t['ink-strong']);
  grad.addColorStop(0.45, t.sage);
  grad.addColorStop(0.7, t['sage-light']);
  grad.addColorStop(1, t.sage);
  ctx.fillStyle = grad;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Jerusalém', cx, cy + h * 0.02);
}

/** Máscara para inpainting: branco onde vai a arte, preto no resto. */
export function desenharMascara(ctx, g) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, g.W, g.H);
  ctx.fillStyle = '#fff';
  ctx.fillRect(g.arte.x, g.arte.y, g.arte.w, g.arte.h);
}
