import { SiteNav } from "../site-nav";
import { StoryContent } from "../articles/mission-article";
import { bachStory } from "../articles/story-data";
import { visitPhotos } from "./visit-photos";
import "./missions.css";

const missions = [
  { id: "masonic-homes", href: "/missions", name: "Masonic Homes", label: "Latest mission", image: "/assets/masonic-visit-01.jpg", detail: "Union City · September 29, 2026" },
  { id: "bach-mobile-clinic", href: "/missions/bach-mobile-clinic", name: "BACH mobile clinic", label: "Community giveaway", image: "/assets/bach-mobile-clinic-02.jpg", detail: "Bay Area Community Health" },
] as const;

type MissionId = typeof missions[number]["id"];

export function MissionPage({ selected }: { selected: MissionId }) {
  return (
    <div className="site-shell article-shell">
      <SiteNav view="missions" />
      <main className="missions-reader" aria-labelledby="article-title">
        <div className="missions-reader-label"><span className="eyebrow">Our missions</span><span>Visits and community drives</span></div>
        <div className="missions-reader-grid">
          <aside className="missions-sidebar" aria-label="Choose a mission">
            <h2>Explore our visits</h2>
            <nav className="missions-selection" aria-label="Mission stories">
              {missions.map((item) => (
                <a key={item.id} href={item.href} className="mission-thumbnail" aria-current={item.id === selected ? "page" : undefined}>
                  <img src={item.image} alt="" />
                  <span className="mission-thumbnail-copy"><span className="mission-thumbnail-label">{item.label}</span><strong>{item.name}</strong><span className="mission-thumbnail-detail">{item.detail}</span><span className="mission-thumbnail-action">{item.id === selected ? "Reading now" : "Read story ↗"}</span></span>
                </a>
              ))}
            </nav>
          </aside>
          <article className="mission-reader-story news-article-page">
            {selected === "masonic-homes" ? <>
              <p className="article-kicker">Masonic Homes of California · Union City Campus</p>
              <header className="article-heading">
                <p className="eyebrow">September 29, 2026 / Community visit</p>
                <h1 id="article-title">Our Visit to Masonic Homes</h1>
              </header>
              <div className="mission-visit-copy">
                <p>On September 29, our team brought 3D-printed button hooks and book page holders to Masonic Homes of California’s Union City campus.</p>
                <p>Residents tried the tools and took some home. The button hooks help guide buttons through buttonholes, and the page holders keep a book open while reading.</p>
                <p>Thank you to the residents and staff who spent time with us. We enjoyed the visit and would love to come back.</p>
              </div>
              <section className="article-gallery" aria-label="Photos from our Masonic Homes visit">
                {visitPhotos.map((photo, index) => <figure key={photo.src}><img src={photo.src} alt={photo.alt} loading={index > 1 ? "lazy" : "eager"} /></figure>)}
              </section>
            </> : <StoryContent {...bachStory} />}
            <a className="back-to-missions" href="/articles">Explore all articles →</a>
          </article>
        </div>
      </main>
      <footer className="footer article-footer">
        <div><a className="wordmark footer-wordmark" href="/"><span>3DP FOR GOOD<span className="wordmark-dot">.</span></span></a><p>3D-printed tools for everyday tasks.</p></div>
        <div className="footer-right"><span>© 2026 3DP for Good</span><a href="/">Back to Home ↑</a></div>
      </footer>
    </div>
  );
}
