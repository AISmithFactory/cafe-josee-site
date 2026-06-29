// pages/cultural.tsx — Door 2. Ownership weighted a little earlier (grant/public-money
// buyers ask for it). Still no prose em-dashes; slate register for the institutional tone.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, InfoCard } from "../components/spine";

export function Cultural() {
  return (
    <main id="main">
      <Section tone="paper" pad="lg">
        <Eyebrow>For cultural & grant-funded organisations</Eyebrow>
        <PageTitle size="xl">
          Software that already speaks <Em>culture</Em>.
        </PageTitle>
        <Lead>
          Made to fit. Yours to keep. Supporters, events, documents, and the funding paperwork in one
          place built for how a cultural non-profit works, with an assistant that knows your programmes
          and helps draft the grant sections.
        </Lead>
        <div className="actions" style={{ marginTop: 26 }}>
          <Btn href="#runs">See it running</Btn>
          <Btn variant="line" href="/plans">What it costs</Btn>
        </div>
      </Section>

      <Section tone="alt" id="runs">
        <SecTitle>Run the organisation, not the admin.</SecTitle>
        <Lead>
          One place built for how a cultural organisation actually works. It belongs to the
          organisation, in formats you keep. Independent by design.
        </Lead>
        <div className="grid grid-3" style={{ marginTop: 30 }}>
          <InfoCard k="Supporters" v="Members, donors, and contacts in one place, kept current, ready when you need to reach them." />
          <InfoCard k="Events & programmes" v="What's on, where, and who's involved, with the details in one calendar your whole team can see." />
          <InfoCard k="Documents" v="Agreements, reports, and the papers a board and a funder expect, held safely and found fast." />
          <InfoCard k="Grant drafting" v="An assistant that knows your programmes and helps draft the funding sections, in your own words." />
          <InfoCard k="Communications" v="Newsletters and posts drafted in your voice, from your own events, ready for you to approve." />
          <InfoCard k="Accountability" v="The trail a public-money organisation needs, kept as you go, not pieced together at year end." />
        </div>
      </Section>

      <Section tone="dark">
        <Eyebrow>The part no one else gives a small organisation</Eyebrow>
        <SecTitle>It knows your programmes. And it gets better.</SecTitle>
        <Lead>
          An assistant grounded in your own facts: your programmes, your supporters, your funders,
          your voice. It helps draft the grant sections, and it gets a little sharper every month.
        </Lead>
      </Section>

      <Section tone="slate">
        <Eyebrow>Independence, built in</Eyebrow>
        <SecTitle>Owned by the organisation, the whole time.</SecTitle>
        <Lead>
          Your data and your content belong to the organisation from day one, in standard formats. We
          run it for you. Exit rights, data control, and a written continuity clause hold the whole
          time we work together. It cannot be locked in or bought out from under you.
        </Lead>
        <div className="actions" style={{ marginTop: 22 }}>
          <Btn variant="ghost" href="/ownership">Read the full promise &rarr;</Btn>
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>Running a real organisation</Eyebrow>
        <SecTitle>Zuidgeluid, Antwerp.</SecTitle>
        <Lead>
          A music-education non-profit runs its supporters, events, and grant drafting on its own hub.
          The funding sections are drafted from its own programmes, in its own voice.
        </Lead>
      </Section>

      <Band tone="dark"
        heading="Tell us what your organisation runs."
        sub="A short conversation, no pitch deck. We'll show you the organisation running closest to yours, and tell you plainly what it costs and how it stays yours."
        actions={<>
          <Btn href="mailto:contact@aismith.io">Start a conversation</Btn>
          <Btn variant="line" href="/plans">See the plan</Btn>
        </>}
      />
    </main>
  );
}
