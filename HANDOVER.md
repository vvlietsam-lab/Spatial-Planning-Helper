# Handover: Spatial Planner helper (state on 12 Oct 2026)

Read this first when continuing the project in a new chat.

## Where things live
- **Repo:** github.com/vvlietsam-lab/Spatial-Planning-Helper (public; push to `main`).
- **Live artifact:** claude.ai/artifact/P9iKeyHfH6iiBxefmk3dE4 (version 26). To update it from a new chat: read it first with the Artifact tool (action "read"), then publish the new `index.html` with `url` set to that link.
- **Not in the repo (copyright; the repo is public):** the full reading texts, the slide PDFs and the slide images. Sam has the originals on Brightspace, and the extracted texts are in `source-texts.zip` (sent to him in chat). Without them, new content can only be checked against `tools/data/readings.json` and `tools/data/site_text/`. For new slides or readings, ask him to upload the PDF.

## Ground rules from Sam
- The site is shared with classmates, so it must never contain personal names.
- Accuracy is non-negotiable. Everything has to be faithful to the reading or slide, and nothing unsourced: the "closed book" claim was removed for exactly this reason.
- Conversation about the UU master is in English.
- Make the banks bigger, not the rounds longer. Avoid repeat questions (least-seen-first rotation).
- Plain English in content. Use ':' or ';' instead of long dashes. No backticks or `${` inside data strings.

## Courses and dates
| Course | What's left |
|---|---|
| BPT GEO4-3115 | Midterm 8 Oct is done. **Final 5 Nov**: theoretical commentary (identify the perspective grounding an article, support it with quotes, critique it from an alternative perspective). Weeks 6–7. Tutorial-4 seminar plan: Fri 9 Oct 12:00 for teams 5/6 and 11/12, no generative AI (Category 1). |
| PSC GEO4-3124 | **Exam Mon 26 Oct (70%)**: 2 of 6 questions, each (a) comprehension + (b) essay. Portfolio + presentation 30%. |
| Studio GEO4-3127 | Runs Sept–Jan; the plan deadline has passed. |

## Build, test and deploy
```bash
python3 build.py                 # src/ -> index.html (+ tools/all.js for the generators)
cd tools && NODE_PATH=$(npm root -g) node test.js && node shot7.js && node shot8.js   # playwright smoke tests
node tools/autogen.js; node tools/autogen2.js   # regenerate src/auto.js (1,448) and src/auto2.js (336 matching) for free; rerun after adding content
git add -A && git commit && git push
```
The build order is the `ORDER` list in `build.py`. A new data file must be added there, before `p9z_merge.js`.

## Architecture (src/)
- `p1_shell.html`: CSS and shell.
- `p2_readings.js`, `p2b_updates.js`, `p9*.js`: BPT readings (`READINGS`, `R[id]`).
- `p3_bank.js`: flashcards, MCQs, open questions.
- `p4_consts.js`: dates, weeks and the day PLAN (through 5 Nov).
- `p8_psc_data.js`: PSC lectures, cards and essays.
- `p5_app.js`: main app:
  - quiz and difficulty levels;
  - knowledge model;
  - open questions (vOpen);
  - slide checklist (vSlides);
  - final-exam practice (vFinal);
  - countdowns (bptNext/cdTxt/calDays).
- `p6_courses.js`: home and course routing.
- `p11_games.js`: games.
- `p7_studio.js`: Studio.
- `p9z_merge.js`: merges all banks.

Data banks:
- `ext*`: extended summaries.
- `sl*` + `aud*`: slide additions and the slide audit (SLX), shown as a checklist.
- `hq1–8`: hard, open and normal questions. `hq8` holds the 75 PSC open questions.
- `mgall.js`: the merged MEGA banks: `MG={QZ,GQX,LENS,WHO,PAIRS,ODD,SEQ}`.
- `auto*.js`: script-generated items.
- `sh1/sh2`: agent-written super-hard items.
- `fx1/fx2`: final-exam commentary practice (3 practice pairs).

### Question levels (fmt → level)
| Level | Formats | Count |
|---|---|---|
| 1 Easy | recall, define, example | 949 |
| 2 Medium | other normal formats | 1,183 |
| **3 Hard = exam level** (from the HC8 official examples) | case, nuance, excerpt, except, who, critique, combo, tf ("I F · II T · III T · IV F") | 649 |
| 4 Super hard | assertion, mechanism, multi, match, transfer, dimension | 653 |

Item keys are a prefix (q/h/m/a/x) plus a hash of the stem, so progress survives rebuilds as long as the stems are unchanged.

### Option-quality rules for MCQs
- Options of similar length.
- The correct option is the longest in at most 25% of items.
- Mean length ratio of correct to distractors is 0.9–1.1.
- `a` is spread evenly over the four positions.
- `e` explains why the answer is right and why the most tempting distractor is wrong.

### Knowledge model (v3)
Elo/IRT per reading:
- Difficulty per level: `DLV={1:-1.2,2:-0.3,3:0.6,4:1.3}`; `DEX=0.6`.
- Mastery: `k = sigmoid(theta − DEX)`. Hard answers count more than easy ones.

### Specs for content agents
In `tools/specs/`. `MEGA_SPEC.md` is the most complete; `HARD_SPEC.md` covers formats and option rules; `AUDIT_SPEC.md` covers the slide audit. They still contain old `/home/claude/bpt/...` paths: point them to `tools/data/` and the uploaded sources.

## Status and to-do (ranked; see tools/REVIEW.md)
1. **PSC exam 26 Oct is the next deadline.**
   - Ask Sam for the slides of lectures 8–13 (L8 1 Oct, L9 5 Oct, L10 8 Oct, and so on). The site only has slides for L1–L7.
   - Add the new slides, then rerun autogen.
   - Do the strict slide-by-slide PSC audit for L1–L7: there is no aud6.js yet.
2. **A PSC timed exam simulator**: 2 of 6 questions, 3 h, with rubric self-scoring.
3. **A PSC portfolio and presentation builder**:
   - about 4,700 words in total;
   - 2 slides or 200 words per lecture;
   - the 6-criterion rubric.
4. **BPT final 5 Nov**:
   - more commentary practice pairs (fx);
   - week 6–7 content checked against new slides when uploaded.
5. **Smaller items:**
   - Assessment overview: midterm 50%, seminar pass/fail, repair exam.
   - Seminar-plan template.
   - Studio workspace.
   - Search doesn't find Studio.
   - The quiz header count doesn't match the selection.
   - The heatmap ends 18 Oct.
   - PSC lectures 5 and 11 have few flashcards.
   - The 13:15 midterm start time is unsourced; it no longer matters now that the midterm is done.

Still to ask Sam: his BPT tutorial team, and his PSC presentation slot.
