// content/hetcafe.tsx -- the room, the neighbourhood, and the history OF THE CAFE.
// Ownership boundary (brief S1 / S9): everything here is about the establishment, the
// building and the buurt. Nothing is attributed to the people who run it today, because
// nothing about them has been confirmed owner-direct. No names appear on this site.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, MediaCard, InfoCard } from "../components/spine";
import { photos, facts } from "./site.config";

export function HetCafe() {
  return (
    <main id="main">
      <Section tone="paper" pad="lg">
        <Eyebrow>Het café</Eyebrow>
        <PageTitle>Een buurtbar op de hoek, met het park aan de overkant.</PageTitle>
        <Lead>
          Café Josee staat waar de Vosstraat op de Gitschotellei uitkomt, aan de rand van het Te
          Boelaerpark. <Em>Het is een van de eerste nieuwe adressen van de Boelaerbuurt geweest,</Em>
          in de jaren dat die buurt weer begon te leven.
        </Lead>
      </Section>

      <Section tone="alt">
        <Eyebrow>De buurt</Eyebrow>
        <SecTitle>Tussen Te Boelaerpark en Boekenbergpark.</SecTitle>
        <Lead>
          De Boelaerbuurt ligt op het punt waar Borgerhout, Deurne en Berchem elkaar raken. Twee
          parken, een station op fietsafstand, en een winkelstraat die de laatste jaren vol is
          gelopen met kleine zaken. Josee zit er middenin, op de hoek waar iedereen langskomt.
        </Lead>
        <div className="grid grid-3" style={{ marginTop: 30 }}>
          <InfoCard k="Op de hoek van" v="Vosstraat en Gitschotellei" />
          <InfoCard k="Tegenover" v="Te Boelaerpark" />
          <InfoCard k="District" v="Borgerhout, 2140" />
        </div>
      </Section>

      <Section tone="surface">
        <Eyebrow>Binnen</Eyebrow>
        <SecTitle>De keuken staat in de zaal.</SecTitle>
        <div className="grid grid-2" style={{ marginTop: 30 }}>
          <MediaCard image={photos.interior} alt="De zaal met de open keuken, planten en grote ramen"
            title="Licht en planten"
            body="Grote ramen naar de straat, planten op de vensterbank, een houten toog die de zaal in loopt." />
          <MediaCard image={photos.counter} alt="Open rekken met serviesgoed achter de toog"
            title="Alles in het zicht"
            body="Open rekken, potten en pannen aan de haak. Er wordt hier gekookt waar je bij zit." />
        </div>
      </Section>

      <Section tone="dark">
        <Eyebrow>Aan de muur</Eyebrow>
        <SecTitle>Werk van kunstenaars uit de buurt, en het wisselt.</SecTitle>
        <Lead>
          Josee hangt zijn muren vol met werk van mensen uit de buurt en verandert dat regelmatig.
          Bij een nieuwe reeks is er een avond waarop je kan komen kijken. <Em>De zaal doet dus ook
          dienst als kleine expositieruimte.</Em>
        </Lead>
      </Section>

      <Section tone="paper">
        <Eyebrow>Wat er nog gebeurt</Eyebrow>
        <SecTitle>Een loopgroep, kadobonnen en de feestdagen.</SecTitle>
        <Lead>
          Het café is vertrekpunt geweest voor een loop door de buurt, verkoopt kadobonnen in
          een bedrag naar keuze, en houdt de deuren open in de schoolvakanties en op de meeste
          feestdagen. Wat er loopt, staat op hun Instagram.
        </Lead>
        <div className="actions" style={{ marginTop: 22 }}>
          <Btn variant="line" href="https://www.instagram.com/cafe_josee/">Volg Josee op Instagram</Btn>
        </div>
      </Section>

      <Band tone="slate"
        heading="Kom binnen zonder te bellen."
        sub="Er wordt niet gereserveerd. Vosstraat 2, 2140 Borgerhout."
        actions={<>
          <Btn href="/praktisch">Adres en uren</Btn>
          <Btn variant="line" href={facts.phoneHref}>Bel {facts.phone}</Btn>
        </>}
      />
    </main>
  );
}
