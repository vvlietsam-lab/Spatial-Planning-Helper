/* ================= V2: courses ================= */
const PSC_EXAM=new Date("2026-10-26T13:30:00+01:00");
const PSC_LECTURES=[
 {n:1,d:"2026-09-10",title:"Introduction: perspectives on sustainability",who:"Shaun Smith",slides:true,theme:1,
  man:{r:"Næss, P. (2001). Urban Planning and Sustainable Development. European Planning Studies, 9(4), 503–524.",doi:"10.1080/713666490"},
  rec:[{r:"Purvis, Mao & Robinson (2019). Three pillars of sustainability: in search of conceptual origins. Sustainability Science 14, 681–695.",doi:"10.1007/s11625-018-0627-5"},{r:"Rudolf & Schmidt (2025). Efficiency, sufficiency and consistency in sustainable development. Ecological Economics 227.",doi:"10.1016/j.ecolecon.2024.108426"}]},
 {n:2,d:"2026-09-14",title:"Are cities sustainable?",who:"Shaun Smith",slides:true,theme:1,
  man:{r:"Angelo, H. & Wachsmuth, D. (2020). Why does everyone think cities can save the planet? Urban Studies 57(11), 2201–2221.",doi:"10.1177/0042098020919081"},
  rec:[{r:"McPhearson et al. (2021). Radical changes are needed for transformations to a good Anthropocene. npj Urban Sustainability 1.",doi:"10.1038/s42949-021-00018-w"},{r:"Krähmer, K. (2020). Are green cities sustainable? A degrowth critique of sustainable urban development in Copenhagen. European Planning Studies 29(7).",doi:"10.1080/09654313.2020.1841119"}]},
 {n:3,d:"2026-09-17",title:"Sustainability: a planning dilemma",who:"Shaun Smith",slides:true,theme:1,
  man:{r:"Campbell, S.D. (1996). Green cities, growing cities, just cities? JAPA 62(3), 296–312.",doi:"10.1080/01944369608975696",note:"The syllabus prints a truncated DOI (…0194436960897569); this is the corrected one."},
  rec:[{r:"Campbell, S.D. (2016). The Planner's Triangle Revisited. JAPA 82(4), 388–397.",doi:"10.1080/01944363.2016.1214080"}]},
 {n:4,d:"2026-09-21",title:"The Dutch planning system (joint with Studio)",who:"Patrick Witte",slides:true,theme:2,
  man:{r:"Witte, Wiegmans & Louw (2025). More claims than land: multi-facetted land use challenges in the port-city interface. Journal of Transport Geography 124.",doi:"10.1016/j.jtrangeo.2025.104181"},rec:[]},
 {n:5,d:"2026-09-21",title:"Fight, flight or freeze? Governing the future of Moerdijk",who:"Patrick Witte",slides:true,theme:2,man:{r:"Same mandatory reading as lecture 4 (Witte et al. 2025).",doi:"—"},rec:[]},
 {n:6,d:"2026-09-24",title:"Planning for sustainability in African cities",who:"Shaun Smith",slides:true,theme:2,
  man:{r:"De Satgé, R. & Watson, V. (2018). Urban Planning in the Global South: Conflicting Rationalities in Contested Urban Space. Palgrave, ch. 1–2 (pp. 1–34).",doi:"10.1007/978-3-319-69496-2",note:"Book DOI; download chapters 1 and 2 via SpringerLink (UU access)."},
  rec:[{r:"Watson, V. (2014). Learning planning from the south. In Parnell & Oldfield (eds), Routledge Handbook on Cities of the Global South, pp. 98–108.",doi:"—",note:"No DOI; 'available upon request' from the lecturer."},{r:"Castán Broto et al. (2022). Co-production outcomes for urban equality. Current Research in Environmental Sustainability 4, 100179.",doi:"10.1016/j.crsust.2022.100179",note:"DOI inferred from the journal's pattern, not checked."}]},
 {n:7,d:"2026-09-28",title:"Planning for sustainability in Chinese cities",who:"Yanliu Lin",slides:true,theme:2,
  man:{r:"Liu, Y. & Zhou, Y. (2021). Territory spatial planning and national governance system in China. Land Use Policy 102, 105288.",doi:"10.1016/j.landusepol.2021.105288"},
  rec:[{r:"Fu, Y. & Zhang, X. (2017). Planning for sustainable cities? Master plans of eco, low-carbon and conventional new towns in China. Habitat International 63, 55–66.",doi:"10.1016/j.habitatint.2017.03.008"}]},
 {n:8,d:"2026-10-01",title:"Urban sustainability transitions",who:"Shaun Smith",slides:false,theme:2,
  man:{r:"Hodson, Geels & McMeekin (2017). Reconfiguring Urban Sustainability Transitions, Analysing Multiplicity. Sustainability 9(2), 299.",doi:"10.3390/su9020299"},
  rec:[{r:"Monstadt et al. (2022). Rethinking the governance of urban infrastructural transformations. Current Opinion in Environmental Sustainability 55, 101157.",doi:"10.1016/j.cosust.2022.101157"},{r:"Hölscher & Frantzeskaki (2021). Perspectives on urban transformation research. Urban Transformations 3, 2.",doi:"10.1186/s42854-021-00019-z"},{r:"Frantzeskaki et al. (2017). Urban sustainability transitions (book intro), pp. 1–19. Routledge.",doi:"10.4324/9781315228389",note:"Book DOI; the syllabus links a free preview PDF on vbn.aau.dk."}]},
 {n:9,d:"2026-10-05",title:"Urban experimentation and co-creation",who:"Niki Frantzeskaki",slides:false,theme:3,
  man:{r:"Bulkeley et al. (2019). Urban living laboratories: conducting the experimental city? European Urban and Regional Studies 26(4), 317–335.",doi:"10.1177/0969776418787222"},
  rec:[{r:"Frantzeskaki et al. (2025). Premises, practices and politics of co-creation for urban sustainability transitions. Urban Transformations 7, 7.",doi:"10.1186/s42854-025-00075-9"},{r:"Raven, von Wirth, Bai et al. (2026). The future of urban experimentation through ten critical lessons. Nature Cities 3, 210–217.",doi:"10.1038/s44284-026-00398-z"}]},
 {n:10,d:"2026-10-08",title:"Digital planning for sustainable urban futures",who:"Yanliu Lin",slides:false,theme:3,
  man:{r:"Lin, Geertman, Witte & Pinto (2025). Editorial: Digital planning for sustainable urban future. CEUS 122, 102334.",doi:"10.1016/j.compenvurbsys.2025.102334"},
  rec:[{r:"Geertman & Witte (2024). From PSScience to digital planning. CEUS 114, 102183.",doi:"10.1016/j.compenvurbsys.2024.102183",note:"DOI inferred from the journal's pattern, not checked."}]},
 {n:11,d:"2026-10-12",title:"Artificial intelligence, planning and sustainability",who:"Yanliu Lin",slides:false,theme:3,
  man:{r:"Li, X.Y. & Dang, A.R. (2025). Comment: the disruptive effect of AI on urban planning. Nature Cities 2(7), 568–570.",doi:"10.1038/s44284-025-00256-4"},
  rec:[{r:"Yigitcanlar et al. (2020). Contributions and risks of AI in building smarter cities. Energies 13(6), 1473.",doi:"10.3390/en13061473"}]},
 {n:12,d:"2026-10-15",title:"Planning for post-growth cities",who:"Shaun Smith",slides:false,theme:3,
  man:{r:"Durrant, Lamker & Rydin (2023). The Potential of Post-Growth Planning. Planning Theory & Practice 24(2), 287–295.",doi:"10.1080/14649357.2023.2198876"},
  rec:[{r:"Xue, J. (2021). Urban planning and degrowth: a missing dialogue. Local Environment 27(4), 404–422.",doi:"10.1080/13549839.2020.1867840"},{r:"Savini, Ferreira & von Schönfeld (2022). Uncoupling planning and economic growth (intro), in Post-growth planning, pp. 3–18. Routledge.",doi:"10.4324/9781003160984",note:"Book DOI from memory, not checked. Get the intro chapter via the UU library."}]},
 {n:13,d:"2026-10-19",title:"Planning with nature: history, principles, urban futures",who:"Niki Frantzeskaki",slides:false,theme:3,
  man:{r:"Hansen, R. et al. (2022). Transformative or piecemeal? Green space planning and governance in eleven European cities. European Planning Studies 31(12), 2401–2424.",doi:"10.1080/09654313.2022.2139594"},
  rec:[{r:"Frantzeskaki, N. (2019). Seven lessons for planning nature-based solutions in cities. Environmental Science & Policy 93, 101–111.",doi:"10.1016/j.envsci.2018.12.033"},{r:"Frantzeskaki, Wijsman, Kabisch & McPhearson (2025). Inter- and transdisciplinary knowledge… PNAS 122(29).",doi:"10.1073/pnas.2315911121"},{r:"Grabowski, McPhearson & Pickett (2023). Transforming US urban green infrastructure planning to address equity. Landscape and Urban Planning 229, 104591.",doi:"10.1016/j.landurbplan.2022.104591"}]}
];
PSC_LECTURES.forEach(l=>{l.have=true;});
const PSC_THEMES=["Planning dilemmas","Spatialising planning for sustainability","Planning approaches for sustainable cities"];
const DEADLINES=[["2026-10-07T17:00:00+02:00","Studio","Research plan (15%)"],["2026-11-06T17:00:00+01:00","Studio","Draft research report"],["2026-11-27T17:00:00+01:00","Studio","Research report (30%)"],["2027-01-20T13:15:00+01:00","Studio","Final presentation · closing symposium (25%)"],["2027-01-29T12:00:00+01:00","Studio","Project report & product (30%) · reflection essay 17:00"],["2026-10-05T16:00:00+02:00","BPT","Post questions in the Brightspace forum"],["2026-10-08T13:15:00+02:00","BPT","Midterm · Remindo"],["2026-10-26T13:30:00+01:00","PSC","Written exam · 2 of 6 essay questions"],["2026-11-05T13:15:00+01:00","BPT","Final exam · commentary"],["2026-11-06T23:59:00+01:00","PSC","Portfolio deadline"]];
DEADLINES.sort((a,b)=>new Date(a[0])-new Date(b[0]));

var course=null;
(function initHash(){try{const h=location.hash.slice(1);if(!h||h==="home")return;if(h.startsWith("psc")){course="psc";view=h;return;}if(h.startsWith("studio")){course="studio";view=h;return;}if(NAV.flatMap(g=>g[1]).some(t=>t[0]===h)){course="bpt";view=h;}}catch(e){}})();
function go(v,s){if(v==="home"){course=null;view="today";}else if(v.startsWith("psc")){course="psc";view=v;}else if(v.startsWith("studio")){course="studio";view=v;}else{course="bpt";view=v;}sub=s??null;render();window.scrollTo(0,0);}
const dleft=d=>Math.max(0,Math.ceil((d-Date.now())/DAY));
const PSC_NAV=[["Course",[["psc","Overview","home"],["psc-lectures","Lectures & readings","book"]]],["Practice",[["psc-flash","Flashcards","cards"],["psc-games","Games","spark"],["psc-essay","Essay practice","pen"]]],["About",[["psc-collect","Readings & DOIs","src"]]]];
const pscStats=()=>{const ids=PSC.map(l=>l.id);return {m:ids.reduce((a,id)=>a+topicStats(id).m,0)/ids.length,mast:ids.filter(id=>topicStats(id).mastered).length,due:dueCards(ids).length};};

function chromeHome(){$("#side").innerHTML="";$("#tabbar").innerHTML="";$("#cdm").textContent="";}
function chromePSC(){const got=PSC_LECTURES.filter(l=>l.have&&l.n!==5).length,total=PSC_LECTURES.filter(l=>l.man.doi!=="—").length;
  $("#side").innerHTML=`<button class="brand homebtn" data-go="home"><div class="logo" style="background:var(--good)">PSC</div><div><b>Sustainable Cities</b><small>GEO4-3124 · ← all courses</small></div></button>
  <button class="kbtn" data-pal="1">${ic('search')} Search or jump to… <span><kbd>⌘K</kbd></span></button>
  <nav class="nav">${PSC_NAV.map(([g,items])=>`<div class="grp">${g}</div>`+items.map(([k,l,i])=>`<button data-go="${k}" ${view===k?'aria-current="page"':''}>${ic(i)}${l}${k==='psc-flash'&&pscStats().due?`<span class="n">${pscStats().due}</span>`:''}</button>`).join('')).join('')}<div class="grp">Other course</div><button data-go="today">${ic('book')}Beyond Planning Theory</button></nav>
  <div class="sidefoot"><div class="lbl">Exam · Mon 26 Oct</div><div class="row between" style="margin-top:6px"><div><span class="big">${dleft(PSC_EXAM)}</span> <span class="mut small">days</span></div></div><div class="small mut" style="margin-top:4px">Mastery ${Math.round(pscStats().m*100)}% · ${pscStats().mast}/13 lectures green</div></div>`;
  $("#tabbar").innerHTML=[["home","Courses","grid"],["psc","Overview","home"],["psc-lectures","Lectures","book"],["psc-flash","Cards","cards"],["psc-essay","Essays","pen"]].map(([k,l,i])=>`<button data-go="${k}" ${view===k?'aria-current="page"':''}>${ic(i)}${l}</button>`).join('');
  $("#tabbar").style.gridTemplateColumns="repeat(5,1fr)";$("#cdm").textContent=`${dleft(PSC_EXAM)} days to exam`;}


/* abstract Utrecht skyline: zoning in plan, buildings in section, the Dom in UU yellow */
function miniSky(){let sd=29;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;let r="";for(let x=0;x<900;){const w=14+rnd()*26,h=10+rnd()*40;if(x>560&&x<600){x=604;continue;}r+=`<rect class="msb rise" style="--d:${Math.round(x/12)}" x="${x.toFixed(0)}" y="${(64-h).toFixed(0)}" width="${(w-2).toFixed(0)}" height="${h.toFixed(0)}"/>`;x+=w;}
  const dx=582;return `<div class="msky" aria-hidden="true"><svg viewBox="0 0 900 64" preserveAspectRatio="xMinYMax slice">${r}<g class="rise" style="--d:40"><rect class="msd" x="${dx-9}" y="22" width="18" height="42"/><rect class="msd" x="${dx-7}" y="10" width="14" height="13"/><rect class="msd" x="${dx-4}" y="2" width="8" height="9"/></g><line class="msl" x1="0" y1="63.5" x2="900" y2="63.5"/></svg></div>`;}
function skyline(){let sd=11;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;const W=1440,B=210;let out="",d=0;
  // perspective ground grid (the plan)
  let g="";for(let i=-12;i<=12;i++)g+=`<line x1="${720+i*30}" y1="${B}" x2="${720+i*170}" y2="300"/>`;[222,240,268].forEach(y=>g+=`<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`);
  // zoning blocks on the ground
  let z="";const zc=["var(--lime)","var(--good)","var(--uured)","var(--info)"];for(let i=0;i<9;i++){const x=rnd()*W,w=60+rnd()*140;z+=`<polygon class="zone" points="${x},${B+4} ${x+w},${B+4} ${x+w*1.25},${B+40} ${x-w*.25},${B+40}" fill="${zc[i%4]}"/>`;}
  // back layer
  let bk="";for(let x=-20;x<W;){const w=34+rnd()*60,h=50+rnd()*120;bk+=`<rect class="bk rise" style="--d:${d++}" x="${x}" y="${B-h}" width="${w-4}" height="${h}"/>`;x+=w;}
  // front layer with windows, leave room for the Dom at 930
  let fr="",lit=0;for(let x=-10;x<W;){const w=26+rnd()*44,h=24+rnd()*92;if(x>885&&x<985){x=990;continue;}
    let wins="";for(let yy=B-h+8;yy<B-10;yy+=14)for(let xx=x+6;xx<x+w-12;xx+=11){const on=rnd()<.06;wins+=`<rect class="${on?'lit':'win'}" ${on?`style="animation-delay:${(rnd()*4).toFixed(2)}s"`:''} x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" width="4" height="6" opacity="${on?1:.55}"/>`;}
    fr+=`<g class="rise" style="--d:${d++}"><rect class="fr" x="${x.toFixed(1)}" y="${(B-h).toFixed(1)}" width="${(w-3).toFixed(1)}" height="${h.toFixed(1)}"/>${wins}</g>`;x+=w;}
  // trees (parks)
  let tr="";[[120,9],[146,12],[170,8],[610,10],[634,13],[1180,11],[1206,8],[1330,12]].forEach(([x,r])=>tr+=`<circle class="tree rise" style="--d:${d++}" cx="${x}" cy="${B-r}" r="${r}"/>`);
  // the Dom tower (abstract)
  const dx=935;const dom=`<g class="rise" style="--d:${d++}"><rect class="dom" x="${dx-24}" y="${B-112}" width="48" height="112"/><rect class="dom" x="${dx-18}" y="${B-150}" width="36" height="40"/><rect class="dom" x="${dx-12}" y="${B-178}" width="24" height="30"/><polygon class="dom" points="${dx-12},${B-178} ${dx},${B-196} ${dx+12},${B-178}"/><rect class="domw" x="${dx-6}" y="${B-100}" width="12" height="22" rx="6"/><rect class="domw" x="${dx-5}" y="${B-142}" width="10" height="18" rx="5"/><rect class="domw" x="${dx-12}" y="${B-14}" width="24" height="14" rx="7"/></g>`;
  // masterplan line connecting nodes + a train along it
  const pts=[[60,B-130],[330,B-160],[620,B-120],[935,B-222],[1180,B-150],[1400,B-170]];const path="M"+pts.map(p=>p.join(",")).join(" L");
  const plan=`<path id="planline" class="plan" d="${path}"/>${pts.map(([x,y])=>`<circle class="node" cx="${x}" cy="${y}" r="4"/>`).join("")}<circle class="train" r="4.5"><animateMotion dur="14s" repeatCount="indefinite" rotate="auto"><mpath href="#planline"/></animateMotion></circle>
   <text class="lbl" x="${pts[1][0]+10}" y="${pts[1][1]-10}">structure ↔ agency</text><text class="lbl" x="${pts[4][0]+10}" y="${pts[4][1]-10}">the just city</text><text class="lbl" x="${pts[3][0]+16}" y="${pts[3][1]+4}">Utrecht</text>`;
  const canal=`<path class="canal" d="M0,${B+18} C 240,${B+8} 420,${B+30} 720,${B+18} S 1200,${B+6} 1440,${B+20}"/>`;
  return `<div class="sky" aria-hidden="true"><svg viewBox="0 -50 ${W} 350" preserveAspectRatio="xMidYMax slice">
   <g class="lyr" data-depth="6"><g class="grid">${g}</g>${z}${canal}</g>
   <g class="lyr" data-depth="12">${bk}</g>
   <g class="lyr" data-depth="20">${tr}${fr}${dom}</g>
   <g class="lyr" data-depth="28">${plan}</g></svg></div>`;}
function vHome(){const ov=overall(),due=dueCards().length,mast=BR().filter(r=>topicStats(r.id).mastered).length;
  const up=DEADLINES.filter(d=>new Date(d[0])>Date.now()).slice(0,5);
  return `<div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div><div class="home fade">
  <header class="hhead"><div class="row" style="gap:10px"><div class="logo">SP</div><b>Spatial Planner helper</b></div><div class="row"><span class="small mut hide-sm">${new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})}</span><button class="btn sm" data-go="method" data-sub="xfer" title="Move progress between devices">Sync devices</button><button class="kbtn" style="width:auto;margin:0" data-pal="1">${ic('search')}<kbd>⌘K</kbd></button></div></header>
  <section class="hhero"><p class="eyebrow">MSc Spatial Planning · Period 1 · Utrecht University</p>
   <h1 class="mega"><span class="ln" style="--i:0"><span>Spatial Planner</span></span><span class="ln" style="--i:1"><span class="hscript">helper<svg class="scrib" viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true"><path d="M4 28 C 60 10, 120 36, 180 18 S 270 8, 296 22"/></svg></span></span></h1>
   <p class="hsub">Summaries, figures, flashcards, quizzes and exam practice for the MSc Spatial Planning at Utrecht University. Pick a course.</p>
   <div class="hcount">${[[daysLeft(),"days to the BPT midterm"],[due,"cards due today"],[dleft(PSC_EXAM),"days to the PSC exam"]].map(([n,l])=>`<div><b>${n}</b><span>${l}</span></div>`).join('')}</div></section>
  ${skyline()}
  ${(()=>{const it=["BPT midterm · Thu 8 Oct","Retrieval beats rereading","PSC exam · Mon 26 Oct","Structure ↔ agency","Spaced repetition","Studio plan · Wed 7 Oct","Theory is a heuristic aid","Interleave your practice"];const row=c=>`<div class="mtrack ${c}">${[...it,...it].map(x=>`<span>${x}</span><i>✦</i>`).join('')}</div>`;return `<div class="marquee" aria-hidden="true">${row('')}${row('rev')}</div>`;})()}
  <section class="tiles">
   <button class="tile t-bpt" data-go="today"><div class="tglow"></div><span class="tidx">01</span>
    <div class="row between"><span class="tcode">GEO4-3115</span><span class="tpill">Midterm in ${daysLeft()} days</span></div>
    <div class="tname">Beyond<br>Planning Theory</div>
    <div class="tmeta">Rational planning · rational choice · neo-institutionalism · knowledge</div>
    <div class="tstats"><div>${ring(ov,'lg')}</div><div class="tnums"><div><b>${mast}<small>/${BR().length}</small></b><span>readings mastered</span></div><div><b>${due}</b><span>cards due</span></div><div><b>${streak()}</b><span>day streak</span></div></div></div>
    <span class="tcta">Continue studying →</span></button>
   <button class="tile t-psc" data-go="psc"><div class="tglow"></div><span class="tidx">02</span>
    <div class="row between"><span class="tcode">GEO4-3124</span><span class="tpill">Exam in ${dleft(PSC_EXAM)} days</span></div>
    <div class="tname">Planning for<br>Sustainable Cities</div>
    <div class="tmeta">Planning dilemmas · global planning systems · transitions · post-growth · nature</div>
    <div class="tstats"><div>${ring(pscStats().m,'lg')}</div><div class="tnums"><div><b>${pscStats().mast}<small>/13</small></b><span>lectures mastered</span></div><div><b>${pscStats().due}</b><span>cards due</span></div><div><b>${PSC_ESSAY.length}</b><span>essay drills</span></div></div></div>
    <span class="tcta">Continue studying →</span></button>
   <button class="tile t-std" data-go="studio"><div class="tglow"></div><span class="tidx">03</span>
    <div class="row between"><span class="tcode">GEO4-3127</span><span class="tpill">Plan due in ${dleft(new Date("2026-10-07T17:00:00+02:00"))} days</span></div>
    <div class="tname">Graduate<br>Planning Studio</div>
    <div class="tmeta">Just Cities · research plan → report → product → symposium</div>
    <div class="tstats"><div class="tbig">4</div><div class="tnums"><div><b>15%</b><span>research plan</span></div><div><b>30%</b><span>report</span></div><div><b>55%</b><span>product + talk</span></div></div></div>
    <span class="tcta">Open studio →</span></button>
  </section>
  <section class="hsec"><h3>Coming up</h3><div class="upc">${up.map(([d,c,t])=>{const dt=new Date(d);return `<div class="upi"><span class="dot ${c==='BPT'?'b':c==='PSC'?'p':'s'}"></span><div class="upd">${dt.toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</div><div class="upt">${esc(t)}</div><div class="small mut">${c} · in ${dleft(dt)} days</div></div>`}).join('')}</div></section>
  <section class="hsec"><div class="card"><div class="row between"><div class="eyebrow">Study activity</div><span class="small mut">${ic('flame')} ${streak()}-day streak</span></div>${heatmap()}</div></section>
  </div>`;}

function vPSC(){const nth=l=>new Date(l.d+"T12:00:00");const next=PSC_LECTURES.find(l=>nth(l)>=today0());
  return `<div class="fade"><p class="eyebrow">GEO4-3124 · Smith, Frantzeskaki, Lin</p><h1 class="hero">Planning for <em>Sustainable Cities</em></h1>
  <p class="lede">The course moves from theory to comparing contexts to approaches: 13 lectures across three themes, ending in a written exam on 26 Oct (70%). The portfolio and presentation count for 30%.</p>
  <div class="note ok" style="margin:14px 0">All 12 mandatory readings are on file and summarised. Slides are on file for lectures 1–7; lectures 8–13 are built from the reading only until their slides are uploaded. Every recommended reading has an abstract card plus what the slides say about it, because what the lecturer puts on a slide is what the exam is likely to ask.</div>
  <div class="row" style="margin:0 0 14px"><button class="btn primary" data-pscdue="1">${ic('cards')} Review due cards · ${pscStats().due}</button><button class="btn" data-go="psc-essay">${ic('pen')} Essay practice</button><button class="btn" data-go="psc-lectures">${ic('book')} Lectures</button></div>
  <div class="grid g3">
   <div class="card"><div class="eyebrow">Written exam · 70%</div><div class="stat">${dleft(PSC_EXAM)}<span class="mut" style="font-size:1rem"> days</span></div><p class="small mut" style="margin-top:6px">Mon 26 Oct 13:30–16:30, EDUC Gamma. Answer 2 of 6 questions; each has a short comprehension part + an essay part. Laptop, no notes, covers all lectures.</p></div>
   <div class="card"><div class="eyebrow">Portfolio + presentation · 30%</div><div class="stat">6 Nov</div><p class="small mut" style="margin-top:6px">Groups of 5. Per lecture: 2 slides (key arguments + critical reflection), plus a reflection per theme. One 10-min presentation + 10-min discussion. AI Index cat. 2: include an AI statement.</p></div>
   <div class="card"><div class="eyebrow">Next lecture</div>${next?`<div style="font:400 1.4rem/1.2 var(--serif);margin-top:6px">${esc(next.title)}</div><p class="small mut" style="margin-top:6px">L${next.n} · ${nth(next).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})} · ${esc(next.who)}</p>`:'<p>All lectures done.</p>'}</div>
  </div>
  <h3>Three themes</h3><div class="grid g3">${PSC_THEMES.map((t,i)=>`<div class="flat"><div class="eyebrow">Theme ${i+1}</div><b>${t}</b><div class="small mut" style="margin-top:4px">Lectures ${PSC_LECTURES.filter(l=>l.theme===i+1).map(l=>l.n).join(', ')}</div></div>`).join('')}</div>
  <h3>Course objectives</h3><ol class="small" style="max-width:68ch"><li>Understand the main theories of sustainable urban development.</li><li>Critically analyse dilemmas and trade-offs in planning for sustainable cities.</li><li>Identify and explain differences in planning systems and sustainability challenges worldwide.</li><li>Evaluate how planning systems, spatial contexts and strategies shape sustainability outcomes.</li><li>Critically assess and apply contemporary approaches (experimentation, collaborative, post-growth).</li></ol></div>`;}
function vPSCLectures(){return `<div class="fade"><p class="eyebrow">13 lectures · 1 mandatory reading each</p><h2 class="serif">Lectures & readings</h2><p class="lede">Open a lecture for what the slides said, the mandatory reading, and every recommended reading as abstract plus slide coverage. The ring is your mastery (cards in box 3 or higher).</p>
  ${[1,2,3].map(th=>`<div class="wkhead" style="--wk:${["#0b8f4d","#14b8a6","#2f6bff"][th-1]}"><b>Theme ${th}</b><span class="eyebrow">${PSC_THEMES[th-1]}</span></div><div class="list">${PSC_LECTURES.filter(l=>l.theme===th).map(l=>`<div class="item" style="--wk:${["#0b8f4d","#14b8a6","#2f6bff"][l.theme-1]}" data-go="psc-lecture" data-sub="p${l.n}"><div class="lnum">L${l.n}</div><div style="min-width:0"><div class="t">${esc(l.title)}</div><div class="s">${new Date(l.d+"T12:00").toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})} · ${esc(l.who)} · ${esc(l.man.r.split('(')[0].trim())}</div></div><div class="r">${l.slides?'<span class="chip full">Slides</span>':'<span class="chip plain">Reading only</span>'}${ring(topicStats("p"+l.n).m,"sm")}</div></div>`).join('')}</div>`).join('')}</div>`;}
function vPSCCollect(){const doiCell=d=>d==="—"?'<span class="mut">—</span>':`<a href="https://doi.org/${d}" target="_blank" rel="noopener" style="font-family:var(--mono);font-size:.78rem;word-break:break-all">${d}</a>`;
  const allDois=PSC_LECTURES.flatMap(l=>[l.man,...l.rec]).map(x=>x.doi).filter(d=>d!=="—");
  return `<div class="fade"><p class="eyebrow">For you to download</p><h2 class="serif">Readings to download</h2><p class="lede">Mandatory readings first: those are what the exam and presentations are built on. Recommended ones deepen the essays. DOIs link to the publisher; log in through UU for access.</p>
  <div class="row" style="margin:12px 0"><button class="btn sm" id="copydois" data-d="${allDois.join('\n')}">Copy all ${allDois.length} DOIs</button></div>
  <h3>Mandatory (12 unique)</h3><div class="tbl"><table><thead><tr><th>L</th><th>Reference</th><th>DOI</th></tr></thead><tbody>${PSC_LECTURES.map(l=>`<tr><td>${l.n}</td><td>${esc(l.man.r)}${l.man.note?`<div class="small mut">${esc(l.man.note)}</div>`:''}</td><td>${doiCell(l.man.doi)}</td></tr>`).join('')}</tbody></table></div>
  <h3>Recommended</h3><div class="tbl"><table><thead><tr><th>L</th><th>Reference</th><th>DOI</th></tr></thead><tbody>${PSC_LECTURES.flatMap(l=>l.rec.map(r=>`<tr><td>${l.n}</td><td>${esc(r.r)}${r.note?`<div class="small mut">${esc(r.note)}</div>`:''}</td><td>${doiCell(r.doi)}</td></tr>`)).join('')}</tbody></table></div></div>`;}

function render(){try{history.replaceState(null,"","#"+(course===null?"home":view))}catch(e){}
  document.body.classList.toggle("is-home",course===null);
  {const tb=[["bpt","BPT","Midterm Prep","#0c0c10"],["psc","PSC","Sustainable Cities","var(--good)"],["studio","STU","Planning Studio","#6d5bd0"]].find(x=>x[0]===course);const lg=document.querySelector(".topbar .logo"),nm=document.querySelector(".topbar b");if(tb&&lg&&nm){lg.textContent=tb[1];nm.textContent=tb[2];lg.style.background=tb[3];lg.style.color=tb[3]?"#fff":"";}}
  if(course===null){chromeHome();$("#app").innerHTML=vHome();return;}
  if(course==="studio"){chromeStudio();$("#app").innerHTML=vStudio();return;}
  if(course==="psc"){chromePSC();const V={"psc":vPSC,"psc-lectures":vPSCLectures,"psc-collect":vPSCCollect,"psc-lecture":vPSCLecture,"psc-flash":vFlash,"psc-games":vGames,"psc-game":vGame,"psc-essay":vOpen};$("#app").innerHTML=(V[view]||vPSC)();return;}
  $("#tabbar").style.gridTemplateColumns="";renderBPT();
  const b=document.querySelector(".side .brand");if(b&&!b.querySelector(".allc"))b.insertAdjacentHTML("beforeend",'');
  const side=$("#side");side.insertAdjacentHTML("afterbegin",'<button class="back allc" data-go="home" style="margin:0 8px 8px">'+ic('left')+' All courses</button>');}
document.addEventListener("click",e=>{const t=e.target.closest("#copydois");if(!t)return;const txt=t.dataset.d;
  (navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>toast("DOIs copied")).catch(()=>{toast("Copy blocked: select the table instead");});});
const _palItems=palItems;
palItems=function(){const g=_palItems();const extra=[["Home · all courses","go","home",""],["PSC · overview","go","psc",""],["PSC · readings to download","go","psc-collect",""],["PSC · flashcards","go","psc-flash",""],["PSC · essay practice","go","psc-essay",""],...PSC.map(l=>["PSC L"+l.n+" · "+l.title,"read",l.id,"lecture"])].filter(a=>!P.q||a[0].toLowerCase().includes(P.q.toLowerCase()));if(extra.length)g.unshift(["Courses",extra]);return g;};

document.addEventListener("click",e=>{const t=e.target.closest("[data-pscdue]");if(t)startFlash(null,false);});
function vPSCLecture(){const l=PSC.find(x=>x.id===sub)||PSC[0],L=PSC_LECTURES[l.n-1],s=topicStats(l.id),i=PSC.indexOf(l),prev=PSC[i-1],next=PSC[i+1];
  const es=OQ.map((o,j)=>[o,j]).filter(([o])=>o.t===l.id),eL=OQ.filter(o=>isPSC(o.t));
  const doi=d=>d&&d!=="—"?`<a href="https://doi.org/${d}" target="_blank" rel="noopener" class="small" style="font-family:var(--mono)">doi:${d}</a>`:'';
  const bchip=b=>b===B_ABS?'<span class="chip full">Abstract retrieved</span>':b===B_PART?'<span class="chip slides">Partial abstract</span>':'<span class="chip missing">No abstract · from general knowledge</span>';
  const m=l.man;
  return `<div class="fade"><button class="back" data-go="psc-lectures">${ic('left')} All lectures</button>
  <div class="row"><span class="eyebrow">Theme ${l.theme} · ${esc(PSC_THEMES[l.theme-1])}</span>${l.slides?'<span class="chip full">Slides on file</span>':'<span class="chip plain">No slides yet: reading only</span>'}</div>
  <h2 style="font-size:1.8rem;margin-top:10px">L${l.n} · ${esc(l.title)}</h2><p class="small mut">${esc(l.who)} · ${new Date(L.d+"T12:00").toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})}</p>
  <div class="rgrid"><div style="min-width:0">
   <h3>What the lecture said</h3>${l.lecture.map(p=>`<p>${esc(p)}</p>`).join('')}
   ${l.fig?`<figure class="fig">${l.fig}<figcaption>${esc(l.cap||'')}</figcaption></figure>`:''}
   ${l.table?`<div class="tbl"><table><thead><tr>${l.table.head.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${l.table.rows.map(row=>`<tr>${row.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:''}
   <div class="divider"></div>
   <p class="eyebrow">Mandatory reading</p><h3 style="margin-top:4px">${esc(m.cite)}</h3>${doi(L.man.doi)}
   <p class="oneliner">${esc(m.one)}</p>
   ${sumBlock(m.summary,m.ext,"h4")}
   <h4>Key concepts</h4><dl class="concepts">${m.concepts.map(([a,b])=>`<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>
   ${m.examples&&m.examples.length?`<h4>Examples</h4>${exList(m.examples)}`:''}${newsCard(m.news)}
   ${m.quotes&&m.quotes.length?`<h4>Quotes to know</h4>${m.quotes.map(q=>`<blockquote>${esc(q)}</blockquote>`).join('')}`:''}
   ${l.rec.length?`<div class="divider"></div><p class="eyebrow">Recommended literature · ${l.rec.length}</p><p class="small mut" style="max-width:68ch">You don't need to know these in depth, but the slides draw on them, so the exam can too. For each: the abstract, then what the slides take from it.</p>
   ${l.rec.map(r=>`<div class="card" style="margin-top:12px"><div class="row between"><b style="max-width:60ch">${esc(r.cite)}</b>${bchip(r.basis)}</div>${doi(r.doi)}
    <h4 style="margin-top:10px">Abstract</h4><p class="small">${esc(r.abs)}</p>
    <h4>What the slides say about it</h4><div class="note">${esc(r.slides)}</div></div>`).join('')}`:''}
   ${lectBlock(l.lect)}<h3>Exam angle</h3><div class="note">${esc(l.exam)}</div>
   <div class="row between" style="margin-top:28px">${prev?`<button class="btn sm" data-go="psc-lecture" data-sub="${prev.id}">${ic('left')} L${prev.n}</button>`:'<span></span>'}${next?`<button class="btn sm" data-go="psc-lecture" data-sub="${next.id}">L${next.n} →</button>`:''}</div>
  </div>
  <aside class="rside"><div class="card">${masteryCard(s)}
   <div class="stack" style="margin-top:14px"><button class="btn primary" data-flashtopic="${l.id}">${ic('cards')} Flashcards · ${s.nc}</button><button class="btn" data-blurt="${l.id}">${ic('spark')} Brain dump (3 min)</button>${es.length?`<button class="btn" data-go="psc-essay" data-sub="r:${l.id}">${ic('pen')} Essay questions · ${es.length}</button>`:''}</div></div>
   <div class="card"><div class="row" style="gap:10px"><label class="check"><input type="checkbox" data-read="${l.id}" ${S.read[l.id]?'checked':''}><span>Read the text itself</span></label></div><textarea data-note="${l.id}" style="margin-top:8px" placeholder="Recall: the argument in one sentence, three concepts…">${esc(S.notes[l.id]||'')}</textarea></div>
   <div class="note ${m.status==='full'?'ok':''}">${l.slides?'Built from the lecture slides and the full text of the mandatory reading.':'Built from the full text of the mandatory reading. The slides for this lecture are not uploaded yet, so the lecture section is a preview.'}</div></aside></div></div>`;}
