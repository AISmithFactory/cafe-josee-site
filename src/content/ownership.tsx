// pages/ownership.tsx — THE deep ownership page (the only one). Guarantee, three tiers,
// exit kit, honest boundary. No prose em-dashes.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, InfoCard } from "../components/spine";

export function Ownership() {
  return (
    <main id="main">
      <Section tone="dark" pad="lg">
        <Eyebrow>Your hub, your data</Eyebrow>
        <PageTitle size="lg">
          Owned by you. Run by us.
        </PageTitle>
        <Lead>
          Yours from day one: your data, your content, your knowledge, in standard formats. We run it
          for you, but we never hold it hostage. Your hub cannot be locked in, bought out, or shut down
          out from under you. Independence is built into how it is owned, not a promise about us.
        </Lead>
      </Section>

      <Section tone="paper">
        <Eyebrow>Three things you can always do</Eyebrow>
        <SecTitle>Owned and operated, kept separate.</SecTitle>
        <Lead>
          You are the owner from day one, even while we hold the keys day to day. Operation is ours
          while you stay. Ownership is yours throughout.
        </Lead>
        <div className="grid grid-3" style={{ marginTop: 30 }}>
          <InfoCard k="Export your data, any time" v="In standard formats you can open anywhere. The same right GDPR already gives you, made easy." />
          <InfoCard k="Take the whole instance" v="The database transfers to your own organisation and the code to your own account. The live hub, not a pile of files." />
          <InfoCard k="A written safety net" v="A written right to invoke that transfer yourselves, including if AI Smith ever stops operating." />
        </div>
      </Section>

      <Section tone="alt">
        <Eyebrow>The exit kit</Eyebrow>
        <SecTitle>If you ever leave, here is exactly what you get.</SecTitle>
        <Lead>
          No rebuild, no hostage. Leaving happens by transfer, not extraction, and it is never
          refusable beyond settling what is already owed.
        </Lead>
        <div className="grid grid-2" style={{ marginTop: 30 }}>
          <InfoCard k="The database" v="Your project transferred into your own organisation, with all your data intact." />
          <InfoCard k="The code" v="The repository transferred to your account, with the environment and a plain runbook, so another team can pick it up." />
          <InfoCard k="A final export" v="A clean copy of everything, and a short support window for questions." />
          <InfoCard k="Your own keys" v="Your model API key swapped in for ours, so the assistant keeps working under your account." />
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>The honest boundary</Eyebrow>
        <SecTitle>What you keep, and what stops.</SecTitle>
        <Lead>
          You keep a working hub as of the day you leave. What stops is us running, maintaining, and
          improving it, and the assistant stops compounding, because the managed service and the
          standard's updates were ours. Leaving is easy and allowed. What you lose is the thing that
          kept getting better.
        </Lead>
        <p className="lead" style={{ marginTop: 14 }}>
          While you stay, you are the data controller and we are the processor under a written
          agreement. The ownership is continuous, not an exit-only event.
        </p>
      </Section>

      <Band tone="slate"
        heading="Independence you can put in front of a board."
        sub="We'll make the guarantee concrete for your organisation: what you own, and exactly how leaving would work."
        actions={<Btn href="mailto:contact@aismith.io">Start a conversation</Btn>}
      />
    </main>
  );
}
