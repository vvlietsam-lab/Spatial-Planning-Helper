/* 15 Oct: the mandatory readings of lectures 4–7 (Witte, Wiegmans & Louw 2025; De Satgé & Watson 2018; Liu & Zhou 2021) are not exam material
   (reported in class; check Brightspace). The lectures (slides) stay. Items that lean on these readings are taken out of every bank. */
const PSC_NOREAD=["p4","p5","p6","p7"];
const PSC_NORE=/Satg|\bLiu\b|\bZhou\b|Witte|Wiegmans|Louw|more claims than land|claims than land|port-city interface|puzzling space|dislocation, offside|multi-facetted|multi-level port/i;
(function(){const bad=(t,s)=>PSC_NOREAD.includes(t)&&PSC_NORE.test(s);
  const prune=(a,f)=>{if(!a)return;for(let i=a.length-1;i>=0;i--)if(f(a[i]))a.splice(i,1);};
  prune(OPEN,q=>bad(q.t,q.q+" "+(q.model||"")));
  prune(FC,f=>bad(f[0],f[1]+" "+f[2]));prune(PSC_FC,f=>bad(f[0],f[1]+" "+f[2]));
  [PSCQ_1,PSCQ_2].forEach(a=>prune(a,q=>bad(q.t,q.q+" "+q.e)));
  if(typeof MG!=="undefined")for(const k in MG)prune(MG[k],x=>x&&bad(x.t,JSON.stringify(x)));
  [typeof LENS!=="undefined"?LENS:null,typeof SEQ!=="undefined"?SEQ:null].forEach(a=>prune(a,x=>bad(x.t,JSON.stringify(x))));
  PSC.filter(l=>["p4","p6","p7"].includes(l.id)).forEach(l=>{l.man.noexam=true;});
  PSC.find(l=>l.id==="p5").man.noexam=true;})();
