import type { Metadata } from "next";
import { SiteNav } from "../site-nav";

export const metadata: Metadata = {
  title: "Our Missions | 3DP for Good",
  description: "Stories from 3DP for Good's conversations and visits with older adults and care communities.",
};

const missions = [
  {
    href: "/articles/aegis-living",
    name: "Aegis Living",
    headline: "Designing with memory care in mind",
    summary: "A conversation with Brian Wakefield explored safe, engaging activities and everyday tools that can support older adults living with dementia.",
    label: "Listening visit · Design insights",
    visual: "aegis",
  },
  {
    href: "/articles/masonic-homes",
    name: "Masonic Homes",
    headline: "Small aids, more comfortable routines",
    summary: "At Masonic Homes’ Union City campus, we shared button hooks and book page holders—and listened to residents and staff about where thoughtful design can help.",
    label: "Union City · September 29, 2026",
    visual: "masonic",
  },
];

export default function ArticlesPage() {
  return (
    <div className="site-shell article-shell">
      <SiteNav view="articles" />
      <main className="missions-page" aria-labelledby="missions-title">
        <p className="article-kicker">Field notes / People-first design</p>
        <header className="missions-heading">
          <p className="eyebrow">Listen · Learn · Make</p>
          <h1 id="missions-title">Missions <em>in the community.</em></h1>
          <p>Every visit starts by listening. These stories share what older adults and care teams told us, what we learned, and how we’re exploring practical aids that support comfort and independence.</p>
        </header>
        <section className="mission-cards" aria-label="Mission stories">
          {missions.map((mission) => (
            <a className="mission-card" href={mission.href} key={mission.href}>
              <div className={`mission-card-visual ${mission.visual}`} aria-hidden="true">
                {mission.visual === "masonic" ? <img src="/assets/masonic-visit-01.jpg" alt="" /> : <><span className="mission-visual-index">01 / LISTENING SESSION</span><strong>Design starts<br />with a conversation.</strong><span className="mission-visual-mark">A</span></>}
              </div>
              <div className="mission-card-copy">
                <p className="eyebrow">{mission.label}</p>
                <h2>{mission.name}</h2>
                <h3>{mission.headline}</h3>
                <p>{mission.summary}</p>
                <span className="mission-card-link">Read the mission <span aria-hidden="true">↗</span></span>
              </div>
            </a>
          ))}
        </section>
      </main>
      <footer className="footer article-footer">
        <div><a className="wordmark footer-wordmark" href="/"><span>3DP FOR GOOD<span className="wordmark-dot">.</span></span></a><p>Tools for more comfortable,<br />capable, independent care.</p></div>
        <div className="footer-right"><span>© 2026 3DP for Good</span><a href="/">Back to Home ↑</a></div>
      </footer>
    </div>
  );
}
