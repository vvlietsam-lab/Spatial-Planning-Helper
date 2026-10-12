const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const html=require('fs').readFileSync(__dirname+'/../index.html','utf8');
const p=await b.newPage({viewport:{width:1300,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.setContent('<!doctype html><meta charset=utf-8>'+html,{waitUntil:'load'});await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const out={};out.lv=[1,2,3,4].map(l=>ALLQ.filter(q=>q.lv===l).length);out.mid=[1,2,3,4].map(l=>qPool(MIDR().map(r=>r.id),l).length);
 out.games={};for(const g of ["who","lens","bets","odd","chain","boss","pairs","compass"]){try{startGame(g,null,true);out.games[g]=(G.rounds||G.pairs||G.list||[]).length;}catch(e){out.games[g]="ERR "+e.message;}}
 // repetition: 6 lens games in midterm scope
 const seen=new Set();let dup=0,tot=0;for(let i=0;i<6;i++){startGame("lens",null,true);for(const rd of G.rounds){tot++;if(seen.has(rd.prompt+rd.scen))dup++;seen.add(rd.prompt+rd.scen);}}out.lensRep=[dup,tot,LENS.filter(x=>MIDR().some(r=>r.id===x.t)).length];
 const s2=new Set();let d2=0;for(let i=0;i<8;i++){startGame("bets",null,true);for(const rd of G.rounds){if(s2.has(rd.prompt))d2++;s2.add(rd.prompt);}}out.betsRep=[d2,80];
 // knowledge model: davoudi scenario
 delete S.k.davoudi;const qs=lv=>ALLQ.filter(q=>q.t==="davoudi"&&q.lv===lv);[[1,1],[1,0],[1,0],[1,1],[1,0],[2,0],[2,1],[2,0],[2,0],[2,0]].forEach(([l,x],i)=>recordQ(qs(l)[i%qs(l).length],!!x));
 out.afterEasy=Math.round(topicStats("davoudi").k*100);[[3,1],[3,1],[3,0],[3,1],[3,1],[4,1],[4,0],[4,1],[4,0],[4,1]].forEach(([l,x],i)=>recordQ(qs(l)[i%qs(l).length],!!x));out.afterHard=Math.round(topicStats("davoudi").k*100);
 out.fx=FX.length;out.official=ALLQ.filter(q=>q.official).length;out.aud=Object.keys(AUD).length;return out;});
await p.evaluate(()=>{S.lvl=3;startQuiz(["ni"]);});await p.waitForTimeout(800);await p.screenshot({path:__dirname+'/shots/y1.png'});
await p.evaluate(()=>go('final'));await p.waitForTimeout(800);await p.screenshot({path:__dirname+'/shots/y2.png'});
await p.evaluate(()=>go('final','fxb1'));await p.waitForTimeout(800);await p.screenshot({path:__dirname+'/shots/y3.png'});
await p.evaluate(()=>{startGame('odd',null,true);go('game','odd');});await p.waitForTimeout(800);await p.screenshot({path:__dirname+'/shots/y4.png'});
const ps=await p.evaluate(()=>{course='psc';const o={};for(const g of ["who","lens","bets","odd","chain","pairs"]){try{startGame(g,null,true);o[g]=(G.rounds||G.pairs||[]).length;}catch(e){o[g]="ERR "+e.message;}}course='bpt';return o;});
console.log(JSON.stringify(r),JSON.stringify(ps),errs);await b.close();})();
