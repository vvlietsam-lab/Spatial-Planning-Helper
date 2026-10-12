# Spec: HARD multiple-choice questions + MORE open questions

The student (UU MSc Spatial Planning) finds the current quiz too easy and wants (1) a separate bank of HARD questions per reading, asked in different ways than the normal quiz, and (2) many more open (written) questions. Accuracy is non-negotiable: everything must be consistent with the reading and the lecture.

Exams: BPT midterm 8 Oct 2026 (weeks 1–4; Remindo, 25 MCQ + 3 open questions, closed book). BPT final 5 Nov (weeks 6–7): theoretical commentary: identify which theoretical perspective grounds an article's argument, support with quotes, critique it from an alternative perspective. PSC exam 26 Oct: answer 2 of 6 questions, each = (a) short comprehension + (b) essay drawing on lectures, authors and cases.

## Sources (read for your assigned pages)
- /home/claude/bpt/readings.json: per BPT reading: argument, summary, concepts, examples (checked against full texts).
- Extended summaries: /home/claude/bpt/ext1.js … ext5.js (const EXT_n[id].ext; BPT) and ext6.js, ext7.js (PSC lectures).
- Slide content per page: /home/claude/bpt/sl1.js … sl6.js (const SL_n[id] = {figs, tables, points}).
- Full texts (for verbatim quotes and nuance): /home/claude/bpt/txt/, /home/claude/bpt/txt3/ (file names say which reading). Midterm instructions: /home/claude/bpt/txt/b6c67ded-Mid-term_instructions.txt (read it: it shows the open-question style).
- PSC: /home/claude/bpt/psc.json (lectures: notes, man.summary, readings) .
- What already exists per page (DO NOT duplicate): /home/claude/bpt/existing_all.json: quiz_mcq (with answer), game_mcq, open, cards. Style examples of existing open questions: /home/claude/bpt/open_samples.json.

## Part 1: HARD MCQ (BPT readings only), 10 per reading
Hard means: requires understanding, discrimination between close concepts, or transfer; NOT obscure trivia (no page numbers, years of minor references, or counting). Each must be answerable by a student who studied the reading well, and the explanation must make the reasoning clear.
Use at least 4 different formats per reading, label each with `fmt`:
- "assertion": "Statement I: … Statement II: …" with these four options exactly: "Both true, and II explains I" / "Both true, but II does not explain I" / "I is true, II is false" / "I is false, II is true".
- "combo": three numbered claims (I, II, III) in the stem; options like "I and II only", "II and III only", "I and III only", "I, II and III". Vary which combination is right.
- "case": a 2–3 sentence mini-case (Dutch or international, realistic but invented, clearly hypothetical) where two concepts from this or another reading look similar; pick the one that fits precisely.
- "critique": which criticism would an author of a DIFFERENT perspective most plausibly make of this reading's argument (commentary practice; options = critiques attributed to perspectives; only one fits that perspective's logic).
- "nuance": four close paraphrases of the author's claim; only one is precise, the others overstate, understate or shift a key word (e.g. "always" vs "tends to", cause vs effect).
- "excerpt": a short constructed passage (label it "A planning report argues: …" or similar; never present invented text as a quote by a real author) → which reading/perspective/concept grounds it, and why.
- "mechanism": the correct causal chain (A leads to B because C) among 4 chains with one link wrong.
- "except": three accurate statements + one subtly wrong; ask which is NOT consistent.
- "who": a claim → which course author would endorse it (options = course authors; must be unambiguous).
Rules: 4 options; exactly one defensible answer; distractors plausible and of similar length (correct option longest in ≤ 25% of your questions; mean length ratio correct ÷ distractors 0.9–1.1); spread `a` evenly over 0–3 (for "assertion" keep the fixed option order, a = the right one). `e`: 2–3 sentences: why the right answer is right AND why the most tempting distractor is wrong. No "all/none of the above". Plain English, ':' or ';' instead of long dashes. Don't repeat items in existing_all.json.

## Part 1b: EXTRA NORMAL MCQ (BPT readings only), 10 per reading
The student wants a HUGE bank so quizzes never feel repetitive. Write 10 additional standard-difficulty MCQs per reading (same level as quiz_mcq in existing_all.json) covering every concept, example, argument and slide point of the reading, including ones not yet tested. When you run out of untested content, you MAY ask an existing idea again in a genuinely different way (different stem, inverse direction: concept→example instead of example→concept, "which is NOT", application, definition from the other side), but never a near-verbatim copy. Label `fmt` ("recall","example","inverse","not","apply","define","contrast"). Same option rules as Part 1 (similar lengths, ≤25% correct-longest, ratio 0.9–1.1, a spread evenly).
Output const NQ_X (same item shape as HQ_X).

## Part 2: OPEN questions
BPT readings: 4 new per reading. PSC lectures: see your assignment. Vary the way of asking; label with `fmt`:
- "short" (pts 5): define/explain one concept or claim in 3–5 sentences (e.g. "Explain what X means by Y and why it matters for Z").
- "compare" (pts 10): contrast this reading with another course reading on one specific point.
- "apply" (pts 10): a realistic (hypothetical, or a real well-known Dutch/international case you are sure about) planning situation; analyse it with the reading's concepts.
- "excerpt" (pts 15): Remindo midterm style: a short excerpt → (a) which theoretical perspective (5) (b) support with two arguments, each with a quote (10). The excerpt must be either a VERBATIM passage from the full text (check it in txt/txt3, and say so: "Excerpt from <author>:") or a clearly constructed passage ("An article on X argues: …"); in the model answer, any quote must be verbatim from the excerpt or full text.
- "commentary" (pts 15; especially weeks 6–7): (a) identify the perspective grounding an argument (b) critique it from an alternative perspective of your choice (c) what would that alternative recommend.
- "position" (pts 10): place the reading on a course dimension (structure–agency, reproduction–transformation, deliberate–emergent, universal–situated…) and justify with the text.
- PSC only, "essay" (pts 25): "(a) Comprehension: … (b) Essay: …" in the existing PSC style.
Per BPT reading: at least 3 different fmts; weeks 1–4 readings must include one "excerpt" or "short"; weeks 6–7 must include one "commentary".
Each item: {t, fmt, pts, q, model, rubric}. model: a strong answer (short ≈ 80–120 words; 10 pts ≈ 150–220; 15 pts ≈ 200–300; essay ≈ 300–400), naming concepts and authors, faithful to the sources. rubric: 3–6 concrete checkable criteria (what the grader looks for).

## Output
One JS file at the path in your assignment defining THREE consts (names in your assignment):
```js
const HQ_X=[{t:"know",fmt:"assertion",q:"…",o:["…","…","…","…"],a:1,e:"…"}, …];
const OQ_X=[{t:"know",fmt:"short",pts:5,q:"…",model:"…",rubric:["…","…","…"]}, …];
const NQ_X=[{t:"know",fmt:"inverse",q:"…",o:["…","…","…","…"],a:2,e:"…"}, …];
```
No backticks or `${` inside strings. Validate with node:
`node -e "const fs=require('fs');const o=new Function(fs.readFileSync('FILE','utf8')+';return [HQ_X,OQ_X,NQ_X]')();const [h,q,n]=o;console.log(h.length,q.length,n.length);for(const x of [...h,...n])if(x.o.length!==4||x.a<0||x.a>3||!x.e||!x.fmt)console.log('bad',x.q);for(const x of q)if(!x.model||!x.rubric||!x.pts||!x.fmt)console.log('badopen',x.q)"`
Also compute and report: count per page, fmt distribution, answer position distribution, % correct-is-longest, mean length ratio (excluding "assertion" and "combo", whose options are fixed). Fix until within the targets. Final report: those numbers plus anything you were unsure about.

Work reading by reading and write the file incrementally (append each reading's items as you finish it) so partial work survives interruptions.
