/* Site smoke test. Run after every build:  NODE_PATH=$(npm root -g) node tools/test_site.js
   Renders every view of every course (desktop and phone width), plays quizzes, and checks question banks for
   broken items and answer leaks. Exits with code 1 when something fails. */
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const fails=[];const file='file://'+path.resolve(__dirname,'../index.html');
for(const vp of [{width:1280,height:900},{width:390,height:844}]){
 const p=await b.newPage({viewport:vp});p.on('pageerror',e=>fails.push(vp.width+' pageerror: '+e.message));
 await p.goto(file);await p.waitForTimeout(400);
 const r=await p.evaluate(async(phone)=>{const out=[];const w=()=>new Promise(r=>setTimeout(r,12));
  const check=lab=>{const t=document.querySelector('#app').innerText;const m=t.match(/.{0,40}(undefined|\bNaN\b|\[object Object\]|went wrong on this page).{0,40}/);if(m)out.push(lab+': '+m[0]);if(t.trim().length<30)out.push(lab+': empty');if(phone&&document.documentElement.scrollWidth>400)out.push(lab+': horizontal scroll '+document.documentElement.scrollWidth);};
  const tv=async(v,s,lab)=>{try{go(v,s);await w();check(lab||v+(s?'/'+s:''));}catch(e){out.push((lab||v)+': '+e.message);}};
  await tv('home');
  for(const v of ['today','readings','quiz','drills','final','sheets','link','games']) await tv(v);
  for(const id of [...new Set(BPT_LEC.flatMap(l=>l.rd))]) await tv('readings',id);
  for(const l of PSC) await tv('psc-lecture',l.id);
  for(const c of CT.list()){
   const base=['','-lectures','-quiz','-open','-cards','-exam','-teach','-missing','-menu'].concat(Object.keys(c.views||{}).map(k=>'-'+k));
   for(const v of base) await tv(c.id+v);
   for(const id of Object.keys(c.readings).filter(k=>c.readings[k].status==='full')) await tv(c.id+'-reading',id);
   for(const n of Object.keys(c.teach||{})){go(c.id+'-teach',n);await w();for(let i=0;i<60;i++){const opt=document.querySelector('#app [data-ctta]:not([disabled])');if(opt){opt.click();await w();}const nx=[...document.querySelectorAll('#app [data-ctts]')].find(x=>x.textContent.trim()==='Next');if(!nx)break;nx.click();await w();check(c.id+' teach '+n+' scene '+i);}}
   // play one quiz round to the end
   go(c.id+'-quiz');await w();const qb=document.querySelector('#app [data-ctquiz="all"]');if(qb&&CT.bank(c,{}).length){qb.click();await w();for(let i=0;i<14;i++){const o=document.querySelector('#app [data-ctopt]:not([disabled])');if(!o)break;o.click();await w();const n=document.getElementById('ctnext');if(n){n.click();await w();}}check(c.id+' quiz end');}
   // bank checks
   CT.bank(c,{}).forEach(q=>{const lab=c.id+' '+q.k;if(!q.o||q.o.length<3)out.push(lab+': fewer than 3 options');if(q.a==null||q.a<0||q.a>=q.o.length)out.push(lab+': bad answer index');if(new Set(q.o.map(x=>String(x).toLowerCase())).size<q.o.length)out.push(lab+': duplicate options');const r=String(q.o[q.a]).toLowerCase();if(r.length>12&&q.q.toLowerCase().includes(r))out.push(lab+': answer appears in question');if(!q.gen&&!q.src)out.push(lab+': no source');if(q.r&&!c.readings[q.r])out.push(lab+': unknown reading '+q.r);});
  }
  return out;},vp.width<500);
 r.forEach(x=>fails.push(vp.width+' '+x));await p.close();}
await b.close();
if(fails.length){console.log('FAIL ('+fails.length+')\n'+fails.slice(0,60).join('\n'));process.exit(1);}console.log('All checks passed');})();
