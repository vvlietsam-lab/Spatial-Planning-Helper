# Spec: a separate question bank for the GAMES (Week Boss, Confidence Bets)

Problem: the games reused the quiz questions, so the student already knew the answers. Games are EXTRA practice, so they need their own questions: same readings, but different questions or the same idea asked from a different angle.

Sources (read first):
- /home/claude/bpt/readings.json — each reading's argument, summary, concepts, examples (the content you may test; it was checked against the full texts). Extended summaries are in /home/claude/bpt/ext1.js … ext5.js (const EXT_n, keyed by id, field ext = sections) and may be used for deeper questions.
- /home/claude/bpt/existing_items.json — per reading: existing quiz questions (`mcq`, with correct answer), flashcard fronts (`cards`) and lens scenarios. Your questions must NOT repeat these: no same question, no same stem reworded, no question whose answer is just the same fact asked the same way. Testing the same idea is allowed only from a genuinely different angle (e.g. the quiz asks for a definition; you ask the student to recognise a misreading of it, apply it to a mini-case, or contrast it with another author).

Question types to mix (label each with `type`):
- "misread": which statement MISREPRESENTS the author? (3 accurate paraphrases + 1 plausible distortion)
- "contrast": how would author A and author B differ on X? (options are pairings)
- "apply": a 1–2 sentence mini-case; which concept/mechanism from the reading fits?
- "quote": given a short verbatim phrase from the reading data (only if it appears there), what does it imply / which claim does it support?
- "position": where does the reading sit on a course dimension (structure↔agency, reproduction↔transformation, deliberate↔emergent, universal↔situated, monist↔pluralist) AND why (options combine position + reason)
- "consequence": if the author is right, what follows for planning practice?
- "not": which is NOT part of / NOT argued by the reading?

Rules: 4 options, exactly one defensible correct answer, plausible distractors of similar length (the correct one must not be predictably the longest), vary the correct index evenly 0–3. `e` = 1–2 sentences explaining why, and why the main distractor fails. Everything consistent with the reading data; no invented facts, quotes or page numbers. Plain English, no long dashes.

Output: one JS file defining ONE const (name in your assignment):
```js
const GQ_X=[{t:"<reading id>",type:"misread",q:"...",o:["...","...","...","..."],a:2,e:"..."}, ...];
```
6 questions per reading (unless told otherwise), at least 4 different types per reading.
Validate: node -e "const fs=require('fs');const a=new Function(fs.readFileSync('FILE','utf8')+';return GQ_X')();console.log(a.length);for(const q of a)if(q.o.length!==4||q.a<0||q.a>3)console.log('bad',q.q)"
Report: count per reading, answer-position distribution, and how often the correct option is the longest.
