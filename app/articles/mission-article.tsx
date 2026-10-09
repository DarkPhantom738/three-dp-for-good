import { SiteNav } from "../site-nav";

type MissionArticleProps = {
  organization: string;
  title: string;
  date: string;
  byline: string;
  introduction: string;
  photos?: Array<{ src: string; alt: string; caption: string }>;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    quotes?: Array<{ text: string; attribution: string }>;
    audio?: { src: string; label: string; description: string };
  }>;
};

export function MissionArticle({ organization, title, date, byline, introduction, photos, sections }: MissionArticleProps) {
  return (
    <div className="site-shell article-shell">
      <SiteNav view="articles" />
      <main className="article-page mission-article-page news-article-page" aria-labelledby="article-title">
        <p className="article-kicker">{organization} · Mission story</p>
        <header className="article-heading">
          <p className="eyebrow">{date}</p>
          <h1 id="article-title">{title}</h1>
        </header>
        <p className="article-byline">By 3DP for Good <span aria-hidden="true">·</span> {byline}</p>
        <p className="mission-article-intro article-dek">{introduction}</p>
        {photos && <div className={`mission-article-photos${photos.length > 1 ? " is-gallery" : ""}`}>
          {photos.map((photo) => <figure key={photo.src}>
            <img src={photo.src} alt={photo.alt} />
            <figcaption>{photo.caption}</figcaption>
          </figure>)}
        </div>}
        <div className="mission-article-sections">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.quotes?.map((quote) => <blockquote className="article-quote" key={quote.text}><p>“{quote.text}”</p><cite>— {quote.attribution}</cite></blockquote>)}
              {section.audio && <figure className="interview-clip">
                <figcaption><span>From the interview</span><strong>{section.audio.label}</strong><small>{section.audio.description}</small></figcaption>
                <audio controls preload="none" aria-label={section.audio.label}>
                  <source src={section.audio.src} type="audio/mp4" />
                  <track kind="captions" src={section.audio.src.replace(/\.m4a$/, ".vtt")} srcLang="en" label="English" default />
                  Your browser does not support audio playback.
                </audio>
              </figure>}
            </section>
          ))}
        </div>
        <a className="back-to-missions" href="/articles">← All mission stories</a>
      </main>
      <footer className="footer article-footer">
        <div><a className="wordmark footer-wordmark" href="/"><span>3DP FOR GOOD<span className="wordmark-dot">.</span></span></a><p>Tools for more comfortable,<br />capable, independent care.</p></div>
        <div className="footer-right"><span>© 2026 3DP for Good</span><a href="/">Back to Home ↑</a></div>
      </footer>
    </div>
  );
}
