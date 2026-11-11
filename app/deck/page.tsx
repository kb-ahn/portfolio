import data from "@/lib/content.json";
import Diagram from "@/components/Diagram";
import "./deck.css";

export const metadata = { title: "안기배 포트폴리오 (PDF)", robots: { index: false } };

// 전화번호는 제출용 PDF에서만 노출: SHOW_PHONE=1 로 빌드
const showPhone = process.env.SHOW_PHONE === "1";

function Head({ no, cat, title }: { no?: string; cat: string; title: string }) {
  return (
    <header className="s-head">
      <p className="s-cat">
        {no && <span>{no}</span>}
        {cat}
      </p>
      <h2>{title}</h2>
    </header>
  );
}
function Foot({ n }: { n: number }) {
  return (
    <footer className="s-foot">
      <span>안기배 · Full-stack Developer Portfolio</span>
      <span>{String(n).padStart(2, "0")}</span>
    </footer>
  );
}

export default function Deck() {
  const p = data.profile;
  const ops = data.operations;
  return (
    <div className="deck">
      {/* 1 COVER */}
      <section className="slide cover-s">
        <div className="cover-l">
          <p className="pill">PORTFOLIO 2026</p>
          <h1>
            {p.heroCopy.split("\n").map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </h1>
          <div className="cover-name">
            <b>{p.name}</b>
            <span>{p.role}</span>
          </div>
          <ul className="cover-k">
            {p.keywords.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>
        <div className="cover-r one">
          <img src="/img/hero.jpg" alt="" />
        </div>
      </section>

      {/* 2 PROFILE */}
      <section className="slide">
        <Head cat="Profile" title="안녕하세요, UI/UX를 이해하는 풀스택 개발자 안기배입니다" />
        <div className="prof">
          <div className="prof-card">
            <div className="mono-big">{p.initials}</div>
            <b>{p.name}</b>
            <span>{p.nameEn}</span>
            <ul>
              <li>✉ {p.email}</li>
              {showPhone && <li>☎ {p.phone}</li>}
            </ul>
            <p className="pc-mil">{data.military}</p>
          </div>
          <div className="prof-main">
            <p className="prof-lead">{p.summary}</p>
            <div className="d-stats">
              {data.stats.map((s) => (
                <div key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                  <small>{s.note}</small>
                </div>
              ))}
            </div>
            <div className="prof-2">
              <ol className="d-tl col">
                {data.timeline.map((t) => (
                  <li key={t.title}>
                    <span>{t.period}</span>
                    <b>{t.title}</b>
                    <em>{t.org}</em>
                  </li>
                ))}
              </ol>
              <ul className="d-certs">
                {data.certs.map((c) => (
                  <li key={c.name}>
                    <span>{c.date}</span>
                    <b>{c.name}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Foot n={2} />
      </section>

      {/* 3 STRENGTHS */}
      <section className="slide">
        <Head cat="Strengths" title={data.strengthTitle} />
        <div className="d-why">
          {data.whyMe.map((w) => (
            <div key={w.no}>
              <span>{w.no}</span>
              <b>{w.title}</b>
              <p>{w.body}</p>
              <em># {w.tag}</em>
            </div>
          ))}
        </div>
        <div className="d-story">
          <p className="lbl light">{data.story.title}</p>
          <ol>
            {data.story.steps.map((s, i) => (
              <li key={s.k}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <b>{s.k}</b>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
        <Foot n={3} />
      </section>

      {/* 4-7 PROJECTS */}
      {data.projects.map((pr, i) => (
        <section key={pr.id} className="slide">
          <Head no={String(i + 1).padStart(2, "0")} cat={pr.highlight} title={`${pr.title} — ${pr.subtitle}`} />
          <div className="pj">
            <div className="pj-l">
              <dl className="d-meta">
                <dt>기간</dt>
                <dd>{pr.period}</dd>
                <dt>인원</dt>
                <dd>{pr.team}</dd>
                <dt>역할</dt>
                <dd>{pr.role}</dd>
              </dl>
              <ul className="d-tags">
                {pr.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="box">
                <p className="lbl">배경</p>
                <p>{pr.problem}</p>
              </div>
              <img className="pj-img" src={`/img/cover-${pr.id}.jpg`} alt="" />
            </div>
            <div className="pj-r">
              <Diagram d={pr.diagram} compact />
              <div className="box grow">
                <p className="lbl">한 일</p>
                <ul className="sq">
                  {pr.points.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <ol className="d-steps">
                {pr.steps.map((s, k) => (
                  <li key={s}>
                    <span>{k + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <Foot n={4 + i} />
        </section>
      ))}

      {/* 8 OPS + SKILLS */}
      <section className="slide">
        <Head cat="Operations · Skills" title="상시 운영 경험과 기술 스택" />
        <div className="split even">
          <div className="box">
            <p className="lbl">{ops.title} · {ops.period}</p>
            <ul className="sq">
              {ops.points.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <ul className="d-tags">
              {ops.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="d-skills">
            {data.skills.map((s) => (
              <div key={s.group}>
                <b>{s.group}</b>
                <p>{s.items.join("  ·  ")}</p>
              </div>
            ))}
          </div>
        </div>
        <Foot n={8} />
      </section>

      {/* 9 CLOSING */}
      <section className="slide closing">
        <p className="pill">THANK YOU</p>
        <h2>{data.contactCopy}</h2>
        <div className="close-links">
          <span>✉ {p.email}</span>
          {showPhone && <span>☎ {p.phone}</span>}
        </div>
        <p className="close-name">
          {p.name} · {p.nameEn} · 프로젝트 이미지는 이해를 돕기 위한 일러스트입니다.
        </p>
      </section>
    </div>
  );
}
