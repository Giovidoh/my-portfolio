import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live demo',
  robots: { index: false },
};

/* Self-contained dashboard shown inside the project page's live-preview iframe. */
const css = `
.demo { font-family: var(--font-body); background:#0f0e0c; color:#f4f2ea; display:flex; min-height:100vh; font-size:14px; }
.demo .side { width:200px; background:#16140f; border-right:1px solid rgba(255,255,255,.08); padding:18px 14px; flex-shrink:0; }
.demo .brand { display:flex; align-items:center; gap:9px; font-family:var(--font-display); font-weight:700; font-size:16px; margin-bottom:22px; }
.demo .brand i { width:26px; height:26px; border-radius:7px; background:#ffc814; color:#15140f; display:grid; place-items:center; font-size:13px; font-style:normal; }
.demo .dnav a { display:flex; align-items:center; gap:10px; padding:9px 11px; border-radius:9px; color:#a3a094; font-weight:500; margin-bottom:2px; }
.demo .dnav a.on { background:rgba(255,200,20,.12); color:#ffc814; }
.demo .dnav a .d { width:7px; height:7px; border-radius:2px; background:currentColor; }
.demo .main { flex:1; padding:24px 28px; overflow:auto; }
.demo .top { display:flex; justify-content:space-between; align-items:center; margin-bottom:22px; }
.demo .top h1 { font-family:var(--font-display); font-size:22px; font-weight:600; }
.demo .top .pill { background:#ffc814; color:#15140f; font-weight:600; padding:8px 14px; border-radius:99px; font-size:13px; }
.demo .cards { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:18px; }
.demo .c { background:#16140f; border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:16px; }
.demo .c .k { color:#757265; font-size:12px; }
.demo .c .v { font-family:var(--font-display); font-size:30px; font-weight:700; margin-top:6px; letter-spacing:-.02em; }
.demo .c .up { color:#56e0b6; font-size:12px; margin-top:4px; }
.demo .panel { background:#16140f; border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:18px; }
.demo .panel h3 { font-family:var(--font-display); font-size:15px; margin-bottom:14px; }
.demo .bars { display:flex; align-items:flex-end; gap:10px; height:130px; }
.demo .bars i { flex:1; background:linear-gradient(180deg,#ffc814,#f0b800); border-radius:6px 6px 0 0; display:block; }
.demo .toks { display:flex; gap:8px; margin-top:14px; flex-wrap:wrap; }
.demo .tok { display:flex; align-items:center; gap:7px; background:#1c1a14; border:1px solid rgba(255,255,255,.08); padding:6px 11px; border-radius:99px; font-size:12px; font-family:var(--font-display); }
.demo .tok i { width:14px; height:14px; border-radius:4px; }
`;

const BARS = ['46%', '68%', '54%', '82%', '71%', '95%', '60%', '78%'];

export default function DemoPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="demo">
        <aside className="side">
          <div className="brand">
            <i>L</i> Lumina
          </div>
          <nav className="dnav">
            <a className="on">
              <span className="d" />
              Overview
            </a>
            <a>
              <span className="d" />
              Components
            </a>
            <a>
              <span className="d" />
              Tokens
            </a>
            <a>
              <span className="d" />
              Themes
            </a>
            <a>
              <span className="d" />
              Settings
            </a>
          </nav>
        </aside>
        <main className="main">
          <div className="top">
            <h1>Design System Overview</h1>
            <span className="pill">Publish v2.4</span>
          </div>
          <div className="cards">
            <div className="c">
              <div className="k">Components</div>
              <div className="v">148</div>
              <div className="up">+12 this week</div>
            </div>
            <div className="c">
              <div className="k">Adoption</div>
              <div className="v">94%</div>
              <div className="up">+6% vs last mo.</div>
            </div>
            <div className="c">
              <div className="k">Products</div>
              <div className="v">7</div>
              <div className="up">2 onboarding</div>
            </div>
          </div>
          <div className="panel">
            <h3>Token usage across products</h3>
            <div className="bars">
              {BARS.map((h, i) => (
                <i key={i} style={{ height: h }} />
              ))}
            </div>
            <div className="toks">
              <span className="tok">
                <i style={{ background: '#ffc814' }} />
                accent/500
              </span>
              <span className="tok">
                <i style={{ background: '#15140f', border: '1px solid #444' }} />
                ink/900
              </span>
              <span className="tok">
                <i style={{ background: '#56e0b6' }} />
                success/400
              </span>
              <span className="tok">
                <i style={{ background: '#faf9f6' }} />
                bg/50
              </span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
