// content/drankkaart.tsx -- the drinks card, BUILT into a route (build-agent S5: a page
// sourced from a capture is built, never linked out). Every line and every price is read
// from the drinks card Cafe Josee publishes on its own Google profile.
// Layout note: the four lists use the spine's Hours module, which is the sanctioned
// two-column labelled-list primitive (S3.3). Its CSS is co-located and only ships because
// this route imports it. No bespoke structural CSS is written here.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn } from "../components/spine";
import { Hours } from "../components/spine/modules/hours";
import { photos, facts } from "./site.config";

const koffie = [
  { label: "Espresso", value: "2,5" },
  { label: "Dubbele espresso", value: "2,9" },
  { label: "Americano", value: "3,1" },
  { label: "Cortado", value: "3,5" },
  { label: "Cappucino", value: "3,7" },
  { label: "Latte", value: "4,1" },
  { label: "Flat white", value: "4" },
  { label: "Extra shot koffie", value: "0,4" },
];

const warm = [
  { label: "Thee (English breakfast, groene Sencha, jasmijn, rooibos, citroenmelisse, kamille, kruidentuin)", value: "3,3" },
  { label: "Verse gemberthee (met citroen en appelsien)", value: "3,8" },
  { label: "Verse muntthee", value: "3,5" },
  { label: "Zakje groene thee erbij", value: "0,3" },
  { label: "Chai latte", value: "3,8" },
  { label: "Dirty chai (chai met een shotje koffie)", value: "4,2" },
  { label: "Warme chocolademelk (pure, melk of witte chocolade)", value: "4,3" },
  { label: "Matcha latte", value: "4,5" },
  { label: "Havermelk", value: "0,4" },
];

const fris = [
  { label: "Spa (rood of blauw)", value: "2,6" },
  { label: "Weldenhof sap (appel of appelsien)", value: "3,1" },
  { label: "Ritchie (cola of cola zero)", value: "3,1" },
  { label: "Proviant (rabarber of citroen)", value: "3,5" },
  { label: "Charitea Mate", value: "4" },
  { label: "Fentimans (tonic, rose lemonade of ginger beer)", value: "3,5" },
  { label: "Bron Kombucha", value: "4,2" },
  { label: "Huisgemaakte limonade (smaken van de Siroperie, zie het bord aan de toog)", value: "4,4" },
];

const kindjes = [
  { label: "Kindersap (appel of appelsien)", value: "2,5" },
  { label: "Huisgemaakte kinderlimo", value: "2,7" },
  { label: "Warme kinderchoco (pure, melk of witte chocolade)", value: "3,6" },
  { label: "Koude kinderchoco", value: "2,7" },
];

export function Drankkaart() {
  return (
    <main id="main">
      <Section tone="paper" pad="lg">
        <Eyebrow>De kaart</Eyebrow>
        <PageTitle>Drinken bij Josee.</PageTitle>
        <Lead>
          Koffie van espresso tot flat white, verse thee die per kop wordt gezet, en limonade die
          hier zelf wordt gemaakt. <Em>Alle koffies kunnen ook iced,</Em> en deca staat er altijd.
        </Lead>
      </Section>

      <Section tone="surface">
        <div className="grid grid-2">
          <div>
            <SecTitle>Koffie</SecTitle>
            <div style={{ marginTop: 18 }}>
              <Hours heading="" rows={koffie} note="Deca is er ook. Alle koffies zijn ook iced te verkrijgen." />
            </div>
          </div>
          <div>
            <SecTitle>Fris</SecTitle>
            <div style={{ marginTop: 18 }}>
              <Hours heading="" rows={fris} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="alt">
        <div className="grid grid-2">
          <div>
            <SecTitle>Warm</SecTitle>
            <div style={{ marginTop: 18 }}>
              <Hours heading="" rows={warm} />
            </div>
          </div>
          <div>
            <SecTitle>Kindjes</SecTitle>
            <div style={{ marginTop: 18 }}>
              <Hours heading="" rows={kindjes} note="Een rekening per tafel, graag." />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>De kaart zoals ze aan tafel ligt</Eyebrow>
        <SecTitle>Overgenomen van hun eigen drankkaart.</SecTitle>
        <Lead>
          Deze prijzen zijn overgenomen van de drankkaart die het café zelf publiceert. Ze zijn nog
          niet met de zaak nagekeken, dus zie ze als de kaart van dat moment.
        </Lead>
        <div style={{ marginTop: 26, maxWidth: 420 }}>
          <img src={photos.kaart} alt="De gedrukte drankkaart van Café Josee"
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius)", boxShadow: "var(--shadow)" }} />
        </div>
      </Section>

      <Band tone="dark"
        heading="En in de avond staat de spritz klaar."
        sub="Op vrijdag en zaterdag van 17.00 tot 23.00 uur, met borrelhapjes en huisgemaakte dipjes."
        actions={<>
          <Btn href="/apero">Naar de apero</Btn>
          <Btn variant="line" href={facts.phoneHref}>Bel {facts.phone}</Btn>
        </>}
      />
    </main>
  );
}
