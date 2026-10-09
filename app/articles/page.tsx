import type { Metadata } from "next";
import { SiteNav } from "../site-nav";

export const metadata: Metadata = {
  title: "Our Missions | 3DP for Good",
  description: "Stories from 3DP for Good's conversations and visits with older adults and care communities.",
};

const missions = [
  {
    href: "/articles/bach-mobile-clinic",
    name: "Bay Area Community Health",
    headline: "Giving away aids at BACH’s mobile clinic",
    summary: "Outside a BACH mobile clinic, our team gave 3D-printed parts to older adults who had come for clinical care.",
    label: "Mobile clinic · Community giveaway",
    visual: "bach",
    image: "/assets/bach-mobile-clinic-02.jpg",
  },
  {
    href: "/articles/aegis-living",
    name: "Aegis Living",
    headline: "Our visit to Aegis Living",
    summary: "Brian Wakefield told us about activities in memory care and the kinds of tools residents could use.",
    label: "Community visit · Interview",
    visual: "aegis",
    image: "/assets/aegis-visit.jpg",
  },
  {
    href: "/articles/masonic-homes",
    name: "Masonic Homes",
    headline: "Our visit to Masonic Homes",
    summary: "We brought button hooks and book page holders to the Union City campus and asked Jennifer Macrae what else we could make.",
    label: "Union City · September 29, 2026",
    visual: "masonic",
    image: "/assets/masonic-visit-01.jpg",
  },
];

export default function ArticlesPage() {
  return (
    <div className="site-shell article-shell">
      <SiteNav view="articles" />
      <main className="missions-page" aria-labelledby="missions-title">
        <p className="article-kicker">Visits and giveaways</p>
        <header className="missions-heading">
          <p className="eyebrow">3DP for Good</p>
          <h1 id="missions-title">Our <em>community visits.</em></h1>
          <p>Read about where we’ve been, the tools we’ve shared, and our conversations with residents and care staff.</p>
        </header>
        <section className="mission-cards" aria-label="Mission stories">
          {missions.map((mission) => (
            <a className="mission-card" href={mission.href} key={mission.href}>
              <div className={`mission-card-visual ${mission.visual}`} aria-hidden="true"><img src={mission.image} alt="" /></div>
              <div className="mission-card-copy">
                <p className="eyebrow">{mission.label}</p>
                <h2>{mission.name}</h2>
                <h3>{mission.headline}</h3>
                <p>{mission.summary}</p>
                <span className="mission-card-link">Read the article <span aria-hidden="true">↗</span></span>
              </div>
            </a>
          ))}
        </section>
      </main>
      <footer className="footer article-footer">
        <div><a className="wordmark footer-wordmark" href="/"><span>3DP FOR GOOD<span className="wordmark-dot">.</span></span></a><p>3D-printed tools for everyday tasks.</p></div>
        <div className="footer-right"><span>© 2026 3DP for Good</span><a href="/">Back to Home ↑</a></div>
      </footer>
    </div>
  );
}
