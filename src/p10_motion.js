/* ================= V3 motion layer ================= */
const RM=matchMedia("(prefers-reduced-motion: reduce)");
let _navKey=null,_pillTop=null,_greens=null;
const easeOut=t=>1-Math.pow(1-t,3);
function countUp(el,to,dur){const tn=[...el.childNodes].find(n=>n.nodeType===3&&/\d/.test(n.textContent));if(!tn)return;
  const txt=tn.textContent,m=txt.match(/-?\d+/);if(!m)return;const end=+m[0];if(end<=0)return;const t0=performance.now();
  const step=now=>{const k=Math.min(1,(now-t0)/dur);tn.textContent=txt.replace(m[0],Math.round(end*easeOut(k)));if(k<1)requestAnimationFrame(step);};
  tn.textContent=txt.replace(m[0],"0");requestAnimationFrame(step);}
function stagger(app){let i=0;
  const sel=".fade > *, .fade .grid > *, .fade .list > .item, .tiles > .tile, .boxes > div, .upc > .upi, .stack > *, .rside > *";
  app.querySelectorAll(sel).forEach(el=>{if(i>16)return;const r=el.getBoundingClientRect();if(r.top>innerHeight+40)return;el.classList.add("stg");el.style.setProperty("--i",i++);});
  app.querySelectorAll(".heat i").forEach((c,j)=>c.style.setProperty("--h",j));}
function reveal(app){if(!("IntersectionObserver" in window))return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{rootMargin:"0px 0px -8% 0px"});
  app.querySelectorAll(".fade h3, .fade h4, .fade .card, .fade figure, .fade blockquote, .fade dl.concepts > div, .fade .tbl, .fade .note, .fade .list > .item, .fade .qcard, .fade .wk").forEach(el=>{
    if(el.classList.contains("stg"))return;if(el.getBoundingClientRect().top<innerHeight)return;el.classList.add("rv");io.observe(el);});}
function animateMeters(app){
  app.querySelectorAll(".ring").forEach(r=>{const p=parseFloat(r.style.getPropertyValue("--p"))||0;if(!p)return;r.style.setProperty("--p",0);const b=r.querySelector("b");if(b)countUp(b,p,1100);
    requestAnimationFrame(()=>requestAnimationFrame(()=>r.style.setProperty("--p",p)));});
  app.querySelectorAll(".bar i").forEach(i=>{const w=i.style.width;if(!w||w==="0%")return;i.style.width="0%";requestAnimationFrame(()=>requestAnimationFrame(()=>i.style.width=w));});
  app.querySelectorAll(".stat, .tnums b, .upd, .tbig").forEach(el=>countUp(el,0,900));
  document.querySelectorAll(".sidefoot .big").forEach(el=>countUp(el,0,900));}
function navPill(){const nav=document.querySelector("#side .nav");if(!nav)return;const cur=nav.querySelector('button[aria-current="page"]');if(!cur){_pillTop=null;return;}
  const pill=document.createElement("div");pill.className="navpill";pill.style.height=cur.offsetHeight+"px";
  const to=cur.offsetTop;pill.style.top=(_pillTop??to)+"px";if(_pillTop==null||RM.matches)pill.style.transition="none";nav.prepend(pill);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{pill.style.transition="";pill.style.top=to+"px";}));_pillTop=to;}
function greenSet(){return new Set(Object.keys(R).filter(id=>topicStats(id).mastered));}
function confetti(){if(RM.matches)return;const cols=["#ff3b5c","#30d158","#5e5ce6","#ff9f0a","#64d2ff"];const x0=innerWidth/2,y0=innerHeight*.45;
  for(let k=0;k<36;k++){const s=document.createElement("i");s.className="cf";s.style.background=cols[k%cols.length];document.body.appendChild(s);
    const a=Math.random()*Math.PI*2,v=160+Math.random()*260,dx=Math.cos(a)*v,dy=Math.sin(a)*v-220;
    s.animate([{transform:`translate(${x0}px,${y0}px) rotate(0)`,opacity:1},{transform:`translate(${x0+dx}px,${y0+dy+420}px) rotate(${Math.random()*720-360}deg)`,opacity:0}],{duration:1300+Math.random()*700,easing:"cubic-bezier(.2,.6,.4,1)"}).onfinish=()=>s.remove();}}
const _renderBase=render;
render=function(){
  const key=(course??"home")+"|"+view+"|"+(sub??""),nav=key!==_navKey;_navKey=key;
  const before=_greens;
  _renderBase();
  const app=$("#app");document.body.classList.remove("c-bpt","c-psc","c-studio");if(course)document.body.classList.add("c-"+course);
  if(["today","readings","games","weeks","psc","psc-lectures","psc-games","studio"].includes(view)&&!(view==="readings"&&sub)){const f=app.querySelector(".fade");if(f&&!f.querySelector(".msky")&&typeof miniSky==="function")f.insertAdjacentHTML("afterbegin",miniSky());}
  if(nav&&!RM.matches){app.classList.remove("enter");void app.offsetWidth;app.classList.add("enter");stagger(app);animateMeters(app);reveal(app);clearTimeout(render._t);render._t=setTimeout(()=>app.classList.remove("enter"),1600);}
  navPill();readProgress();if(nav){const cr=document.querySelector(".cur-ring");if(cr)cr.classList.remove("big");}
  _greens=greenSet();
  if(before){const fresh=[..._greens].filter(id=>!before.has(id));if(fresh.length){confetti();toast(`${short(R[fresh[0]])} is green ✓`);}}
};
/* flashcard: fling the card out before the next one comes in */
const _rateBase=rate;let _flinging=false;
rate=function(r){const fc=$("#fcard");if(!fc||RM.matches){_rateBase(r);return;}if(_flinging)return;_flinging=true;
  fc.classList.add(r===0?"out-l":"out-r");setTimeout(()=>{_flinging=false;_rateBase(r);const n=$("#fcard");if(n)n.classList.add("in");},200);};
/* tiles: cursor spotlight + gentle tilt */
document.addEventListener("pointermove",e=>{const t=e.target.closest&&e.target.closest(".tile");if(!t||RM.matches)return;const b=t.getBoundingClientRect(),x=(e.clientX-b.left)/b.width,y=(e.clientY-b.top)/b.height;
  t.style.setProperty("--mx",x*100+"%");t.style.setProperty("--my",y*100+"%");t.style.setProperty("--rx",((x-.5)*5).toFixed(2)+"deg");t.style.setProperty("--ry",((.5-y)*5).toFixed(2)+"deg");},{passive:true});
function readProgress(){let bar=document.querySelector(".readbar");const w=document.querySelector(".extwrap");
  if(!w){if(bar)bar.style.opacity=0;return;}if(!bar){bar=document.createElement("div");bar.className="readbar";document.body.appendChild(bar);}
  const r=w.getBoundingClientRect(),tot=r.height-innerHeight*.6,done=Math.min(1,Math.max(0,(-r.top+innerHeight*.3)/Math.max(1,tot)));bar.style.opacity=1;bar.style.transform=`scaleX(${done})`;}
addEventListener("scroll",()=>{document.body.classList.toggle("scrolled",scrollY>8);readProgress();},{passive:true});

/* home: custom cursor + magnetic CTA (desktop only) */
(function(){if(!matchMedia("(pointer:fine)").matches||RM.matches)return;
  const d=document.createElement("div"),r=document.createElement("div");d.className="cur-dot";r.className="cur-ring";document.body.append(d,r);
  let x=-100,y=-100,rx=-100,ry=-100;
  addEventListener("pointermove",e=>{x=e.clientX;y=e.clientY;document.body.classList.add("has-cursor");
    if(document.body.classList.contains("is-home")){const fx=(x/innerWidth-.5);document.querySelectorAll(".sky .lyr").forEach(l=>{l.style.transform=`translateX(${(-fx*+l.dataset.depth).toFixed(1)}px)`;});}
    const t=e.target.closest&&e.target.closest(".tile");r.classList.toggle("big",!!t);
    if(t){const c=t.querySelector(".tcta");if(c){const b=c.getBoundingClientRect(),dx=x-(b.left+b.width/2),dy=y-(b.top+b.height/2),dist=Math.hypot(dx,dy);
      if(dist<160){c.style.transform=`translate(${dx*.18}px,${dy*.18}px)`;}else c.style.transform="";}}
    document.querySelectorAll(".tile .tcta").forEach(c=>{if(!t||!t.contains(c))c.style.transform="";});},{passive:true});
  addEventListener("pointerleave",()=>document.body.classList.remove("has-cursor"));
  (function loop(){rx+=(x-rx)*.18;ry+=(y-ry)*.18;d.style.transform=`translate(${x}px,${y}px)`;r.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(loop);})();})();

/* ---------- feedback: rewarding but calm ---------- */
function edge(kind){if(RM.matches)return;let e=document.querySelector(".edgefx");if(!e){e=document.createElement("div");e.className="edgefx";document.body.appendChild(e);}
  e.className="edgefx "+kind;void e.offsetWidth;e.classList.add("on");}
function burst(el,kind){if(RM.matches||!el)return;const b=el.getBoundingClientRect(),cx=b.left+Math.min(b.width-20,40),cy=b.top+b.height/2;
  const cols=kind==="good"?["#22c55e","#ffcd00","#4ade80"]:["#c00a35"];const n=kind==="good"?8:0;
  for(let i=0;i<n;i++){const p=document.createElement("i");p.className="pfx";p.style.background=cols[i%cols.length];document.body.appendChild(p);
    const a=Math.random()*Math.PI*2,v=26+Math.random()*34;
    p.animate([{transform:`translate(${cx}px,${cy}px) scale(1)`,opacity:1},{transform:`translate(${cx+Math.cos(a)*v}px,${cy+Math.sin(a)*v}px) scale(.3)`,opacity:0}],{duration:600+Math.random()*250,easing:"cubic-bezier(.2,.7,.3,1)"}).onfinish=()=>p.remove();}}
function floatTxt(el,txt,kind){if(RM.matches||!el)return;const b=el.getBoundingClientRect();const t=document.createElement("span");t.className="ffx "+kind;t.textContent=txt;t.style.left=(b.right-70)+"px";t.style.top=(b.top+b.height/2-10)+"px";document.body.appendChild(t);
  t.animate([{transform:"translateY(0)",opacity:0},{transform:"translateY(-8px)",opacity:1,offset:.25},{transform:"translateY(-30px)",opacity:0}],{duration:900,easing:"ease-out"}).onfinish=()=>t.remove();}
function judge(ok,optSel){requestAnimationFrame(()=>{const opt=document.querySelector(optSel||(ok?".opt.right":".opt.wrong"));const card=opt&&opt.closest(".qcard");
  edge(ok?"good":"bad");if(card){card.classList.remove("fx-good","fx-bad");void card.offsetWidth;card.classList.add(ok?"fx-good":"fx-bad");}
  if(ok){burst(opt,"good");floatTxt(opt,"✓","good");}});}
const _pickBase=pick;pick=function(j){const q=Q.list[Q.i];_pickBase(j);judge(j===q.a);};
if(typeof gPick==="function"){const _g=gPick;gPick=function(j){const rd=G&&G.rounds&&G.rounds[G.i];const before=G&&G.picked;_g(j);if(rd&&before==null&&G.picked!=null){judge(j===rd.a);if(G.streak>=3&&j===rd.a){const c=document.querySelector(".combo");if(c)floatTxt(c,"×"+(1+Math.min(G.streak-1,4)*.25).toFixed(2),"good");}}};}
if(typeof seqCheck==="function"){const _s=seqCheck;seqCheck=function(){_s();const f=G.res[G.res.length-1];requestAnimationFrame(()=>{edge(f>=.99?"good":f>=.5?"mid":"bad");const c=document.querySelector(".gq");if(c){c.classList.add(f>=.99?"fx-good":"fx-bad");if(f>=.99)burst(c,"good");}});};}
if(typeof pairTap==="function"){const _p=pairTap;pairTap=function(side,i){const was=G.pairs.filter(p=>p.done).length;_p(side,i);if(side==="r"){const now=G.pairs.filter(p=>p.done).length;requestAnimationFrame(()=>{if(now>was){const el=document.querySelectorAll(".pt.done");burst(el[el.length-1],"good");edge("good");}else edge("bad");});}};}
/* flashcards: tint the card by rating before it flies off */
const _rate2=rate;rate=function(r){const fc=$("#fcard");if(fc&&!RM.matches){fc.classList.add(["rt-bad","rt-mid","rt-good","rt-good"][r]);if(r>=2)burst(fc,"good");edge(r===0?"bad":r===1?"mid":"good");}_rate2(r);};
