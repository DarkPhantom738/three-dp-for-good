"use client";

import { useEffect, useState } from "react";
import { ModelViewer } from "./model-viewer";
import { SiteNav, type View } from "./site-nav";

const galleryImages = [
  { src: "/assets/class-workshop-01.jpg", alt: "Students learning CAD together during a 3DP for Good workshop" },
  { src: "/assets/class-workshop-02.jpg", alt: "" },
  { src: "/assets/class-workshop-03.jpg", alt: "" },
  { src: "/assets/class-workshop-05.jpg", alt: "" },
  { src: "/assets/class-workshop-06.jpg", alt: "" },
  { src: "/assets/class-workshop-07.jpg", alt: "" },
];

function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <button className={`wordmark${footer ? " footer-wordmark" : ""}`} type="button">
      <span>3DP FOR GOOD<span className="wordmark-dot">.</span></span>
    </button>
  );
}

function PageLabel({ number, title, aside }: { number: string; title: string; aside?: string }) {
  return <div className="page-label">{number} / {title} {aside ? <span>{aside}</span> : null}</div>;
}

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>;
}

function HomeView({ onNavigate }: { onNavigate: (next: View) => void }) {
  return (
    <section className="tab-page home-page has-announcement" aria-labelledby="home-title">
      <PageLabel number="01" title="Home" aside="Patient-centered making" />
      <div className="home-layout">
        <div className="home-copy">
          <h1 id="home-title">Make<br /><em>more</em><br />possible.</h1>
          <p className="home-lede">We design, 3D-print, and donate practical tools that make care more comfortable, accessible, and independent. 3DP for Good is a 501(c)(3) pending organization.</p>
          <div className="home-bach-feature"><img src="/assets/bach-logo.png" alt="Bay Area Community Health, official partner and sponsor" /><span>Official partner + sponsor</span></div>
          <button className="text-link" type="button" onClick={() => onNavigate("work")}>See our current work <Arrow /></button>
        </div>
        <div className="home-visual">
          <div className="home-video-frame"><video autoPlay muted loop playsInline aria-label="A 3D printer making an assistive tool"><source src="/assets/printer-loop.mp4" type="video/mp4" /></video><span className="frame-corner">↘</span></div>
        </div>
      </div>
      <div className="impact-heading"><span>Impact so far</span><span>Made · shared · taught</span></div>
      <div className="printer-stats" aria-label="3DP for Good impact statistics">
        <div className="printed-stat"><strong>100<span>+</span></strong><span>objects printed</span></div>
        <div className="printed-stat"><strong>3</strong><span>community drives</span></div>
        <div className="printed-stat"><strong>60<span>+</span></strong><span>hours taught</span></div>
        <div className="printed-stat"><strong>4<span>+</span></strong><span>designs</span></div>
        <div className="printed-stat"><strong>2</strong><span>partners</span></div>
      </div>
      <div className="home-bottom"><span>Bay Area, California</span><span>501(c)(3) pending organization</span></div>
    </section>
  );
}

type WorkModel = {
  name: string;
  category: string;
  description: string;
  file?: string;
  parts?: string[];
  assembly?: { file: string; travel: number; twistRadians: number };
  research?: boolean;
  download: string;
  downloadLabel: string;
  note?: string;
  credit?: { creator: string; url: string; license: string; licenseUrl: string };
};

const workModels: WorkModel[] = [
  {
    name: "Button hook + zipper pull",
    category: "Dressing",
    description: "A larger handle makes it easier to guide a button through its buttonhole or pull a zipper without pinching a small tab.",
    file: "button-hook-zipper-pull.stl",
    download: "/assets/button-hook-zipper-pull.stl",
    downloadLabel: "Download STL",
  },
  {
    name: "Book page holder",
    category: "Reading",
    description: "Keeps a book open without having to hold the pages apart with your fingers. It gives your hand a break while you read.",
    file: "book-page-holder.stl",
    download: "/assets/book-page-holder.stl",
    downloadLabel: "Download STL",
  },
  {
    name: "Motion sphere",
    category: "Hand movement + fidget",
    description: "Pull the linked rings apart, then press them back together. The repeated opening and closing gives your hands and fingers a simple movement to practise and doubles as a fidget activity.",
    file: "motion-sphere-preview.stl",
    parts: ["10gon_a", "10gon_b", "10gon_c", "12gon_a", "12gon_b", "12gon_c", "12gon_l", "12gon_r", "5gon_a", "5gon_b", "5gon_l", "5gon_r", "6gon_a", "6gon_b", "8gon_a", "8gon_b", "8gon_l", "8gon_r", "hub_120", "hub_60", "hub_90", "lock"],
    download: "/assets/motion-sphere-models.zip",
    downloadLabel: "Download model set",
    note: "Preview the 22 assembly parts or choose one to inspect. The download includes all parts and the assembly guide.",
    credit: { creator: "kame", url: "https://www.printables.com/model/956821-expanding-rings-spheres", license: "CC BY-NC 4.0", licenseUrl: "https://creativecommons.org/licenses/by-nc/4.0/" },
  },
  {
    name: "Extending reacher",
    category: "Reaching",
    description: "Squeezing the handles extends the scissor linkage and closes the jaws. We’re exploring this mechanism for picking up objects that are hard to reach.",
    file: "extending-reacher-preview.stl",
    download: "/assets/extending-reacher-models.zip",
    downloadLabel: "Download CAD + STL",
    note: "The scissor section extends from about 13.5 to 21.3 cm. Includes editable OpenSCAD, STL parts, and assembly instructions.",
    credit: { creator: "Miloslav Brožek", url: "https://www.printables.com/model/1782336-lazy-tongs-snapping-dragon-extending-scissor-grabb", license: "CC BY-NC 4.0", licenseUrl: "https://creativecommons.org/licenses/by-nc/4.0/" },
  },
  {
    name: "Sock guide",
    category: "Dressing",
    description: "Holds a sock open so you can slide your foot in while seated. A separate handle pole lets you position the guide without reaching all the way down. The tabs also help pull a sock off.",
    file: "sock-guide-preview.stl",
    download: "/assets/sock-guide.stl",
    downloadLabel: "Download STL",
    note: "Add a 20 mm pole, about 60 cm long, and a screw to secure it.",
    credit: { creator: "ScottyMakesStuff", url: "https://www.thingiverse.com/thing:2482788", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/" },
  },
  {
    name: "Twist Cone",
    category: "Tactile play + movement",
    description: "Hold the inner cone and move the outer piece up and down. The spiral guides it through a turn as it slides, giving your fingers and wrist a small, repeatable movement. It’s a hands-on fidget for students who enjoy tactile play.",
    file: "twist-cone-core-preview.stl",
    assembly: { file: "twist-cone-shell-preview.stl", travel: 16, twistRadians: Math.PI / 2 },
    download: "/assets/twist-cone-models.zip",
    downloadLabel: "Download both STLs",
    note: "Try the movement in the preview, then switch to Rotate view to look around the assembled parts.",
    research: true,
  },
];

function WorkModelPreview({ model }: { model: WorkModel }) {
  const [part, setPart] = useState("");
  const file = part ? `motion-sphere-parts/${part}.stl` : model.file!;
  return <>
    <ModelViewer key={file} file={file} assembly={model.assembly} label={`${model.name}${part ? `, ${part}` : ""} interactive 3D preview`} badge={model.parts && !part ? "STL assembly parts" : "STL preview"} />
    {model.parts && <select className="model-part-select" aria-label="Motion sphere part to preview" value={part} onChange={(event) => setPart(event.target.value)}><option value="">All 22 parts</option>{model.parts.map((name) => <option key={name} value={name}>{name.replaceAll("_", " ")}</option>)}</select>}
  </>;
}

function WorkView({ onNavigate }: { onNavigate: (next: View) => void }) {
  return (
    <section className="tab-page work-page" aria-labelledby="work-title">
      <PageLabel number="02" title="Our work" aside="Six tools and models" />
      <div className="work-heading"><div><p className="eyebrow">Dressing · reading · movement · reaching</p><h2 id="work-title">Everyday <em>tools.</em></h2><div className="work-intro"><p>We work with Dr. Ramchandani at BACH and with patients to understand everyday needs. Here are the tools we’re making and exploring, including community designs for future projects. Download the files or take a closer look at each model below.</p><button className="button button-blue" type="button" onClick={() => onNavigate("contact")}>Talk about a need <Arrow /></button></div></div></div>
      <div className="design-grid">
        {workModels.map((model, index) => (
          <article className="design-card design-blue" key={model.name} aria-labelledby={`model-title-${index}`}>
            <div className="design-card-head"><span>{String(index + 1).padStart(2, "0")} / {model.category}</span></div>
            <div className="design-visual">
              <WorkModelPreview model={model} />
            </div>
            <a className="design-download" href={model.download} download aria-label={`${model.downloadLabel}: ${model.name}`}>{model.downloadLabel} <Arrow /></a>
            <div className="design-card-copy">
              <div><h3 id={`model-title-${index}`}>{model.name}</h3><p>{model.description}</p>{model.note && <p className="design-note">{model.note}</p>}</div>
              {model.research && <details className="design-research"><summary>What the research says</summary><p>Classroom fidget studies have found mixed results. A small study of three students with ADHD found more time on task, while a larger study found poorer attention with fidget spinners. Neither tested this design or wrist development. Students’ preferences and responses vary.</p><div><a href="https://pubmed.ncbi.nlm.nih.gov/35692528/" target="_blank" rel="noreferrer">Aspiranti &amp; Hulac study <Arrow /></a><a href="https://pubmed.ncbi.nlm.nih.gov/29676193/" target="_blank" rel="noreferrer">Graziano and colleagues study <Arrow /></a></div></details>}
              {model.credit && <p className="design-credit">Design by <a href={model.credit.url} target="_blank" rel="noreferrer">{model.credit.creator}</a><br /><a href={model.credit.licenseUrl} target="_blank" rel="noreferrer">{model.credit.license}</a> · <a href={model.credit.url} target="_blank" rel="noreferrer">Original model <Arrow /></a></p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ClassesView() {
  const [activeImage, setActiveImage] = useState(0);
  const move = (direction: number) => setActiveImage((index) => (index + direction + galleryImages.length) % galleryImages.length);
  return (
    <section className="tab-page classes-page" aria-labelledby="classes-title">
      <PageLabel number="03" title="Classes" aside="Learn by making" />
      <div className="classes-heading"><h2 id="classes-title">Classes<span>.</span></h2><p>Our workshops turn ideas into practical skills. Students learn CAD, understand the fundamentals of 3D printing, and leave ready to design useful objects with purpose.</p></div>
      <div className="classes-feature"><div className="classes-feature-copy"><p className="classes-status-season">Summer 2026</p><h3>Partnership with Ohlone CAD Club</h3><p>A hands-on workshop in CAD, prototyping, and the fundamentals behind a successful 3D print.</p></div><div className="class-gallery" aria-label="Photos from our summer 2026 CAD workshop" aria-live="off"><div className="class-gallery-stage">{galleryImages.map((image, index) => <figure key={image.src} className={index === activeImage ? "is-active" : ""} aria-hidden={index !== activeImage}><img alt={image.alt} src={image.src} /></figure>)}</div><div className="class-gallery-controls"><div className="class-gallery-progress" aria-hidden="true">{galleryImages.map((image, index) => <i key={image.src} className={index === activeImage ? "is-active" : ""} />)}</div><div><button type="button" aria-label="Previous class photo" onClick={() => move(-1)}>←</button><button type="button" aria-label="Next class photo" onClick={() => move(1)}>→</button></div></div></div></div>
    </section>
  );
}

function SponsorsView({ onNavigate }: { onNavigate: (next: View) => void }) {
  return (
    <section className="tab-page sponsors-page" aria-labelledby="sponsors-title">
      <PageLabel number="04" title="Sponsors" aside="Care in the community" />
      <div className="sponsors-heading"><p className="eyebrow">The organizations behind the work</p><h2 id="sponsors-title">Our partners<span>.</span></h2><p>Support from healthcare and education partners helps us listen closely, teach effectively, and place useful tools where they matter.</p></div>
      <div className="sponsor-grid"><article className="sponsor-card sponsor-bach"><p className="eyebrow">Sponsor + healthcare partner</p><div className="sponsor-logo"><img alt="Bay Area Community Health" src="/assets/bach-logo.png" /></div><div><h3>Bay Area Community Health</h3><p>BACH helps coordinate and distribute our work while connecting us with patient needs. Dr. Ramchandani and patients help guide each design.</p></div></article><article className="sponsor-card sponsor-cad"><p className="eyebrow">Education partner</p><div className="sponsor-logo"><img alt="Ohlone CAD Club" src="/assets/ohlone-cad-club.png" /></div><div><h3>Ohlone CAD Club</h3><p>Together, we introduced students to CAD, prototyping, and the fundamentals of 3D printing through a hands-on summer workshop.</p></div></article><aside className="sponsor-callout" aria-label="Become a sponsor"><img className="question-mark-art" alt="" aria-hidden="true" src="/assets/sponsor-question-mark.png" /><div><p className="eyebrow">Your organization next?</p><h3>Help useful ideas reach more people.</h3></div><button className="button button-blue" type="button" onClick={() => onNavigate("contact")}>Contact us <Arrow /></button></aside></div>
    </section>
  );
}

function TeamView() {
  return (
    <section className="tab-page team-page" aria-labelledby="team-title">
      <PageLabel number="05" title="About the team" aside="The people behind the work" />
      <div className="team-heading"><p className="eyebrow">Meet the team</p><h2 id="team-title">Founders</h2></div>
      <div className="founder-grid"><article className="founder-card"><div className="founder-photo"><img alt="Kaavin Prasanna" src="/assets/kaavin-prasanna.png" /></div><p>01 / Founder</p><h3>Kaavin Prasanna</h3></article><article className="founder-card"><div className="founder-photo"><img alt="Aniket Mangalampalli" src="/assets/aniket-mangalampalli.png" /></div><p>02 / Founder</p><h3>Aniket Mangalampalli</h3></article><article className="founder-card"><div className="founder-photo"><img alt="Shaan Ramchandani" src="/assets/shaan-ramchandani.png" /></div><p>03 / Founder</p><h3>Shaan Ramchandani</h3></article><article className="founder-card"><div className="founder-photo"><img alt="Abheer Krishnanand" src="/assets/abheer-krishnanand.jpg" /></div><p>04 / Founder</p><h3>Abheer Krishnanand</h3></article><article className="founder-card"><div className="founder-photo"><img alt="Aryan Bachu" src="/assets/aryan-founder.jpg" /></div><p>05 / Founder</p><h3>Aryan Bachu</h3></article></div>
      <section className="advisor-section" aria-labelledby="advisor-title"><p className="eyebrow">Guiding the work</p><h2 id="advisor-title">Advisor</h2><div className="advisor-profile"><div className="founder-photo advisor-photo"><img alt="Dr. Ramchandani" src="/assets/dr-ramchandani.png" /></div><div><span>Advisor</span><h3>Dr. Ramchandani</h3></div></div></section>
    </section>
  );
}

function ContactView() {
  const topics = ["General contact", "Sponsorship", "Start a chapter", "Teach a class"];
  const [topic, setTopic] = useState("General contact");
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="contact-page" aria-labelledby="contact-title">
      <div className="contact-hero"><p className="page-label">06 / Contact</p><h2 id="contact-title">Want to get<br /><em>in touch?</em></h2><p>Have a need, an idea, a printer, a group that wants to learn, or a community where you want to start a chapter? Choose the conversation that fits and tell us what would help.</p></div>
      <div className="contact-content"><div className="contact-choice"><p className="eyebrow">Choose a way in</p><div className="contact-buttons">{topics.map((item) => <button key={item} type="button" className={topic === item ? "selected" : ""} onClick={() => setTopic(item)}>{item}</button>)}</div><div className="contact-email"><span>Prefer email?</span><a href="mailto:3dprintforgood@gmail.com">3dprintforgood@gmail.com <span aria-hidden="true" className="arrow">↗</span></a></div></div>
        {submitted ? <div className="contact-form form-success"><span className="success-mark">✓</span><h3>Thanks for reaching out.</h3><p>We’ll get back to you soon about making more possible.</p><button className="submit-button" type="button" onClick={() => setSubmitted(false)}>Send another message <Arrow /></button></div> : <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label><span>Name</span><input required placeholder="First and last name" name="name" /></label><label><span>Email</span><input required placeholder="you@example.com" type="email" name="email" /></label><label><span>I’m reaching out about</span><select name="topic" value={topic} onChange={(event) => setTopic(event.target.value)}><option>General contact</option><option>Sponsorship</option><option>Starting a chapter</option><option>Teach a class</option><option>A current design</option></select></label><label><span>Message</span><textarea required name="message" rows={5} placeholder="What would you like to make possible?" /></label><button className="submit-button" type="submit">Send message <Arrow /></button></form>}
      </div>
      <footer className="footer"><div><Wordmark footer /><p>Tools for more comfortable,<br />capable, independent care.</p></div><div className="footer-right"><span>© 2026 3DP for Good</span><span>Designed with patients. Distributed with BACH.</span><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to Home ↑</button></div></footer>
    </section>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  useEffect(() => {
    const syncView = () => {
      const candidate = window.location.hash.slice(1);
      if (["home", "work", "classes", "sponsors", "team", "contact"].includes(candidate)) setView(candidate as View);
    };
    syncView();
    window.addEventListener("popstate", syncView);
    return () => window.removeEventListener("popstate", syncView);
  }, []);
  const navigate = (next: View) => {
    window.history.pushState(null, "", next === "home" ? "/" : `/#${next}`);
    setView(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  return <main className="site-shell">{view === "home" && <a className="home-announcement" href="/missions" aria-label="Masonic Homes mission. September 29, 2026. 40 plus aids given. Read the story."><span className="announcement-copy"><span className="announcement-title">A Masonic Homes mission</span><span className="announcement-facts" aria-hidden="true"><span className="announcement-fact-date">September 29, 2026</span><span className="announcement-fact-count">40+ aids given</span></span></span><span className="announcement-action"><span className="announcement-action-label">Read the story</span><Arrow /><img className="announcement-photo" src="/assets/masonic-banner.png" alt="" /></span></a>}<SiteNav view={view} onNavigate={navigate} showAnnouncement={view === "home"} />{view === "home" && <HomeView onNavigate={navigate} />}{view === "work" && <WorkView onNavigate={navigate} />}{view === "classes" && <ClassesView />}{view === "sponsors" && <SponsorsView onNavigate={navigate} />}{view === "team" && <TeamView />}{view === "contact" && <ContactView />}</main>;
}
