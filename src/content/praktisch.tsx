// content/praktisch.tsx -- hours, address, map facade and the contact form.
// The form posts to the shared AISmith-functions `contact` fn; the destination is
// resolved server-side from the origin map (S6). Demo destination is the AI Smith
// catch-all, never the cafe's own address.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn, InfoCard, ContactForm } from "../components/spine";
import { Hours } from "../components/spine/modules/hours";
import { Map } from "../components/spine/modules/map";
import { facts, site } from "./site.config";

export function Praktisch() {
  return (
    <main id="main">
      <Section tone="paper" pad="lg">
        <Eyebrow>Praktisch</Eyebrow>
        <PageTitle>Waar we zitten en wanneer we open zijn.</PageTitle>
        <Lead>
          Vosstraat 2, op de hoek met de Gitschotellei, recht tegenover het Te Boelaerpark.
          <Em> Donderdag is de sluitingsdag.</Em>
        </Lead>
        <div className="grid grid-3" style={{ marginTop: 30 }}>
          <InfoCard k="Adres" v={facts.address} />
          <InfoCard k="Telefoon" v={facts.phone} />
          <InfoCard k="Reserveren" v="Niet nodig, je komt gewoon binnen." />
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid grid-2" style={{ alignItems: "start" }}>
          <div>
            <SecTitle>Openingsuren</SecTitle>
            <div style={{ marginTop: 20 }}>
              <Hours
                rows={facts.hours}
                note="Deze uren komen uit het publieke Google-profiel van het cafe en uit hun eigen Instagram, die met elkaar overeenkomen. Ze zijn nog niet met de zaak bevestigd. De avonduren op vrijdag en zaterdag lopen sinds 14 augustus 2026."
              />
            </div>
          </div>
          <div>
            <SecTitle>Op de kaart</SecTitle>
            <div style={{ marginTop: 20 }}>
              <Map
                query={facts.mapsQuery}
                label="Cafe Josee, Vosstraat 2, Borgerhout"
                caption="Op de hoek van de Vosstraat en de Gitschotellei"
                cta="Toon de kaart"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="alt">
        <Eyebrow>Iets vragen</Eyebrow>
        <SecTitle>Stuur een bericht.</SecTitle>
        <Lead>
          Voor een groep, een vraag over de kaart of iets anders. Bellen mag ook, op {facts.phone}.
        </Lead>
        <div style={{ marginTop: 26, maxWidth: 560 }}>
          <ContactForm
            action={site.integrations.contactAction}
            fields={[
              { name: "name", label: "Je naam", type: "text", required: true },
              { name: "email", label: "Je e-mailadres", type: "email", required: true },
              { name: "message", label: "Je bericht", type: "textarea", required: true },
            ]}
            submitLabel="Verstuur"
            done="Bedankt, we lezen het en komen erop terug."
          />
        </div>
      </Section>

      <Band tone="dark"
        heading="Tot bij Josee."
        sub="Vosstraat 2, 2140 Borgerhout. Overdag koffie en lunch, op vrijdag en zaterdag ook apero."
        actions={<>
          <Btn href="/drankkaart">De kaart</Btn>
          <Btn variant="line" href="/apero">De apero</Btn>
        </>}
      />
    </main>
  );
}
