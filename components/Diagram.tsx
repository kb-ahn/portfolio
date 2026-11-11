type Node = { t: string; s?: string; hl?: boolean };
export type DiagramData = { caption: string; cols: Node[][] };

// 이력서 내용으로 그린 구조도 (화면 캡처 대신 사용)
export default function Diagram({ d, compact = false }: { d: DiagramData; compact?: boolean }) {
  return (
    <figure className={`diagram ${compact ? "compact" : ""}`}>
      <figcaption>{d.caption}</figcaption>
      <div className="dg-row">
        {d.cols.map((col, i) => (
          <div key={i} className="dg-cell">
            <div className="dg-col">
              {col.map((n) => (
                <div key={n.t} className={`dg-node ${n.hl ? "hl" : ""}`}>
                  <b>{n.t}</b>
                  {n.s && <span>{n.s}</span>}
                </div>
              ))}
            </div>
            {i < d.cols.length - 1 && (
              <div className="dg-arrow" aria-hidden>
                <svg viewBox="0 0 32 16" width="32" height="16">
                  <path d="M0 8h26M20 2l7 6-7 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </figure>
  );
}
