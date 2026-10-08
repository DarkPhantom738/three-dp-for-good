import type { Metadata } from "next";
import { SiteNav } from "../site-nav";

export const metadata: Metadata = {
  title: "September 29, 2026 — Our Visit to Masonic Homes | 3DP for Good",
  description: "Our visit to Masonic Homes of California’s Union City campus, where we shared button hooks and book page holders with residents.",
};

const visitPhotos = [
  { src: "/assets/masonic-visit-01.jpg", alt: "3DP for Good volunteers and a Masonic Homes team member pose with assistive aids." },
  { src: "/assets/masonic-visit-02.jpg", alt: "Four volunteers hold the button hooks and book page holders they brought to Masonic Homes." },
  { src: "/assets/masonic-visit-03.jpg", alt: "A volunteer shows an assistive aid to residents at Masonic Homes." },
  { src: "/assets/masonic-visit-04.jpg", alt: "Volunteers set out assistive aids for residents to try." },
  { src: "/assets/masonic-visit-05.jpg", alt: "A resident holds a black book page holder and a red button hook." },
];

export default function MissionsPage() {
  return (
    <div className="site-shell article-shell">
      <SiteNav view="missions" />
      <main className="article-page" aria-labelledby="article-title">
        <p className="article-kicker">Masonic Homes of California · Union City Campus</p>
        <header className="article-heading">
          <p className="eyebrow">September 29, 2026 / Community visit</p>
          <h1 id="article-title">September 29, 2026 — Our Visit to Masonic Homes</h1>
        </header>
        <article className="article-story">
          <p>On September 29, our team visited Masonic Homes of California’s Union City campus to share practical assistive aids with residents.</p>
          <p>We gave away many 3D-printed button hooks and book page holders. Residents loved trying the tools and seeing how small, thoughtful designs can make everyday tasks easier.</p>
          <p>Thank you to everyone at Masonic Homes for welcoming us. We had a wonderful visit and would love to come back.</p>
        </article>
        <section className="article-gallery" aria-label="Photos from our Masonic Homes visit">
          {visitPhotos.map((photo, index) => <figure key={photo.src}><img src={photo.src} alt={photo.alt} loading={index > 1 ? "lazy" : "eager"} /></figure>)}
        </section>
        <a className="back-to-missions" href="/articles">Explore all articles →</a>
      </main>
      <footer className="footer article-footer">
        <div><a className="wordmark footer-wordmark" href="/"><span>3DP FOR GOOD<span className="wordmark-dot">.</span></span></a><p>Tools for more comfortable,<br />capable, independent care.</p></div>
        <div className="footer-right"><span>© 2026 3DP for Good</span><a href="/">Back to Home ↑</a></div>
      </footer>
    </div>
  );
}
