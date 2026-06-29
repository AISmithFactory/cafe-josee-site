// pages/plans.tsx — the managed plan. "retainer" language, never "subscription".
// Ownership right and the 12-month term stated separately. VAT explicit. No prose em-dashes.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, TierCard, InfoCard } from "../components/spine";

export function Plans() {
  return (
    <main id="main">
      <Section tone="paper" pad="lg">
        <Eyebrow>A managed plan, not another tool</Eyebrow>
        <PageTitle size="lg">
          Low to start. Monthly after.
        </PageTitle>
        <Lead>
          We set it up and we run it. The price is for the running and the learning, both monthly
          things, not for the build. Price it against the hours it removes and the tools it replaces,
          never against a website.
        </Lead>
      </Section>

      <Section tone="alt">
        <div className="grid grid-2" style={{ alignItems: "start" }}>
          <TierCard
            label="Managed plan"
            price="€195"
            per="/ month, managed · excl. VAT"
            items={[
              "Your hub, built for your trade and running",
              "The assistant, grounded in your own knowledge",
              "A generous monthly AI allowance, included",
              "We run it, watch it, and keep it current",
              "No revenue share. Your income is entirely yours",
              "Yours to export, or take whole, any time",
            ]}
            cta={<Btn href="mailto:contact@aismith.io">Start a conversation</Btn>}
          />
          <div>
            <Eyebrow>Two things, said separately</Eyebrow>
            <SecTitle>Fair both ways.</SecTitle>
            <p className="lead" style={{ marginTop: 14 }}>
              <Em>You can always take your hub.</Em> The ownership right. Yours to keep, forever,
              whatever happens.
            </p>
            <p className="lead" style={{ marginTop: 10 }}>
              <Em>You commit for the first year.</Em> A single, straightforward 12-month managed term,
              because we built it without charging upfront.
            </p>
            <p className="lead" style={{ marginTop: 10 }}>
              A capped, generous monthly AI allowance is included. Most organisations never reach it.
              It is there so one heavy month never turns into a surprise.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>Straight answers</Eyebrow>
        <SecTitle>Questions about cost.</SecTitle>
        <div className="grid grid-2" style={{ marginTop: 30 }}>
          <InfoCard k="Why a monthly plan and not a one-off build?" v="A one-off build is a tool you are then left to run. The value here is the running and the compounding knowledge, both monthly things, so the price is monthly too." />
          <InfoCard k="What does the 12-month term cover?" v="A simple managed term: we run, maintain, and keep improving your hub across the year. Your hub and your data are yours regardless, the whole time and after." />
          <InfoCard k="Is there a revenue share?" v="No. You run your own operation. Your takings, funding, and income are entirely yours. We charge the managed plan, nothing on top." />
          <InfoCard k="Isn't it cheaper to just get a website?" v="A website is the shop window. What you are buying here is the system that runs the place behind it. We can build the website too, if you want." />
        </div>
      </Section>

      <Band tone="slate"
        heading="Let's price it against your actual work."
        sub="Tell us what you run and how big the team is, and we'll give you a real number, and show you the place running closest to yours."
        actions={<>
          <Btn href="mailto:contact@aismith.io">Start a conversation</Btn>
          <Btn variant="line" href="/website">See the website option</Btn>
        </>}
      />
    </main>
  );
}
