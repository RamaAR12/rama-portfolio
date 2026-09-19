import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sparkles,
  Sun,
  ArrowUp,
  X,
} from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Murjan",
    subtitle: "I explored how a travel app can make discovering new destinations feel easier, more inspiring, and less overwhelming.",
    type: "UI design · Case study",
    image: "/assets/murjan-case-study.png",
    accent: "violet",
    link: "https://www.behance.net/gallery/247292747/_?platform=direct",
  },
  {
    number: "02",
    title: "Enshidni",
    subtitle: "I redesigned Enshidni to help people with disabilities discover accessible places with more confidence and independence.",
    type: "Accessibility · UX redesign",
    image: "/assets/enshidni-case-study.png",
    accent: "blue",
    link: "https://www.behance.net/gallery/247448565/Enshidni-App-Redesign",
  },
  {
    number: "03",
    title: "Weefaq",
    subtitle: "I designed Weefaq to simplify roommate matching, shared housing management, and everyday communication.",
    type: "Mobile product · UX/UI",
    image: "/assets/weefaq-case-study.png",
    accent: "teal",
    link: "https://www.behance.net/gallery/249507325/Weefaq",
  },
];

const explorations = [
  { title: "Recruitment Platform", kind: "Product design · UX strategy", href: "https://drive.google.com/drive/folders/1-pEy9cnHTC2pdn4WNSwOlikGRnVweCrn" },
  { title: "Meal", kind: "UI/UX · Mobile experience", href: "https://www.figma.com/design/I5gfKoYh5vbJyjrVeiZADK/project1?node-id=0-1&t=biQXTHqXkCLbMAxQ-1" },
  { title: "نبتة / Nabta", kind: "E-commerce · Visual system", href: "https://github.com/RamaAR12/django_project.git" },
];

const experience = [
  { period: "May — Jun 2026", role: "UI/UX Designer Intern", company: "Madinah Region Development Authority", detail: "Redesigned the Rouh Al-Madinah portal to DGA standards with RTL layouts, component libraries, and production-ready handoff assets." },
  { period: "Feb — Apr 2026", role: "UI/UX Bootcamp Trainee", company: "Tuwaiq Academy · Riyadh", detail: "Built structured design systems in Figma, conducted user research, and applied Design Thinking and Design Sprint methods." },
  { period: "Jun — Aug 2024", role: "Cooperative Training", company: "Taibah Valley · Madinah", detail: "Designed interactive prototypes, applied UX principles, completed Apple Developer Academy training, and helped organize the Waqf Challenge." },
];

const skills = ["Figma", "Design systems", "Wireframing", "Prototyping", "Responsive design", "Accessibility", "User research", "Usability testing", "Design thinking"];

const gameTargets = [
  { id: "clarity", label: "clarity", x: 14, y: 24 },
  { id: "empathy", label: "empathy", x: 73, y: 18 },
  { id: "systems", label: "systems", x: 48, y: 45 },
  { id: "curiosity", label: "curiosity", x: 82, y: 73 },
  { id: "craft", label: "craft", x: 24, y: 76 },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroArabic, setHeroArabic] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("rama-theme") === "dark");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [player, setPlayer] = useState({ x: 50, y: 84 });
  const [collectedTargets, setCollectedTargets] = useState<string[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("rama-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setShowBackToTop(window.scrollY > 560);
      setScrollProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".scroll-reveal").forEach((element) => observer.observe(element));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const movePlayerBy = (dx: number, dy: number) => {
    if (!gameStarted || gameWon) return;
    setPlayer((current) => ({ x: Math.min(94, Math.max(6, current.x + dx)), y: Math.min(90, Math.max(10, current.y + dy)) }));
  };

  useEffect(() => {
    const movePlayer = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const moves: Record<string, { x: number; y: number }> = { arrowleft: { x: -4, y: 0 }, a: { x: -4, y: 0 }, arrowright: { x: 4, y: 0 }, d: { x: 4, y: 0 }, arrowup: { x: 0, y: -4 }, w: { x: 0, y: -4 }, arrowdown: { x: 0, y: 4 }, s: { x: 0, y: 4 } };
      const move = moves[key];
      if (!move || !gameStarted || gameWon) return;
      event.preventDefault();
      movePlayerBy(move.x, move.y);
    };
    window.addEventListener("keydown", movePlayer);
    return () => window.removeEventListener("keydown", movePlayer);
  }, [gameStarted, gameWon]);

  useEffect(() => {
    if (!gameStarted || gameWon) return;
    const hit = gameTargets.find((target) => !collectedTargets.includes(target.id) && Math.abs(target.x - player.x) < 8 && Math.abs(target.y - player.y) < 8);
    if (hit) {
      const next = [...collectedTargets, hit.id];
      setCollectedTargets(next);
      if (next.length === gameTargets.length) setGameWon(true);
    }
  }, [player, collectedTargets, gameStarted, gameWon]);


  const startGame = () => { setGameStarted(true); setGameWon(false); setPlayer({ x: 50, y: 84 }); setCollectedTargets([]); };
  const collectTarget = (id: string) => { if (!gameStarted) startGame(); setCollectedTargets((current) => current.includes(id) ? current : [...current, id]); };
  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/xnpnngqz", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <main className="site-shell">
      <div className="scroll-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Rama Alraddadi home">
          <span className="brand-mark">RA</span>
          <span className="brand-word">Rama Alraddadi</span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? "mobile-nav-open" : ""}`} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <a className="availability" href="mailto:ramraddadi8@gmail.com"><span />Available for select projects</a>
          <button className="theme-toggle" onClick={() => setDarkMode((current) => !current)} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"} title={darkMode ? "Light mode" : "Dark mode"}>{darkMode ? <Sun size={15} /> : <Moon size={15} />}</button>
          <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <section className={`hero ${heroArabic ? "hero-arabic" : ""}`} id="top">
        <div className="hero-copy">
          <div className="eyebrow reveal"><span className="eyebrow-dot" />{heroArabic ? "من السعودية · أصمم تجارب رقمية للجميع" : "Based in Saudi Arabia · Designing everywhere"}</div>
          <h1 className="hero-title reveal reveal-delay-1">{heroArabic ? <>أصمم <em>الوضوح</em><br />للعالم الرقمي<span className="hero-period">.</span></> : <>Designing <em>clarity</em><br />for the digital world<span className="hero-period">.</span></>}</h1>
          <p className="hero-description reveal reveal-delay-2">{heroArabic ? "أنا راما، مصممة UI/UX وخريجة نظم معلومات حاسوبية، أحوّل الأفكار المعقدة إلى تجارب رقمية واضحة وإنسانية وسهلة الاستخدام." : "I’m Rama — a UI/UX designer and Computer Information Systems graduate turning complex ideas into thoughtful, useful, and quietly memorable experiences."}</p>
          <div className="hero-actions reveal reveal-delay-3">
            <button className="button button-primary" onClick={() => scrollToId("work")}>{heroArabic ? "استكشف أعمالي" : "Explore selected work"} <ArrowDownRight size={17} /></button>
            <a className="text-link" href="/assets/Rama-Alraddadi-CV.pdf" target="_blank" rel="noreferrer">{heroArabic ? "عرض السيرة الذاتية" : "View resume"} <ExternalLink size={14} /></a>
          </div>
        </div>
        <div className="hero-orbit" aria-label="Rama's design principles">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="orbit-core"><Sparkles size={20} /><strong>RA</strong><span>UI/UX DESIGNER</span></div>
          <div className="orbit-label orbit-label-top"><i>01</i><span>{heroArabic ? "المستخدم أولاً" : "User first"}</span><small>{heroArabic ? "نفهم قبل أن نصمم" : "Understand before designing"}</small></div>
          <div className="orbit-label orbit-label-right"><i>02</i><span>{heroArabic ? "وضوح أكثر" : "Make it clear"}</span><small>{heroArabic ? "ضوضاء أقل · إشارة أوضح" : "Less noise · more signal"}</small></div>
          <div className="orbit-label orbit-label-bottom"><i>03</i><span>{heroArabic ? "أصمم بعناية" : "Design with care"}</span><small>{heroArabic ? "سهولة الوصول أولاً" : "Accessible by default"}</small></div>
        </div>
        <div className="hero-foot">
          <span>{heroArabic ? "مرر للاستكشاف" : "Scroll to explore"}</span>
          <div className="scroll-line"><span /></div>
          <span>01 / 04</span>
        </div>
      </section>

      <section className="intro-section container-wide scroll-reveal" id="approach">
        <div className="section-kicker">/ 01 — The point of view</div>
        <div className="intro-grid">
          <h2>Good design makes<br /><span>room for people.</span></h2>
          <div className="intro-copy">
            <p>I’m a detail-oriented designer specialized in wireframing, prototyping, responsive design, and design systems. I collaborate with technical teams to create user-focused digital solutions — especially for products that help people move through the world with more confidence.</p>
            <div className="stat-row"><div><strong>2025</strong><span>Bachelor of Computer<br />Information Systems</span></div><div><strong>03</strong><span>hands-on design<br />experiences</span></div><div><strong>09</strong><span>core tools &amp;<br />methods</span></div></div>
          </div>
        </div>
      </section>

      <section className="game-section container-wide scroll-reveal" aria-label="Design Dash mini game">
        <div className="game-header"><div><div className="section-kicker">/ A tiny experiment</div><h2>Play with the <span>process.</span></h2></div><div className="game-score"><span>{collectedTargets.length} / {gameTargets.length} collected</span><strong>{gameWon ? "Nice work ✦" : "Design Dash"}</strong></div></div>
        <div className={`game-board ${gameStarted ? "is-live" : ""}`} tabIndex={0} aria-label="Design Dash game board">
          <div className="game-grid-lines" aria-hidden="true" />
          <div className="game-instructions">{gameWon ? "You found every principle. That’s the whole idea." : gameStarted ? "Use ↑ ↓ ← → or W A S D to move" : "Move the RA orb and collect five design principles"}</div>
          <div className="game-player" style={{ left: `${player.x}%`, top: `${player.y}%` }}><span>RA</span></div>
          {gameTargets.map((target) => <button key={target.id} className={`game-target ${collectedTargets.includes(target.id) ? "is-collected" : ""}`} style={{ left: `${target.x}%`, top: `${target.y}%` }} onClick={() => collectTarget(target.id)} aria-label={`Collect ${target.label}`}><span>{target.label}</span></button>)}
          {!gameStarted || gameWon ? <button className="game-start" onClick={startGame}>{gameWon ? "Play again" : "Start the mini game"}<ArrowUpRight size={17} /></button> : <div className="game-controls" aria-label="Touch controls"><button type="button" onClick={() => movePlayerBy(0, -4)} aria-label="Move up">↑</button><div><button type="button" onClick={() => movePlayerBy(-4, 0)} aria-label="Move left">←</button><button type="button" onClick={() => movePlayerBy(0, 4)} aria-label="Move down">↓</button><button type="button" onClick={() => movePlayerBy(4, 0)} aria-label="Move right">→</button></div></div>}
        </div>
        <p className="game-helper">A small playful corner of the portfolio — no leaderboard, no pressure, just a little curiosity.</p>
      </section>

      <section className="experience-section container-wide scroll-reveal" id="experience">
        <div className="section-heading experience-heading"><div><div className="section-kicker">/ 02 — Experience</div><h2>Where I’ve been<br /><span>putting it to work.</span></h2></div><p className="section-note">From public-sector tourism to rapid product sprints, I design with context and care.</p></div>
        <div className="experience-list">{experience.map((item) => <div className="experience-row" key={item.company}><span className="experience-period">{item.period}</span><div><h3>{item.role}</h3><p className="experience-company">{item.company}</p><p className="experience-detail">{item.detail}</p></div></div>)}</div>
        <div className="skill-strip"><span className="skill-label">Core practice</span><div className="skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
      </section>

      <section className="work-section container-wide scroll-reveal" id="work">
        <div className="section-heading">
          <div><div className="section-kicker">/ 03 — Selected work</div><h2>Some things I’ve<br /><span>helped make.</span></h2></div>
          <p className="section-note">A small edit of product stories, visual systems, and moments of clarity.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <a className={`project-card ${project.accent} scroll-reveal`} href={project.link} target="_blank" rel="noreferrer" key={project.title}>
              <div className="project-image-wrap"><img src={project.image} alt={`${project.title} project visual`} /><span className="project-number">{project.number}</span><span className="project-arrow"><ArrowUpRight size={20} /></span></div>
              <div className="project-meta"><div><h3>{project.title}</h3><p>{project.subtitle}</p></div><span className="project-type">{project.type}</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="explorations-section container-wide scroll-reveal">
        <div className="section-kicker">/ 04 — More explorations</div>
        <div className="exploration-list">
          {explorations.map((item, index) => <a className="exploration-row" href={item.href} target="_blank" rel="noreferrer" key={item.title}><span className="exploration-index">0{index + 1}</span><span className="exploration-title">{item.title}</span><span className="exploration-kind">{item.kind}</span><ArrowUpRight size={18} /></a>)}
        </div>
      </section>

      <footer className="site-footer container-wide scroll-reveal" id="contact">
        <div className="footer-top"><div className="section-kicker">/ Let’s make something useful</div><h2>Have a good idea?<br /><a href="mailto:ramraddadi8@gmail.com">Let’s talk<span>.</span></a></h2></div>
        <div className="contact-form-intro"><span className="form-badge">Contact form</span><p>Have a project in mind? Fill out the form and I’ll get back to you.</p></div>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="name" type="text" placeholder="Rama, your name here" required /></div>
          <div className="form-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="you@example.com" required /></div>
          <div className="form-field form-field-wide"><label htmlFor="message">How can I help?</label><textarea id="message" name="message" rows={4} placeholder="Tell me a little about the project..." required /></div>
          <div className="form-submit-row"><button className="button button-primary" type="submit" disabled={formStatus === "sending"}>{formStatus === "sending" ? "Sending…" : "Send message"}<ArrowUpRight size={17} /></button><span>{formStatus === "success" ? "Your message was received. Thank you — I’ll get back to you soon." : formStatus === "error" ? "Something went wrong. Please try again or email me directly." : "Your message will be sent securely to Rama’s inbox."}</span></div>
          {formStatus === "success" ? <div className="form-success" role="status"><span>✓</span><div><strong>Message received</strong><small>Thanks for reaching out. Your note is safely on its way.</small></div></div> : null}
        </form>
        <div className="footer-bottom"><div className="footer-contact-block"><span className="footer-mini-label">Get in touch</span><a className="footer-email" href="mailto:ramraddadi8@gmail.com"><Mail size={16} />ramraddadi8@gmail.com</a><a className="footer-phone" href="tel:+966561303056">+966 56 130 3056 · Madinah, Saudi Arabia</a></div><div className="footer-middle"><span className="footer-mini-label">Find me online</span><div className="socials"><a href="https://www.linkedin.com/in/rama-alraddadi-386870290" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="https://www.behance.net/ramaraddadi" target="_blank" rel="noreferrer" aria-label="Behance"><span className="behance-icon">Bē</span></a></div></div><div className="footer-meta"><span className="footer-status"><span />Available for select projects</span><span className="copyright">© 2026 Rama Alraddadi<br />Portfolio released in 2026 · Designed with care.</span></div></div>
      </footer>
      <button className={`back-to-top ${showBackToTop ? "is-visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp size={16} /><span>Top</span></button>
    </main>
  );
}
