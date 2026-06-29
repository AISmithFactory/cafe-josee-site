// pages/restaurants.tsx — Door 1. Composed from spine; AS voice; no prose em-dashes.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, InfoCard } from "../components/spine";

export function Restaurants() {
  return (
    <main id="main">
      <Section tone="paper" pad="lg">
        <Eyebrow>For restaurants & small hospitality</Eyebrow>
        <PageTitle size="xl">
          Software that already speaks <Em>restaurant</Em>.
        </PageTitle>
        <Lead>
          Made to fit. Yours to keep. Run your whole place from one spot that already speaks restaurant,
          and learns your menu, your suppliers, your team as you go.
        </Lead>
        <div className="actions" style={{ marginTop: 26 }}>
          <Btn href="#runs">See it running</Btn>
          <Btn variant="line" href="/plans">What it costs</Btn>
        </div>
      </Section>

      <Section tone="alt" id="runs">
        <SecTitle>One place that already speaks restaurant.</SecTitle>
        <Lead>
          Rotas, team, menus, content, payments, documents, the lot, in software built for how a
          restaurant actually runs. Not another tool to learn. The work, set up and run for you.
        </Lead>
        <div className="grid grid-3" style={{ marginTop: 30 }}>
          <InfoCard k="Team & rotas" v="Who's on, who's covering, who's paid what. Shifts and stays in one calendar everyone can see." />
          <InfoCard k="Menus & dishes" v="Your dishes, sections, and prices, written once, reused everywhere from the kitchen to the card." />
          <InfoCard k="Suppliers" v="Where each thing comes from, kept straight, so the answer is one search, not a hunt through messages." />
          <InfoCard k="Content & social" v="Posts and reels drafted in your house voice, from your own menu, ready to schedule." />
          <InfoCard k="Payments" v="Bookings, memberships, takeaway, taken and tracked, with the VAT sorted the way your place works." />
          <InfoCard k="Documents" v="Compliance papers, agreements, the things you lose in email, held safely, found instantly." />
        </div>
      </Section>

      <Section tone="dark">
        <Eyebrow>The part no one else gives a small kitchen</Eyebrow>
        <SecTitle>It knows your business. And it gets better.</SecTitle>
        <Lead>
          An assistant grounded in your own facts: your menu, your suppliers, your team, your voice.
          It drafts the repetitive writing, and it gets a little sharper every month you run it.
        </Lead>
      </Section>

      <Section tone="paper">
        <Eyebrow>Running a real restaurant</Eyebrow>
        <SecTitle>Simone's Kitchen, Antwerp.</SecTitle>
        <Lead>
          A plant-based restaurant with rooms runs its whole operation on its own hub: team and rotas,
          menus and content, payments, documents. The menu cards and the social posts are drafted from
          its own kitchen, in its own voice.
        </Lead>
        <div className="actions" style={{ marginTop: 22 }}>
          <Btn variant="ghost" href="/ownership">How it stays yours &rarr;</Btn>
        </div>
      </Section>

      <Band tone="slate"
        heading="Come and see the place running closest to yours."
        sub="A short conversation, no pitch deck. We'll tell you plainly what it costs and how it stays yours."
        actions={<>
          <Btn href="mailto:contact@aismith.io">Start a conversation</Btn>
          <Btn variant="line" href="/plans">See the plan</Btn>
        </>}
      />
    </main>
  );
}
