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
  const app=$("#app");
  if(nav&&!RM.matches){app.classList.remove("enter");void app.offsetWidth;app.classList.add("enter");stagger(app);animateMeters(app);reveal(app);clearTimeout(render._t);render._t=setTimeout(()=>app.classList.remove("enter"),1600);}
  navPill();
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
addEventListener("scroll",()=>document.body.classList.toggle("scrolled",scrollY>8),{passive:true});
