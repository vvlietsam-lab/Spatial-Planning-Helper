# Spec: extra examples per reading

The study site has one `example` field per reading (see the existing entry). The student wants MORE examples, but only where they are cheap and reliable:

1. **From the text** (preferred): cases, illustrations, cities, projects, historical episodes or numbers that the article/chapter itself already mentions but that the page doesn't yet use as an example. Scan the full text for them. Give page numbers where the text shows them.
2. **From the slides**: examples the lecture slides use for this reading/theme (only if slide text is given to you).
3. **Similar case (not in the text)**: at most ONE per reading, and ONLY if you know a well-established, really close analogue (same mechanism, ideally Dutch or a textbook case the course would recognise). No digging, no web search, no invented details. If unsure: leave it out.

Rules:
- Don't go digging on the web. Only use the texts you're given plus solid knowledge for type 3.
- Don't repeat the reading's existing `example` (read it first).
- 1–4 extra examples per reading. Zero is fine if the text offers nothing new. Quality over quantity.
- Each example: a short title (≤ 6 words) and 1–3 sentences saying what happened AND what it shows about the reading's argument/concept (link it to a named concept). Plain English, no long dashes.
- Every factual detail of a text/slide example must be in the text. For type 3, keep it to facts you are certain of.

Output: a JS file defining ONE const (name given in your assignment), an object keyed by reading id:
```js
const EX_X={
 harvey:[{t:"Baltimore's Harborplace",d:"...what happened... Shows ...",src:"text",p:"p. 7"},
         {t:"...",d:"...",src:"slides"},
         {t:"...",d:"...",src:"similar"}],
 ...
};
```
`src` is exactly one of "text", "slides", "similar". `p` optional (page reference string). Validate with `node -e "eval(require('fs').readFileSync('FILE','utf8')+';console.log(Object.keys(EX_X).length)')"`. Final report: counts per reading and anything you skipped.
