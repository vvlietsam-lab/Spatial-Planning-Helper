# Spec: remove the "longest answer is correct" bias from the quiz bank

Measured problem: in the main quiz bank the correct option is the longest in 81% of questions and on average 2.3× longer than the distractors (many distractors are 2–5-word throwaways like "only applies to transport"). A student can game the quiz. Fix the OPTIONS of your questions (the question text `q` and the explanation `e` stay unchanged).

Input: your JSON part file (each item: i, t = reading id, q, o = options, a = index of the correct option, e). Reading content to stay accurate: /home/claude/bpt/readings.json (summary, concepts, examples) and extended summaries in /home/claude/bpt/ext1.js…ext5.js (const EXT_n[id].ext).

For every question:
- Keep the correct option's meaning exactly. You may tighten its wording (shorter, no extra qualifiers) but not change what it claims.
- Rewrite the three distractors so they are PLAUSIBLE and of SIMILAR LENGTH and specificity as the correct option (each within roughly ±25% of its character length). Good distractors: a real idea from another course reading or another author applied wrongly, a common misreading of this author, the right concept with one key element swapped, the opposite position on a course dimension. They must be clearly wrong for someone who knows the reading, and must not be defensible as correct.
- Target: across your part, the correct option is the longest in at most ~25% of questions, and the average length ratio correct ÷ mean distractor is between 0.9 and 1.1. Also avoid the reverse giveaway (correct never shortest every time).
- Don't use "all of the above"/"none of the above". No long dashes.
- Keep the 4-option format. Positions don't matter (the site shuffles them), but keep `a` pointing to the correct option in your array.
- If an explanation `e` refers to an option by letter, also return a corrected `e` without letters.

Output: one JS file defining ONE const (name in your assignment), keyed by the exact original question text:
```js
const MF_X={
 "<exact original q text>":{o:["...","...","...","..."],a:2},
 ...
};
```
Include every question in your part. Validate with node: every key matches a `q` in your part exactly, every o has 4 strings, a in 0–3; then print: count, share where correct is longest, mean ratio. Report those numbers.
