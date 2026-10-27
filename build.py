"""Concatenate src/ into one self-contained index.html (no dependencies)."""
from pathlib import Path
SRC = Path(__file__).parent / "src"
ORDER = ["p2_readings.js", "p3_bank.js", "p2b_updates.js",
         "p9a_mid.js", "p9b_w6.js", "p9c_w7a.js", "p9d_w7b.js", "ex1.js", "ex2.js", "ex3.js", "ex4.js", "ext1.js", "ext2.js", "ext3.js", "ext4.js", "ext5.js", "ext6.js", "ext7.js", "games_data.js", "gq1.js", "gq2.js", "gq3.js", "gq4.js", "td1.js", "td2.js", "td3.js", "td4.js", "td5.js", "sl1.js", "sl2.js", "sl3.js", "sl4.js", "sl5.js", "sl6.js", "sl7.js", "sl8.js", "mf1.js", "mf2.js", "mf3.js", "mf4.js", "hq1.js", "hq2.js", "hq3.js", "hq4.js", "hq5.js", "hq6.js", "hq7.js", "hq8.js", "aud1.js", "aud2.js", "aud3.js", "aud4.js", "aud5.js", "aud7.js", "mgall.js", "fx1.js", "fx2.js", "auto.js", "auto2.js", "sh1.js", "sh2.js", "p9z_merge.js", "bpt_w6c.js",
         "p4_consts.js", "p8_psc_data.js", "psc_s2.js", "psc_s3.js", "aud6.js", "psc_s4.js", "psc_s5.js", "psc_rec.js", "psc_nosynth.js", "pscg1.js", "autop.js", "autop3.js", "autop4.js", "autop5.js", "auto4.js", "pscq1.js", "pscq2.js", "psc_noread.js", "psc_games2.js", "soften.js", "p5_app.js", "p6_courses.js", "psc_s2b.js", "psc_exam.js", "psc_cases.js", "bpt_com.js", "bpt_final2.js", "fx_lima.js",
         "p11_games.js", "psc_games3.js", "p10_motion.js", "p7_studio.js"]
js = "\n".join((SRC / f).read_text(encoding="utf-8") for f in ORDER)
shell = (SRC / "p1_shell.html").read_text(encoding="utf-8")
Path(__file__).parent.joinpath("index.html").write_text(
    "<!doctype html>\n<html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"></head><body>\n"
    + shell + "\n<script>\n" + js + "\n</script>\n</body></html>\n", encoding="utf-8")
Path(__file__).parent.joinpath("tools", "all.js").write_text(js, encoding="utf-8")  # used by tools/autogen*.js (gitignored)
print("index.html built")
