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
let dGen=function(mode){const out=[],T=DTH;
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
  T.forEach(t=>T.forEach(g=>{if(t===g)return;const ax=Object.keys(DAX).find(a=>t.pos[a]&&g.pos[a]&&t.pos[a][0]*g.pos[a][0]<0);if(!ax)return;const [dim,lo,hi]=DAX[ax];const wrongAx=Object.keys(DAX).filter(a=>a!==ax&&!(t.pos[a]&&g.pos[a]&&t.pos[a][0]*g.pos[a][0]<0)).map(a=>DAX[a][0]+" ("+DAX[a][1]+" ↔ "+DAX[a][2]+")");out.push(dMC("Q2: original "+t.n+", alternative "+g.n+". On which axis do their assumptions clearly differ?",dim+" ("+lo+" ↔ "+hi+")",[...new Set(wrongAx)],t.n+": "+t.pos[ax][1]+". "+g.n+": "+g.pos[ax][1]+".","Alternative (Q2)"));}));
 }
 if(mode==="met"||mode==="mix"){
  T.forEach(t=>{t.meth.forEach(m=>out.push(dMC("Q3: which perspective does this method fit best? "+m,t.n,others(t,x=>x.n),"Sheet "+t.sh+", research focus and methods. Link the method to an assumption (e.g. emic because knowledge is situated).","Methods (Q3)")));
   out.push(dMC("Q3: which research question fits "+t.n+"?",t.rq,T.filter(x=>x.id!==t.id).map(x=>x.rq).sort(()=>Math.random()-.5),"Typical research question on sheet "+t.sh+".","Methods (Q3)"));
   out.push(dMC("Q3: you switch to "+t.n+". Which method fits the new perspective?",dPick(t.meth,1)[0],T.filter(x=>x.id!==t.id).map(x=>dPick(x.meth,1)[0]).sort(()=>Math.random()-.5),"Methods for "+t.n+": "+t.meth.join("; ")+".","Methods (Q3)"));});
 }
 return shuffle(out.filter(Boolean));};
let DR=null;
const DMODES=[["rec","Recognise the theory","Q1: signal words, typical articles, real quotes"],["blk","Building blocks","Q1/Q2: which block belongs to which theory"],["ass","Assumptions","Q1b/Q2a: positions on the framework axes"],["alt","Choose the alternative","Q2: strongest contrast and the axis where they differ"],["met","Research focus and methods","Q3: research questions and methods per theory"],["mix","Mixed","All of the above"]];
function vDrills(){
 if(!DR||DR.done&&sub!=="run"){const best=(S.drill||{});
  return `<div class="fade"><p class="eyebrow">Final exam · Thu 5 Nov</p><h2 class="serif">Exam drills</h2><p class="lede">Short drills for each step of the commentary. Built from the checked theory sheets, the syllabus framework and Rydin's Tables 10.2–10.3; quotes come from the course readings. 12 questions per round.</p>
  <div class="list drlist" style="margin-top:12px">${DMODES.map(([k,l,s])=>`<button class="item" data-drill="${k}" style="text-align:left"><div style="min-width:0"><div class="t">${l}</div><div class="s">${s}${best[k]!=null?" · last: "+best[k]+"/12":""}</div></div><span class="mut">→</span></button>`).join('')}</div></div>`;}
 const q=DR.qs[DR.i];
 if(DR.done){S.drill=S.drill||{};if(!DR.sheet)S.drill[DR.mode]=DR.score;persist();return `<div class="fade"><p class="eyebrow">Exam drills · ${esc(DMODES.find(m=>m[0]===DR.mode)[1])}</p><h2 class="serif">${DR.score} / ${DR.qs.length}</h2><div class="row" style="margin-top:12px">${DR.sheet?`<button class="btn primary" data-shquiz="${DR.sheet}">Another round</button><button class="btn" data-go="sheets" data-sub="${DR.sheet}">Back to sheet ${DR.sheet}</button>`:`<button class="btn primary" data-drill="${DR.mode}">Another round</button>`}<button class="btn" id="drback">All drills</button></div></div>`;}
 return `<div class="fade"><div class="row between"><button class="btn sm" id="drback">${ic('left')} Drills</button><span class="small mut">${DR.i+1} / ${DR.qs.length} · ${DR.score} right</span></div>
 <div class="qcard" style="margin-top:12px"><span class="eyebrow">${esc(q.mode)}</span><p class="qq">${esc(q.q)}</p>${q.o.map((o,j)=>{let c='';if(DR.pick!=null){if(j===q.a)c='right';else if(j===DR.pick)c='wrong';}return `<button class="opt ${c}" data-drp="${j}" ${DR.pick!=null?'disabled':''}><span class="k">${String.fromCharCode(65+j)}</span><span>${esc(o)}</span></button>`;}).join('')}
 ${DR.pick!=null?`<div class="expl">${esc(q.e)}</div><div class="row" style="justify-content:flex-end;margin-top:10px"><button class="btn primary" id="drnext">${DR.i+1<DR.qs.length?'Next':'Finish'}</button></div>`:''}</div></div>`;}
document.addEventListener("click",e=>{const t=e.target.closest("[data-drill],[data-drp],#drnext,#drback");if(!t)return;
 if(t.dataset.drill){const m=t.dataset.drill;DR={mode:m,qs:dGen(m).slice(0,12),i:0,pick:null,score:0,done:false};sub="run";render();window.scrollTo(0,0);return;}
 if(t.id==="drback"){DR=null;sub=null;render();return;}
 if(t.id==="drnext"){DR.i++;DR.pick=null;if(DR.i>=DR.qs.length)DR.done=true;render();window.scrollTo(0,0);return;}
 if(t.dataset.drp!=null&&DR&&DR.pick==null){DR.pick=+t.dataset.drp;if(DR.pick===DR.qs[DR.i].a)DR.score++;if(typeof qTick==="function")qTick();render();}});

/* per-sheet quiz: drill questions about one sheet's theory (or theories) */
let dSheet=null;
const SHEET_TH={"1":["rcp"],"2":["rc"],"3":["rci","si","hi","ei"],"3a":["rci"],"3b":["si"],"3c":["hi"],"3d":["ei"],"4":["pe"],"5":["up"],"6":["disc"]};
function dSheetOld(sid){const ths=SHEET_TH[sid];if(!ths)return [];const names=ths.map(id=>DT(id).n);
 return dGen("mix").filter(q=>{const right=q.o[q.a];return names.some(n=>right===n||q.q.includes(n))||ths.some(id=>DT(id).blocks.includes(right)||DT(id).meth.includes(right)||DT(id).rq===right);});}
document.addEventListener("click",e=>{const t=e.target.closest("[data-shquiz]");if(!t)return;const sid=t.dataset.shquiz;const qs=dSheet(sid).slice(0,12);if(!qs.length){toast("No questions for this sheet");return;}DR={mode:"mix",qs,i:0,pick:null,score:0,done:false,sheet:sid};go("drills","run");window.scrollTo(0,0);});
/* ---- more sheet questions (1 Nov): generated from every line of the checked sheets + the reading questions behind each theory ---- */
const SHEET_RD={"1":["gov","scott","davoudi","alex"],"2":["rc","needham","olson","taylor"],"3":["ni","dembski","moroni","sorensen"],"3a":["ni"],"3b":["dembski"],"3c":["sorensen"],"3d":["moroni","cozz","hayek"],"4":["harvey","fog","hh","savini","marx"],"5":["rydin6","bossuyt","pruijt"],"6":["raco","gurran"]};
let SHP=null;
function shParse(){if(SHP)return SHP;SHP={};const dp=new DOMParser();
 BPT_SHEETS.forEach(sh=>{if(!SHEET_TH[sh.id]||sh.id==="3")return;const doc=dp.parseFromString("<div>"+sh.html+"</div>","text/html");const o={words:[],blocks:[],rows:[],cites:[],tell:"",art:""};
  doc.querySelectorAll("p").forEach(p=>{const st=p.querySelector("strong");if(!st)return;const lab=st.textContent.replace(/^•\s*/,"").replace(/:\s*$/,"").trim();const rest=p.textContent.slice(st.textContent.length).trim();if(!rest)return;
   if(/^Words$/i.test(lab))o.words=rest.replace(/\.$/,"").split(/,\s*/).map(w=>w.replace(/^"|"$/g,"").trim()).filter(w=>w.length>2);
   else if(/^Typical article$/i.test(lab))o.art=rest;else if(/^Tell$/i.test(lab))o.tell=rest;
   else if(/^(Cite|Do not confuse|Ready sentence|Template|Best against|Use it as|Against|Reveals|Typical RQ|RQ|Methods|Why)/i.test(lab)){if(/^Cite/i.test(lab))o.cites=rest.split(/;\s*(?![^()]*\))/).map(x=>x.trim()).filter(x=>x.length>12&&x.length<200);
     else if(/^Use it as/i.test(lab)||/^Reveals/i.test(lab))o.use=(o.use||[]).concat([rest]);else if(/^Ready sentence|^Template/i.test(lab))o.ready=rest;else if(/RQ$/i.test(lab))o.rq=rest.replace(/^"|"$/g,"");
     else if(/^Methods/i.test(lab)){const mm=rest.split(/\.\s*Why:/);o.meth=mm[0].split(/[,;]\s*(?![^()]*\))/).map(x=>x.replace(/\.$/,"").trim()).filter(x=>x.length>6);if(mm[1])o.why=mm[1].trim();}else if(/^Why/i.test(lab))o.why=rest;}
   else if(p.textContent.trim().startsWith("•")&&rest.length>15&&lab.length<70)o.blocks.push([lab,rest]);});
  doc.querySelectorAll("tr").forEach(tr=>{const td=[...tr.querySelectorAll("td")].map(x=>x.textContent.trim());if(td.length===3&&td[2].length>15&&!/Framework dimension/i.test(td[0]))o.rows.push(td);});
  SHP[sh.id]=o;});return SHP;}
function dSheetGen(sid){const P=shParse(),me=P[sid];if(!me)return [];const th=DT(SHEET_TH[sid][0]),nm=th.n,out=[];
 const oth=Object.entries(P).filter(([k])=>k!==sid&&SHEET_TH[k][0]!==SHEET_TH[sid][0]);const othN=()=>dPick(oth.map(([k])=>DT(SHEET_TH[k][0]).n),3);
 const allW=new Set(oth.flatMap(([,o])=>o.words.map(w=>w.toLowerCase())));
 me.words.filter(w=>!allW.has(w.toLowerCase())).forEach(w=>out.push(dMC("Signal word in an exam article: “"+w+"”. Which perspective does it point to?",nm,othN(),"“"+w+"” is a signal word on sheet "+sid+" ("+nm+"). Check it with a second signal and the article's explanation before you decide.","Recognise (Q1)")));
 const hide=(t,lab)=>{let x=t;lab.split(/[\s/(),;&]+/).filter(w=>w.length>4&&/^[A-Z]/.test(w)).forEach(w=>{x=x.split(w).join("____");});return x;};
 me.blocks.forEach(([lab,txt])=>{out.push(dMC("Which perspective has this building block? "+hide(txt,lab),nm,othN(),lab+": "+txt+" (sheet "+sid+").","Building blocks (Q1/Q2)"));
  const dis=dPick(oth.flatMap(([,o])=>o.blocks.map(b=>b[1])),3);out.push(dMC(nm+": what does the building block “"+lab+"” say?",txt,dis,lab+": "+txt,"Building blocks (Q1/Q2)"));});
 me.rows.forEach(([dim,pos,sent])=>{const s2=sent.replace(/^"|"$/g,"");out.push(dMC("Which perspective makes this assumption? “"+s2+"”",nm,othN(),"Sheet "+sid+", "+dim+": "+pos+".","Assumptions (Q1b/Q2a)"));
  const dims=[...new Set(Object.values(P).flatMap(o=>o.rows.map(r=>r[0])))].filter(x=>x!==dim);out.push(dMC("Which framework axis does this assumption (from "+nm+") address? “"+s2+"”",dim,dPick(dims,3),dim+": "+pos+". In the exam, name the dimension, the position, how it shows in the article, and a quote.","Assumptions (Q1b/Q2a)"));
  const pos2=[...new Set(oth.flatMap(([,o])=>o.rows.filter(r=>r[0]===dim&&r[1]!==pos).map(r=>r[1])))];if(pos2.length>=3)out.push(dMC(nm+": typical position on "+dim+"?",pos,dPick(pos2,3),"Sheet "+sid+": "+pos+". “"+s2+"”","Assumptions (Q1b/Q2a)"));});
 me.cites.forEach(c=>out.push(dMC("Course example to cite: "+c+". Which perspective does it illustrate?",nm,othN(),"Listed under 'course examples to cite' on sheet "+sid+" ("+nm+").","Recognise (Q1)")));
 const allM=new Set(oth.flatMap(([,o])=>(o.meth||[]).map(m=>m.toLowerCase())));
 (me.use||[]).forEach(u=>out.push(dMC("Q2: when would you pick this perspective as the alternative? "+hide(u,nm),nm,othN(),"Sheet "+sid+", 'use it as the alternative': "+u,"Alternative (Q2)")));
 if(me.ready)out.push(dMC("Q2 ready sentence: "+me.ready.replace(new RegExp(nm.split(" (")[0],"gi"),"____")+" Which perspective fills the gap?",nm,othN(),"Sheet "+sid+": "+me.ready,"Alternative (Q2)"));
 if(me.rq)out.push(dMC("Q3: which perspective asks this research question? \u201c"+me.rq+"\u201d",nm,othN(),"Typical research question on sheet "+sid+".","Methods (Q3)"));
 (me.meth||[]).filter(m=>!allM.has(m.toLowerCase())&&!/^(surveys?|interviews?|statistics|document analysis|coding|case stud|policy and document)/i.test(m)).forEach(m=>out.push(dMC("Q3 method: \u201c"+m+"\u201d. Which perspective is it typical for?",nm,othN(),"Sheet "+sid+" methods: "+(me.meth||[]).join(", ")+"."+(me.why?" Why: "+me.why:""),"Methods (Q3)")));
 if(me.why)out.push(dMC("Q3, explaining the method choice: \u201c"+hide(me.why,nm)+"\u201d Which perspective is this the reason for?",nm,othN(),"Sheet "+sid+": "+me.why,"Methods (Q3)"));
 if(me.art)out.push(dMC("Typical article: "+me.art+" Which perspective?",nm,othN(),"Sheet "+sid+": typical article.","Recognise (Q1)"));
 if(me.tell)out.push(dMC("The tell: "+me.tell+" Which perspective?",nm,othN(),"Sheet "+sid+": the tell.","Recognise (Q1)"));
 return out.filter(Boolean);}
function dSheetRd(sid){const ids=SHEET_RD[sid]||[];if(typeof ALLQ==="undefined")return [];return ALLQ.filter(q=>ids.includes(q.t)&&(q.lv||2)>=2&&!(typeof isCross==="function"&&isCross(q))).map(q=>{const p=shuffle([0,1,2,3].slice(0,q.o.length));return {q:q.q,o:p.map(i=>q.o[i]),a:p.indexOf(q.a),e:q.e||"",mode:"Reading: "+short(R[q.t])};});}
dSheet=function(sid){if(sid==="7")return shuffle([...dGen("alt"),...dGen("met")]);
 const subs=sid==="3"?["3a","3b","3c","3d"]:[sid];const skill=shuffle([...subs.flatMap(dSheetGen),...dSheetOld(sid)]);const rd=shuffle(dSheetRd(sid));
 const out=[];while(out.length<60&&(skill.length||rd.length)){if(skill.length)out.push(skill.shift());if(skill.length)out.push(skill.shift());if(rd.length)out.push(rd.shift());}return out;};

/* real-life examples from the readings (each with its source) */
const EX_SH=(()=>{const m={};Object.entries(SHEET_RD).forEach(([sid,ids])=>{if(sid==="3")return;ids.forEach(id=>{m[id]=sid;});});return m;})();
function exList(){const out=[];READINGS.forEach(r=>{const sid=EX_SH[r.id];(r.examples||[]).forEach(x=>{if(x&&x.t&&x.d)out.push({t:x.t,d:x.d,p:x.p||"",r,sid:sid||"F"});});});return out;}
function exQs(){const L=exList().filter(x=>x.sid!=="F");return L.map(x=>{const th=DT(SHEET_TH[x.sid][0]);const oth=dPick(DTH.filter(t=>t.id!==th.id),3).map(t=>t.n);const d=typeof mask==="function"?mask(x.d,x.r.id):x.d;return dMC("Real-life example: "+x.t+". "+d+" Which perspective is this case used to illustrate in the course?",th.n,oth,"From "+short(x.r)+(x.p?" ("+x.p+")":"")+": a "+th.n+" reading (sheet "+x.sid+"). In the exam, a case like this makes Q2 and Q3 concrete.","Real-life examples");}).filter(Boolean);}
const _dGen=dGen;
dGen=function(mode){const base=_dGen(mode);const map={rec:/^Recognise/,blk:/^Building/,ass:/^Assumptions/,alt:/^Alternative/,met:/^Methods/};let extra=[];
 if(typeof BPT_SHEETS!=="undefined"){const all=Object.keys(shParse()).flatMap(dSheetGen);extra=mode==="mix"?all:all.filter(q=>map[mode]&&map[mode].test(q.mode));}
 if(mode==="ex"||mode==="mix"||mode==="rec")extra=extra.concat(mode==="rec"?[]:exQs());
 if(mode==="ex")return shuffle(exQs());
 const seen=new Set();return shuffle([...base,...extra].filter(q=>{if(!q)return false;const k=q.q+"|"+q.o[q.a];if(seen.has(k))return false;seen.add(k);return true;}));};
DMODES.splice(5,0,["ex","Real-life examples","Which perspective does this case illustrate? (cases from the readings)"]);

/* sheet 7: "which alternative for which article" table */
function dTools(){const sh=(typeof BPT_SHEETS!=="undefined")&&BPT_SHEETS.find(x=>x.id==="7");if(!sh)return [];const doc=new DOMParser().parseFromString("<div>"+sh.html+"</div>","text/html");const rows=[...doc.querySelectorAll("tr")].map(tr=>[...tr.querySelectorAll("td")].map(td=>td.textContent.trim())).filter(r=>r.length===4&&r[0]&&!/^Article theory/i.test(r[0]));
 const out=[];rows.forEach((r,i)=>{const o=rows.filter((_,j)=>j!==i);
  out.push(dMC("Sheet 7: the article is "+r[0]+". Which alternative does the exam-tools table suggest?",r[1],o.map(x=>x[1]),"Key contrast: "+r[2]+". Method switch: "+r[3]+".","Alternative (Q2)"));
  out.push(dMC("Sheet 7: article "+r[0]+", alternative "+r[1]+". What is the key contrast to write in Q2?",r[2],o.map(x=>x[2]),"Write it as: whereas the author assumes …, this perspective assumes … ("+r[2]+").","Alternative (Q2)"));
  out.push(dMC("Sheet 7: article "+r[0]+", alternative "+r[1]+". How do the methods change in Q3?",r[3],o.map(x=>x[3]),"Method switch: "+r[3]+". Link each method to an assumption of the new theory.","Methods (Q3)"));});return out.filter(Boolean);}
const _dGen2=dGen;dGen=function(mode){const b=_dGen2(mode);if(mode==="alt"||mode==="met"||mode==="mix"){const t=dTools().filter(q=>mode==="mix"||(mode==="alt"?/^Alternative/.test(q.mode):/^Methods/.test(q.mode)));return shuffle(b.concat(t));}return b;};

/* more drills: readings on the framework axes (site positions) and Q2 "whereas" sentences */
function dExtra(mode){const out=[];
 if(mode==="ass"||mode==="mix"){const ax={sa:["Sources of planning outcomes","structure","agency"],rt:["Reproduction and change","reproduction","transformation"],de:["Reproduction and change","deliberate","emergent"],us:["Knowledge and expertise","universal","situated"],mp:["Knowledge and expertise","monist","pluralist"]};
  Object.entries(ax).forEach(([k,[dim,lo,hi]])=>{const rs=READINGS.filter(r=>r.dims&&r.dims[k]!=null);const low=rs.filter(r=>r.dims[k]<=30),high=rs.filter(r=>r.dims[k]>=70);
   low.forEach(r=>out.push(dMC(dim+" ("+lo+" ↔ "+hi+"): which reading sits closest to "+lo.toUpperCase()+"?",short(r),dPick(high,3).map(short),short(r)+" is placed at "+r.dims[k]+" (0 = "+lo+", 100 = "+hi+") on the site's framework page.","Assumptions (Q1b/Q2a)")));
   high.forEach(r=>out.push(dMC(dim+" ("+lo+" ↔ "+hi+"): which reading sits closest to "+hi.toUpperCase()+"?",short(r),dPick(low,3).map(short),short(r)+" is placed at "+r.dims[k]+" (0 = "+lo+", 100 = "+hi+") on the site's framework page.","Assumptions (Q1b/Q2a)")));});}
 if(mode==="alt"||mode==="mix"){DTH.forEach(t=>DTH.forEach(g=>{if(t===g)return;Object.keys(DAX).forEach(a=>{if(!(t.pos[a]&&g.pos[a]&&t.pos[a][0]*g.pos[a][0]<0))return;const [dim,lo,hi]=DAX[a];const right="Whereas "+t.n+" assumes that "+t.pos[a][1]+", "+g.n+" assumes that "+g.pos[a][1]+".";const swap="Whereas "+t.n+" assumes that "+g.pos[a][1]+", "+g.n+" assumes that "+t.pos[a][1]+".";const others=DTH.filter(x=>x!==t&&x!==g&&x.pos[a]).map(x=>"Whereas "+t.n+" assumes that "+x.pos[a][1]+", "+g.n+" assumes that "+t.pos[a][1]+".");
   out.push(dMC("Q2 on "+dim.toLowerCase()+" ("+lo+" ↔ "+hi+"): original "+t.n+", alternative "+g.n+". Which comparison sentence is correct?",right,[swap,...dPick(others,2)],"Correct contrast: "+t.n+": "+t.pos[a][1]+"; "+g.n+": "+g.pos[a][1]+".","Alternative (Q2)"));});}));}
 return out.filter(Boolean);}
const _dGen3=dGen;dGen=function(mode){const b=_dGen3(mode);const x=dExtra(mode);return x.length?shuffle(b.concat(x)):b;};
/* ===== drills batch 3 (2 Nov): a lot more questions, all generated from site content that was already checked ===== */
function dMore(mode){const out=[],T=DTH;const nm=id=>DT(id).n;const othN=(id,n)=>dPick(T.filter(t=>t.id!==id).map(t=>t.n),n||3);
 const sents=t=>String(t||"").replace(/\s+/g," ").split(/(?<=[.!?])\s+(?=[A-Z'‘"(])/).map(x=>x.trim()).filter(x=>x.length>=70&&x.length<=260&&!/\b(slides?|this page|this site|general knowledge|verify|on file|Brightspace)\b/i.test(x)&&!/^(This|It|They|These|He|She|His|Her|Their|That|But|And|So|Also|Here|There|Both|Such)\b/.test(x));
 const mk=(id,t)=>typeof mask==="function"?mask(t,id):t;
 const rds=Object.keys(DRD).filter(id=>R[id]);
 if(mode==="rec"||mode==="mix"){
  rds.forEach(id=>{const r=R[id],th=DRD[id];const S=new Set();sents(r.one).forEach(x=>S.add(x));(Array.isArray(r.summary)?r.summary:[r.summary]).forEach(p=>sents(p).forEach(x=>S.add(x)));(r.ext||[]).forEach(sec=>(sec.p||[]).forEach(p=>sents(typeof p==="string"?p:"").forEach(x=>S.add(x))));
   [...S].forEach(x=>out.push(dMC("Passage from a course reading: “"+mk(id,x)+"” Which perspective is the author working in?",nm(th),othN(th),"From "+short(r)+" ("+r.theory+"). Sheet "+DT(th).sh+".","Recognise (Q1)")));
   (r.concepts||[]).filter(c=>Array.isArray(c)&&c[1]).forEach(c=>{out.push(dMC("Concept from a course reading: “"+c[0]+"” ("+mk(id,c[1])+"). Which perspective does it belong to?",nm(th),othN(th),c[0]+" is from "+short(r)+" ("+r.theory+").","Building blocks (Q1/Q2)"));});
   const sig=new RegExp("\\b("+(DT(th).words||[]).map(w=>String(w).replace(/[.*+?^$|()[\]{}\\]/g,"\\$&")).join("|")+")","i");
   ((r.lect||{}).points||[]).filter(p=>!/exercise|warm-up|tutorial|quiz|recap|golden triangle|not a verdict|learning goals|literature|methods|recognising values|course context|so far/i.test(p.t||"")).forEach(p=>sents(p.d).filter(x=>!/\b(discuss|write down|in pairs|seconds|minutes|exercise|students?|seminar|tutorial|lecturer|the lecture|course|exam|Q[123]|asks? (why|how|to what))\b|[“”]\s*\(/i.test(x)&&sig.test(x)).slice(0,2).forEach(x=>out.push(dMC("From the lecture slides: “"+mk(id,x)+"” Which perspective is being explained?",nm(th),othN(th),(p.slide||"Lecture slides")+", on the "+short(r)+" page ("+nm(th)+").","Recognise (Q1)"))));});
 }
 if(mode==="blk"||mode==="mix"){
  T.forEach(t=>{const oth=T.filter(x=>x!==t);for(let k=0;k<12;k++){const three=dPick(t.blocks,3);if(three.length<3)break;const odd=dPick(dPick(oth,1)[0].blocks,1)[0];out.push(dMC("Three of these are building blocks of "+t.n+". Which one is NOT?",odd,three,"Not "+t.n+": “"+odd+"” belongs to "+T.find(x=>x.blocks.includes(odd)).n+".","Building blocks (Q1/Q2)"));}});
 }
 if(mode==="rec"||mode==="mix"){
  T.forEach(t=>{const oth=T.filter(x=>x!==t);for(let k=0;k<12;k++){const three=dPick(t.words,3);const o2=dPick(oth,1)[0];const odd=dPick(o2.words.filter(w=>!t.words.includes(w)),1)[0];if(!odd)continue;out.push(dMC("Three of these signal words point to "+t.n+". Which one points elsewhere?",odd,three,"“"+odd+"” is a signal word of "+o2.n+".","Recognise (Q1)"));}});
 }
 if(mode==="alt"||mode==="mix"){
  rds.forEach(id=>{const r=R[id],t=DT(DRD[id]);const good=t.alt.map(DT).filter(Boolean),bad=T.filter(x=>x!==t&&!t.alt.includes(x.id));good.forEach(g=>{if(bad.length>=3)out.push(dMC("The exam article is in the style of "+short(r)+" ("+t.n+"). Which perspective gives a strong alternative for Q2?",g.n,dPick(bad,3).map(x=>x.n),"Strong alternatives for "+t.n+": "+good.map(x=>x.n).join(", ")+" (sheets "+t.sh+" and 7).","Alternative (Q2)"));
   const ax=Object.keys(DAX).find(a=>t.pos[a]&&g.pos[a]&&t.pos[a][0]*g.pos[a][0]<0);if(ax){const [dim,lo,hi]=DAX[ax];out.push(dMC("Q2 on "+short(r)+": you choose "+g.n+" as the alternative. Which sentence states the contrast correctly?","Whereas the author assumes that "+t.pos[ax][1]+", "+g.n+" assumes that "+g.pos[ax][1]+".",[ "Whereas the author assumes that "+g.pos[ax][1]+", "+g.n+" assumes that "+t.pos[ax][1]+".","Both perspectives assume that "+t.pos[ax][1]+", so they differ only in their normative commitments.","Whereas the author assumes that "+t.pos[ax][1]+", "+g.n+" agrees but adds more empirical data."],dim+" ("+lo+" ↔ "+hi+"): "+t.n+": "+t.pos[ax][1]+"; "+g.n+": "+g.pos[ax][1]+".","Alternative (Q2)"));}});});
 }
 if(mode==="met"||mode==="mix"){
  rds.forEach(id=>{const r=R[id],t=DT(DRD[id]);t.alt.map(DT).filter(Boolean).forEach(g=>{g.meth.forEach(m=>{const wrong=T.filter(x=>x!==g).map(x=>dPick(x.meth,1)[0]);out.push(dMC("Q3: you critique "+short(r)+" from "+g.n+". Which method fits the reformulated research?",m,dPick(wrong,3),"Methods for "+g.n+": "+g.meth.join("; ")+". Link the method to an assumption of "+g.n+".","Methods (Q3)"));});
   out.push(dMC("Q3: you critique "+short(r)+" from "+g.n+". Which reformulated research question fits?",g.rq,dPick(T.filter(x=>x!==g).map(x=>x.rq),3),"Typical research question for "+g.n+" (sheet "+g.sh+").","Methods (Q3)"));});});
 }
 if(mode==="ass"||mode==="mix"){
  rds.forEach(id=>{const r=R[id],t=DT(DRD[id]);Object.entries(t.pos).forEach(([a,[v,txt]])=>{if(!v)return;const [dim,lo,hi]=DAX[a];const right=v<0?lo:hi,wrong=v<0?hi:lo;out.push(dMC("Q1b for an article like "+short(r)+" ("+t.n+"): which assumption sentence fits on "+dim.toLowerCase()+"?","On "+lo+" ↔ "+hi+", the author leans to "+right+": "+txt+".",["On "+lo+" ↔ "+hi+", the author leans to "+wrong+": "+txt+".","On "+lo+" ↔ "+hi+", the author leans to "+wrong+", because outcomes depend on "+(v<0?"individual choices":"structural forces")+".","This axis cannot be used for this perspective, because it only applies to normative theories."],"Typical position of "+t.n+": "+txt+". Always add how it shows in the article and a quote with a page number.","Assumptions (Q1b/Q2a)"));});});
 }
 return out.filter(Boolean);}
const _dGen4=dGen;dGen=function(mode){const b=_dGen4(mode);if(mode==="ex")return b;const x=dMore(mode);const seen=new Set(b.map(q=>q.q+"|"+q.o[q.a]));return shuffle(b.concat(x.filter(q=>{const k=q.q+"|"+q.o[q.a];if(seen.has(k))return false;seen.add(k);return true;})));};
