const EXAM = new Date("2026-10-08T13:15:00+02:00");
const COURSE_START = new Date("2026-09-07T00:00:00+02:00");
const WEEKS = [
 {n:1,cw:36,dates:"Sep 7–13",title:"What is theory?",items:["Tue 8 Sep: Introduction · Rydin (2021) Intro · Buitelaar (2026)","Thu 10 Sep: Self-guided excursion (SEPPO)"],topics:["fw","buit"]},
 {n:2,cw:37,dates:"Sep 14–20",title:"Knowledge · structure & agency",items:["Tue 15 Sep: Knowledge in planning theory · Hall (2020) · Rydin (2007)","Thu 17 Sep: Structure, agency & change · Hayek (1944) · Marx (1844) · Cozzolino (2020)","Thu 17 Sep: Tutorial 1 (Cozzolino)"],topics:["hall","know","marx","hayek","cozz"]},
 {n:3,cw:38,dates:"Sep 21–27",title:"Rational planning & rational choice",items:["Tue 22 Sep: High modernism & rational-comprehensive planning · Rydin (2021) ch. 2 · Scott · Davoudi","Thu 24 Sep: Rational choice · Needham · Hindmoor/Olson · Taylor","Thu 24 Sep: Tutorial 2 (Davoudi)"],topics:["gov","scott","davoudi","alex","rc","needham","olson","taylor"]},
 {n:4,cw:39,dates:"Sep 28–Oct 4",title:"Neo-institutionalism",items:["Tue 29 Sep: Neo-institutionalism · Dembski & Salet · Moroni · Sorensen","Thu 1 Oct: Tutorial 3"],topics:["ni","dembski","moroni","sorensen"]},
 {n:5,cw:40,dates:"Oct 5–11",title:"Recap & MIDTERM",items:["Mon 5 Oct 16:00: DEADLINE post your questions in the Brightspace forum","Tue 6 Oct: Recap lecture","Thu 8 Oct: MIDTERM (Remindo, 2 h, closed book): 25 MCQ (75 pts) + 3 open (~35 pts)"],topics:[]},
 {n:6,cw:41,dates:"Oct 12–18",title:"Political economy",items:["Tue 13 Oct: Political economy (Bossuyt) · Harvey (1989) · Foglesong (2003) · Hyötyläinen & Haila (2018)","Thu 15 Oct: Tutorial 4 · Savini & Aalbers (2016)"],topics:["harvey","fog","hh","savini"]},
 {n:7,cw:42,dates:"Oct 19–25",title:"Urban politics · discourse & power",items:["Tue 20 Oct: Urban politics: conflict and power (Bossuyt) · Rydin (2021) ch. 6 · Bossuyt & D'Ottaviano (2025) · Pruijt (2003)","Thu 22 Oct: Discourses, power, knowledge (Bouwmeester) · Raco & Imrie (2000) · Gurran & Ruming (2016)"],topics:["rydin6","bossuyt","pruijt","raco","gurran"]},
 {n:8,cw:43,dates:"Oct 26–Nov 1",title:"Commentary practice",items:["Tue 27 Oct: Independent study: write a practice commentary (article + instructions on Brightspace)","Thu 29 Oct: Tutorial 5: discuss commentaries, tips for the final"],topics:[]},
 {n:9,cw:44,dates:"Nov 2–8",title:"FINAL EXAM",items:["Thu 5 Nov: Final exam (Remindo): choose 1 of 2 articles, write a theoretical commentary: identify the perspective grounding its argument, critique it from an alternative one"],topics:[]}
];
const PLAN = [
 ["2026-09-28","Mon",["Open Framework + Knowledge readings; do the recall box first","Flashcards: all Week 1–2 cards (first pass)","Quiz: Week 1–2 topics, one round"]],
 ["2026-09-29","Tue",["Attend neo-institutionalism lecture (upload slides here after)","Read Dembski & Salet card + article; flashcards Week 4 (new)","Review due flashcards"]],
 ["2026-09-30","Wed",["Moroni + Sorensen cards; the 2×2 map of institutionalisms","Quiz: Week 4 topics","Open question: Moroni vs Dembski & Salet"]],
 ["2026-10-01","Thu",["Tutorial 3","Rydin gov. model + Scott + Davoudi: recall, then quiz Week 3a","Review due flashcards"]],
 ["2026-10-02","Fri",["Rational choice: lecture, Needham, Olson, Taylor; quiz","Marx vs Hayek open question","Framework matrix: fill it in from memory, then check"]],
 ["2026-10-03","Sat",["Interleaved quiz (all topics) ×2 rounds","Open question: Old Fadama excerpt (sample Q3)","Review due flashcards"]],
 ["2026-10-04","Sun",["MOCK EXAM #1 (timed, 2 h)","Analyse every mistake; re-read those cards only"]],
 ["2026-10-05","Mon",["Post your questions in the Brightspace forum before 16:00","Weak-spots quiz + due flashcards","Two open questions against the rubric"]],
 ["2026-10-06","Tue",["Recap lecture","Due flashcards; fix anything still amber"]],
 ["2026-10-07","Wed",["MOCK EXAM #2 (timed)","Light review only; sleep 7–9 h (consolidation)"]],
 ["2026-10-08","Thu",["Morning: due flashcards only, no new material","MIDTERM, Remindo. No negative marking: answer every MCQ."]]
];
const MISSING = [
 {r:"Foglesong, R.E. (2003). Planning the capitalist city. In Campbell & Fainstein (eds) Readings in Planning Theory, pp. 102–107.",doi:"—",note:"Book excerpt, no DOI; Brightspace. The page is built from general knowledge only."},
 {r:"Slides: Tutorial 2 & 3, recap lecture 6 Oct, and every lecture from week 6 on",doi:"—",note:"Upload after class; I'll add what the slides emphasise."}
];
const ON_FILE = ["NEW (29 Sept upload): Hayek ch. 5 (in Hillier & Healey vol. 1) · Needham ch. 1 · Hindmoor ch. 5 (scan, OCR'd) · Hyötyläinen & Haila · Savini & Aalbers (accepted manuscript) · Rydin 2021 ch. 6 · Bossuyt & D'Ottaviano · Pruijt (preprint) · Raco & Imrie · Gurran & Ruming (online-first) · Harvey 1989 (JSTOR)","Syllabus v2 · Midterm instructions (incl. 3 example questions)","Lecture slides: HC1, Knowledge (15 Sept), HC4 Structure & agency, Rational planning (22 Sept), HC6 Rational choice, HC7 Neo-institutionalism (29 Sept) · Tutorial 1 · exit-ticket answers","Full texts: Rydin 2021 ch. 1 + ch. 2 · Rydin 2007 · Buitelaar 2026 · Hall (scan, OCR'd) · Cozzolino 2020 · Scott ch. 4 · Davoudi 2006 · Taylor 2016 · Dembski & Salet · Moroni · Sorensen","Alexander 'After Rationality' (text decoded) · Marx 1844 (public domain, read online)"];

