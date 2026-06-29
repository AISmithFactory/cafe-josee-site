// pages/home.tsx — PER-SITE COMPOSITION.  Built entirely from spine components.
// No bespoke structural CSS (S3.2): tone rhythm + cards + band only.
// Copy from the AI Smith positioning canon; ownership is one confident touch + link.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, MediaCard } from "../components/spine";

export function Home() {
  return (
    <main id="main">
      {/* HERO — paper. Frame + promise; master fill is vertical-neutral (S: AS rule). */}
      <Section tone="paper" pad="lg">
        <Eyebrow>The work, already done.</Eyebrow>
        <PageTitle size="hero">
          Software that already speaks <Em>your organisation</Em>.
        </PageTitle>
        <Lead>
          Made to fit. Yours to keep. We don't hand you another tool to learn and run. We hand you
          the thing already running, built for how your kind of organisation works, and <Em>it learns
          yours as you go.</Em>
        </Lead>
        <div className="actions" style={{ marginTop: 26 }}>
          <Btn href="/restaurants">See it for your work</Btn>
          <Btn variant="line" href="/ownership">How it stays yours</Btn>
        </div>
      </Section>

      {/* WHY NOW — alt */}
      <Section tone="alt">
        <Eyebrow>Why now</Eyebrow>
        <SecTitle>The tool era is closing. The done-for-you era is opening.</SecTitle>
        <Lead>
          A café, a music school, a small non-profit, or a fifty-person organisation drowning in its
          own tools. None of them want another login to learn. <Em>So we don't arrive with software.
          We arrive with the work already done.</Em>
        </Lead>
      </Section>

      {/* DOORS — paper, two MediaCards */}
      <Section tone="paper">
        <Eyebrow>Two front doors, open now</Eyebrow>
        <SecTitle>Tell us what you run.</SecTitle>
        <div className="grid grid-2" style={{ marginTop: 34 }}>
          <MediaCard category="Hospitality" title="Restaurants & small hospitality"
            body="Rotas, team, menus, content, payments. One place that already speaks restaurant, running today at Simone's Kitchen, Antwerp."
            href="/restaurants" more="See it for restaurants" />
          <MediaCard category="Cultural & grant-funded" title="Cultural & non-profit organisations"
            body="Supporters, events, documents, and the funding paperwork in one place, with help drafting the grant sections. Running today at Zuidgeluid."
            href="/cultural" more="See it for cultural orgs" />
        </div>
      </Section>

      {/* SUPPORT BEAT — dark.  The retention moat; gets its weight here. */}
      <Section tone="dark">
        <Eyebrow>The part no one else gives a small organisation</Eyebrow>
        <SecTitle>It knows your business. And it gets better.</SecTitle>
        <Lead>
          An assistant grounded in your own facts: your work, your people, your voice. It drafts the
          repetitive writing, and it gets a little sharper every month you run it.
        </Lead>
      </Section>

      {/* OWNERSHIP — one confident present-tense touch + link (full detail lives on /ownership) */}
      <Section tone="paper">
        <Eyebrow>Yours to keep</Eyebrow>
        <SecTitle>We run it. You own it.</SecTitle>
        <Lead>
          <Em>Owned by you.</Em> Your data, your content, your code. Yours from day one, while we run
          it for you.
        </Lead>
        <div className="actions" style={{ marginTop: 22 }}>
          <Btn variant="ghost" href="/ownership">How it stays yours &rarr;</Btn>
        </div>
      </Section>

      {/* CLOSE BAND — slate */}
      <Band tone="slate"
        heading="Come tell us what you run. We'll show you yours."
        sub="A short conversation, no pitch deck. We'll walk you through the place running closest to yours, and tell you plainly what it costs and how it stays yours."
        actions={<>
          <Btn href="mailto:contact@aismith.io">Start a conversation</Btn>
          <Btn variant="line" href="/plans">See the plan</Btn>
        </>}
      />
    </main>
  );
}
