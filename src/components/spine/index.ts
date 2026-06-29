// spine/index.ts — barrel for the spine component library.
// Optional modules (Marquee, ZigZag, Lightbox, Gallery, AudioCard, VideoFacade,
// ScoreGrid, StepGrid, Timeline, Team, Map/Hours, Reveal) live in ./modules and are
// switched on per the site charter (S3.3). Each ships COMPLETE — its driver AND its
// co-located CSS travel together, so a site that doesn't enable it bundles neither the
// JS nor orphaned CSS. Realised so far: Map, Hours (./modules). Reveal = scroll-reveal;
// ships WITH its IntersectionObserver driver + a reduced-motion guard.
// AI Smith ships none of them — it is a content-light marketing site.
export * from "./primitives";
export * from "./cards";
export * from "./chrome";
export * from "./forms";
export * from "./modules";   // optional modules, tree-shaken unless referenced
export * from "./legal";    // CORE: PrivacyNotice (S7.4)
