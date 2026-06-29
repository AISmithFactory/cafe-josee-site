// spine/modules.tsx — OPTIONAL modules (S3.3). Realised set: Map, Hours.
// Self-contained: component + driver + co-located CSS (./modules.css). A site that
// never imports a module bundles neither its JS nor its CSS (no orphaned CSS, S3.3).
// Reference tokens only (via modules.css classes); no colour decision lives here (S2.2).
import * as React from "react";
import "./modules.css";

type LatLng = { lat: number; lng: number };

/**
 * Map — location embed using the FACADE pattern (S3.5): nothing third-party loads
 * until the visitor clicks, so the resting state issues no Google request and sets
 * no Google cookies (EU-clean; no consent gate needed for the default view).
 * Supply either `query` (address/place string) or `coords`.
 */
export function Map(
  { query, coords, zoom = 15, label, caption, cta = "Toon kaart", consented = false }:
  { query?: string; coords?: LatLng; zoom?: number;
    label: string; caption?: React.ReactNode; cta?: string; consented?: boolean }
) {
  // `consented` is the forward seam for a future consent module (S3.5): when maps consent
  // is already granted it can pass consented so the embed loads straight away, skipping the
  // facade click. Default false => facade. No global/storage dependency lives here.
  const [open, setOpen] = React.useState(consented);
  const q = coords ? `${coords.lat},${coords.lng}` : (query ?? "");
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=${zoom}&output=embed`;
  return (
    // data-tone="surface" re-establishes a light-surface ink context (S4): the map is a
    // fixed light card, so its text + the .btn-line CTA must resolve dark-on-light even
    // when the card sits inside a dark-tone band (where inherited --sec-text is light).
    <div className="map" data-tone="surface" data-open={open ? "true" : "false"}>
      {open ? (
        <iframe
          className="map-frame"
          src={src}
          title={label}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="map-facade"
          onClick={() => setOpen(true)}
          aria-label={`${cta}: ${label}`}
        >
          <span className="map-pin" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
            </svg>
          </span>
          <span className="map-meta">
            <span className="map-label">{label}</span>
            {caption ? <span className="map-caption">{caption}</span> : null}
            <span className="btn btn-line map-cta" aria-hidden="true">{cta}</span>
          </span>
        </button>
      )}
    </div>
  );
}

type HoursRow = { label: string; value: string };

/**
 * Hours — structured opening hours. Static by design: no "open now" computation
 * (timezone/locale correctness is a separate, opt-in enhancement). Each row is a
 * day-or-range label and its time value, e.g. { label: "Ma–Vr", value: "12:00–23:00" }.
 */
export function Hours(
  { heading = "Openingsuren", rows, note }:
  { heading?: string; rows: HoursRow[]; note?: React.ReactNode }
) {
  return (
    <div className="hours">
      {heading ? <h3 className="hours-title">{heading}</h3> : null}
      <dl className="hours-list">
        {rows.map((r, i) => (
          <div className="hours-row" key={i}>
            <dt>{r.label}</dt>
            <dd>{r.value}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className="hours-note">{note}</p> : null}
    </div>
  );
}
