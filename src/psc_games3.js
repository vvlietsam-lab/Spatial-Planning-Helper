/* ===== PSC-specific game modes (25 Oct), built for the PSC exam format: (a) comprehension 10 pts + (b) essay 40 pts with real-world cases.
   All rounds reuse the site's own exam questions (XQ), model answers and lecture cases; nothing new is claimed. ===== */
(function(){if(typeof GAMES==="undefined"||typeof XQ==="undefined")return;
const ab=s=>{const t=String(s||"");const i=t.indexOf("(b)");return {a:(i>=0?t.slice(0,i):t).replace(/^\s*\(a\)\s*(Comprehension:\s*)?/i,"").trim(),b:(i>=0?t.slice(i+3):"").replace(/^\s*(Essay:\s*)?/i,"").trim()};};
const sn=t=>String(t).split(/(?<=[.!?])\s+(?=[A-Z'‘"(])/).map(x=>x.trim()).filter(x=>x.length>25);
const cutS=(t,n)=>{let r="";for(const s of sn(t)){if((r+" "+s).length>n&&r)break;r=(r?r+" ":"")+s;}return r.length>n+80?r.slice(0,n).replace(/\s\S*$/,"")+"…":r;};
const L=id=>PSC.find(l=>l.id===id);
const cases=id=>((L(id)||{}).man||{}).examples?L(id).man.examples.filter(x=>x.t&&x.d):[];
const mk=(p,t)=>p+hash(t);
function caseRounds(ids,n){const X=XQ().filter(q=>ids.includes(q.t)&&cases(q.t).length);const all=PSC.filter(l=>l.theme!==2).flatMap(l=>cases(l.id).map(c=>({t:l.id,c})));
  const P=[];X.forEach(q=>{cases(q.t).forEach(c=>P.push({k:mk("cb",q.k+c.t),q,c}));});
  return gpick(P,n).map(x=>{const other=shuffle(all.filter(y=>y.t!==x.q.t)).filter((y,i,a)=>a.findIndex(z=>z.c.t===y.c.t)===i).slice(0,3);
    const m=shufMC([x.c.t,...other.map(y=>y.c.t)],0);const l=L(x.q.t);
    return mcRound(x.q.t,"Which course case comes from the lecture this essay question is built on, so you can use it in part (b)?",m.o,m.a,`${x.c.t} (lecture ${l.n}, ${l.title}): ${cutS(x.c.d,260)} The other cases: ${other.map(y=>y.c.t+" (lecture "+L(y.t).n+")").join("; ")}.`,{scen:ab(x.q.q).b.replace(/\s*Relate your argument to at least one real-world case[^]*$/,""),scenLab:"Exam question · part (b)",w:1.1,d:.5,link:x.q.t,qtype:"Pick your case"});});}
function tenRounds(ids,n){const X=XQ().filter(q=>ids.includes(q.t));const P=X.map(q=>({k:mk("tp",q.k),q}));
  return gpick(P,n).map(x=>{const me=x.q,src=XQ().filter(o=>o.k!==me.k);const same=shuffle(src.filter(o=>o.t===me.t)),th=shuffle(src.filter(o=>o.t!==me.t&&L(o.t).theme===L(me.t).theme)),rest=shuffle(src.filter(o=>L(o.t).theme!==L(me.t).theme));
    const d=[...same,...th,...rest].slice(0,3);const txt=o=>cutS(ab(o.model).a,280);const m=shufMC([txt(me),...d.map(txt)],0);
    return mcRound(me.t,"Part (a), 10 points: which answer actually answers this comprehension question?",m.o,m.a,"Model answer (a): "+cutS(ab(me.model).a,600),{scen:ab(me.q).a,scenLab:"Exam question · part (a)",w:1,d:.6,link:me.t,qtype:"Ten-pointer"});});}
function archRounds(ids,n){const X=XQ().filter(q=>ids.includes(q.t)&&sn(ab(q.model).b).length>=5);const P=X.map(q=>({k:mk("ea",q.k),q}));
  return gpick(P,n).map(x=>{const s=sn(ab(x.q.model).b);const k=5,idx=[...new Set(Array.from({length:k},(_,i)=>Math.round(i*(s.length-1)/(k-1))))];const steps=idx.map(i=>s[i].length>240?s[i].slice(0,237).replace(/\s\S*$/,"")+"…":s[i]);
    return {k:"seq",t:x.q.t,title:"Rebuild the line of argument of this model essay: "+ab(x.q.q).b.replace(/\s*Relate your argument to at least one real-world case[^]*$/,""),steps,e:"Order of the model answer (b): an essay moves from position and concepts, through cases and counter-arguments, to a conclusion. That structure is what the lecturer asks for in part 2.",pool:shuffle(steps.map((_,i)=>i)),order:[],checked:false,link:x.q.t};});}
GAMES.push(
 {id:"pcase",name:"Case Builder",tag:"Essay · real-world cases",desc:"An exam essay question lands on your desk. Which course case belongs with it? Part (b) is typically answered with real-world cases.",why:"The lecturer's exam slides ask you to relate part (b) to real-world cases; retrieving the right case for a question is the step that turns a theory essay into a strong one.",hue:150,bpt:0,psc:1},
 {id:"pten",name:"Ten-Pointer",tag:"Part (a) · comprehension",desc:"A part (a) question and four short answers, all from real model answers. Only one answers the question that was asked.",why:"Part (a) is 10 points for a short, precise answer; telling the precise answer apart from nearby ones trains discrimination between similar concepts.",hue:40,bpt:0,psc:1},
 {id:"parch",name:"Essay Architect",tag:"Part (b) · structure",desc:"Five sentences from a model essay, shuffled. Rebuild the line of argument from position to conclusion.",why:"The exam slides warn against answers without essay structure ('the kitchen sink'); ordering a model argument makes its structure visible.",hue:280,bpt:0,psc:1});
const GEN={pcase:[caseRounds,8],pten:[tenRounds,8],parch:[archRounds,4]};
const _sg=startGame;
startGame=function(id,opt,noGo){if(GEN[id]){const ids=gIds();if(!ids.length){toast("Nothing in this selection");return;}
   G={id,ids,i:0,picked:null,res:[],score:0,streak:0,best:0,started:Date.now(),done:false};G.rounds=GEN[id][0](ids,GEN[id][1]);
   if(!G.rounds.length){toast("No questions for this selection yet");G=null;return;}if(!noGo)go("psc-game",id);return;}
  const r=_sg(id,opt,true);
  if(id==="boss"&&isP()&&G&&G.rounds){G.rounds=shuffle([...G.rounds,...caseRounds(G.ids,2),...tenRounds(G.ids,1)]);G.dmg=100/Math.ceil(G.rounds.length*.7);}
  if(G&&!noGo)go(isP()?"psc-game":"game",id);return r;};
})();
