# Spec: MEGA expansion of every question bank (quiz levels + every game mode)

The student wants a huge arsenal so quizzes and games never repeat (round lengths stay the same; only the banks grow). Accuracy is non-negotiable: everything must be faithful to the reading and lecture. Plain English; ':' or ';' instead of long dashes; no backticks or `${` in strings.

## Sources (read for your pages)
- /home/claude/bpt/readings.json (BPT: argument, summary, concepts, examples), extended summaries ext1.js…ext5.js (EXT_n[id].ext), PSC: psc.json + ext6.js/ext7.js. Slide content: sl1.js…sl6.js (SL_n[id]). Rendered page content per id: /home/claude/bpt/site_text/<id>.txt (the most complete view). Full texts for verbatim quotes: /home/claude/bpt/txt/, /home/claude/bpt/txt3/, /home/claude/bpt/txt2/, PSC slide text in /home/claude/psc/.
- Existing items to NOT duplicate: /home/claude/bpt/existing_all.json (per id: mcq stems (all levels), game_mcq, open, cards, lens, seq, concepts_terms, quotes) and existing_odd.json. A new item may test the same idea only from a clearly different angle or wording; never near-copies.
- Quality reference: /home/claude/bpt/HARD_SPEC.md (formats and option rules for MCQ). Read it.

## What to produce PER PAGE (counts in your assignment; defaults below for BPT readings)
1. QZ: quiz MCQs with explicit level `lv`:
   - lv 1 Easy (6): recall of a definition, example, who-said-what, key term. Still 4 plausible options.
   - lv 2 Medium = EXAM LEVEL (8): Remindo-style: understand a concept and recognise it in a statement, example or short case; "which is NOT"; inverse direction.
   - lv 3 Hard (5): formats case / nuance / excerpt / except / who (see HARD_SPEC).
   - lv 4 Super hard (5): formats assertion / combo / critique / mechanism (assertion uses the 4 fixed options of HARD_SPEC, in that order).
   Item: {t, lv, fmt, q, o:[4], a, e}. Option rules: similar lengths; correct option longest in ≤25% (excluding assertion/combo); mean length ratio correct÷distractors 0.9–1.1; spread a evenly. e = why right + why the most tempting distractor is wrong.
2. GQ (6): game-only MCQs (used in Week Boss and Confidence Bets), types: misread, contrast, apply, quote, position, consequence, not. Item {t, type, q, o:[4], a, e}. Same option rules.
3. LENS (4): scenario questions: a realistic 2–3 sentence planning situation (Dutch or international; hypothetical unless you are certain of facts), then "How would <author> read/respond to this?" Item {t, w:<week>, s:"scenario", q:"question", o:[4], a, e}. Distractors = how OTHER course perspectives would read it (plausible, similar length). Look at existing lens items in games_data.js for the style.
4. WHO (8): "Whose idea is this?" items: a claim, idea or verbatim quote that clearly belongs to this reading/author and could not be attributed to another course reading. Item {t, kind:"idea"|"quote", txt}. kind "quote" ONLY for verbatim text you found in the full text (check it); otherwise "idea" (a faithful paraphrase, 1–2 sentences, 60–220 chars). Do NOT include the author's name in txt.
5. PAIRS (6): term–definition pairs for the memory-matching game: {t, term:"short term (≤ 40 chars)", def:"definition in the author's sense (40–150 chars), without the term itself"}. Only terms not in concepts_terms.
6. ODD (3): "Which one doesn't belong?": {w:<week>, items:[4 short items, ≤ 90 chars each], odd:<index>, e:"why"}; three items share a perspective/author/concept, one belongs to a different one (plausible). Mix within and across readings of the same week.
7. SEQ (1–2, only where a real order exists: argument steps, causal chain, historical phases, method steps, case timeline): {t, w, title, steps:[4–6 short steps in correct order], e}.

## Output
One JS file (path and const suffix X in your assignment) defining SEVEN consts: QZ_X, GQX_X, LENS_X, WHO_X, PAIRS_X, ODD_X, SEQ_X (all arrays). Build reading by reading; write partial results to disk as you go.
Validate with node: all consts load; every MCQ-like item (QZ, GQX, LENS) has 4 options, a in 0–3, e present; QZ has lv 1–4 and fmt; PAIRS defs don't contain their term; ODD has 4 items and odd 0–3; SEQ steps 4–6. Compute and report per page counts, QZ level counts, answer-position spread, % correct-is-longest and mean ratio for QZ (excluding assertion/combo), GQX and LENS. Fix until in target. Final report: those numbers and anything you were unsure about.

## UPDATE (6 Oct, after the official midterm Q&A, HC8: /home/claude/bpt/hc8/hc8.txt; read its example questions)
The real exam MCQs look like: "How would a sociological institutionalist critique Alexander's definition of institutional design?" (4 critiques; one per perspective) and "Indicate True/False for statements I–IV according to rational choice theory". So exam level = formats critique, combo and the new "tf" format. Level mapping is now: lv 3 (Hard = EXAM LEVEL): case, nuance, excerpt, except, who, critique, combo, tf. lv 4 (Super hard): assertion, mechanism, and multi-perspective questions that need two readings combined.
New format "tf" (lv 3): stem lists four statements I–IV about one perspective/reading ("According to X, which statements are true?") and the 4 options are T/F patterns in this exact style: "I F · II T · III T · IV F". Patterns must differ in at least two positions from the correct one for at least two distractors; mix how many statements are true (not always two).
Per page please include at least 2 "tf" and 2 "critique" items among the lv 3/lv 4 QZ items (a critique always names the perspective doing the critiquing, like the HC8 example).
