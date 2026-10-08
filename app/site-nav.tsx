"use client";

import { useState } from "react";

export type View = "home" | "work" | "classes" | "sponsors" | "team" | "contact";
type NavView = View | "articles" | "missions";

const navItems: Array<{ id: NavView; label: string; href: string }> = [
  { id: "home", label: "Home", href: "/" },
  { id: "work", label: "Our work", href: "/#work" },
  { id: "classes", label: "Classes", href: "/#classes" },
  { id: "sponsors", label: "Sponsors", href: "/#sponsors" },
  { id: "team", label: "About the team", href: "/#team" },
  { id: "missions", label: "Missions", href: "/missions" },
  { id: "articles", label: "Articles", href: "/articles" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export function SiteNav({
  view,
  onNavigate,
  showAnnouncement = false,
}: {
  view: NavView;
  onNavigate?: (next: View) => void;
  showAnnouncement?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={`site-nav${showAnnouncement ? " has-announcement" : ""}`}>
      <a className="wordmark" aria-label="3DP for Good home" href="/"><span>3DP FOR GOOD<span className="wordmark-dot">.</span></span></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((value) => !value)}><span>Menu</span><span className="menu-lines" aria-hidden="true"><i /><i /></span></button>
      <nav id="main-navigation" className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
        {navItems.map((item) => <a key={item.id} href={item.href} className={view === item.id ? "active" : ""} aria-current={view === item.id ? "page" : undefined} onClick={(event) => {
          setMenuOpen(false);
          if (onNavigate && item.id !== "articles" && item.id !== "missions") {
            event.preventDefault();
            onNavigate(item.id);
          }
        }}>{item.label}</a>)}
      </nav>
    </header>
  );
}
