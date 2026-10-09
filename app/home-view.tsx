"use client";
import { PrintHeadline } from "./print-headline";
import type { View } from "./site-nav";
import "./home-view.css";
const Arrow = () => <span aria-hidden="true">↗</span>;
export function HomeView({ onNavigate }: { onNavigate: (next: View) => void }) {
  return (
    <section className="tab-page home-page has-announcement home-collage-page" aria-labelledby="home-title">
      <div className="hc-topline"><span>01 / 3DP for Good</span><span>Bay Area, California</span></div>
      <div className="hc-hero">
        <div className="hc-headline"><PrintHeadline /></div>
        <div className="hc-intro">
          <p className="hc-kicker">Tools and classes for our community</p>
          <p className="hc-lede">We make and donate everyday assistive tools, and teach people how to design and 3D-print their own.</p>
          <p className="hc-purpose">Our goal is to make everyday assistive tools easier to get, and give more people the skills to make them.</p>
          <div className="hc-actions"><button className="hc-action hc-action-primary" type="button" onClick={() => onNavigate("work")}>Explore our tools <Arrow /></button><button className="hc-action hc-action-text" type="button" onClick={() => onNavigate("classes")}>Learn with us <Arrow /></button></div>
        </div>
      </div>
      <div className="hc-section-label"><span>Our work in the Bay Area</span><span>Our impact so far ↓</span></div>
      <div className="hc-collage">
        <figure className="hc-masonic"><img src="/assets/masonic-visit-03.jpg" alt="Our team demonstrating printed assistive tools with residents at Masonic Homes" width="2048" height="1536" /><figcaption><span className="hc-drive-stat"><strong>3</strong><span>community<br />drives</span></span><a href="/missions/masonic-homes">At Masonic Homes <Arrow /></a></figcaption></figure>
        <div className="hc-making"><div className="hc-objects"><strong>100<span>+</span></strong><span>objects printed</span></div><p>Practical help for getting dressed, holding a book, and everyday movement.</p><div className="hc-designs"><strong>4<span>+</span></strong><span>designs<br />and counting</span><button type="button" onClick={() => onNavigate("work")} aria-label="Explore our designs"><Arrow /></button></div></div>
        <figure className="hc-workshop"><img src="/assets/class-workshop-01.jpg" alt="Students learning CAD at laptops during our 3D printing workshop" width="1024" height="768" loading="lazy" /><figcaption>Learning CAD together.</figcaption></figure>
        <div className="hc-teaching"><strong>60<span>+</span></strong><span className="hc-stat-label">hours taught</span><p>CAD and 3D printing, learned by doing.</p><button className="hc-inline-link" type="button" onClick={() => onNavigate("classes")}>Our classes <Arrow /></button></div>
        <div className="hc-missions"><span className="hc-kicker">Recent missions</span><p>Visits and donation drives.</p><div className="hc-mission-links"><a href="/missions/masonic-homes">Masonic Homes <Arrow /></a><a href="/missions/bach-mobile-clinic">BACH Mobile Clinic <Arrow /></a></div></div>
      </div>
      <div className="hc-partners">
        <div className="hc-partner-count"><strong>2</strong><span>community<br /> partners</span></div>
        <button className="hc-partner hc-partner-bach" type="button" onClick={() => onNavigate("sponsors")}><img src="/assets/bach-logo.png" alt="Bay Area Community Health" width="160" height="64" loading="lazy" /><span>Official partner + sponsor</span></button>
        <button className="hc-partner hc-partner-ohlone" type="button" onClick={() => onNavigate("sponsors")}><img src="/assets/ohlone-cad-club.png" alt="Ohlone CAD Club" width="72" height="72" loading="lazy" /><span>Ohlone CAD Club<small>Education partner</small></span></button>
        <button className="hc-inline-link hc-join" type="button" onClick={() => onNavigate("contact")}>Make with us <Arrow /></button>
      </div>
      <div className="hc-footnote"><span>3DP for Good · Bay Area, California</span><span>501(c)(3) pending organization</span></div>
    </section>
  );
}
