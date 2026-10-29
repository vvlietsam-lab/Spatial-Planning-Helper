/* ===== BPT exam drills (stage 2, 30 Oct): short MCQ drills for the commentary format.
   Data per theory follows the checked theory sheets (bpt_sheets.js), the syllabus framework and Rydin (2021) Tables 10.2–10.3.
   Positions are tendencies: -1 / +1 on each axis, 0 = in between or both. ===== */
const DAX={sa:["Sources of planning outcomes","structure","agency"],rt:["Reproduction and change","reproduction","transformation"],de:["Reproduction and change","deliberate","emergent"],us:["Knowledge and expertise","universal","situated"],mp:["Knowledge and expertise","monist","pluralist"]};
const DTH=[
 {id:"rcp",n:"Rational comprehensive planning (governmental model)",sh:"1",
  words:["evidence based","optimal","cost benefit analysis","indicators","goals and means","monitoring and evaluation","policy cycle","implementation gap","what works","forecast"],
  art:"proposes or tests a tool (index, GIS model, multi criteria evaluation), measures policy effects, or advises planners how to decide better",
  blocks:["The rational model: define goals, generate alternatives, evaluate (e.g. CBA), choose, implement, monitor","Planning serves the public interest by correcting market failure","Facts and values separated: politicians set goals, experts supply means","Knowledge treated as objective and value free (positivism)"],
  rq:"Which policy option most effectively reduces X, and what is the effect of policy Y?",
  meth:["Policy evaluation methodologies (Rydin Table 10.2)","Cost benefit and multi criteria analysis","GIS and spatial modelling, indicators, ex ante / ex post evaluation"],
  pos:{sa:[1,"agency of the planner: rational choices steer outcomes"],rt:[1,"planning as a tool to change the city towards set goals"],de:[-1,"change results from a designed plan or policy"],us:[-1,"the model or indicator applies everywhere"],mp:[-1,"only expert, scientific knowledge counts"]},
  norm:"efficiency, welfare, the public interest (often implicit)",alt:["disc","up","pe","rc"]},
 {id:"rc",n:"Rational choice",sh:"2",
  words:["self interest","incentives","free riding","rent seeking","transaction costs","property rights","collective action problem","prisoner's dilemma","NIMBY","state failure"],
  art:"explains why landowners, homeowners or developers behave as they do, or why a policy fails because actors respond strategically",
  blocks:["Homo economicus: actors maximise their own utility","Not only markets fail: governments fail too","Olson: small, concentrated interests organise better than large groups (selective incentives)","Property rights (Needham) and rent seeking (Taylor) shape incentives"],
  rq:"Which incentives explain why actors support or block a policy?",
  meth:["Modelling planning as a game with incentives and payout matrices (Rydin Table 10.2)","Experiments or game playing","Analysing submissions and lobbying (Taylor's 264 submissions)"],
  pos:{sa:[1,"outcomes explained by individual choices of self-interested actors"],rt:[0,"insiders protect the status quo, but rules can be redesigned"],de:[0,"outcomes emerge from many choices; rules can be changed on purpose"],us:[-1,"one universal model of human behaviour"],mp:[-1,"knowledge from general models built by the researcher"]},
  norm:"efficiency",alt:["pe","disc","si","up"]},
 {id:"rci",n:"Rational choice institutionalism",sh:"3a",
  words:["rules in use","IAD framework","commons","self governance","credible commitment","monitoring and sanctions","humanly devised constraints"],
  art:"shows how a group governs a shared resource and which rules make cooperation work or fail",
  blocks:["North: institutions are 'humanly devised constraints', the rules of the game, not the players","Ostrom: users can govern commons themselves; the IAD framework's seven rule types","Rules give certainty, information and credible commitment"],
  rq:"Which rules in use make this commons robust, and how are they monitored and enforced?",
  meth:["IAD framework: map position, boundary, choice, aggregation, information, payoff and scope rules","Analysis of statutes and contracts; interviews on rules in use","Comparing successful and failed cases"],
  pos:{sa:[1,"actors create and use rules strategically"],rt:[1,"actors redesign rules to improve cooperation"],de:[-1,"change by deliberate rule design"],us:[-1,"general models of rational behaviour"]},
  norm:"efficiency and lasting cooperation",alt:["pe","up","si"]},
 {id:"si",n:"Sociological institutionalism",sh:"3b",
  words:["logic of appropriateness","norms","symbols","scripts","legitimacy","goodness of fit","shared understandings","taken for granted"],
  art:"explains why a planning concept or symbol (the Green Heart) keeps support, or why organisations copy policies",
  blocks:["March & Olsen: logic of appropriateness vs logic of consequences","Institutions as frames of meaning: symbol systems, cognitive scripts, moral templates (Hall & Taylor)","Goodness of fit (DiMaggio & Powell): arrangements reproduced because they fit established templates","Dembski & Salet: symbolic markers can institute new social meaning"],
  rq:"Which shared norms and symbols make actors support this concept, and how do they change in practice?",
  meth:["Organisational mapping with discourse analysis or interpretive policy analysis (Rydin Table 10.2, new institutionalism)","Interviews and participant observation in organisations","Analysis of plans, images and symbols"],
  pos:{sa:[0,"norms are internalised but changed in daily action"],rt:[-1,"mostly reproduction, gradual change"],us:[1,"meaning depends on context; interpretive"]},
  norm:"social meaning and legitimacy",alt:["rc","rci","pe","disc"]},
 {id:"hi",n:"Historical institutionalism",sh:"3c",
  words:["path dependence","lock in","critical juncture","increasing returns","sequence and timing","layering","conjunctural analysis"],
  art:"explains why a planning system persists for decades or changes at a moment of crisis, told in phases over a long time span",
  blocks:["Path dependence: earlier choices limit later ones","Critical junctures: short periods with a heightened chance that choices affect the outcome","Gradual change: layering, conversion, drift","Institutions distribute benefits unequally (power)"],
  rq:"How did path dependence and critical junctures shape this policy since a given year?",
  meth:["Process tracing","Historical and archival document analysis, timelines","Interviews with long-serving actors"],
  pos:{sa:[-1,"the past and existing rules shape what actors can do now"],rt:[-1,"mostly reproduction, transformation at critical junctures"],de:[1,"change emerges over time"],us:[1,"explanations depend on the history of a place"]},
  norm:"often equity: who gains from the rules",alt:["rci","up","rcp"]},
 {id:"ei",n:"Evolutionary institutionalism",sh:"3d",
  words:["spontaneous order","kosmos vs taxis","trial and error","complex adaptive system","dispersed knowledge","general rules","proscriptive rules"],
  art:"argues against master plans and for flexible frameworks or bottom-up development",
  blocks:["Hayek: dispersed knowledge no planner can hold; spontaneous order","Moroni: kosmos vs taxis; most institutions are the unintended outcome of slow evolution","Cozzolino: proscriptive (forbid harm) vs prescriptive rules; anti-adaptive neighbourhoods","Planners should set general, abstract rules and be modest"],
  rq:"How did this area change through many small actions, and which rules enabled or blocked adaptation?",
  meth:["Long-term historical and morphological analysis","Comparing designed and grown areas","Analysing rule types (proscriptive vs prescriptive)"],
  pos:{rt:[0,"gradual change through variation and selection"],de:[1,"order emerges without a designer"],mp:[1,"knowledge is dispersed and tacit"]},
  norm:"liberty, modesty",alt:["rcp","rci","pe"]},
 {id:"pe",n:"Political economy",sh:"4",
  words:["capital accumulation","overaccumulation","capital switching","spatial fix","commodification","rent gap","financialisation","entrepreneurial city","exchange value vs use value","neoliberalisation"],
  art:"links a local project or policy (land sales, waterfront, regeneration) to wider economic forces and asks who profits",
  blocks:["The state serves the stability of capitalism, which is prone to crisis (H1–H3 on the slides)","Harvey: capital switching into the built environment to avert overaccumulation","Four roles of planning: social reproduction, conditions of production, devaluation and revaluation, new accumulation","Harvey 1989: from managerialism to entrepreneurialism; inter-urban competition as an 'external coercive law'"],
  rq:"How does this project create opportunities for capital accumulation, and who profits and who loses?",
  meth:["Historical research with economic data across boom and crisis, identifying where capital flows (Rydin Table 10.2)","Following the money: land prices, investment, budgets, ownership","Interviews with elite actors"],
  pos:{sa:[-1,"outcomes follow the logic of capital accumulation"],rt:[-1,"planning helps capitalism reproduce; big shifts come from crisis"],de:[1,"no one designed the shift; it follows from crisis and competition"],us:[-1,"the same logic of capital across cities (leans)"],mp:[-1,"theory-led analysis of capital and class privileged (leans)"]},
  norm:"equality, use value, justice",alt:["up","rci","hi","disc"]},
 {id:"up",n:"Urban politics",sh:"5",
  words:["conflict","power","inequality","social movement","mobilisation","urban regime","growth coalition","agonism","right to the city","co-optation"],
  art:"studies a case of conflict or mobilisation and asks who wins and who is excluded, close to the people studied",
  blocks:["Planning is political: conflict is unavoidable","Lukes' three faces of power: decision making, agenda setting, ideological","Urban conflict has a degree of autonomy from socio-economic structures","Urban regimes (Stone) and growth coalitions (Molotch); planners should ask how to plan justly"],
  rq:"How do affected groups experience, contest and try to change the policy, and who is excluded?",
  meth:["Case studies of conflict through action research, embedded ethnography or emic research (Rydin Table 10.2)","In-depth interviews, focus groups, participant observation","Comparative case studies (Pruijt)"],
  pos:{sa:[1,"duality, leaning to the agency of movements"],rt:[1,"incremental transformation through mobilisation"],de:[-1,"change from strategic action of movements (leans)"],us:[1,"knowledge depends on position; emic"],mp:[1,"residents' and activists' knowledge counts"]},
  norm:"justice, equity, equality",alt:["pe","rci","rcp","disc"]},
 {id:"disc",n:"Discourse, power and knowledge (Foucauldian)",sh:"6",
  words:["discourse","framing","storyline","regime of truth","governmentality","conduct of conduct","technologies of government","responsibilisation","calculative practices","discourse coalition"],
  art:"analyses texts (policy, submissions, media) to show how a problem is framed and whose views dominate, or how a policy shapes responsible subjects",
  blocks:["Discourses stabilise certain truths and marginalise others","Power/knowledge (Foucault): who controls knowledge defines what is true, rational, feasible","Governmentality: the conduct of conduct, governing through the governed","Discourse coalitions (Hajer): storyline, coalition, structuration, institutionalisation"],
  rq:"How was this problem framed, which storylines dominated, and whose voices were marginalised?",
  meth:["Examining micro-practices of constructing knowledge and governmental technologies, including classification (Rydin Table 10.2)","Discourse and storyline analysis of documents, submissions, media","Analysis of calculative devices (Murphy's residual valuation)"],
  pos:{sa:[0,"discourses constrain and enable; actors also produce and contest them"],rt:[-1,"repeated language makes ideas common sense (leans reproduction)"],de:[1,"no single actor designs a discourse"],us:[1,"knowledge produced within specific power relations"],mp:[1,"many competing knowledges"]},
  norm:"critical, often implicit: unmasks what looks neutral",alt:["pe","up","rc"]}];
const DRD={marx:"pe",hayek:"ei",cozz:"ei",gov:"rcp",rc:"rc",needham:"rc",olson:"rc",taylor:"rc",dembski:"si",moroni:"ei",sorensen:"hi",harvey:"pe",fog:"pe",hh:"pe",savini:"pe",rydin6:"up",pruijt:"up",raco:"disc",gurran:"disc"};
const DT=id=>DTH.find(t=>t.id===id);
const dPick=(a,n)=>shuffle(a.slice()).slice(0,n);
const dMC=(q,right,wrong,e,mode)=>{const w=[...new Set(wrong)].filter(x=>x&&x!==right).slice(0,3);if(w.length<3)return null;const o=shuffle([right,...w]);return {q,o,a:o.indexOf(right),e,mode};};
function dGen(mode){const out=[],T=DTH;
 const others=(t,f)=>dPick(T.filter(x=>x.id!==t.id),6).map(f);
 if(mode==="rec"||mode==="mix"){
  T.forEach(t=>{out.push(dMC("These signal words are highlighted in an article: "+dPick(t.words,4).join(", ")+". Which perspective do they point to?",t.n,others(t,x=>x.n),"Signal words on sheet "+t.sh+" ("+t.n+"): "+t.words.join(", ")+".","Recognise (Q1)"));
   out.push(dMC("A typical article of which perspective "+t.art+"?",t.n,others(t,x=>x.n),"Sheet "+t.sh+": typical article.","Recognise (Q1)"));});
  for(const id in DRD){const r=R[id];if(!r||!(r.quotes||[]).length)continue;const t=DT(DRD[id]);(r.quotes||[]).slice(0,3).forEach(qt=>{const txt=typeof mask==="function"?mask(String(qt),id):String(qt);out.push(dMC("Quote from a course reading: "+txt+" In which perspective is this author working?",t.n,others(t,x=>x.n),"From "+short(r)+" ("+r.theory+"): sheet "+t.sh+".","Recognise (Q1)"));});}
 }
 if(mode==="blk"||mode==="mix"){
  T.forEach(t=>t.blocks.forEach(b=>{out.push(dMC("Which perspective has this building block? "+b,t.n,others(t,x=>x.n),"Building block of "+t.n+" (sheet "+t.sh+").","Building blocks (Q1/Q2)"));}));
  T.forEach(t=>out.push(dMC("Which of these is a building block of "+t.n+"?",dPick(t.blocks,1)[0],T.filter(x=>x.id!==t.id).map(x=>dPick(x.blocks,1)[0]).sort(()=>Math.random()-.5),"Sheet "+t.sh+": "+t.blocks.join("; ")+".","Building blocks (Q1/Q2)")));
 }
 if(mode==="ass"||mode==="mix"){
  Object.entries(DAX).forEach(([ax,[dim,lo,hi]])=>{[-1,1].forEach(side=>{const yes=T.filter(t=>t.pos[ax]&&t.pos[ax][0]===side),no=T.filter(t=>t.pos[ax]&&t.pos[ax][0]===-side);yes.forEach(t=>{const end=side<0?lo:hi;out.push(dMC(dim+" ("+lo+" ↔ "+hi+"): which perspective leans most clearly to "+end.toUpperCase()+"?",t.n,dPick(no,3).map(x=>x.n),t.n+": "+t.pos[ax][1]+". "+no.map(x=>x.n+": "+x.pos[ax][1]).slice(0,3).join(". ")+".","Assumptions (Q1b/Q2a)"));});});});
  T.forEach(t=>Object.entries(t.pos).forEach(([ax,[v,txt]])=>{if(!v)return;const [dim,lo,hi]=DAX[ax];const right=v<0?"Closer to "+lo:"Closer to "+hi;out.push(dMC("Write the assumption: on "+dim.toLowerCase()+" ("+lo+" ↔ "+hi+"), where does "+t.n+" typically sit?",right,[v<0?"Closer to "+hi:"Closer to "+lo,"Exactly in the middle: the theory takes no position","This axis does not apply to any course theory"],"Typical position: "+txt+". Always add a reason and a quote from the article.","Assumptions (Q1b/Q2a)"));}));
 }
 if(mode==="alt"||mode==="mix"){
  T.forEach(t=>{const good=t.alt.map(DT).filter(Boolean),bad=T.filter(x=>x.id!==t.id&&!t.alt.includes(x.id));if(bad.length<3)return;good.slice(0,2).forEach(g=>{const ax=Object.keys(DAX).find(a=>t.pos[a]&&g.pos[a]&&t.pos[a][0]*g.pos[a][0]<0);const why=ax?"A clear contrast on "+DAX[ax][0].toLowerCase()+" ("+DAX[ax][1]+" ↔ "+DAX[ax][2]+"): "+t.n+": "+t.pos[ax][1]+"; "+g.n+": "+g.pos[ax][1]+".":"Listed as a strong alternative on the theory sheets.";out.push(dMC("The article works in "+t.n+". Which alternative gives a strong contrast for Q2?",g.n,dPick(bad,3).map(x=>x.n),why+" Sheet 7 and sheet "+t.sh+" list the strong alternatives: "+good.map(x=>x.n).join(", ")+".","Alternative (Q2)"));});});
  T.forEach(t=>T.forEach(g=>{if(t===g)return;const ax=Object.keys(DAX).find(a=>t.pos[a]&&g.pos[a]&&t.pos[a][0]*g.pos[a][0]<0);if(!ax||Math.random()>.35)return;const [dim,lo,hi]=DAX[ax];const wrongAx=Object.keys(DAX).filter(a=>a!==ax&&!(t.pos[a]&&g.pos[a]&&t.pos[a][0]*g.pos[a][0]<0)).map(a=>DAX[a][0]+" ("+DAX[a][1]+" ↔ "+DAX[a][2]+")");out.push(dMC("Q2: original "+t.n+", alternative "+g.n+". On which axis do their assumptions clearly differ?",dim+" ("+lo+" ↔ "+hi+")",[...new Set(wrongAx)],t.n+": "+t.pos[ax][1]+". "+g.n+": "+g.pos[ax][1]+".","Alternative (Q2)"));}));
 }
 if(mode==="met"||mode==="mix"){
  T.forEach(t=>{t.meth.forEach(m=>out.push(dMC("Q3: which perspective does this method fit best? "+m,t.n,others(t,x=>x.n),"Sheet "+t.sh+", research focus and methods. Link the method to an assumption (e.g. emic because knowledge is situated).","Methods (Q3)")));
   out.push(dMC("Q3: which research question fits "+t.n+"?",t.rq,T.filter(x=>x.id!==t.id).map(x=>x.rq).sort(()=>Math.random()-.5),"Typical research question on sheet "+t.sh+".","Methods (Q3)"));
   out.push(dMC("Q3: you switch to "+t.n+". Which method fits the new perspective?",dPick(t.meth,1)[0],T.filter(x=>x.id!==t.id).map(x=>dPick(x.meth,1)[0]).sort(()=>Math.random()-.5),"Methods for "+t.n+": "+t.meth.join("; ")+".","Methods (Q3)"));});
 }
 return shuffle(out.filter(Boolean));}
let DR=null;
const DMODES=[["rec","Recognise the theory","Q1: signal words, typical articles, real quotes"],["blk","Building blocks","Q1/Q2: which block belongs to which theory"],["ass","Assumptions","Q1b/Q2a: positions on the framework axes"],["alt","Choose the alternative","Q2: strongest contrast and the axis where they differ"],["met","Research focus and methods","Q3: research questions and methods per theory"],["mix","Mixed","All of the above"]];
function vDrills(){
 if(!DR||DR.done&&sub!=="run"){const best=(S.drill||{});
  return `<div class="fade"><p class="eyebrow">Final exam · Thu 5 Nov</p><h2 class="serif">Exam drills</h2><p class="lede">Short drills for each step of the commentary. Built from the checked theory sheets, the syllabus framework and Rydin's Tables 10.2–10.3; quotes come from the course readings. 12 questions per round.</p>
  <div class="list" style="margin-top:12px">${DMODES.map(([k,l,s])=>`<button class="item" data-drill="${k}" style="text-align:left"><div style="min-width:0"><div class="t">${l}</div><div class="s">${s}${best[k]!=null?" · last: "+best[k]+"/12":""}</div></div><span class="mut">→</span></button>`).join('')}</div></div>`;}
 const q=DR.qs[DR.i];
 if(DR.done){S.drill=S.drill||{};S.drill[DR.mode]=DR.score;persist();return `<div class="fade"><p class="eyebrow">Exam drills · ${esc(DMODES.find(m=>m[0]===DR.mode)[1])}</p><h2 class="serif">${DR.score} / ${DR.qs.length}</h2><div class="row" style="margin-top:12px"><button class="btn primary" data-drill="${DR.mode}">Another round</button><button class="btn" id="drback">All drills</button></div></div>`;}
 return `<div class="fade"><div class="row between"><button class="btn sm" id="drback">${ic('left')} Drills</button><span class="small mut">${DR.i+1} / ${DR.qs.length} · ${DR.score} right</span></div>
 <div class="qcard" style="margin-top:12px"><span class="eyebrow">${esc(q.mode)}</span><p class="qq">${esc(q.q)}</p>${q.o.map((o,j)=>{let c='';if(DR.pick!=null){if(j===q.a)c='right';else if(j===DR.pick)c='wrong';}return `<button class="opt ${c}" data-drp="${j}" ${DR.pick!=null?'disabled':''}><span class="k">${String.fromCharCode(65+j)}</span><span>${esc(o)}</span></button>`;}).join('')}
 ${DR.pick!=null?`<div class="expl">${esc(q.e)}</div><div class="row" style="justify-content:flex-end;margin-top:10px"><button class="btn primary" id="drnext">${DR.i+1<DR.qs.length?'Next':'Finish'}</button></div>`:''}</div></div>`;}
document.addEventListener("click",e=>{const t=e.target.closest("[data-drill],[data-drp],#drnext,#drback");if(!t)return;
 if(t.dataset.drill){const m=t.dataset.drill;DR={mode:m,qs:dGen(m).slice(0,12),i:0,pick:null,score:0,done:false};sub="run";render();window.scrollTo(0,0);return;}
 if(t.id==="drback"){DR=null;sub=null;render();return;}
 if(t.id==="drnext"){DR.i++;DR.pick=null;if(DR.i>=DR.qs.length)DR.done=true;render();window.scrollTo(0,0);return;}
 if(t.dataset.drp!=null&&DR&&DR.pick==null){DR.pick=+t.dataset.drp;if(DR.pick===DR.qs[DR.i].a)DR.score++;render();}});
