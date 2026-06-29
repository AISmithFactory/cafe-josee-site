// spine/primitives.tsx — layout + type + button atoms.  SPINE: never edited per site.
// Reference tokens only (via spine.css classes); no colour decisions live here.
import * as React from "react";

type Tone = "paper" | "alt" | "surface" | "dark" | "slate" | "accent";

export function Wrap({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div className="wrap" style={style}>{children}</div>;
}

/** Section — the alternating-banner unit (S4). `tone` maps to tokens in tokens.css. */
export function Section(
  { tone = "paper", pad, id, className = "", children }:
  { tone?: Tone; pad?: "sm" | "lg"; id?: string; className?: string; children: React.ReactNode }
) {
  const cls = ["section", pad ? `pad-${pad}` : "", className].filter(Boolean).join(" ");
  return <section id={id} data-tone={tone} className={cls}><Wrap>{children}</Wrap></section>;
}

/** Band — full-width CTA (replaces ZG .cta/.steun). Defaults to a dark tone. */
export function Band(
  { tone = "dark", heading, sub, actions, id }:
  { tone?: Tone; heading: React.ReactNode; sub?: React.ReactNode; actions?: React.ReactNode; id?: string }
) {
  return (
    <section id={id} data-tone={tone} className="band">
      <Wrap>
        <div>
          <h2>{heading}</h2>
          {sub && <p>{sub}</p>}
        </div>
        {actions && <div className="actions">{actions}</div>}
      </Wrap>
    </section>
  );
}

export function Display({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <span className={`display ${className}`} style={style}>{children}</span>;
}
// PageTitle — the hero <h1>. Size comes from a bounded spine scale (hero|xl|lg), not an
// inline font-size, so a composition never hand-rolls type (S3.2). One h1 per page (S7).
export function PageTitle({ size = "xl", children }: { size?: "hero" | "xl" | "lg"; children: React.ReactNode }) {
  return <h1 className={`display page-title s-${size}`}>{children}</h1>;
}
export function SecTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="sec-title">{children}</h2>;
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="lead">{children}</p>;
}
export function Em({ children }: { children: React.ReactNode }) {
  return <span className="em">{children}</span>;
}

type BtnVariant = "action" | "line" | "ghost";
export function Btn(
  { variant = "action", href, children, onClick }:
  { variant?: BtnVariant; href?: string; children: React.ReactNode; onClick?: () => void }
) {
  const cls = variant === "ghost" ? "btn-ghost" : `btn btn-${variant}`;
  if (href) return <a className={cls} href={href}>{children}</a>;
  return <button className={cls} onClick={onClick}>{children}</button>;
}
