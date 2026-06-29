// spine/chrome.tsx — SiteHeader, SiteFooter, SkipLink.  SPINE: never edited per site.
// Content comes from site.config.ts; active nav state comes from the current path.
import * as React from "react";

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };
export type FooterColumn = { title: string; links: { label: string; href: string }[] };
export type Social = { label: string; href: string; icon: React.ReactNode };

export function SkipLink() {
  return <a className="skip" href="#main">Skip to content</a>;
}

function useScrolled() {
  const [s, setS] = React.useState(false);
  React.useEffect(() => {
    const on = () => setS(window.scrollY > 14);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return s;
}

export function SiteHeader(
  { logo, nav, cta, memberLink, currentPath = "/" }:
  { logo: React.ReactNode; nav: NavItem[]; cta?: React.ReactNode; memberLink?: { label: string; href: string }; currentPath?: string }
) {
  const scrolled = useScrolled();
  const [open, setOpen] = React.useState(false);
  const isOn = (href: string) => {
    const norm = (p: string) => p.replace(/\/+$/, "") || "/";
    return norm(href) === norm(currentPath);
  };
  return (
    <header className={`header${scrolled ? " scrolled" : ""}${open ? " nav-open" : ""}`}>
      <div className="header-in">
        <a className="logo" href="/">{logo}</a>
        <nav className="nav">
          {nav.map((item) =>
            item.children ? (
              <div className="navitem" key={item.href}>
                <a href={item.href} className={isOn(item.href) ? "on" : ""} aria-haspopup="true">{item.label} ▾</a>
                <div className="submenu">
                  {item.children.map((c) => <a key={c.href} href={c.href}>{c.label}</a>)}
                </div>
              </div>
            ) : (
              <a key={item.href} href={item.href} className={isOn(item.href) ? "on" : ""}>{item.label}</a>
            )
          )}
        </nav>
        <div className="header-cta">
          {memberLink && <a className="member-link" href={memberLink.href}>{memberLink.label} &rarr;</a>}
          {cta}
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>≡</button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter(
  { logo, tagline, address, columns, newsletter, legal, socials, legalLinks }:
  { logo: React.ReactNode; tagline?: string; address?: React.ReactNode;
    columns: FooterColumn[]; newsletter?: React.ReactNode; legal: React.ReactNode; socials?: Social[];
    legalLinks?: { label: string; href: string }[] }
) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="logo">{logo}</div>
            {tagline && <p className="tagline">{tagline}</p>}
            {address && <p className="ft">{address}</p>}
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((l) => <a className="fl" key={l.href} href={l.href}>{l.label}</a>)}
            </div>
          ))}
          {newsletter && <div>{newsletter}</div>}
        </div>
        <div className="footer-bottom">
          <span className="legal-strip">
            {legal}
            {legalLinks && legalLinks.map((l) => (
              <a key={l.href} className="legal-link" href={l.href}>{l.label}</a>
            ))}
          </span>
          {socials && (
            <span className="socials">
              {socials.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener" aria-label={s.label}>{s.icon}</a>)}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
