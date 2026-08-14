// content/drankkaart.tsx -- the drinks card, BUILT into a route (build-agent S5:
// a page sourced from a capture is built, never linked out). Every line and every
// price is read from the drinks card Café Josee publishes on its own Google profile.
import * as React from "react";
import { PageTitle, Section, Band, SecTitle, Eyebrow, Lead, Em, Btn } from "../components/spine";
import { photos, facts } from "./site.config";

type Item = { n: string; p?: string; d?: string };

function List({ items }: { items: Item[] }) {
  return (
    <dl className="hours-list" style={{ marginTop: 14 }}>
      {items.map((it, i) => (
        <div className="hours-row" key={i}>
          <dt>{it.n}{it.d ? <><br /><span style={{ fontSize: ".86em", opacity: .75 }}>{it.d}</span></> : null}</dt>
          <dd>{it.p}</dd>
        </div>
      ))}
    </dl>
  );
}

const koffie: Item[] = [
  { n: "Espresso", p: "2,5" },
  { n: "Dubbele espresso", p: "2,9" },
  { n: "Americano", p: "3,1" },
  { n: "Cortado", p: "3,5" },
  { n: "Cappucino", p: "3,7" },
  { n: "Latte", p: "4,1" },
  { n: "Flat white", p: "4" },
  { n: "Extra shot koffie", p: "0,4" },
];

const warm: Item[] = [
  { n: "Thee", p: "3,3", d: "English breakfast, groene Sencha, jasmijn, rooibos, citroenmelisse, kamille, kruidentuin" },
  { n: "Verse gemberthee", p: "3,8", d: "met citroen en appelsien" },
  { n: "Verse muntthee", p: "3,5", d: "zakje groene thee erbij 0,3" },
  { n: "Chai latte", p: "3,8" },
  { n: "Dirty chai", p: "4,2", d: "chai met een shotje koffie" },
  { n: "Warme chocolademelk", p: "4,3", d: "pure, melk of witte chocolade" },
  { n: "Matcha latte", p: "4,5" },
  { n: "Havermelk", p: "0,4" },
];

const fris: Item[] = [
  { n: "Spa", p: "2,6", d: "rood of blauw" },
  { n: "Weldenhof sap", p: "3,1", d: "appel of appelsien" },
  { n: "Ritchie", p: "3,1", d: "cola of cola zero" },
  { n: "Proviant", p: "3,5", d: "rabarber of citroen" },
  { n: "Charitea Mate", p: "4" },
  { n: "Fentimans", p: "3,5", d: "tonic, rose lemonade of ginger beer" },
  { n: "Bron Kombucha", p: "4,2" },
  { n: "Huisgemaakte limonade", p: "4,4", d: "smaken van de Siroperie, zie het bord aan de toog" },
];

const kindjes: Item[] = [
  { n: "Kindersap", p: "2,5", d: "appel of appelsien" },
  { n: "Huisgemaakte kinderlimo", p: "2,7" },
  { n: "Warme kinderchoco", p: "3,6", d: "pure, melk of witte chocolade" },
  { n: "Koude kinderchoco", p: "2,7" },
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
        <div className="grid grid-2" style={{ marginTop: 6 }}>
          <div>
            <SecTitle>Koffie</SecTitle>
            <List items={koffie} />
            <p style={{ marginTop: 10, color: "var(--text-soft)", fontSize: ".92rem" }}>
              Deca is er ook. Alle koffies zijn ook iced te verkrijgen.
            </p>
          </div>
          <div>
            <SecTitle>Fris</SecTitle>
            <List items={fris} />
          </div>
        </div>
      </Section>

      <Section tone="alt">
        <div className="grid grid-2">
          <div>
            <SecTitle>Warm</SecTitle>
            <List items={warm} />
          </div>
          <div>
            <SecTitle>Kindjes</SecTitle>
            <List items={kindjes} />
            <p style={{ marginTop: 18, color: "var(--text-soft)", fontSize: ".92rem" }}>
              Een rekening per tafel, graag.
            </p>
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
