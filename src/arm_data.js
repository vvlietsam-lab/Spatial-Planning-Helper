/* ===== Advanced Research Methods (GEO4-3120), period 2, 2026-27. Source: course manual version 4.
   No written exam: a research proposal (50%), a 5-minute presentation plus a 20-minute oral exam (50%).
   Readings are listed with DOIs until uploaded; practice prompts are built from the manual's key learnings, not official exam questions. ===== */
(function(){
const R=(short,lec,ref,doi,o)=>Object.assign({short,lec,status:"missing",ref,doi},o||{});
const RUB=["Clarity of research topic, research question, academic and societal relevance","Consistency between theoretical (or conceptual) framework and research question(s)","Explanation of the methodology and chosen methods","Suitability of chosen methods and empirical case(s)","Feasibility of the research and research plan"];
const STRUCT=[["Front page",["Full title and subtitle","Name, student number, email","Thesis supervisor"]],
 ["Key information",["Summary (250 words)","Key concepts (max 5)","Table of contents"]],
 ["Introduction",["Research issue, problem definition and knowledge gap","How scholars have approached the problem so far","Research objective, research question and sub-questions","Societal and scientific relevance"]],
 ["Theoretical framework",["Relevant theories and approaches and how they form a framework","Conceptual framework (if applicable)","Hypotheses or assumptions to be tested (if applicable)"]],
 ["Methods",["Research methodology incl. methods and techniques","Research materials (e.g. cases)","Data collection methods, explained in detail","Data analysis methods, explained in detail","Operationalisation of variables or concepts","Positionality statement"]],
 ["Discussion",["Expected results and their relevance for spatial planning","Limitations and risks","Ethical issues (if applicable)"]],
 ["Time planning and outline",["Timetable of research activities","Outline of the research report"]],
 ["References",["In-text references and a reference list in one consistent style"]]];
const COND=["Complete: all parts addressed","Within the scope of spatial planning research","Builds on course material","Sufficient English","References in text and list, consistent style","Submitted on time (Fri 18 Dec, Brightspace + email to supervisor)","Not a product of a generative AI agent"];
/* practice prompts for the oral exam: three per round, about 5 minutes each. Built from the lecture key learnings in the manual. */
const ORAL=[
 [1,"How did you get from a real-world problem, policy context or the literature to your research question? Which knowledge gap does it address?"],
 [1,"What type of research gap does your proposal fill, and how do your sub-questions together answer the main question?"],
 [2,"Is your research a case study? Explain what kind of case design you use (single, comparative, deep dive) and why it fits your question."],
 [2,"What can, and what can't, your case(s) tell you beyond the case itself?"],
 [3,"Could ethnography (long-term or short-term) contribute to your research? What would it add, and what would it demand from you as a researcher?"],
 [3,"How does your positionality affect your data collection and interpretation? How do you deal with it?"],
 [4,"Could social media data help answer your research question? How would you collect and analyse it, and what are the risks of bias, credibility, ethics and privacy?"],
 [5,"What is the difference between a theoretical, a conceptual and an analytical framework, and which one do you use?"],
 [5,"How does your theory inform your research question and your choice of methods?"],
 [5,"How did you structure your literature review, and how did you search for literature?"],
 [6,"How did you operationalise your concepts into interview questions? Give an example."],
 [6,"Which interviewees will you approach and why? How would you handle an interviewee who only gives abstract, buzz-word answers?"],
 [6,"Which practical and safety issues do you expect in the field, and how will you deal with them?"],
 [7,"How will you analyse your data? Explain your coding or thematic analysis step by step."],
 [7,"How do you compare your findings with your theoretical or conceptual framework?"],
 [8,"If you use policy documents: how will you select and analyse them, and what are the limits of documents as data?"],
 [7,"Would mixed methods strengthen your design? Why or why not?"],
 [9,"What are the main limitations and risks of your research, and how do they affect what you can conclude?"],
 [9,"Is your research feasible within the thesis period? Walk us through your planning."]];
const IVT=[["The Buzz Word Teller","Stays abstract and optimistic, gives a lot but not very useful information; sounds like a campaign talker rather than a practitioner."],["The Know-It Better","A domain expert with an intimidating attitude who interrogates your questions and the research scope instead of sharing knowledge."],["The High-expectations interviewee","Talks a lot about many relevant topics but with little specific input, drifts into side stories and dominates the conversation."],["The Difficult-to-Open-Up interviewee","Shares too little, is sceptical, gives closed answers, questions your motives and positionality, and often starts talking once the recorder is off."]];

function vOral(c,sub){const s=CT.st(c.id);const O=s.oral=s.oral||{};
  if(sub==="run"&&O.cur){const i=O.cur.i,qs=O.cur.qs;if(i>=qs.length)return `<div class="fade"><h2 class="serif">Round done</h2><p class="lede">Check each answer against the three criteria: theoretical justification, conceptual clarity (does it connect to <i>your</i> question, framework and methods?) and elaboration (correct method concepts, limitations, implications).</p>${qs.map((q,j)=>`<div class="flat" style="margin:8px 0"><b>${esc(ORAL[q][1])}</b><div class="small" style="white-space:pre-wrap;margin-top:6px">${esc((O.ans||{})[q]||"(no notes)")}</div></div>`).join("")}<div class="row" style="margin-top:12px;gap:8px"><button class="btn primary" data-armoral="new">New round</button><button class="btn" data-go="arm-oral">Back</button></div></div>`;
   const q=qs[i];return `<div class="fade"><div class="row between"><button class="back" data-go="arm-oral">${ic('left')} Oral exam practice</button><span class="chip" id="armtimer">5:00</span></div><div class="qcard" style="margin-top:10px"><span class="eyebrow">Question ${i+1} of 3 · lecture ${ORAL[q][0]}</span><p class="qq">${esc(ORAL[q][1])}</p><p class="small mut">Answer out loud first, as in the exam (no devices, only paper). Then jot down what you said.</p><textarea class="ta" rows="5" data-armans="${q}">${esc((O.ans||{})[q]||"")}</textarea><div class="row" style="justify-content:flex-end;margin-top:10px"><button class="btn primary" data-armoral="next">${i<2?"Next question":"Finish"}</button></div></div></div>`;}
  return `<div class="fade"><p class="eyebrow">20 minutes in person · 12, 14, 19 or 21 Jan</p><h2 class="serif">Oral exam practice</h2><p class="lede">The oral exam: 5 minutes presenting your proposal (own laptop), then 3 questions in 15 minutes, about 5 minutes each. Answers must build on the course lectures and readings and connect to your own proposal. Paper and pen allowed; no devices.</p>
  <div class="note" style="margin:12px 0">These practice prompts are built from the key learnings in the course manual. They are not the official exam questions.</div>
  <div class="row" style="gap:8px;margin:12px 0"><button class="btn primary" data-armoral="new">${ic('clock')} Practice round: 3 random questions, 5 min each</button><button class="btn" data-go="arm-present">${ic('clock')} 5-minute presentation timer</button></div>
  <h3>Grading criteria</h3><ol class="small" style="max-width:70ch"><li><b>Theoretical justification:</b> uses concepts, methods and methodological grounding from the course (the theory of the methods).</li><li><b>Conceptual clarity:</b> connects the research question of your own proposal to your theoretical framework and methods.</li><li><b>Elaboration:</b> research thinking, correct concepts for methodological choices, limitations and implications.</li></ol>
  <h3>All practice prompts</h3><div class="list">${ORAL.map(([l,q],i)=>`<div class="item"><div class="lnum">L${l}</div><div class="t" style="font-weight:400">${esc(q)}</div><span></span></div>`).join("")}</div>
  <p class="small mut" style="margin-top:12px">You must score 5.5 or higher on every component (proposal, presentation and oral exam) to pass.</p></div>`;}

function vPresent(c){return `<div class="fade"><button class="back" data-go="arm-oral">${ic('left')} Oral exam practice</button><h2 class="serif">5-minute presentation</h2><p class="lede">Problem, research question, methodology and theoretical framework in 5 minutes (5–7 slides). Graded on: originality of topic and question, explanation and consistency of the methodology, expected academic and social impact, and structure and use of the medium.</p>
  <div class="card" style="text-align:center;padding:30px"><div class="stat" id="armpt" style="font-size:4rem">5:00</div><div class="row" style="justify-content:center;gap:8px;margin-top:12px"><button class="btn primary" data-armpt="start">Start</button><button class="btn" data-armpt="reset">Reset</button></div><p class="small mut" style="margin-top:10px">Suggested split: 0:45 problem and gap · 0:45 question and sub-questions · 1:00 framework · 1:45 methods and case · 0:45 expected impact and planning.</p></div></div>`;}

function vProposal(c){const s=CT.st(c.id);const P=s.prop=s.prop||{};const n=STRUCT.reduce((a,[,it])=>a+it.length,0),done=Object.values(P).filter(Boolean).length;
  return `<div class="fade"><p class="eyebrow">Assignment 1 · 50% · max 5,000 words excl. references · Fri 18 Dec</p><h2 class="serif">Proposal checklist</h2><p class="lede">Graded by your thesis supervisor. Tick off each required element (Table 1 of the manual). Your ticks are saved in this browser.</p>
  <div class="card" style="margin:12px 0"><div class="eyebrow">Progress</div><div class="stat">${done}<span class="mut" style="font-size:1rem"> / ${n}</span></div></div>
  ${STRUCT.map(([h,it],i)=>`<h3>${esc(h)}</h3>${it.map((x,j)=>`<label class="flat" style="display:flex;gap:10px;margin:6px 0;cursor:pointer"><input type="checkbox" data-armprop="${i}-${j}" ${P[i+"-"+j]?"checked":""}> <span>${esc(x)}</span></label>`).join("")}`).join("")}
  <h3>Five grading criteria</h3><ol class="small">${RUB.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
  <h3>Conditions before grading</h3><ul class="small">${COND.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`;}

function vLabs(c){return `<div class="fade"><p class="eyebrow">Learning by doing</p><h2 class="serif">Learning labs</h2>
  <div class="card" style="margin:12px 0"><div class="eyebrow">Lab 1 · debating methods · green-light assignment</div><p>Groups of 10 read one assigned paper. Five argue <b>why</b> its methods suit the research question (why, what form, how applied); five argue the <b>why not</b>: limitations and blind spots. 30 minutes for both cases, everyone present, no reading from scripts. It is about the methods only: not the question, the theory or the results. Passing it gives you the green light for assignments 1 and 2.</p><p class="small mut">Slots: Fri 27 Nov groups 1–3 · Tue 1 Dec groups 4–5 · Tue 8 Dec groups 6–7.</p></div>
  <div class="card" style="margin:12px 0"><div class="eyebrow">Lab 2 · interviewing · Thu 3 Dec</div><p>Interactive theatre in four scenes: a lecturer plays a difficult interviewee, a student volunteer interviews.</p>${IVT.map(([t,d])=>`<div class="flat" style="margin:8px 0"><b>${esc(t)}</b><div class="small">${esc(d)}</div></div>`).join("")}</div>
  <div class="card" style="margin:12px 0"><div class="eyebrow">Lab 3 · policy documents · Thu 10 Dec</div><p>Thematic analysis of one policy document, set up in different ways for different research questions. Read beforehand: European Commission (2025), <i>An EU Agenda for Cities: Driving Growth and Prosperity</i> (Brightspace).</p></div></div>`;}

CT.add({id:"arm",code:"GEO4-3120",title:"Advanced Research Methods",short:"ARM",color:"#7c3aed",kind:"Frantzeskaki, Wolff, Lin",tile:"Research questions · case study · ethnography · interviews · analysis",deadlines:[["2026-11-27T14:15:00+01:00","Learning lab 1 starts"],["2026-12-18T23:59:00+01:00","Research proposal due"],["2027-01-12T09:30:00+01:00","Oral exams start"]],
 heroHtml:"Advanced <em>Research Methods</em>",
 lede:"From real-world problem to research question, framework and methods: the course builds your thesis research proposal. No written exam: a proposal (50%), and a 5-minute presentation with a 20-minute oral exam (50%).",
 banner:"Course structure, deadlines, rubrics, learning labs and the reading list are in. Upload the readings to get summaries and checked questions per lecture.",
 exam:{date:"2026-12-18T23:59:00+01:00",label:"Research proposal due",short:"the proposal"},
 practice:[["arm-oral","Oral exam practice","pen"],["arm-proposal","Proposal checklist","book"],["arm-labs","Learning labs","grid"]],
 extras:[["arm-present","Presentation timer","clock"]],
 cta:[["arm-proposal","Proposal checklist","book"],["arm-oral","Oral exam practice","pen"],["arm-labs","Learning labs","grid"],["arm-lectures","Lectures","book"]],
 cards:[["Proposal · 50%","18 Dec","Individual, max 5,000 words excl. references. Upload to Brightspace and email to your thesis supervisor, who grades it. One 1-hour feedback meeting with the supervisor."],
  ["Presentation + oral · 50%","12–21 Jan","5 minutes presenting your proposal, then 3 questions on it in 15 minutes. Groups announced before Christmas. Score 5.5+ on every component."]],
 blocks:[["Learning objectives",`<ol class="small" style="max-width:70ch"><li>Understand the relation between theory, methodology and research design.</li><li>Read academic material critically and relate it to your own research plan.</li><li>Develop research questions from theory, observation and policy context.</li><li>Connect theory to research questions and research critically.</li><li>Produce a research proposal with qualitative or quantitative methods that will guide your thesis.</li><li>Present your proposal professionally, and give and receive critical feedback.</li></ol>`],
  ["Good to know",`<ul class="small" style="max-width:70ch"><li>Flipped classroom: study the material before each session.</li><li>Attendance is mandatory (not monitored). Recording lectures without permission is not allowed.</li><li>Recommended books: Bryman, <i>Social Research Methods</i> (esp. ch. 3 on research designs) and Ward (2020), <i>Researching the City</i>.</li><li>AI tools for literature search mentioned in lecture 5: Elicit and Research Rabbit, plus the UU library databases. The proposal itself must not be a product of generative AI.</li></ul>`]],
 lectures:[
  {n:1,d:"2026-11-17",title:"Introduction & formulating research questions",who:"Niki Frantzeskaki",readings:["agee","miles","raven","meyr","lepaw"]},
  {n:2,d:"2026-11-19",title:"Case study as a research method",who:"Erich Wolff",readings:["biggs","flyv","okoko"]},
  {n:3,d:"2026-11-19",title:"Ethnography as a research method",who:"Erich Wolff",readings:["field","oreil","pink09","pinkm"]},
  {n:4,d:"2026-11-24",title:"Social media as a research method",who:"Yanliu Lin",readings:["qiu","he24","link21"]},
  {n:5,d:"2026-11-27",title:"Structuring your research: theory and methods links",who:"Niki Frantzeskaki",tag:"+ Learning lab 1 (groups 1–3)",readings:["macc","mcard"]},
  {n:6,d:"2026-12-03",title:"Interviewing as a research method",who:"Niki Frantzeskaki",tag:"+ Learning lab 2",readings:["shack","evans","loi","rob","schaf","dor"]},
  {n:7,d:"2026-12-08",title:"Data analysis methods",who:"Niki Frantzeskaki",tag:"+ Learning lab 1 (groups 6–7)",readings:["devos","eu21","konsti","mayr","bc06","bowen","lochm","mort","bc23","bryq","field24","bry3","warsh","brown","wang","canig","knecht"]},
  {n:8,d:"2026-12-10",title:"How to read policy documents",tag:"+ Learning lab 3",readings:["eu25"]},
  {n:9,d:"2026-12-15",title:"Writing a research proposal",who:"Niki Frantzeskaki",readings:[]},
  {n:10,d:"2026-12-17",title:"Shut-up-and-write (online)",who:"Niki Frantzeskaki",readings:[],note:"Proposal deadline the next day: Fri 18 Dec."},
  {n:11,d:"2027-01-12",title:"Oral exams (also 14, 19 and 21 Jan)",readings:[]},
  {n:12,d:"2027-01-26",title:"Open feedback session",who:"Niki Frantzeskaki",readings:[]}],
 readings:{
  agee:R("Agee 2009",1,"Agee, J. (2009). Developing qualitative research questions: a reflective process. International Journal of Qualitative Studies in Education, 22(4), 431–447.","10.1080/09518390902736512"),
  miles:R("Miles 2017",1,"Miles, A. D. (2017). A taxonomy of research gaps: Identifying and defining the seven research gaps. Journal of Research Methods and Strategies.","",{where:"Brightspace"}),
  raven:R("Ravensbergen & El-Geneidy 2023",1,"Ravensbergen, L., & El-Geneidy, A. (2023). Toward evidence-based urban planning. Journal of the American Planning Association, 89(3), 389–398.","10.1080/01944363.2022.2074872",{optional:true}),
  meyr:R("Meyrick 2006",1,"Meyrick, J. (2006). What is good qualitative research? Journal of Health Psychology.","10.1177/1359105306066643",{optional:true}),
  lepaw:R("Lepawsky et al. 2019",1,"Lepawsky, J., Davis, J.-M., Akese, G., & Persaud, D. (2019). Cooking with controversies: How geographers might use controversy mapping as a research tool. The Professional Geographer, 71(3), 437–448.","10.1080/00330124.2018.1531243",{optional:true}),
  biggs:R("Biggs et al. 2021",2,"Biggs, R., et al. (2021). The Routledge Handbook of Research Methods for Social-Ecological Systems. Routledge (open access).","10.4324/9781003021339"),
  flyv:R("Flyvbjerg 2006",2,"Flyvbjerg, B. (2006). Five misunderstandings about case-study research. Qualitative Inquiry, 12(2).","10.1177/1077800405284363"),
  okoko:R("Okoko et al. 2023",2,"Okoko, J. M., Tunison, S., & Walker, K. D. (Eds.) (2023). Varieties of Qualitative Research Methods. Springer.","10.1007/978-3-031-04394-9"),
  field:R("Fielding 2008",3,"Fielding, N. (2008). Ethnography. In Researching Social Life, 3rd ed. Sage.","",{where:"Brightspace / library"}),
  oreil:R("O'Reilly 2012",3,"O'Reilly, K. (2012). Writing, reflexivity and autobiography. In Ethnographic Methods, 2nd ed. Routledge.","",{where:"Brightspace / library"}),
  pink09:R("Pink 2009",3,"Pink, S. (2009). Between experience and scholarship: Representing sensory ethnography. In Doing Sensory Ethnography. Sage.","10.4135/9781446249383"),
  pinkm:R("Pink & Morgan 2013",3,"Pink, S., & Morgan, J. (2013). Short-term ethnography: Intense routes to knowing. Symbolic Interaction, 36(3), 351–361.","10.1002/symb.66"),
  qiu:R("Qiu et al. 2024",4,"Qiu, Y. J., Lin, Y. L., He, J. Y., & Lu, H. M. (2024). Using social media data to understand citizen perceptions of urban planning in a city simulation game. Simulation & Gaming, 55(5), 943–963.","",{where:"Simulation & Gaming 55(5)"}),
  he24:R("He et al. 2024",4,"He, J. Y., Lin, Y. L., Hooimeijer, P., & Monstadt, J. (2024). Measuring social network influence on power relations in collaborative planning: Beijing. Cities, 148, 104866.","",{where:"Cities 148, 104866"}),
  link21:R("Lin & Kant 2021",4,"Lin, Y. L., & Kant, S. (2021). Social media for citizen participation: Contexts, empowerment and inclusion. Sustainability, 13(12), 6635.","",{where:"Sustainability 13(12), 6635"}),
  macc:R("MacCallum et al. 2019",5,"MacCallum, D., Babb, C., & Curtis, C. (2019). Ch. 3 Theories in planning research. In Doing Research in Urban and Regional Planning. Routledge.","10.4324/9781315818894"),
  mcard:R("McArdle 2022",5,"McArdle, R. (2022). Flexible methodologies: A case for approaching research with fluidity. The Professional Geographer, 74(4), 620–627.","10.1080/00330124.2021.2023593"),
  shack:R("Shackleton et al. 2022",6,"Shackleton, S., et al. (2022). Interviews and surveys. Ch. 7 in Biggs et al., Handbook of Research Methods for Social-Ecological Systems, pp. 107–118.","10.4324/9781003021339"),
  evans:R("Evans & Jones 2011",6,"Evans, J., & Jones, P. (2011). The walking interview: Methodology, mobility and place. Applied Geography, 31, 849–858.","10.1016/j.apgeog.2010.09.005"),
  loi:R("Lo Iacono et al. 2016",6,"Lo Iacono, V., et al. (2016). Skype as a tool for qualitative research interviews. Sociological Research Online, 21(2).","",{optional:true,where:"Sociological Research Online 21(2)"}),
  rob:R("Roberts 2020",6,"Roberts, R. E. (2020). Qualitative interview questions: Guidance for novice researchers. The Qualitative Report, 25(9), 3185–3203.","10.46743/2160-3715/2020.4640",{optional:true}),
  schaf:R("Schaffer 2013",6,"Schaffer, F. C. (2013). Ordinary language interviewing. Routledge, 2nd ed.","",{optional:true,where:"ISBN 9781315703275"}),
  dor:R("Döringer 2021",6,"Döringer, S. (2021). 'The problem-centred expert interview'. International Journal of Social Research Methodology, 24(3), 265–278.","10.1080/13645579.2020.1766777",{optional:true}),
  devos:R("De Vos et al. 2022",7,"De Vos, A., et al. (2022). Participatory data collection. Ch. 8 in Biggs et al., Handbook, pp. 119–134.","10.4324/9781003021339",{optional:true}),
  eu21:R("EU 2021",7,"European Union (2021). Applying the degree of urbanisation: A methodological manual.","10.2785/706535",{optional:true}),
  konsti:R("Konsti-Laakso & Rantala 2018",7,"Konsti-Laakso, S., & Rantala, T. (2018). Managing community engagement: A process model for urban planning. European Journal of Operational Research, 268, 1040–1049.","10.1016/j.ejor.2017.12.002",{optional:true}),
  mayr:R("Mayring 2000",7,"Mayring, P. (2000). Qualitative content analysis. Forum: Qualitative Social Research, 1(2).","",{where:"qualitative-research.net/fqs"}),
  bc06:R("Braun & Clarke 2006",7,"Braun, V., & Clarke, V. (2006). Using thematic analysis in psychology. Qualitative Research in Psychology, 3(2), 77–101.","10.1191/1478088706qp063oa",{optional:true}),
  bowen:R("Bowen 2009",7,"Bowen, G. A. (2009). Document analysis as a qualitative research method. Qualitative Research Journal, 9(2), 27–40.","10.3316/QRJ0902027",{optional:true}),
  lochm:R("Lochmiller 2021",7,"Lochmiller, C. R. (2021). Conducting thematic analysis. The Qualitative Report, 26(6), 2029–2044.","10.46743/2160-3715/2021.5008",{optional:true}),
  mort:R("Mortelmans et al. 2026",7,"Mortelmans, D., et al. (2026). Data Analysis with NVivo. Springer (open access).","10.1007/978-3-031-66014-6",{optional:true}),
  bc23:R("Braun & Clarke 2023",7,"Braun, V., & Clarke, V. (2023). Toward good practice in thematic analysis. International Journal of Transgender Health, 24(1), 1–6.","10.1080/26895269.2022.2129597",{optional:true}),
  bryq:R("Bryman 2016 (quantitative)",7,"Bryman, A. (2016). Social Research Methods. Oxford University Press (chapters on quantitative research).","",{optional:true,where:"Library"}),
  field24:R("Field 2024",7,"Field, A. (2024). Discovering Statistics Using IBM SPSS Statistics. Sage.","",{optional:true,where:"Library"}),
  bry3:R("Bryman 2016 ch. 3",7,"Bryman, A. (2016). Research designs. Ch. 3 in Bryman's Social Research Methods. Oxford University Press.","",{where:"Library (called 'a very important reading')"}),
  warsh:R("Warshawsky 2014",7,"Warshawsky, D. (2014). The potential for mixed methods: Results from the field in urban South Africa. The Professional Geographer, 66(1), 160–168.","10.1080/00330124.2013.768141",{optional:true}),
  brown:R("Brown et al. 2017",7,"Brown, G., et al. (2017). Mixed methods participatory GIS. Applied Geography, 79, 153–166.","10.1016/j.apgeog.2016.12.015",{optional:true}),
  wang:R("Wang et al. 2022",7,"Wang, et al. (2022). Visible green space predicts emotion: Evidence from social media and street view data. Applied Geography, 148.","10.1016/j.apgeog.2022.102803",{optional:true}),
  canig:R("Caniglia et al. 2020",7,"Caniglia, G., et al. (2020). A pluralistic and integrated approach to action-oriented knowledge for sustainability. Nature Sustainability.","10.1038/s41893-020-00616-z",{optional:true}),
  knecht:R("De Knecht et al. 2021",7,"De Knecht, S., et al. (2021). Reshaping the Academic Self: Connecting Education and Open Science. Utrecht University.","",{optional:true,where:"Utrecht University"}),
  eu25:R("European Commission 2025",8,"European Commission (2025). An EU Agenda for Cities: Driving Growth and Prosperity.","",{where:"Brightspace (read before Lab 3)"})},
 questions:[],open:[],
 views:{oral:vOral,present:vPresent,proposal:vProposal,labs:vLabs}
});
/* events for the ARM views */
let ptT=null,ptEnd=0;
document.addEventListener("click",e=>{const t=e.target.closest("[data-armoral],[data-armpt]");if(!t)return;const s=CT.st("arm");const O=s.oral=s.oral||{};
 if(t.dataset.armoral==="new"){O.cur={qs:shuffle(ORAL.map((_,i)=>i)).slice(0,3),i:0};O.ans=O.ans||{};try{persist();}catch(_){}go("arm-oral","run");startT();return;}
 if(t.dataset.armoral==="next"&&O.cur){O.cur.i++;try{persist();}catch(_){}try{qTick(1);}catch(_){}go("arm-oral","run");if(O.cur.i<3)startT();return;}
 if(t.dataset.armpt){const el=document.getElementById("armpt");clearInterval(ptT);if(t.dataset.armpt==="reset"){if(el)el.textContent="5:00";return;}ptEnd=Date.now()+300000;ptT=setInterval(()=>{const el=document.getElementById("armpt");if(!el){clearInterval(ptT);return;}const l=Math.max(0,Math.round((ptEnd-Date.now())/1000));el.textContent=Math.floor(l/60)+":"+String(l%60).padStart(2,"0");el.style.color=l<30?"var(--accent)":"";if(!l)clearInterval(ptT);},250);}});
function startT(){clearInterval(ptT);ptEnd=Date.now()+300000;ptT=setInterval(()=>{const el=document.getElementById("armtimer");if(!el){clearInterval(ptT);return;}const l=Math.max(0,Math.round((ptEnd-Date.now())/1000));el.textContent=Math.floor(l/60)+":"+String(l%60).padStart(2,"0");if(!l)clearInterval(ptT);},500);}
document.addEventListener("input",e=>{const t=e.target;if(t.dataset.armans){const s=CT.st("arm");s.oral=s.oral||{};s.oral.ans=s.oral.ans||{};s.oral.ans[t.dataset.armans]=t.value;clearTimeout(t._t);t._t=setTimeout(()=>{try{persist();}catch(_){}},500);}
 if(t.dataset.armprop){const s=CT.st("arm");s.prop=s.prop||{};s.prop[t.dataset.armprop]=t.checked;try{persist();}catch(_){}}});
document.addEventListener("change",e=>{const t=e.target;if(t.dataset&&t.dataset.armprop){const s=CT.st("arm");s.prop=s.prop||{};s.prop[t.dataset.armprop]=t.checked;try{persist();}catch(_){}}});
})();
/* first paint happened before the template courses existed: render once more */
try{render();}catch(e){}
