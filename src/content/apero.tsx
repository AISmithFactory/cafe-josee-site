// content/apero.tsx -- the evening service that started on 14 August 2026, announced by
// the cafe itself. This is the newest true thing about the place and it is nowhere on
// their Google record yet, so it gets its own route.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, InfoCard } from "../components/spine";
import { photos, facts } from "./site.config";

export function Apero() {
  return (
    <main id="main">
      <Section tone="paper" pad="lg">
        <Eyebrow>Vrijdag en zaterdag</Eyebrow>
        <PageTitle>Apero, van 17.00 tot 23.00 uur.</PageTitle>
        <Lead>
          Vanaf 14 augustus gaan de deuren op vrijdag en zaterdag opnieuw open zodra de koffiedag
          erop zit. <Em>Zelfde zaal, ander uur.</Em>
        </Lead>
        <div className="actions" style={{ marginTop: 26 }}>
          <Btn href={facts.phoneHref}>Bel {facts.phone}</Btn>
          <Btn variant="line" href="/praktisch">Waar we zitten</Btn>
        </div>
      </Section>

      <Section tone="surface">
        <Eyebrow>In het glas</Eyebrow>
        <SecTitle>Spritz, en een die hier zelf gemaakt wordt.</SecTitle>
        <div className="grid grid-3" style={{ marginTop: 30 }}>
          <InfoCard k="Limoncello Spritz" v="Huisgemaakt, van verse citroenen." />
          <InfoCard k="Aperol Spritz" v="Koud en klassiek." />
          <InfoCard k="Hugo Spritz" v="Vlierbloesem en munt." />
        </div>
        <p style={{ marginTop: 22, color: "var(--text-soft)" }}>
          Prijzen voor de avondkaart zijn nog niet publiek gemaakt. Ze staan hier bewust niet, want
          er wordt niets ingevuld dat niet ergens te lezen was.
        </p>
      </Section>

      <Section tone="alt">
        <Eyebrow>Op tafel</Eyebrow>
        <SecTitle>Het Josee Borrelbord.</SecTitle>
        <Lead>
          Borrelhapjes met huisgemaakte dipjes, om te delen. Hetzelfde huisgemaakte handwerk dat
          overdag in de limonade zit.
        </Lead>
        <div style={{ marginTop: 30, maxWidth: 560 }}>
          <img src={photos.koekjes} alt="Koffie met iets zoets erbij op tafel"
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius)", boxShadow: "var(--shadow)" }} />
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>Let op</Eyebrow>
        <SecTitle>Overdag verandert er niets.</SecTitle>
        <Lead>
          De koffiedag loopt gewoon door: van maandag tot woensdag en van vrijdag tot zondag, met
          donderdag als sluitingsdag. De avonduren komen daar op vrijdag en zaterdag bovenop.
        </Lead>
        <div className="actions" style={{ marginTop: 22 }}>
          <Btn variant="ghost" href="/praktisch">Alle uren op een rij &rarr;</Btn>
        </div>
      </Section>

      <Band tone="slate"
        heading="Tot vrijdag."
        sub="Vosstraat 2, op de hoek bij het park. Binnenvallen mag."
        actions={<Btn href="/drankkaart">Bekijk de dagkaart</Btn>}
      />
    </main>
  );
}
