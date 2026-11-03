/* ===== drills: "Signal words (hard)" (3 Nov). Built from the signal-word lists on the theory sheets and the drill theory cards.
   Exam skill: recognise a perspective from several signals at once, spot combinations, avoid trap words, and highlight signals in real passages. */
function sigWords(){const W={};DTH.forEach(t=>{W[t.id]=new Set((t.words||[]).map(w=>String(w).toLowerCase().trim()));});
 try{const P=shParse();Object.entries(SHEET_TH).forEach(([sid,ths])=>{if(ths.length!==1||!P[sid])return;(P[sid].words||[]).forEach(w=>W[ths[0]]&&W[ths[0]].add(String(w).toLowerCase().trim()));});}catch(e){}
 const cnt={};Object.values(W).forEach(s=>s.forEach(w=>{cnt[w]=(cnt[w]||0)+1;}));
 const uniq={},shared={};Object.entries(W).forEach(([id,s])=>{uniq[id]=[...s].filter(w=>w&&cnt[w]===1);});
 Object.entries(W).forEach(([id,s])=>s.forEach(w=>{if(cnt[w]>1)(shared[w]=shared[w]||[]).push(id);}));
 return {W,uniq,shared};}
function dSig(){const out=[],T=DTH,{W,uniq,shared}=sigWords();const nm=id=>DT(id).n;const q=w=>"“"+w+"”";
 const pairName=(a,b)=>nm(a)+" + "+nm(b);
 /* a) clusters of three signals from one perspective */
 T.forEach(t=>{const u=uniq[t.id]||[];if(u.length<3)return;for(let k=0;k<14;k++){const three=dPick(u,3);
  out.push(dMC("You highlight three terms in an exam article: "+three.map(q).join(", ")+". Which perspective do they point to together?",t.n,dPick(T.filter(x=>x.id!==t.id).map(x=>x.n),3),"All three are signal words of "+t.n+" (sheet "+t.sh+"). Several signals plus the article's own explanation is what makes a Q1 claim safe.","Signal words (hard)"));}});
 /* b) combinations: two signals each from two perspectives */
 T.forEach(a=>T.forEach(b=>{if(a.id>=b.id)return;const ua=uniq[a.id]||[],ub=uniq[b.id]||[];if(ua.length<2||ub.length<2)return;
  const right=pairName(a.id,b.id);const wrong=[];T.forEach(x=>{if(x.id!==a.id&&x.id!==b.id){wrong.push(pairName(a.id,x.id));wrong.push(pairName(x.id,b.id));}});
  for(let k=0;k<3;k++){const terms=shuffle(dPick(ua,2).concat(dPick(ub,2)));
   out.push(dMC("An article uses "+terms.map(q).join(", ")+". The exam allows a combination of perspectives. Which combination fits?",right,dPick(wrong,3),"Two signals each: "+a.n+" ("+terms.filter(w=>ua.includes(w)).map(q).join(", ")+") and "+b.n+" ("+terms.filter(w=>ub.includes(w)).map(q).join(", ")+"). In Q1, argue which of the two carries the main argument.","Signal words (hard)"));}}));
 /* c) trap words that appear on more than one sheet */
 Object.entries(shared).forEach(([w,ids])=>{if(ids.length!==2)return;const right=pairName(ids[0],ids[1]);const wrong=[];T.forEach(a=>T.forEach(b=>{if(a.id<b.id&&!(ids.includes(a.id)&&ids.includes(b.id)))wrong.push(pairName(a.id,b.id));}));
  out.push(dMC("Trap word: "+q(w)+" is a signal on two theory sheets, so on its own it does not decide Q1. Which two perspectives share it?",right,dPick(wrong,3),q(w)+" is on the lists of "+nm(ids[0])+" and "+nm(ids[1])+". Look for a second signal that only one of them has before you decide.","Signal words (hard)"));});
 /* d) the one that does not fit: three signals of one perspective plus a trap or a neighbour */
 T.forEach(t=>{const u=uniq[t.id]||[];if(u.length<3)return;const near=T.filter(x=>x.id!==t.id);for(let k=0;k<8;k++){const three=dPick(u,3);const o=dPick(near,1)[0];const odd=dPick(uniq[o.id]||[],1)[0];if(!odd)continue;
  out.push(dMC("Highlighting an article that works in "+t.n+", you mark four terms. Which one would make you check for a second perspective?",odd,three,q(odd)+" is a signal of "+o.n+", not "+t.n+". If it keeps coming back, consider a combination in Q1.","Signal words (hard)"));}});
 /* e) highlight practice in real passages: sentences from the course readings with at least two signals of their own perspective */
 const sents=t=>String(t||"").replace(/\s+/g," ").split(/(?<=[.!?])\s+(?=[A-Z'‘"(])/).map(x=>x.trim()).filter(x=>x.length>=70&&x.length<=320&&!/\?/.test(x)&&!/\b(slides?|this page|this site|exam|seminar|tutorial|Q[123])\b/i.test(x));
 const has=(x,w)=>new RegExp("\\b"+w.replace(/[.*+?^$|()[\]{}\\]/g,"\\$&").replace(/\s+/g,"[\\s-]+"),"i").test(x);
 Object.keys(DRD).forEach(id=>{const r=R[id];if(!r)return;const th=DRD[id];const own=[...(W[th]||[])];const S=new Set();
  sents(r.one).forEach(x=>S.add(x));(Array.isArray(r.summary)?r.summary:[r.summary]).forEach(p=>sents(p).forEach(x=>S.add(x)));(r.ext||[]).forEach(sec=>(sec.p||[]).forEach(p=>sents(typeof p==="string"?p:"").forEach(x=>S.add(x))));(r.quotes||[]).forEach(x=>sents(String(x)).forEach(y=>S.add(y)));
  [...S].forEach(x=>{const hits=own.filter(w=>has(x,w));if(hits.length<2)return;const tr=Object.entries(W).filter(([o])=>o!==th).flatMap(([o,s])=>[...s].filter(w=>has(x,w)&&!own.includes(w)).map(w=>[w,o]));
   const m=exTh(x);if(m.hit.some(h=>h!==th))return;let txt=typeof mask==="function"?mask(m.t,id):m.t;
   out.push(dMC("Highlight practice. Passage from a course reading: “"+txt+"” Which perspective do its signal words point to?",nm(th),dPick(T.filter(t=>t.id!==th).map(t=>t.n),3),"Highlight: "+hits.map(q).join(", ")+" ("+nm(th)+")."+(tr.length?" Careful: "+tr.slice(0,2).map(([w,o])=>q(w)+" is also a signal of "+nm(o)).join("; ")+", but the passage's other signals decide it.":"")+" From "+short(r)+".","Signal words (hard)"));});});
 return out.filter(Boolean);}
DMODES.splice(1,0,["sig","Signal words (hard)","Q1: clusters, combinations, trap words and highlighting real passages"]);
const _dGenSig=dGen;dGen=function(mode){if(mode==="sig")return shuffle(dSig());const b=_dGenSig(mode);return mode==="mix"?shuffle(b.concat(dSig())):b;};
