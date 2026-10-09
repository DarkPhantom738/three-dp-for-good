import type { Metadata } from "next";
import { SiteNav } from "../site-nav";

export const metadata: Metadata = {
  title: "Our Visit to Masonic Homes | 3DP for Good",
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
          <h1 id="article-title">Our Visit to Masonic Homes</h1>
        </header>
        <article className="article-story">
          <p>On September 29, our team brought 3D-printed button hooks and book page holders to Masonic Homes of California’s Union City campus.</p>
          <p>Residents tried the tools and took some home. The button hooks help guide buttons through buttonholes, and the page holders keep a book open while reading.</p>
          <p>Thank you to the residents and staff who spent time with us. We enjoyed the visit and would love to come back.</p>
        </article>
        <section className="article-gallery" aria-label="Photos from our Masonic Homes visit">
          {visitPhotos.map((photo, index) => <figure key={photo.src}><img src={photo.src} alt={photo.alt} loading={index > 1 ? "lazy" : "eager"} /></figure>)}
        </section>
        <a className="back-to-missions" href="/articles">Explore all articles →</a>
      </main>
      <footer className="footer article-footer">
        <div><a className="wordmark footer-wordmark" href="/"><span>3DP FOR GOOD<span className="wordmark-dot">.</span></span></a><p>3D-printed tools for everyday tasks.</p></div>
        <div className="footer-right"><span>© 2026 3DP for Good</span><a href="/">Back to Home ↑</a></div>
      </footer>
    </div>
  );
}
