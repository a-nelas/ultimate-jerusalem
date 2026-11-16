/* InstaLanding design system · Mistfold · mistfold@1.0.0 — component script
   Vendored verbatim from <script id="mf-components-js"> in https://instalanding.ai/systems/mistfold/specimen.html
   Card reveal, local-only signup form, and the WebGL shader that lights blackletter headings. */
(function () {
  'use strict';
  /* Mistfold components, no libraries. Module cards fade up as they enter;
     the signup form thanks inline and sends nothing; links to "#" stay put.
     Then the page's WebGL shader text: one hidden GL context paints every
     blackletter heading (.mf-frame .mf-display, .mf-frame h2.mf-title, the
     header .mf-logo) and the footer wordmark with lit, drifting fbm ink in
     the five illumination tokens. The real text stays in the DOM; the CSS
     gradient text is the fallback when WebGL is missing. */
  function each(sel, fn) { [].forEach.call(document.querySelectorAll(sel), fn); }

  /* Module cards: reveal on scroll */
  var rio = window.IntersectionObserver && new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('mf-in'); rio.unobserve(e.target); } });
  }, { threshold: 0.15 });
  function cards() {
    each('.mf .mf-card', function (c) {
      if (c._mf) return; c._mf = true;
      if (rio && !c.classList.contains('mf-in')) rio.observe(c); else c.classList.add('mf-in');
    });
  }
  cards();
  if (window.MutationObserver) {
    var queued = false;
    new MutationObserver(function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; cards(); });
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  /* Waitlist: local only, nothing is sent anywhere */
  document.addEventListener('submit', function (e) {
    var form = e.target.closest && e.target.closest('.mf .mf-signup');
    if (!form) return;
    e.preventDefault();
    var box = form.parentNode, thanks = box && box.querySelector('.mf-thanks');
    if (thanks) thanks.textContent = "Your name is written in the ledger. We will reach you soon.";
    form.reset();
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.mf a[href="#"]');
    if (a) e.preventDefault();
  });
})();

/* Shader text, from the page */
(function(){
  const glc=document.createElement('canvas');
  const gl=glc.getContext('webgl',{premultipliedAlpha:true,alpha:true,antialias:false});
  if(!gl) return;                                   // CSS gradient text stays as the fallback
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  const vs=`attribute vec2 p;varying vec2 vUv;void main(){vUv=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;
  const fs=`precision highp float;
  uniform sampler2D uTex;uniform vec2 uRes;uniform float uTime,uUnit,uBevel;uniform vec2 uLight;uniform vec3 uC0,uC1,uC2,uC3,uC4;varying vec2 vUv;
  float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
  float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
  vec3 pal(float t){
    vec3 c0=uC0,c1=uC1,c2=uC2,c3=uC3,c4=uC4;
    t=fract(t)*5.;vec3 c=mix(c0,c1,smoothstep(0.,1.,t));c=mix(c,c2,smoothstep(1.,2.,t));
    c=mix(c,c3,smoothstep(2.,3.,t));c=mix(c,c4,smoothstep(3.,4.,t));return mix(c,c0,smoothstep(4.,5.,t));}
  float A(vec2 uv){return texture2D(uTex,uv).a;}
  void main(){
    float a=A(vUv); if(a<.004){gl_FragColor=vec4(0.);return;}
    vec2 px=1./uRes; float r=uBevel;
    float dx=A(vUv+vec2(px.x*r,0.))-A(vUv-vec2(px.x*r,0.));
    float dy=A(vUv+vec2(0.,px.y*r))-A(vUv-vec2(0.,px.y*r));
    vec3 n=normalize(vec3(-dx,-dy,.55));
    vec2 asp=vec2(uRes.x/uRes.y,1.);
    vec2 p=vUv*uRes/uUnit; float t=uTime*.07;
    vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));
    float f=fbm(p+2.2*q+vec2(t*.6,-t*.35));
    vec3 col=pal(f*1.3+p.x*.12+t*.4);
    col*=.8+.38*f;
    vec3 L=normalize(vec3((uLight-vUv)*asp,.75));
    float diff=clamp(dot(n,L),0.,1.);
    float spec=pow(clamp(dot(n,normalize(L+vec3(0.,0.,1.))),0.,1.),48.);
    col=col*(.5+.62*diff)+vec3(spec*.6);
    float band=vUv.x+(vUv.y-.5)*.45*asp.y/asp.x*4.-(fract(uTime*.06)*1.9-.45);
    col+=vec3(.95,1.,.97)*smoothstep(.06,0.,abs(band))*.4;
    col+=(hash(gl_FragCoord.xy+fract(uTime))-.5)*.03;
    gl_FragColor=vec4(clamp(col,0.,1.)*a,a);
  }`;
  function sh(t,src){const o=gl.createShader(t);gl.shaderSource(o,src);gl.compileShader(o);
    if(!gl.getShaderParameter(o,gl.COMPILE_STATUS)){console.warn(gl.getShaderInfoLog(o));return null}return o}
  const v=sh(gl.VERTEX_SHADER,vs), f=sh(gl.FRAGMENT_SHADER,fs); if(!v||!f) return;
  const prog=gl.createProgram();gl.attachShader(prog,v);gl.attachShader(prog,f);gl.linkProgram(prog);
  if(!gl.getProgramParameter(prog,gl.LINK_STATUS)) return;
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(prog,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  const U={};['uRes','uTime','uUnit','uBevel','uLight','uC0','uC1','uC2','uC3','uC4'].forEach(n=>U[n]=gl.getUniformLocation(prog,n));
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
  gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);

  const items=[];
  function makeItem(el,canvas,mode,text){
    const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);
    [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.LINEAR));
    [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.CLAMP_TO_EDGE));
    const it={el,canvas,mode,text,ctx:canvas.getContext('2d'),off:document.createElement('canvas'),tex,
      w:0,h:0,unit:200,bevel:2,visible:true,light:[.3,.8],phase:items.length*1.7,pal:null,palT:-1e9};
    items.push(it); return it;
  }


  function upload(it){
    gl.bindTexture(gl.TEXTURE_2D,it.tex);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,it.off);
  }
  function setFont(ctx,cs){
    ctx.font=`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    if('letterSpacing' in ctx) ctx.letterSpacing=(cs.letterSpacing==='normal'?'0px':cs.letterSpacing);
  }
  function layout(it){
    // DPR capped at 1.5: these canvases can be page-wide, and the noise is soft enough not to need more
    const dpr=Math.min(window.devicePixelRatio||1,1.5);
    const o=it.off.getContext('2d');
    if(it.mode==='overlay'){
      const el=it.el, cs=getComputedStyle(el), box=el.getBoundingClientRect(), sc=box.width/(el.offsetWidth||box.width||1)||1;
      if(!box.width) return;
      const fsz=parseFloat(cs.fontSize), pad=Math.ceil(fsz*.35);
      const W=Math.ceil(box.width/sc+pad*2), H=Math.ceil(box.height/sc+pad*2);
      Object.assign(it.canvas.style,{left:-pad+'px',top:-pad+'px',width:W+'px',height:H+'px'});
      it.off.width=it.canvas.width=Math.round(W*dpr); it.off.height=it.canvas.height=Math.round(H*dpr);
      o.setTransform(dpr,0,0,dpr,0,0);o.clearRect(0,0,W,H);setFont(o,cs);o.fillStyle='#fff';o.textBaseline='alphabetic';
      const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT); let node;
      while((node=walker.nextNode())){
        const re=/\S+/g; let m;
        while((m=re.exec(node.data))){
          const r=document.createRange();r.setStart(node,m.index);r.setEnd(node,m.index+m[0].length);
          const rect=r.getClientRects()[0]; if(!rect) continue;
          const mt=o.measureText(m[0]);
          const fA=mt.fontBoundingBoxAscent||fsz*.8, fD=mt.fontBoundingBoxDescent||fsz*.2;
          const base=(rect.top-box.top)/sc+pad+(rect.height/sc-(fA+fD))/2+fA;
          o.fillText(m[0],(rect.left-box.left)/sc+pad,base);
        }
      }
      it.unit=fsz*dpr*1.5; it.bevel=Math.max(1,Math.min(3,fsz*dpr*.03));
    } else {
      const W=it.el.clientWidth; if(!W) return;
      const fam=getComputedStyle(it.el.querySelector('.mf-mark-fallback')||it.el).fontFamily;
      o.setTransform(1,0,0,1,0,0);o.font=`100px ${fam}`;
      const m=o.measureText(it.text);
      const w100=(m.actualBoundingBoxLeft+m.actualBoundingBoxRight)||m.width;
      const size=Math.min(W*.96/w100*100,320);
      o.font=`${size}px ${fam}`;
      const mm=o.measureText(it.text);
      const asc=mm.actualBoundingBoxAscent||size*.8, desc=mm.actualBoundingBoxDescent||size*.2;
      const left=mm.actualBoundingBoxLeft||0, tw=(mm.actualBoundingBoxLeft+mm.actualBoundingBoxRight)||mm.width;
      const pad=Math.ceil(size*.06), H=Math.ceil(asc+desc+pad*2);
      it.canvas.style.height=H+'px';
      it.off.width=it.canvas.width=Math.round(W*dpr); it.off.height=it.canvas.height=Math.round(H*dpr);
      o.setTransform(dpr,0,0,dpr,0,0);o.clearRect(0,0,W,H);o.font=`${size}px ${fam}`;o.fillStyle='#fff';
      o.fillText(it.text,(W-tw)/2+left,pad+asc);
      it.unit=it.canvas.height/1.8;
      it.bevel=2.5*Math.max(1,it.canvas.height/400);
    }
    it.w=it.canvas.width; it.h=it.canvas.height;
    upload(it);
    if(it.mode==='overlay') it.el.classList.add('mf-shaded');
    const maxW=Math.max(...items.map(i=>i.w)), maxH=Math.max(...items.map(i=>i.h));
    if(glc.width<maxW||glc.height<maxH){glc.width=Math.max(glc.width,maxW);glc.height=Math.max(glc.height,maxH);}
    render(it,performance.now());
  }

  let pointer=null;
  addEventListener('pointermove',e=>pointer=[e.clientX,e.clientY],{passive:true});
  document.addEventListener('pointerleave',()=>pointer=null);

  function render(it,now){
    if(!it.w||!it.h) return;
    const t=now/1000+it.phase;
    let goal=[.5+.45*Math.cos(t*.35),.75+.35*Math.sin(t*.5)];
    if(pointer){
      const r=it.canvas.getBoundingClientRect(), m=Math.max(160,r.height);
      if(pointer[0]>r.left-m&&pointer[0]<r.right+m&&pointer[1]>r.top-m&&pointer[1]<r.bottom+m)
        goal=[(pointer[0]-r.left)/r.width,1-(pointer[1]-r.top)/r.height];
    }
    it.light[0]+=(goal[0]-it.light[0])*.07; it.light[1]+=(goal[1]-it.light[1])*.07;
    gl.viewport(0,0,it.w,it.h);
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindTexture(gl.TEXTURE_2D,it.tex);
    gl.uniform2f(U.uRes,it.w,it.h);gl.uniform1f(U.uTime,reduce?8.+it.phase:t);
    gl.uniform1f(U.uUnit,it.unit);gl.uniform1f(U.uBevel,it.bevel);gl.uniform2f(U.uLight,it.light[0],it.light[1]);
    const P=palette(it,now);for(let i=0;i<5;i++)gl.uniform3fv(U['uC'+i],P[i]);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    it.ctx.clearRect(0,0,it.w,it.h);
    it.ctx.drawImage(glc,0,glc.height-it.h,it.w,it.h,0,0,it.w,it.h);
  }
  // Skip work in a background tab: demos often sit in a preview iframe several tabs deep
  function loop(now){
    for(let i=items.length-1;i>=0;i--) if(!items[i].el.isConnected){const it=items.splice(i,1)[0];if(io)io.unobserve(it.canvas);ro.unobserve(it.el);}
    if(!document.hidden)items.forEach(it=>{if(it.visible)render(it,now)});requestAnimationFrame(loop);}

  // The blackletter face must be loaded before text is rasterised into the textures
  const fontsReady=document.fonts
    ? Promise.race([document.fonts.load('100px UnifrakturMaguntia').catch(()=>{}),new Promise(r=>setTimeout(r,2500))]).then(()=>document.fonts.ready)
    : Promise.resolve();
  // The palette, read from the tokens on the heading (so the playground and a host's overrides reach the shader)
  const PAL=['--mf-sage','--mf-mint','--mf-blue','--mf-violet','--mf-lilac'];
  const PAL0=[[.298,.447,.392],[.561,.737,.667],[.298,.427,.482],[.404,.353,.486],[.702,.639,.776]];
  function rgb(v){const m=/^#?([0-9a-f]{6})$/i.exec((v||'').trim());return m?[0,2,4].map(i=>parseInt(m[1].slice(i,i+2),16)/255):null;}
  function palette(it,now){
    if(now-it.palT>1000){const cs=getComputedStyle(it.el);it.pal=PAL.map((n,i)=>rgb(cs.getPropertyValue(n))||PAL0[i]);it.palT=now;}
    return it.pal;
  }
  const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{const it=items.find(i=>i.canvas===e.target);if(it)it.visible=e.isIntersecting}),{rootMargin:'80px'}):null;
  let ready=false, rt;
  const ro=new ResizeObserver(()=>{clearTimeout(rt);rt=setTimeout(()=>items.forEach(layout),80)});
  function attach(el,canvas,mode,text){
    const it=makeItem(el,canvas,mode,text);
    if(io) io.observe(canvas);
    if(ready){layout(it);ro.observe(el);}
  }
  // 1) inline headings + header wordmark: a canvas overlays the real text, which stays in the DOM for accessibility
  // 2) footer wordmark: its canvas is sized to fit the panel width
  function find(){
    document.querySelectorAll('.mf .mf-nav .mf-logo, .mf .mf-frame .mf-display, .mf .mf-frame h2.mf-title').forEach(el=>{
      if(el._mfShader) return; el._mfShader=true;
      el.querySelectorAll(':scope > .mf-shader-canvas').forEach(c=>c.remove());   // a copy of a lit heading carries a blank canvas
      el.classList.remove('mf-shaded');
      const c=document.createElement('canvas');c.className='mf-shader-canvas';c.setAttribute('aria-hidden','true');
      el.classList.add('mf-shader-host');el.appendChild(c);attach(el,c,'overlay');
    });
    document.querySelectorAll('.mf .mf-finale-mark').forEach(mark=>{
      if(mark._mfShader) return; mark._mfShader=true;
      const fb=mark.querySelector('.mf-mark-fallback'), c=mark.querySelector('canvas');
      if(!c) return;
      attach(mark,c,'fit',(fb&&fb.textContent.trim())||'Mistfold');mark.classList.add('mf-gl-on');
    });
  }
  find();
  if(window.MutationObserver){
    let queued=false;
    new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;find();});})
      .observe(document.documentElement,{childList:true,subtree:true});
  }
  fontsReady.then(()=>{
    ready=true;
    items.forEach(layout);
    items.forEach(it=>ro.observe(it.el));
    if(!reduce) requestAnimationFrame(loop);
  });
})();
