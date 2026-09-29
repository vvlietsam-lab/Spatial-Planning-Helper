# Spatial Planner helper

A single-page study site for the **MSc Spatial Planning at Utrecht University** (period 1, 2026–27):

| Course | Code | What's in it |
|---|---|---|
| Beyond Planning Theory | GEO4-3115 | 29 readings (weeks 1–7): summary, key concepts, figure, table, example, quotes, framework position, exam angle · flashcards · MCQ quiz · open questions · timed mock midterm |
| Planning for Sustainable Cities | GEO4-3124 | 13 lectures: what the slides said, the mandatory reading, every recommended reading (abstract + what the slides say about it) · flashcards · essay practice |
| Graduate Planning Studio | GEO4-3127 | Phases, deliverables and deadlines |

Study features: Leitner spaced repetition (a reading turns green at 80% mastery), interleaved retrieval quizzes, exam-style open questions with rubrics, a day plan and deadline overview, ⌘K search. Progress is stored in your own browser (`localStorage`), so everyone who opens it has their own progress.

## Use it
Open `index.html` in a browser, or enable **GitHub Pages** (Settings → Pages → Deploy from branch → `main` / root) and share the link.

## Edit it
All content and code live in `src/` (plain JS data files + app code). After editing, run:

```bash
python3 build.py   # writes index.html
```

- `src/p2_readings.js`, `p2b_updates.js`, `p9*.js`: BPT readings; `p3_bank.js`: flashcards (`FC`), MCQs (`MCQ`), open questions (`OPEN`)
- `src/p8_psc_data.js`: PSC lectures, flashcards, essay questions
- `src/p4_consts.js`: exam dates, weeks, day plan
- `src/p5_app.js`, `p6_courses.js`, `p7_studio.js`, `p10_motion.js`: the app
- `src/p1_shell.html`: styles and page shell

Each reading page says what it is built from (full text, slides only, or general knowledge). Check anything marked partial against the original text. Not affiliated with Utrecht University.
