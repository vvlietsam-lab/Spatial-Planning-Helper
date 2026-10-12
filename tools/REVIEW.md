# Review: Spatial Planner helper (bpt-midterm-prep.html)

Reviewed 7 Oct 2026. Playwright/Chromium at 1300px and 390px, plus the clock set to 9 Oct and 30 Oct. Checked against the BPT syllabus v2, the BPT mid-term instructions, the PSC manual and portfolio brief, and the Studio manual. No project files were changed.
Console: no JS errors or page errors in any view. The only error was the Google Fonts request, which the sandbox network blocked. No horizontal overflow at 390px.

## Critical (wrong or broken)

1. **The site gets stuck on "midterm" from tomorrow onwards.** With the clock at 9 Oct, Today says "0 days to the midterm", the sidebar shows "MIDTERM · THU 8 OCT 0 days" and the topbar says "Today". The plan stays on the 8 Oct entry ("MIDTERM, Remindo…") and the button is still "Week 4 boss". Cause: `daysLeft` is clamped at 0 (p5_app.js:110), `PLAN` ends on 8 Oct and vToday falls back to the last entry (p5_app.js:138), the boss is fixed at `Math.min(4,…)`, and the heatmap ends on 18 Oct, so the 5 Nov final never shows.
2. **Countdowns that have passed show as "0 days" instead of switching.** With the clock at 30 Oct, the home tiles read "Midterm in 0 days", "Exam in 0 days" (PSC exam already over) and "Plan due in 0 days" (Studio). The PSC sidebar and exam card also show "0 days". The Studio sidebar and tile hard-code the 7 Oct research-plan date (p7_studio.js:20-22, p6_courses.js:115) instead of using the next item in `STUDIO_DL`.
3. **Games filter state is shared between courses.** BPT "Week 4 boss" sets the global `GW="w4"`. If you then open PSC Games, it shows "0 readings in play", no theme chip is selected, and every game gives "Nothing in this selection" (p11_games.js:6,12,202; reproduced in Playwright). It also breaks the other way round: a PSC "t2" filter makes BPT silently show Week 2.
4. **The 8 Oct plan clashes with a compulsory PSC lecture.** The plan says "Morning: due flashcards only" (p4_consts.js PLAN), but PSC L10 Digital planning is Thu 8 Oct 09:15-11:30 in BOL 0.204. The PSC manual makes lecture attendance mandatory: "missed more than three lectures… lose the entitlement to repeat". The plan also books "MOCK EXAM #2" on 7 Oct, the day of the Studio research-plan deadline and Studio session. The plan ignores the other two courses entirely.
5. **Some exam facts are stated with no source.**
   - Week 5 says "MIDTERM (Remindo, 2 h, closed book)" and Mock says "closed book". Neither the syllabus nor the mid-term instructions say "closed book". The HC1 slides allow handwritten notes for the *final*, so the student should check whether notes are allowed tomorrow too.
   - The start time 13:15 (`EXAM`, p4_consts.js:1) is taken from the Thursday lecture slot. The syllabus gives no time or room ("See My TimeTable"), and the site shows no room.
6. **The PSC overview overclaims.**
   - The note says "Every recommended reading has an abstract card plus what the slides say about it". For L8-L13 every one of those cards reads "No slides yet." (psc-lecture p8), and L6/L7 say "Not named on the slides".
   - It adds "what the lecturer puts on a slide is what the exam is likely to ask", which is speculation presented as fact.
   - Slides for L8 (1 Oct) and L9 (5 Oct) should already be on Brightspace, but they are still marked missing.
7. **The "exam level" claim is not backed.** The quiz labels Hard as "Exam level. Matches the official example questions" (p5_app.js:16). The only evidence is two example MCQs in the mid-term instructions, and there is no real exam to compare against. It should say "modelled on the 2 official examples". The bank also has a mild length tell: the correct option is the longest in 942/2982 questions (32%, chance is 25%).
8. **The excerpt question's points are quietly changed.** The open question gives "(a) … (5) (b) … (10)". The official mid-term instructions say Q3 is "(15 points)" but split it "(5 points)" + "(5 points)". The site should quote the source and flag that it doesn't add up, rather than invent a split.

## Important gaps vs course manuals

1. **BPT has no assessment overview.** The midterm 50% weight is never shown; only "Final exam · 50% of the grade" appears in vFinal. The seminar (pass/fail, 40 min, required to pass the course, repair = individual oral exam) has no page or deadline. The supplementary test rule is missing. Syllabus §5, §5.1, §7.
2. **The BPT seminar-plan deadline is missing.** The syllabus (§4.3) says: "Seminar plan: Friday at 12:00 noon the week before the assigned seminar". If Sam's team runs Tutorial 4 (teams 5/6 or 11/12, Thu 15 Oct), the plan is due **Fri 9 Oct 12:00, the day after the midterm**. Neither `DEADLINES` nor `WEEKS` has it.
3. **BPT AI policy is not reflected.** The seminar is AI Index Category 1: "you must complete the seminar preparation independently, without generative AI" (syllabus §7). The site's AI-written summaries of tutorial articles (e.g. Savini & Aalbers for T4) carry no warning that they must not feed into the seminar plan.
4. **Nothing helps with the PSC portfolio (15% of the grade).** It gets one sentence on the overview card. Missing from the brief (422fda28):
   - the "thinking portfolio" of about 4,700 words
   - an intro of 200 words
   - 2 slides or 200 words per lecture: slide 1 is the central idea and its assumptions; slide 2 asks what it explains, what it doesn't, links to other sessions, context, and what it means for practice
   - 600 words per theme reflection and a 500-word synthesis with at least 3 overarching insights
   - "reference scientific articles at all points"
   - the 6-criterion rubric
   - no entry needed for your own presentation session
5. **Nothing helps with the PSC presentation (15%).** The site only says "10-min + 10-min". Missing:
   - sessions are allocated at random
   - the brief asks for (a) the central argument and concepts, (b) a critical assessment, (c) relevance, and 1-2 provocations
   - assessment covers content, communication and discussion facilitation
   - the grade is split 50/50 between portfolio and presentation
6. **PSC dates and logistics are incomplete.**
   - Missing: 22 Oct revision (no class), 29 Oct group meetings, 2 Nov guest lecture (tbc), 5 Nov provisional repair, the mandatory-attendance / max-3-absences rule, and that a translation dictionary is allowed in the exam.
   - The portfolio deadline time 23:59 is assumed; the manual only gives "06.11.2026".
   - Lecture times and rooms are not shown.
7. **PSC practice material is thin for 70% of the grade.**
   - There are 0 PSC quiz questions; all 2982 belong to BPT.
   - There are only 67 PSC flashcards: L5 has 1, L11 has 1, L10 has 2, and L8, L9 and L13 have 3 each.
   - PSC Games has 3 games against BPT's 9.
   - There is no timed "choose 2 of 6 in 3 h" simulation; essays are only practised one at a time.
8. **The Studio page is an overview only.** There is no help for:
   - the research plan content (problem statement, research question, milestones)
   - the three stakeholder consultation moments
   - interview and document-analysis logs
   - choosing between the future and retrospective tracks
   - the individual reflection essay (collaboration, engaged scholarship, reflective practice)
   - the retake rule
9. **A Studio manual inconsistency is not flagged.** The theme is "Just Cities", but the manual still says proposals must relate "to urban commons and commoning" (df59f171 l.52, 76, 87). Worth asking the coordinator, just as the site already does for the 7 vs 9 Oct ambiguity (which it handles well).
10. **Some BPT readings are outside the syllabus or unsourced.**
    - Alexander "After Rationality (2017/orig. 1990s)" is in the W3 midterm scope and counted in "0/19" with no "not in syllabus" label. The syllabus lists 16 midterm readings; the site's 19 also include 2 lecture topic pages.
    - Weeks says "Tutorial 2 (Davoudi)", but no source names the Tutorial 2 article.
    - The Hayek citation moves the syllabus's "pp. 42-53" to *Road to Serfdom* and gives the Hillier & Healey reprint as "pp. 275-286", which differs from the syllabus. Verify.
11. **Checks that passed:**
    - All BPT lecture, reading and lecturer entries match the syllabus.
    - All 13 PSC lectures (dates, lecturers, mandatory and recommended readings) match the manual.
    - PSC exam: 26 Oct 13:30-16:30, EDUC Gamma, 2 of 6, 70%.
    - Studio weights and dates: 15/30/30/25 and P/F; 7 Oct, 6 Nov draft, 27 Nov, 20 Jan, 29 Jan 12:00/17:00.

## UX and polish

1. **No way back to all courses on mobile.** The "More" menu (vMenu) has no "All courses", PSC or Studio link. The only route is the small topbar logo. The Studio and PSC sidebars don't link to each other's full set (PSC has no Studio link).
2. **Search (⌘K) can't find the Studio.** Typing "studio" gives "No results", because the palette extras omit it (p6_courses.js:158).
3. **Open questions:**
   - 134 Q-number chips sit above the question, so on 390px the question starts about two screens down (m_open.png).
   - The "Midterm" chip shows as selected but the list includes "Final · Q90-Q134".
   - The reading dropdown lists "Rydin" four times with no year.
4. **Numbers that don't match:**
   - The quiz header says "2982 questions in 4 levels", but the Midterm level counts add up to 2039, because the header includes W6-7.
   - The PSC home tile says "8 essay drills", but Essay practice has 83.
   - The Studio tile shows a bare "4" with no label.
5. **Count-up animation on dates.** `.stat` and `.upd` dates animate, so "6 Nov" briefly reads "1…5 Nov" (captured in d_psc.png), and stats count up on every view change.
6. **Wording:**
   - "Midterm in 1 days", "in 1 days", "in 0 days" (home tile, Coming up, Studio list). Should read "tomorrow" / "today 17:00".
   - The Studio lede "There are no exams, plus one individual pass/fail reflection essay" reads awkwardly.
   - The BPT brand "Midterm Prep" will be wrong for half the course.
7. **Home layout.** On 1300×900 the course tiles (the main action, "Pick a course") are below the fold, under the hero, skyline and marquee. With a fallback font the "helper" script line is clipped at the bottom (d_home/m_home). On mobile the header wraps into three rows, and the "STU" logo is clipped in the topbar.
8. **Small figure text on mobile.** SVG figures shrink to about 5px text at 390px (e.g. the PSC L8 reconfiguration diagram). Tap-to-zoom or a horizontal scroll container would help.
9. **"198 cards due" with 1 day left.** For a fresh state the Today hero pushes 198 due cards plus the plan. A "last day: top-N weakest" cap would be more realistic.
10. **Dead code.** `chromePSC` computes `got` and `total` and never uses them. `go()` is defined twice (p5_app.js:119 and p6_courses.js:48, the second overrides the first). Not user-visible.

## Expansion ideas (ranked by value ÷ effort)

1. **Post-midterm switch** (very high value, low effort). Swap `EXAM` for a list of milestones, so the countdown shows the next BPT exam. Add `PLAN` days for 9 Oct-5 Nov, rename the brand to "BPT", and extend the heatmap and boss logic to W6-7.
2. **One cross-course agenda** (high value, low effort). Merge all three courses' sessions and deadlines into `DEADLINES`: the seminar plan, the PSC lectures with rooms, 22/29 Oct, and the Studio feedback and workshop sessions. Add "my team / my seminar / my PSC presentation slot" settings so the right dates appear.
3. **PSC portfolio builder** (high value, medium effort).
   - A per-lecture form with the 2-slide prompts from the brief, plus theme and synthesis boxes.
   - Live word counts against 200/600/500/≈4700, a references field and an AI-statement template.
   - Export to PDF.
   - Store the work in shared state so the group of 5 can co-edit.
4. **PSC exam simulator** (high value, low effort). Draw 6 questions from `PSC_ESSAY`/`OQ` (2 per theme), pick 2, run a 3-hour timer and use a no-notes layout. The essay bank already exists.
5. **Fill PSC gaps** (high value, medium effort). Ingest the L8-L10 slides already on Brightspace, raise thin lectures (L5, L10, L11) to about 10 cards each, and generate PSC MCQs for the Whose-line and Pairs games.
6. **PSC presentation kit** (medium-high value, low effort). For each mandatory reading, prompts for central argument, assumptions, strengths and limits, and context, plus 1-2 provocations. Show the rubric, a 10+10-minute timer, and a "no portfolio entry needed for this session" note.
7. **BPT seminar planner, AI-free** (medium value, low effort). An empty template that follows the HC1/T1 skeleton (opening goals, argument reconstruction, assumptions, counter-perspective, activity) with the Friday 12:00 deadline. Mark it clearly as AI Index Cat. 1, with no generated content.
8. **Studio workspace** (medium value, medium effort).
   - A research-plan checklist and milestone Gantt.
   - A stakeholder log tied to Phases I, II and III.
   - Interview-guide and document-analysis templates.
   - Track-choice prompts.
   - Reflection-essay prompts.
9. **Exam-day card** (medium value, very low effort). Show the time, room, what to bring (notes or dictionary per course) and the Remindo or laptop format, each with its source, and label anything unverified "check MyTimetable".
10. **Mobile open-question index** (low-medium value, very low effort). Replace the 134 chips with a select or a "Next unanswered" stepper. Add courses to the More menu, add a Studio entry to ⌘K, and show "tomorrow"/"today" in countdowns.
