// content/home.tsx -- PER-SITE COMPOSITION. Built entirely from spine components.
// No bespoke structural CSS (S3.2): tone rhythm + cards + band only.
// Copy is written from extracted facts, in spine voice, in Dutch (S7.2, S9).
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, MediaCard } from "../components/spine";
import { Hours } from "../components/spine/modules/hours";
import { photos, facts } from "./site.config";

export function Home() {
  return (
    <main id="main">
      {/* HERO -- karton */}
      <Section tone="paper" pad="lg">
        <Eyebrow>Buurtbar aan het Te Boelaerpark</Eyebrow>
        <PageTitle size="hero">
          Koffie, ontbijt en lunch <Em>op de hoek van de Vosstraat</Em>.
        </PageTitle>
        <Lead>
          Café Josee staat op de hoek van de Vosstraat en de Gitschotellei, met het park aan de
          overkant. Binnen staat de keuken open in de zaal, hangen er planten voor de ramen en
          staat er werk van buurtkunstenaars aan de muur. <Em>En sinds 14 augustus gaan de deuren
          op vrijdag en zaterdag ook in de avond open.</Em>
        </Lead>
        <div className="actions" style={{ marginTop: 26 }}>
          <Btn href="/drankkaart">Bekijk de kaart</Btn>
          <Btn variant="line" href="/apero">Apero op vrijdag en zaterdag</Btn>
        </div>
      </Section>

      {/* NIEUW: APERO -- de verse verandering krijgt zijn gewicht hier */}
      <Section tone="dark">
        <Eyebrow>Nieuw sinds 14 augustus</Eyebrow>
        <SecTitle>Vrijdag en zaterdag van 17.00 tot 23.00 uur.</SecTitle>
        <Lead>
          Een Aperol, een huisgemaakte Limoncello Spritz van verse citroenen of een Hugo Spritz,
          met het Josee Borrelbord en huisgemaakte dipjes erbij. <Em>Overdag blijft alles zoals
          het was.</Em>
        </Lead>
        <div className="actions" style={{ marginTop: 22 }}>
          <Btn variant="ghost" href="/apero">Wat er op tafel komt &rarr;</Btn>
        </div>
      </Section>

      {/* DE DAG -- drie kaarten */}
      <Section tone="paper">
        <Eyebrow>Van kwart voor negen</Eyebrow>
        <SecTitle>Ontbijt, lunch, taart en een lange koffie.</SecTitle>
        <div className="grid grid-3" style={{ marginTop: 34 }}>
          <MediaCard image={photos.brunch} alt="Gedekte tafel met ontbijt en vers sap"
            category="Ontbijt" title="Vanaf 08.45 uur"
            body="Doordeweeks gaat de deur om kwart voor negen open, in het weekend om tien uur. Rustig beginnen mag."
            href="/praktisch" more="Openingsuren" />
          <MediaCard image={photos.lunch} alt="Bord met salade en drankjes op tafel"
            category="Lunch" title="Tot half vijf"
            body="Een kleine kaart met verse keuzes, ook voor wie geen vlees eet. De keuken staat open in de zaal."
            href="/het-cafe" more="Over de zaak" />
          <MediaCard image={photos.lattes} alt="Twee latte macchiatos op een houten tafel"
            category="Koffie" title="En huisgemaakte limonade"
            body="Espresso tot flat white, verse gember- en muntthee, en limonade die hier zelf wordt gemaakt."
            href="/drankkaart" more="De hele kaart" />
        </div>
      </Section>

      {/* HET HUIS -- alt, met foto */}
      <Section tone="alt">
        <Eyebrow>De zaal</Eyebrow>
        <SecTitle>Een open keuken, planten en wisselend werk aan de muur.</SecTitle>
        <Lead>
          Josee is een buurtcafé voor de buurt: gezinnen, mensen die alleen komen werken, mensen die
          na het park binnenvallen. Aan de muur hangt werk van kunstenaars uit de buurt, en dat
          wisselt. Er wordt niet gereserveerd, je komt gewoon binnen.
        </Lead>
        <div className="grid grid-2" style={{ marginTop: 30 }}>
          <MediaCard image={photos.interior} alt="De zaal van Café Josee met de open keuken en planten"
            title="Binnen" body="De toog en de open keuken lopen door de zaal, met grote ramen naar de straat." />
          <MediaCard image={photos.counter} alt="De toog met open rekken en serviesgoed"
            title="Aan de toog" body="Open rekken, serviesgoed op de plank, alles in het zicht." />
        </div>
      </Section>

      {/* UREN -- surface, het Hours-blok */}
      <Section tone="surface">
        <Eyebrow>Wanneer</Eyebrow>
        <SecTitle>Open van maandag tot woensdag en van vrijdag tot zondag.</SecTitle>
        <div style={{ marginTop: 26, maxWidth: 560 }}>
          <Hours
            rows={facts.hours}
            note="Donderdag is de sluitingsdag. Deze uren komen uit het publieke Google-profiel van het café en uit hun eigen Instagram, en zijn nog niet met de zaak bevestigd."
          />
        </div>
        <div className="actions" style={{ marginTop: 26 }}>
          <Btn variant="line" href="/praktisch">Adres, kaart en contact</Btn>
        </div>
      </Section>

      {/* SLOTBAND */}
      <Band tone="slate"
        heading="Kom eens langs op de hoek."
        sub="Vosstraat 2, recht tegenover het Te Boelaerpark. Bellen kan ook, reserveren hoeft niet."
        actions={<>
          <Btn href={facts.phoneHref}>Bel {facts.phone}</Btn>
          <Btn variant="line" href="/praktisch">Waar we zitten</Btn>
        </>}
      />
    </main>
  );
}
