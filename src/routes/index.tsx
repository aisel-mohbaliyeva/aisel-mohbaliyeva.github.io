import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import memoji from "@/assets/aisel-memoji.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Aysel Mohbaliyeva, iOS Developer" },
      {
        name: "description",
        content:
          "iOS Developer building mobile applications with Swift and SwiftUI. Started programming in 2025, focused on iOS development.",
      },
      { property: "og:title", content: "Portfolio — Aysel Mohbaliyeva, iOS Developer" },
      {
        property: "og:description",
        content:
          "iOS Developer. Swift & SwiftUI. 4 shipped apps: banking, crypto, fitness, utility.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Portfolio,
});

const bankShot   = (n: number) => `/img/AZBankMate/${n}.png`;
const cryptoShot = (n: number) => `/img/CryptoTrack/${n}.png`;
const steplyShot = (n: number) => `/img/Steply/${n}.png`;
const discShot   = (n: number) => `/img/DiscountHelper/${n}.png`;
const exploreShot = (n: number) => `/img/ExploreAZ/${n}.png`;

type Project = {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  tags: string[];
  github: string;
  images: string[];
};

const featured1: Project = {
  id: "azbankmate",
  name: "AZ BankMate",
  tagline: "iOS Banking · Azerbaijan",
  desc:
    "An iOS application designed to compare banking products across Azerbaijani banks. Users can compare mortgage, credit, deposit, debit/miles cards and cashback offers, track real-time CBAR exchange rates, and save favorite banks.",
  tags: ["Swift", "SwiftUI", "MVVM", "MapKit", "URLSession", "@Observable"],
  github: "https://github.com/aisel-mohbaliyeva/AZBankMate",
  images: [1, 2, 3, 4, 5, 6].map(bankShot),
};

const featured2: Project = {
  id: "cryptotrack",
  name: "Crypto Track",
  tagline: "Crypto · Live API",
  desc:
    "Live prices for the top 50 cryptocurrencies with 7-day sparkline charts, favorites and a personal portfolio tracker. Powered by the CoinGecko API and built with Combine.",
  tags: ["SwiftUI", "Swift Charts", "MVVM", "Combine", "URLSession", "async/await", "UserDefaults", "CoinGecko API"],
  github: "https://github.com/aisel-mohbaliyeva/Crypto-Track_API",
  images: [7, 8, 9, 10].map(cryptoShot),
};

const exploreAZ: Project = {
  id: "exploreaz",
  name: "ExploreAZ",
  tagline: "Tourism · Azerbaijan",
  desc: "A tourism guide app for Azerbaijan, designed to help tourists and visitors explore the country independently. Browse cities, discover attractions, plan itineraries, and access practical travel information — all in one place.",
  tags: ["SwiftUI", "MapKit", "@Observable", "UserDefaults", "SOLID Principles"],
  github: "https://github.com/aisel-mohbaliyeva/ExploreAZ",
  images: [1, 2, 3, 4, 5, 6, 7, 8].map(exploreShot),
};

const showcase: Project[] = [
  {
    id: "steply",
    name: "Steply",
    tagline: "Health · HealthKit",
    desc:
      "Step tracker built on HealthKit. Animated progress ring, weekly bar chart, and achievement awards that unlock by step count milestones.",
    tags: ["SwiftUI", "HealthKit", "Swift Charts", "MVVM", "@Observable", "async/await", "SF Symbols"],
    github: "https://github.com/aisel-mohbaliyeva/Steply",
    images: [11, 12, 13].map(steplyShot),
  },
  {
    id: "discounthelper",
    name: "Discount Helper",
    tagline: "Utility · Calculator",
    desc:
      "Discount calculator with 5 currencies, calculation history, share sheet, spring animations and haptic feedback. Persistence via UserDefaults.",
    tags: ["SwiftUI", "Combine", "MVVM", "@StateObject", "@Published", "@EnvironmentObject", "UserDefaults (Codable)"],
    github: "https://github.com/aisel-mohbaliyeva/DiscountHelper",
    images: [14, 15, 16, 17].map(discShot),
  },
];

function PhoneImg({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="vm-phone-empty" />;
  return <img src={src} alt="screenshot" loading="lazy" onError={() => setFailed(true)} />;
}

function Slider({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const startX = useRef<number | null>(null);

  const go = (dir: number) => setIdx((i) => (i + dir + images.length) % images.length);

  return (
    <div
      className="vm-slider"
      onTouchStart={(e) => (startX.current = e.changedTouches[0].clientX)}
      onTouchEnd={(e) => {
        if (startX.current == null) return;
        const dx = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        startX.current = null;
      }}
    >
      <button className="vm-slider-btn vm-slider-prev" onClick={() => go(-1)} aria-label="Previous">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button className="vm-slider-btn vm-slider-next" onClick={() => go(1)} aria-label="Next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
      </button>

      <div className="vm-slider-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {images.map((src, i) => (
          <div className="vm-slide" key={i}>
            <div className="vm-phone">
              <span className="vm-phone-notch" />
              <PhoneImg src={src} />
            </div>
          </div>
        ))}
      </div>

      <div className="vm-dots">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            className={`vm-dot ${i === idx ? "on" : ""}`}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </div>
  );
}

function ShowcaseItem({ p }: { p: Project }) {
  return (
    <div className="vm-show-item reveal">
      <div className="vm-show-gallery">
        {p.images.slice(0, 4).map((src, i) => (
          <div key={i} className={`vm-show-phone vm-show-phone-${i}`}>
            <div className="vm-phone vm-phone-sm">
              <span className="vm-phone-notch" />
              <PhoneImg src={src} />
            </div>
          </div>
        ))}
      </div>
      <div className="vm-show-info">
        <h3>{p.name}</h3>
        <p className="vm-show-tagline">{p.tagline}</p>
        <p>{p.desc}</p>
        <div className="vm-tags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <a href={p.github} target="_blank" rel="noreferrer" className="vm-btn vm-btn-dark">
          <GithubIcon /> View on GitHub
        </a>
      </div>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 015.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            ro.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const revealEmail = () => setEmail("ayselmohbaliyeva22" + String.fromCharCode(64) + "gmail.com");

  return (
    <div className="vm">
      <style>{styles}</style>

      <header className="vm-header">
        <button
          className="vm-header-btn"
          aria-label="Menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <div className={`vm-ham ${menuOpen ? "vm-ham-close" : ""}`}>
            <span />
            <span />
            <span />
          </div>
        </button>
        <div className={`vm-header-bg ${menuOpen ? "vm-expand-bg" : ""}`} />

        <nav className={`vm-nav ${menuOpen ? "vm-show-nav" : ""}`}>
          <div className="vm-nav-item">
            <span>Portfolio</span>
            <ul>
              <li><a href="#azbankmate" onClick={() => setMenuOpen(false)}>AZ BankMate</a></li>
              <li><a href="#cryptotrack" onClick={() => setMenuOpen(false)}>Crypto Track</a></li>
              <li><a href="#exploreaz" onClick={() => setMenuOpen(false)}>ExploreAZ</a></li>
              <li><a href="#steply" onClick={() => setMenuOpen(false)}>Steply</a></li>
              <li><a href="#discounthelper" onClick={() => setMenuOpen(false)}>Discount Helper</a></li>
            </ul>
          </div>
          <div className="vm-nav-item">
            <span>Menu</span>
            <ul>
              <li><a href="#top" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#showcase" onClick={() => setMenuOpen(false)}>Projects</a></li>
              <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            </ul>
          </div>
          <div className="vm-nav-item">
            <span>Contact</span>
            <ul>
              <li>
                <a className="vm-btn vm-btn-dark" href="https://www.linkedin.com/in/ayselmohbaliyeva8/" target="_blank" rel="noreferrer">LinkedIn</a>
              </li>
              <li>
                <a className="vm-btn vm-btn-dark" href="https://github.com/aisel-mohbaliyeva" target="_blank" rel="noreferrer">GitHub</a>
              </li>
              <li>
                <button className="vm-btn vm-btn-white" onClick={revealEmail}>Email Address</button>
                <div className="vm-email">{email}</div>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <section className="vm-hero" id="top">
        <div className="vm-deco" />
        <div className="vm-deco vm-deco-2" />
        <div className="vm-hero-info">
          <img className="vm-hero-img" src={memoji} alt="Aysel Mohbaliyeva" />
          <div className="vm-hero-text">
            <h1>Aysel Mohbaliyeva</h1>
            <span>iOS Developer</span>
          </div>
        </div>
        <div className="vm-hero-cta">
          <span>portfolio</span>
          <div className="vm-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
          </div>
        </div>
      </section>

      <section className="vm-feature vm-feature-red reveal" id="azbankmate">
        <div className="vm-feature-slider">
          <Slider images={featured1.images} />
        </div>
        <div className="vm-feature-info">
          <h2>{featured1.name}</h2>
          <p>{featured1.desc}</p>
          <div className="vm-tags vm-tags-light">
            {featured1.tags.map((t) => <span key={t}>{t}</span>)}
          </div>
          <div className="vm-feature-cta">
            <a href={featured1.github} target="_blank" rel="noreferrer" className="vm-btn vm-btn-dark">
              <GithubIcon /> GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="vm-feature vm-feature-dark reveal" id="cryptotrack">
        <div className="vm-feature-info">
          <h2>{featured2.name}</h2>
          <p>{featured2.desc}</p>
          <div className="vm-tags vm-tags-light">
            {featured2.tags.map((t) => <span key={t}>{t}</span>)}
          </div>
          <div className="vm-feature-cta">
            <a href={featured2.github} target="_blank" rel="noreferrer" className="vm-btn vm-btn-dark">
              <GithubIcon /> GitHub
            </a>
          </div>
        </div>
        <div className="vm-feature-slider">
          <Slider images={featured2.images} />
        </div>
      </section>

      <section className="vm-feature vm-feature-exploreaz reveal" id="exploreaz">
        <div className="vm-feature-slider">
          <Slider images={exploreAZ.images} />
        </div>
        <div className="vm-feature-info vm-exploreaz-info">
          <div className="vm-exploreaz-badge">🇦🇿 Azerbaijan</div>
          <h2>{exploreAZ.name}</h2>
          <p>{exploreAZ.desc}</p>
          <div className="vm-tags vm-tags-light">
            {exploreAZ.tags.map((t) => <span key={t}>{t}</span>)}
          </div>
          <div className="vm-feature-cta">
            <a href={exploreAZ.github} target="_blank" rel="noreferrer" className="vm-btn vm-btn-dark">
              <GithubIcon /> GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="vm-showcase" id="showcase">
        <h2 className="vm-showcase-title">More Apps & Projects</h2>
        {showcase.map((p) => (
          <div id={p.id} key={p.id}>
            <ShowcaseItem p={p} />
          </div>
        ))}
      </section>

      <section className="vm-about reveal" id="contact">
        <div className="vm-about-inner">
          <h2>About Aysel</h2>
          <p>
            I am an enthusiastic iOS Developer building mobile applications with Swift and SwiftUI. I started my programming journey in 2025. My main interest and focus is iOS development. I am looking for a Junior iOS Developer position where I can contribute to real projects within a team.
          </p>
          <div className="vm-skills-grid">
            <div className="vm-skill-group"><strong>Languages</strong><span>Swift · SwiftUI · Swift Charts</span></div>
            <div className="vm-skill-group"><strong>Architecture</strong><span>MVVM · @Observable</span></div>
            <div className="vm-skill-group"><strong>Networking</strong><span>async/await · URLSession · REST APIs · Firebase</span></div>
            <div className="vm-skill-group"><strong>Data</strong><span>Core Data · HealthKit · UserDefaults</span></div>
            <div className="vm-skill-group"><strong>Tools</strong><span>Xcode · Git · GitHub · Jira · Agile/Scrum · Figma · Notion</span></div>
          </div>
          <div className="vm-about-cta">
            <a className="vm-btn vm-btn-dark" href="https://www.linkedin.com/in/ayselmohbaliyeva8/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="vm-btn vm-btn-hollow-dark" href="https://github.com/aisel-mohbaliyeva" target="_blank" rel="noreferrer">GitHub</a>
            <a className="vm-btn vm-btn-hollow-dark" href="mailto:ayselmohbaliyeva22@gmail.com">Email</a>
          </div>
        </div>
      </section>

      <footer className="vm-footer">
        <div className="vm-footer-inner">
          <span>© 2026 Aysel Mohbaliyeva</span>
          <span>iOS Developer</span>
        </div>
      </footer>
    </div>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;700&display=swap');
html{scroll-behavior:smooth}
.vm{font-family:'Montserrat',system-ui,sans-serif;color:#111;background:#fff;overflow-x:hidden;font-size:16px}
.vm *,.vm *::before,.vm *::after{box-sizing:border-box;margin:0;padding:0}
.vm h1,.vm h2,.vm h3{font-weight:400;letter-spacing:-.01em}
.vm a{color:inherit;text-decoration:none}
.vm ul{list-style:none}
.vm img{max-width:100%;display:block}

.vm-header-btn{position:fixed;top:24px;left:24px;width:56px;height:56px;border:2px solid #fff;border-radius:999px;background:#2c2c2e;display:flex;align-items:center;justify-content:center;box-shadow:1px 3px 6px rgba(0,0,0,.4);z-index:3000;cursor:pointer;transition:transform .4s}
.vm-header-btn:hover{transform:scale(1.06)}
.vm-header-btn:active{transform:scale(.94)}
.vm-ham,.vm-ham-close{display:flex;flex-direction:column;gap:5px}
.vm-ham span,.vm-ham-close span{display:block;width:22px;height:2px;background:#fff;transition:all .4s}
.vm-ham-close{gap:0}
.vm-ham-close span:nth-child(1){transform:translateY(2px) rotate(135deg)}
.vm-ham-close span:nth-child(2){transform:translateX(-20px);opacity:0}
.vm-ham-close span:nth-child(3){transform:translateY(-2px) rotate(-135deg)}
.vm-header-bg{position:fixed;top:32px;left:32px;width:40px;height:40px;background:#c31e00;border-radius:999px;z-index:1000;transition:transform .6s cubic-bezier(.7,0,.3,1);pointer-events:none}
.vm-expand-bg{transform:scale(220)}
.vm-nav{position:fixed;inset:0;z-index:1500;display:flex;justify-content:center;align-items:flex-start;gap:48px;padding:120px 24px 48px;overflow-y:auto;opacity:0;pointer-events:none;transition:opacity .4s .15s;flex-wrap:wrap}
.vm-show-nav{opacity:1;pointer-events:auto}
.vm-nav-item{color:#fff;text-align:center;min-width:200px}
.vm-nav-item>span{display:block;text-transform:uppercase;font-size:28px;font-weight:200;margin-bottom:16px;opacity:.85}
.vm-nav-item li{margin-bottom:6px}
.vm-nav-item a:not(.vm-btn){display:inline-block;color:#fff;font-size:16px;font-weight:700;padding:6px 8px;transition:letter-spacing .35s}
.vm-nav-item a:not(.vm-btn):hover{letter-spacing:2px}
.vm-nav-item .vm-btn{margin-top:6px}
.vm-email{margin-top:8px;color:#fff;font-size:14px;min-height:18px;opacity:.9}

.vm-btn{display:inline-flex;align-items:center;gap:10px;border:none;cursor:pointer;font-family:inherit;font-size:14px;font-weight:700;padding:12px 22px;border-radius:999px;text-transform:uppercase;letter-spacing:.06em;transition:transform .25s,box-shadow .25s,background .25s,color .25s,letter-spacing .25s}
.vm-btn-dark{background:#c31e00;color:#fff}
.vm-btn-dark:hover{transform:translateY(-3px);box-shadow:1px 3px 10px rgba(0,0,0,.4)}
.vm-btn-white{background:#fff;color:#111}
.vm-btn-white:hover{transform:translateY(-3px);background:#c31e00;color:#fff;box-shadow:1px 3px 10px rgba(0,0,0,.4)}
.vm-btn-hollow-dark{background:transparent;border:2px solid #111;color:#111}
.vm-btn-hollow-dark:hover{transform:translateY(-3px);letter-spacing:.12em;box-shadow:1px 3px 10px rgba(0,0,0,.2)}

.vm-hero{position:relative;min-height:93vh;display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:hidden;animation:vmFadeIn 1s}
.vm-deco{position:absolute;bottom:-72%;right:-10%;width:100%;height:100rem;background:linear-gradient(90deg,#fff 0%,#ececec 100%);border-radius:62% 38% 56% 44% / 43% 27% 73% 57%;z-index:-1;animation:vmPulse 15s infinite}
.vm-deco-2{bottom:-78%;right:-15%;background:linear-gradient(90deg,#fff 0%,#e0e0e0 100%)}
.vm-hero-info{display:flex;flex-direction:column;align-items:center}
.vm-hero-img{width:160px;height:160px;border-radius:999px;border:none;box-shadow:none;background:transparent;object-fit:cover}
.vm-hero-text{text-align:center;margin-top:24px}
.vm-hero-text h1{font-size:clamp(28px,4.5vw,40px);margin-bottom:8px}
.vm-hero-text span{font-size:14px;color:#555;letter-spacing:.05em}
.vm-hero-cta{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;color:#333}
.vm-hero-cta span{font-size:18px;font-weight:200;margin-bottom:8px;text-transform:lowercase;letter-spacing:.1em}
.vm-arrow{animation:vmBob 2s infinite}
.vm-arrow svg{width:28px;height:28px}
@keyframes vmFadeIn{from{opacity:0}to{opacity:1}}
@keyframes vmPulse{0%,100%{transform:translateX(0)}25%{transform:translateX(-3%)}50%{transform:translateX(0)}75%{transform:translateX(3%)}}
@keyframes vmBob{0%,100%{transform:translateY(0);opacity:1}50%{transform:translateY(8px);opacity:.4}}

.vm-feature{min-height:90vh;display:grid;grid-template-columns:1fr 1fr;gap:32px;padding:80px 48px;align-items:center}
.vm-feature-red{background:#c31e00;color:#fff}
.vm-feature-dark{background:#2c2c2e;color:#fff}
.vm-feature-exploreaz{background:linear-gradient(135deg,#0092BC 0%,#003d7a 40%,#c0392b 72%,#00956a 100%);color:#fff;position:relative;overflow:hidden}
.vm-feature-exploreaz::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle at 20% 50%,rgba(255,255,255,.06) 0%,transparent 60%),radial-gradient(circle at 80% 20%,rgba(255,255,255,.04) 0%,transparent 50%);pointer-events:none}
.vm-exploreaz-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);padding:6px 16px;border-radius:100px;font-size:13px;font-weight:600;letter-spacing:.05em;margin-bottom:18px;backdrop-filter:blur(8px);animation:badgePulse 3s ease-in-out infinite}
@keyframes badgePulse{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,.3)}50%{box-shadow:0 0 0 10px rgba(255,255,255,0)}}
.vm-exploreaz-info h2{font-size:clamp(36px,5vw,64px);background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,.8) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.vm-feature-info{max-width:520px;margin:0 auto;padding:24px}
.vm-feature-info h2{font-size:clamp(32px,5vw,56px);margin-bottom:20px;font-weight:700;letter-spacing:-.02em}
.vm-feature-info p{font-size:16px;line-height:1.7;margin-bottom:20px;opacity:.92}
.vm-feature-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}
.vm-feature-slider{display:flex;justify-content:center;align-items:center;padding:24px}

.vm-slider{position:relative;width:100%;max-width:300px;overflow:hidden;padding:0 36px}
.vm-slider-btn{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.2);border:none;width:36px;height:36px;border-radius:999px;color:#fff;cursor:pointer;z-index:5;display:flex;align-items:center;justify-content:center;transition:all .2s}
.vm-slider-btn:hover{background:rgba(0,0,0,.45);transform:translateY(-50%) scale(1.1)}
.vm-slider-btn svg{width:18px;height:18px}
.vm-slider-prev{left:0}
.vm-slider-next{right:0}
.vm-slider-track{display:flex;transition:transform .5s cubic-bezier(.7,0,.3,1)}
.vm-slide{flex:0 0 100%;display:flex;justify-content:center;align-items:center;padding:8px 0}
.vm-dots{display:flex;justify-content:center;gap:8px;margin-top:14px}
.vm-dot{width:7px;height:7px;border-radius:999px;background:rgba(255,255,255,.4);border:none;padding:0;cursor:pointer;transition:all .2s}
.vm-dot.on{background:#fff;transform:scale(1.4)}

.vm-phone{position:relative;width:220px;aspect-ratio:9/19;background:#000;border-radius:32px;padding:6px;box-shadow:0 20px 50px -10px rgba(0,0,0,.4),0 0 0 2px rgba(255,255,255,.08) inset;overflow:hidden}
.vm-phone-sm{width:170px;border-radius:26px}
.vm-phone img{width:100%;height:100%;object-fit:cover;border-radius:26px;display:block}
.vm-phone-sm img{border-radius:20px}
.vm-phone-empty{width:100%;height:100%;background:linear-gradient(135deg,#3a3a3c,#1c1c1e);border-radius:26px}

.vm-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.vm-tags span{font-size:11px;padding:4px 10px;border-radius:999px;background:rgba(0,0,0,.08);text-transform:uppercase;letter-spacing:.06em;font-weight:700}
.vm-tags-light span{background:rgba(255,255,255,.15);color:#fff}

.vm-showcase{padding:80px 48px;background:#fafafa}
.vm-showcase-title{text-align:center;font-size:clamp(28px,4vw,44px);font-weight:200;margin-bottom:60px;letter-spacing:.02em}
.vm-show-item{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px;align-items:center;max-width:1100px;margin:0 auto 80px;opacity:0;transform:translateY(40px);transition:all .8s cubic-bezier(.2,.7,.2,1)}
.vm-show-item.on{opacity:1;transform:none}
.vm-show-gallery{position:relative;height:380px;display:flex;justify-content:center;align-items:center}
.vm-show-phone{position:absolute;transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.vm-show-phone-0{transform:translate(-90px,0) rotate(-8deg);z-index:1}
.vm-show-phone-1{transform:translate(0,-10px) rotate(0deg);z-index:3}
.vm-show-phone-2{transform:translate(90px,0) rotate(8deg);z-index:2}
.vm-show-item:hover .vm-show-phone-0{transform:translate(-130px,-10px) rotate(-12deg)}
.vm-show-item:hover .vm-show-phone-2{transform:translate(130px,-10px) rotate(12deg)}
.vm-show-info h3{font-size:32px;font-weight:700;margin-bottom:6px}
.vm-show-tagline{font-size:12px;text-transform:uppercase;letter-spacing:.18em;color:#c31e00;margin-bottom:16px;font-weight:700}
.vm-show-info p{line-height:1.7;margin-bottom:16px;color:#333}
.vm-show-info .vm-btn{margin-top:20px}

.vm-about{padding:100px 48px;background:#fff}
.vm-about-inner{max-width:760px;margin:0 auto;text-align:center;opacity:0;transform:translateY(30px);transition:all .8s}
.vm-about.on .vm-about-inner{opacity:1;transform:none}
.vm-about h2{font-size:clamp(32px,4vw,48px);margin-bottom:24px;font-weight:200}
.vm-about p{font-size:17px;line-height:1.8;color:#333;margin-bottom:32px}
.vm-about-cta{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.vm-skills-grid{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-bottom:32px}
.vm-skill-group{background:#f5f5f5;border-radius:12px;padding:14px 20px;text-align:left;min-width:200px;flex:1}
.vm-skill-group strong{display:block;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#c31e00;margin-bottom:6px;font-weight:700}
.vm-skill-group span{font-size:14px;color:#333;line-height:1.6}

.vm-footer{background:#fff;border-top:1px solid rgba(0,0,0,.08);padding:20px 32px}
.vm-footer-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;font-size:13px;font-weight:200;color:#444;text-transform:uppercase;letter-spacing:.05em}

.reveal{opacity:0;transform:translateY(40px);transition:opacity .8s,transform .8s}
.reveal.on{opacity:1;transform:none}

@media(max-width:900px){
  .vm-feature{grid-template-columns:1fr;padding:60px 20px;gap:40px}
  .vm-feature-dark .vm-feature-info{order:2}
  .vm-feature-dark .vm-feature-slider{order:1}
  .vm-show-item{grid-template-columns:1fr;gap:32px;text-align:center}
  .vm-show-info .vm-tags{justify-content:center}
  .vm-show-gallery{height:320px}
  .vm-show-phone-0{transform:translate(-70px,0) rotate(-8deg)}
  .vm-show-phone-2{transform:translate(70px,0) rotate(8deg)}
  .vm-nav{gap:24px;padding-top:100px}
  .vm-nav-item>span{font-size:22px}
}
@media(max-width:520px){
  .vm-header-btn{top:16px;left:16px;width:50px;height:50px}
  .vm-header-bg{top:22px;left:22px}
  .vm-hero-img{width:130px;height:130px}
  .vm-phone{width:190px}
  .vm-phone-sm{width:140px}
  .vm-show-phone-0{transform:translate(-50px,0) rotate(-6deg)}
  .vm-show-phone-2{transform:translate(50px,0) rotate(6deg)}
  .vm-showcase,.vm-about{padding:60px 20px}
  .vm-show-item{margin-bottom:60px}
  .vm-feature-info{padding:0}
}
`;
