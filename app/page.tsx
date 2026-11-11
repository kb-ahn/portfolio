import data from "@/lib/content.json";
import Diagram from "@/components/Diagram";

export default function Home() {
  const p = data.profile;
  const ops = data.operations;
  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="logo">
            안기배<span>.</span>
          </a>
          <nav>
            <a href="#why">Strengths</a>
            <a href="#work">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">{p.role}</p>
              <h1>
                {p.heroCopy.split("\n").map((l, i) => (
                  <span key={i}>{l}</span>
                ))}
              </h1>
              <p className="lead">{p.heroLead}</p>
              <ul className="chips">
                {p.keywords.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
              <div className="cta">
                <a className="btn primary" href="#work">프로젝트 보기</a>
                <a className="btn" href="/kban_portfolio.pdf" target="_blank">PDF 포트폴리오</a>
                <a className="btn ghost" href={`mailto:${p.email}`}>✉ 연락하기</a>
              </div>
            </div>
            <div className="hero-visual">
              <img src="/img/hero.jpg" alt="레거시 서버가 새 아키텍처로 전환되는 일러스트" />
              <div className="id-card">
                <span className="mono">{p.initials}</span>
                <div>
                  <strong>{p.name}</strong> <em>{p.nameEn}</em>
                  <p>{p.roleSub}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="wrap stats">
            {data.stats.map((s) => (
              <div key={s.label} className="stat">
                <b>{s.value}</b>
                <span>{s.label}</span>
                <small>{s.note}</small>
              </div>
            ))}
          </div>
        </section>

        {/* STRENGTHS */}
        <section id="why" className="section">
          <div className="wrap">
            <p className="kicker">Strengths</p>
            <h2>{data.strengthTitle}</h2>
            <div className="why">
              {data.whyMe.map((w) => (
                <article key={w.no}>
                  <span className="no">{w.no}</span>
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                  <p className="game"># {w.tag}</p>
                </article>
              ))}
            </div>
            <div className="story">
              <h3>{data.story.title}</h3>
              <ol>
                {data.story.steps.map((s, i) => (
                  <li key={s.k}>
                    <span className="st-no">{String(i + 1).padStart(2, "0")}</span>
                    <b>{s.k}</b>
                    <p>{s.d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="work" className="section alt">
          <div className="wrap">
            <p className="kicker">Projects</p>
            <h2>주요 프로젝트</h2>
            <div className="toc">
              {data.projects.map((pr, i) => (
                <a key={pr.id} href={`#${pr.id}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {pr.title}
                </a>
              ))}
            </div>
          </div>
          {data.projects.map((pr, i) => (
            <article key={pr.id} id={pr.id} className="case">
              <div className="wrap">
                <div className="case-head">
                  <div>
                    <p className="case-cat">
                      <span>{String(i + 1).padStart(2, "0")}</span> {pr.highlight}
                    </p>
                    <h3>{pr.title}</h3>
                    <p className="case-sub">{pr.subtitle}</p>
                    <dl className="meta">
                      <div>
                        <dt>기간</dt>
                        <dd>{pr.period}</dd>
                      </div>
                      <div>
                        <dt>인원</dt>
                        <dd>{pr.team}</dd>
                      </div>
                      <div>
                        <dt>역할</dt>
                        <dd>{pr.role}</dd>
                      </div>
                    </dl>
                    <ul className="tags">
                      {pr.stack.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cover">
                    <img src={`/img/cover-${pr.id}.jpg`} alt={`${pr.title} 일러스트`} />
                  </div>
                </div>

                <Diagram d={pr.diagram} />

                <div className="case-body">
                  <div className="block problem">
                    <h4>배경</h4>
                    <p>{pr.problem}</p>
                    <ol className="steps">
                      {pr.steps.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="block wide">
                    <h4>한 일</h4>
                    <ul className="process">
                      {pr.points.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="wrap">
            <div className="ops">
              <div>
                <p className="case-cat">Always-on</p>
                <h3>{ops.title}</h3>
                <p className="case-sub">{ops.period}</p>
                <ul className="tags">
                  {ops.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <ul className="process">
                {ops.points.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS + TIMELINE */}
        <section id="skills" className="section">
          <div className="wrap two-col">
            <div>
              <p className="kicker">Skills</p>
              <h2>기술 스택</h2>
              <div className="skills">
                {data.skills.map((s) => (
                  <div key={s.group} className="skill">
                    <b>{s.group}</b>
                    <ul>
                      {s.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="kicker">Experience · Education</p>
              <h2>경력 · 학력</h2>
              <ol className="timeline">
                {data.timeline.map((t) => (
                  <li key={t.title}>
                    <span className="t-period">{t.period}</span>
                    <b>{t.title}</b>
                    <span className="t-org">{t.org}</span>
                    <p>{t.desc}</p>
                  </li>
                ))}
              </ol>
              <h3 className="sub-h">자격 · 어학 · 수상</h3>
              <ul className="certs">
                {data.certs.map((c) => (
                  <li key={c.name}>
                    <span>{c.date}</span>
                    <b>{c.name}</b>
                    <em>{c.org}</em>
                  </li>
                ))}
              </ul>
              <p className="military">병역 · {data.military}</p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact">
          <div className="wrap">
            <p className="kicker">Contact</p>
            <h2>{data.contactCopy}</h2>
            <div className="contact-links">
              <a href={`mailto:${p.email}`}>{p.email}</a>
              <a href="/kban_portfolio.pdf" target="_blank">PDF 포트폴리오 ↓</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="wrap">© 2026 안기배 · KiBe An · 프로젝트 이미지는 이해를 돕기 위한 일러스트입니다.</div>
      </footer>
    </>
  );
}
