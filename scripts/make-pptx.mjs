// 편집 가능한 PPTX 포트폴리오 생성: node scripts/make-pptx.mjs [출력경로] [phone]
import pptxgen from "pptxgenjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const d = JSON.parse(fs.readFileSync(path.join(root, "lib/content.json"), "utf8"));
const OUT = process.argv[2] || path.join(root, "deliverables/portfolio.pptx");
const SHOW_PHONE = process.argv[3] === "phone";
const img = (p) => path.join(root, "public", p);
const pf = d.profile;

const C = { bg: "F7F8FB", alt: "EEF1F7", ink: "141824", ink2: "454C5E", ink3: "858C9E", line: "DFE3EC", acc: "2F6FED", accInk: "1D4FC4", accSoft: "E3ECFF", navy: "172036", white: "FFFFFF", light: "9CC0FF", mute: "C3CBE0" };
const F = process.env.PPT_FONT || "Malgun Gothic";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in
pptx.author = "안기배";
pptx.title = "안기배 풀스택 개발자 포트폴리오";
const W = 13.333, M = 0.55;
let pageNo = 0;

function base(dark = false) {
  const s = pptx.addSlide();
  s.background = { color: dark ? C.navy : C.bg };
  pageNo++;
  if (!dark) {
    s.addShape(pptx.ShapeType.line, { x: M, y: 7.05, w: W - 2 * M, h: 0, line: { color: C.line, width: 0.75 } });
    s.addText("안기배 · Full-stack Developer Portfolio", { x: M, y: 7.08, w: 5, h: 0.3, fontFace: F, fontSize: 8, color: C.ink3 });
    s.addText(String(pageNo).padStart(2, "0"), { x: W - M - 1, y: 7.08, w: 1, h: 0.3, fontFace: F, fontSize: 8, color: C.ink3, align: "right" });
  }
  return s;
}
function head(s, cat, title, no) {
  const runs = [];
  if (no) runs.push({ text: ` ${no} `, options: { color: C.white, highlight: C.acc, bold: true } }, { text: "  " });
  runs.push({ text: cat, options: { color: C.accInk, bold: true } });
  s.addText(runs, { x: M, y: 0.35, w: W - 2 * M, h: 0.3, fontFace: F, fontSize: 10.5, margin: 0 });
  s.addText(title, { x: M, y: 0.65, w: W - 2 * M, h: 0.6, fontFace: F, fontSize: 21, bold: true, color: C.ink, margin: 0 });
}
function card(s, x, y, w, h, o = {}) {
  s.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: o.fill || C.white }, line: { color: o.line || (o.fill ? o.fill : C.line), width: o.lw || 0.75 } });
}
function label(s, text, x, y, w, color = C.accInk) {
  s.addText(text, { x, y, w, h: 0.25, fontFace: F, fontSize: 9, bold: true, color, charSpacing: 1, margin: 0 });
}
function list(s, items, x, y, w, h, size = 10.5, color = C.ink2) {
  s.addText(
    items.map((t, i) => ({ text: t, options: { bullet: { code: "25A0" }, color, breakLine: i < items.length - 1 } })),
    { x, y, w, h, fontFace: F, fontSize: size, valign: "top", paraSpaceAfter: 5, margin: 0 }
  );
}
function tags(s, arr, x, y, w) {
  s.addText(arr.join("  ·  "), { x, y, w, h: 0.38, fontFace: F, fontSize: 9.5, bold: true, color: C.accInk, margin: 0 });
}
// 구조도: cols = [[{t,s,hl}], ...]
function diagram(s, dg, x, y, w, h) {
  card(s, x, y, w, h);
  label(s, dg.caption, x + 0.18, y + 0.12, w - 0.36);
  const n = dg.cols.length, gap = 0.35, cw = (w - 0.36 - gap * (n - 1)) / n, top = y + 0.45, ah = h - 0.6;
  dg.cols.forEach((col, i) => {
    const cx = x + 0.18 + i * (cw + gap);
    const nh = (ah - 0.1 * (col.length - 1)) / col.length;
    col.forEach((nd, k) => {
      const ny = top + k * (nh + 0.1);
      s.addShape(pptx.ShapeType.roundRect, { x: cx, y: ny, w: cw, h: nh, rectRadius: 0.06, fill: { color: nd.hl ? C.accSoft : C.bg }, line: { color: nd.hl ? C.acc : C.line, width: 1 } });
      s.addText(
        [{ text: nd.t, options: { bold: true, fontSize: 10.5, color: nd.hl ? C.accInk : C.ink, breakLine: true } }, { text: nd.s || "", options: { fontSize: 8.5, color: C.ink3 } }],
        { x: cx + 0.08, y: ny, w: cw - 0.16, h: nh, fontFace: F, valign: "middle", margin: 0 }
      );
    });
    if (i < n - 1) s.addShape(pptx.ShapeType.rightArrow, { x: cx + cw + 0.06, y: top + ah / 2 - 0.1, w: gap - 0.12, h: 0.2, fill: { color: C.acc }, line: { color: C.acc, width: 0 } });
  });
}

/* 1. COVER */
{
  const s = base(true);
  s.addText("PORTFOLIO 2026", { x: M, y: 1.7, w: 2.2, h: 0.36, fontFace: F, fontSize: 10, bold: true, color: C.light, align: "center", charSpacing: 3, shape: pptx.ShapeType.roundRect, rectRadius: 0.18, line: { color: C.light, width: 1 } });
  const [l1, l2] = pf.heroCopy.split("\n");
  s.addText([{ text: l1, options: { color: C.white, breakLine: true } }, { text: l2, options: { color: C.light } }], { x: M, y: 2.3, w: 6.6, h: 1.4, fontFace: F, fontSize: 27, bold: true, margin: 0, valign: "top" });
  s.addText([{ text: pf.name + "  ", options: { fontSize: 24, bold: true, color: C.white } }, { text: pf.role, options: { fontSize: 11, color: C.mute } }], { x: M, y: 4.1, w: 6.6, h: 0.6, fontFace: F, margin: 0 });
  s.addText(pf.keywords.join("   ·   "), { x: M, y: 4.85, w: 6.6, h: 0.3, fontFace: F, fontSize: 10, color: C.mute, margin: 0 });
  s.addImage({ path: img("/img/hero.jpg"), x: 7.3, y: 0, w: 6.033, h: 7.5, sizing: { type: "cover", w: 6.033, h: 7.5 } });
}

/* 2. PROFILE */
{
  const s = base();
  head(s, "Profile", "안녕하세요, UI/UX를 이해하는 풀스택 개발자 안기배입니다");
  card(s, M, 1.45, 2.9, 5.45);
  s.addShape(pptx.ShapeType.roundRect, { x: M + 0.15, y: 1.6, w: 2.6, h: 2.0, rectRadius: 0.08, fill: { color: C.navy }, line: { color: C.navy, width: 0 } });
  s.addText(pf.initials, { x: M + 0.15, y: 1.6, w: 2.6, h: 2.0, fontFace: F, fontSize: 48, bold: true, color: C.white, align: "center", valign: "middle" });
  s.addText([{ text: pf.name, options: { fontSize: 18, bold: true, color: C.ink, breakLine: true } }, { text: pf.nameEn, options: { fontSize: 10, color: C.ink3 } }], { x: M + 0.15, y: 3.75, w: 2.6, h: 0.7, fontFace: F, margin: 0 });
  const contacts = [`✉ ${pf.email}`, ...(SHOW_PHONE ? [`☎ ${pf.phone}`] : [])];
  s.addText(contacts.join("\n"), { x: M + 0.15, y: 4.55, w: 2.6, h: 0.7, fontFace: F, fontSize: 9.5, color: C.ink2, valign: "top", margin: 0 });
  s.addText(d.military, { x: M + 0.15, y: 6.35, w: 2.6, h: 0.4, fontFace: F, fontSize: 8.5, color: C.ink3, margin: 0 });
  const X = M + 3.2, WW = W - M - X;
  s.addText(pf.summary, { x: X, y: 1.45, w: WW, h: 0.8, fontFace: F, fontSize: 12, color: C.ink2, valign: "top", margin: 0 });
  const sw = (WW - 0.45) / 4;
  d.stats.forEach((st, i) => {
    const x = X + i * (sw + 0.15);
    card(s, x, 2.4, sw, 1.25);
    s.addText(
      [{ text: st.value, options: { fontSize: 19, bold: true, color: C.accInk, breakLine: true } }, { text: st.label, options: { fontSize: 10, bold: true, color: C.ink, breakLine: true } }, { text: st.note, options: { fontSize: 8.5, color: C.ink3 } }],
      { x: x + 0.15, y: 2.5, w: sw - 0.3, h: 1.05, fontFace: F, valign: "top", margin: 0 }
    );
  });
  const tw = WW * 0.55;
  d.timeline.forEach((t, i) => {
    const y = 3.85 + i * 1.03;
    card(s, X, y, tw, 0.92);
    s.addShape(pptx.ShapeType.rect, { x: X, y, w: 0.06, h: 0.92, fill: { color: C.acc }, line: { color: C.acc, width: 0 } });
    s.addText(
      [{ text: t.period, options: { fontSize: 8.5, bold: true, color: C.ink3, breakLine: true } }, { text: t.title, options: { fontSize: 11, bold: true, color: C.ink, breakLine: true } }, { text: t.org, options: { fontSize: 9, color: C.accInk } }],
      { x: X + 0.2, y: y + 0.06, w: tw - 0.3, h: 0.8, fontFace: F, valign: "top", margin: 0 }
    );
  });
  const cx = X + tw + 0.2, cw2 = WW - tw - 0.2;
  label(s, "자격 · 어학 · 수상", cx, 3.85, cw2);
  d.certs.forEach((c, i) => {
    const y = 4.15 + i * 0.46;
    card(s, cx, y, cw2, 0.38);
    s.addText([{ text: c.date + "   ", options: { color: C.ink3, bold: true, fontSize: 8.5 } }, { text: c.name, options: { color: C.ink, bold: true, fontSize: 9.5 } }], { x: cx + 0.12, y, w: cw2 - 0.24, h: 0.38, fontFace: F, valign: "middle", margin: 0 });
  });
}

/* 3. STRENGTHS */
{
  const s = base();
  head(s, "Strengths", d.strengthTitle);
  const cw = (W - 2 * M - 0.3) / 3;
  d.whyMe.forEach((w, i) => {
    const x = M + i * (cw + 0.15);
    card(s, x, 1.45, cw, 2.9);
    s.addText(w.no, { x: x + 0.2, y: 1.6, w: 1, h: 0.25, fontFace: F, fontSize: 10, bold: true, color: C.acc, margin: 0 });
    s.addText(w.title, { x: x + 0.2, y: 1.85, w: cw - 0.4, h: 0.45, fontFace: F, fontSize: 14, bold: true, color: C.ink, valign: "top", margin: 0 });
    s.addText(w.body, { x: x + 0.2, y: 2.35, w: cw - 0.4, h: 1.55, fontFace: F, fontSize: 10, color: C.ink2, valign: "top", margin: 0 });
    s.addText("# " + w.tag, { x: x + 0.2, y: 3.95, w: cw - 0.4, h: 0.3, fontFace: F, fontSize: 9.5, bold: true, color: C.navy, margin: 0 });
  });
  card(s, M, 4.5, W - 2 * M, 2.4, { fill: C.navy });
  label(s, d.story.title, M + 0.25, 4.65, 4, C.light);
  const n = d.story.steps.length, sw = (W - 2 * M - 0.5 - 0.15 * (n - 1)) / n;
  d.story.steps.forEach((st, i) => {
    const x = M + 0.25 + i * (sw + 0.15);
    s.addShape(pptx.ShapeType.line, { x, y: 5.0, w: sw, h: 0, line: { color: i === n - 1 ? C.acc : "3A4560", width: 2 } });
    s.addText(
      [{ text: String(i + 1).padStart(2, "0"), options: { fontSize: 9, bold: true, color: C.light, breakLine: true } }, { text: st.k, options: { fontSize: 12, bold: true, color: C.white, breakLine: true } }, { text: st.d, options: { fontSize: 9, color: C.mute } }],
      { x, y: 5.1, w: sw, h: 1.7, fontFace: F, valign: "top", margin: 0, paraSpaceAfter: 3 }
    );
  });
}

/* 4-7. PROJECTS */
d.projects.forEach((pr, i) => {
  const s = base();
  head(s, pr.highlight, `${pr.title} — ${pr.subtitle}`, String(i + 1).padStart(2, "0"));
  const LW = 4.7, X = M + LW + 0.3, RW = W - M - X;
  s.addText(
    [
      { text: "기간   ", options: { bold: true, color: C.ink3 } }, { text: pr.period, options: { color: C.ink2, breakLine: true } },
      { text: "인원   ", options: { bold: true, color: C.ink3 } }, { text: pr.team, options: { color: C.ink2, breakLine: true } },
      { text: "역할   ", options: { bold: true, color: C.ink3 } }, { text: pr.role, options: { color: C.ink2 } },
    ],
    { x: M, y: 1.45, w: LW, h: 0.95, fontFace: F, fontSize: 9.5, valign: "top", margin: 0 }
  );
  tags(s, pr.stack, M, 2.45, LW);
  card(s, M, 2.85, LW, 1.15);
  label(s, "배경", M + 0.18, 2.97, LW - 0.36);
  s.addText(pr.problem, { x: M + 0.18, y: 3.25, w: LW - 0.36, h: 0.7, fontFace: F, fontSize: 10, color: C.ink2, valign: "top", margin: 0 });
  s.addImage({ path: img(`/img/cover-${pr.id}.jpg`), x: M, y: 4.15, w: LW, h: 2.75, sizing: { type: "cover", w: LW, h: 2.75 } });

  const dgH = pr.diagram.cols.some((c) => c.length > 1) ? 1.9 : 1.45;
  diagram(s, pr.diagram, X, 1.45, RW, dgH);
  const by = 1.45 + dgH + 0.15, bh = 6.35 - by - 0.1;
  card(s, X, by, RW, bh);
  label(s, "한 일", X + 0.2, by + 0.12, RW - 0.4);
  list(s, pr.points, X + 0.2, by + 0.42, RW - 0.4, bh - 0.5, 10.5);
  const n = pr.steps.length, stw = (RW - 0.1 * (n - 1)) / n;
  pr.steps.forEach((st, k) => {
    const x = X + k * (stw + 0.1);
    card(s, x, 6.4, stw, 0.5);
    s.addText([{ text: `${k + 1}  `, options: { bold: true, color: C.acc } }, { text: st, options: { bold: true, color: C.ink } }], { x: x + 0.1, y: 6.4, w: stw - 0.2, h: 0.5, fontFace: F, fontSize: 9, valign: "middle", margin: 0 });
  });
});

/* 8. OPS + SKILLS */
{
  const s = base();
  head(s, "Operations · Skills", "상시 운영 경험과 기술 스택");
  const hw = (W - 2 * M - 0.3) / 2, ops = d.operations;
  card(s, M, 1.45, hw, 5.45, { line: C.acc });
  label(s, `${ops.title} · ${ops.period}`, M + 0.25, 1.6, hw - 0.5);
  list(s, ops.points, M + 0.25, 2.0, hw - 0.5, 3.9, 11);
  tags(s, ops.stack, M + 0.25, 6.35, hw - 0.5);
  const X = M + hw + 0.3;
  d.skills.forEach((sk, i) => {
    const y = 1.45 + i * 1.1;
    card(s, X, y, hw, 0.98);
    s.addText([{ text: sk.group, options: { bold: true, fontSize: 10.5, color: C.accInk, breakLine: true } }, { text: sk.items.join("  ·  "), options: { fontSize: 10, color: C.ink2 } }], { x: X + 0.2, y: y + 0.12, w: hw - 0.4, h: 0.8, fontFace: F, valign: "top", margin: 0 });
  });
}

/* 9. CLOSING */
{
  const s = base(true);
  s.addText("THANK YOU", { x: 1.2, y: 2.2, w: 2.0, h: 0.36, fontFace: F, fontSize: 10, bold: true, color: C.light, align: "center", charSpacing: 3, shape: pptx.ShapeType.roundRect, rectRadius: 0.18, line: { color: C.light, width: 1 } });
  s.addText(d.contactCopy, { x: 1.2, y: 2.8, w: 11, h: 1.3, fontFace: F, fontSize: 28, bold: true, color: C.white, margin: 0 });
  const links = [`✉ ${pf.email}`, ...(SHOW_PHONE ? [`☎ ${pf.phone}`] : [])];
  s.addText(links.join("        "), { x: 1.2, y: 4.4, w: 11, h: 0.4, fontFace: F, fontSize: 13, color: C.mute, margin: 0 });
  s.addText(`${pf.name} · ${pf.nameEn} · 프로젝트 이미지는 이해를 돕기 위한 일러스트입니다.`, { x: 1.2, y: 5.1, w: 10, h: 0.3, fontFace: F, fontSize: 10, color: C.ink3, margin: 0 });
}

await pptx.writeFile({ fileName: OUT });
console.log("PPTX ->", OUT);
