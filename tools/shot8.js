const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const html=require('fs').readFileSync(__dirname+'/../index.html','utf8');const res={};
for(const [lab,iso] of [["today","2026-10-07T12:00:00+02:00"],["mid","2026-10-08T10:00:00+02:00"],["after","2026-10-09T10:00:00+02:00"],["late","2026-10-30T10:00:00+01:00"]]){
 const p=await b.newPage({viewport:{width:1300,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.clock.setFixedTime(new Date(iso));
 await p.setContent('<!doctype html><meta charset=utf-8>'+html,{waitUntil:'load'});await p.waitForTimeout(300);
 res[lab]=await p.evaluate(()=>{go('home');const h=[...document.querySelectorAll('.tpill')].map(x=>x.textContent);go('today');const hero=document.querySelector('.hero')?.textContent;const side=document.querySelector('.sidefoot .lbl')?.textContent;
   go('games');startGame('boss',null,true);const pscOK=(()=>{go('psc-games');course='psc';try{startGame('lens',null,true);return G.rounds.length}catch(e){return 'ERR'}})();
   return {h,hero,side,psc:pscOK,lv:[1,2,3,4].map(l=>ALLQ.filter(q=>q.lv===l).length)};});
 if(lab==="today"){await p.evaluate(()=>{go('today');});await p.screenshot({path:__dirname+'/shots/x1.png'});}
 res[lab].errs=errs;await p.close();}
console.log(JSON.stringify(res,null,0));await b.close();})();
