const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const html=require('fs').readFileSync(__dirname+'/../index.html','utf8');
const p=await b.newPage({viewport:{width:1360,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.setContent('<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">'+html,{waitUntil:'load'});
await p.waitForTimeout(300);
const ids=await p.evaluate(()=>READINGS.map(r=>r.id));
for(const id of ids){await p.evaluate(i=>go('readings',i),id);}
for(const v of ['today','weeks','readings','framework','flash','quiz','open','mock','sources','method','menu','psc','psc-lectures','psc-flash','psc-essay','studio','home']){await p.evaluate(v=>go(v),v);}
await p.evaluate(()=>{go('quiz');startQuiz(null)});
const info=await p.evaluate(()=>({n:READINGS.length,fc:CARDS.length,q:QS.length,o:OQ.length,dupFC:CARDS.length-new Set(CARDS.map(c=>c.k)).size,dupQ:QS.length-new Set(QS.map(c=>c.k)).size,quizpool:Q.list.every(q=>MIDR().some(r=>r.id===q.t)),badT:[...CARDS,...QS,...OQ].filter(c=>!R[c.t]).map(c=>c.t)}));
console.log(JSON.stringify(info),errs.slice(0,5));
await p.evaluate(()=>go('readings','harvey'));await p.waitForTimeout(200);await p.screenshot({path:__dirname+'/shots/t1.png'});
await p.evaluate(()=>go('readings','olson'));await p.waitForTimeout(200);await p.screenshot({path:__dirname+'/shots/t2.png',fullPage:true});
await b.close();})();
