# Cafe Josee, build brief

**Slug** `cafe-josee` · **Scenario 2, prospect concept** · **Assembled 14 August 2026**
Schema: `as-site-intake-standard.md` S8 (nine sections). Read from the session reference
cache at Factory main `e0d91cd`, site-contract **1.8.18**.

---

## 1. Provenance and guardrails

**The trigger was adapted, and the adaptation is the finding.** The standard trigger is
`Initiate site build <URL>` with the URL **required**. Cafe Josee has no website and no
domain, and has never had one. The slug was derived from the trading name rather than from a
domain. The URL's three jobs (the live-site read, the brand render, the page inventory) were
carried by two rendered social surfaces instead.

**Sources, in the order intake S5 ranks them.**

| rank | source | read |
|---|---|---|
| 2, authoritative | Google Business Profile, rendered Maps panel | 14 Aug 2026, via Claude-in-Chrome |
| 3, owner-written | instagram.com/cafe_josee (bio, 896 posts, captions) | 14 Aug 2026, rendered |
| 3, owner-written | facebook.com/cafejosee.antwerp (bio, About, profile mark) | 14 Aug 2026, rendered |
| 4, third party | vegatopia.com neighbourhood piece, 9 May 2024 | establishment history only |
| 4, third party | ugly.be Boelaerpark neighbourhood piece | neighbourhood colour only |
| lowest | borgermap.be directory listing | flagged as stale, not used as data |

**Guardrails in force.**

- **No fabrication.** Real public data is displayed and marked unverified; nothing is invented.
  Where a fact is not public (apero prices, the food menu), the page says nothing rather than
  filling the gap.
- **The ownership boundary.** The cafe changed hands around June 2026. History of the
  **establishment**, the building and the buurt is in. Anything about the **current operators**
  is not held: no names, no background, no founder story, and no pre-takeover fact attributed to
  them. Public sources carry names belonging to earlier owners; none are used.
- **Containment consent basis** (intake S6): `noindex`, operator-reviewed before the owner sees
  it, owner-gated go-live.
- **Voice** S9, **AA** S2.3, both re-derived on this palette.

## 2. Identity

- **Name** Cafe Josee. GBP spells it without the accent; their own Facebook page uses "Café Josee".
- **Archetype** neighbourhood cafe, breakfast and lunch by day, apero on Friday and Saturday evening.
- **Language** **nl** only. Operator ruling. No second language, no switcher.
- **Domain target** `cafe-josee.demos.aismith.io`. No production domain exists.
- **Character** their own Facebook bio is the register: "een buurtbar met koffie, brunch, lunch,
  taart en apero aan het Te Boelaerpark." Plain, local, unpretentious.

## 3. Skin

Read from the render (S6). The mark is a printed cream card with two teal cups stacked over a
green dome, the name in a coral brush script. Sampled: teal `#0295A5`, green `#0D9A62`, coral
`#F0605E`. Full token table and the AA matrix are in the charter S2.

Fonts are concept stand-ins (Fraunces + Inter); the real faces are unidentified in public.

## 4. Content

Rewritten to spine voice, in Dutch. Nothing pasted. A social caption is not site copy.

- **The offer.** Koffie en gebak, ontbijt en lunch, taart. Vegetarian and vegan options
  evidenced by reviews. Small kitchen, open into the room.
- **The drinks card.** The full card, read line by line off the card they publish themselves:
  koffie (espresso 2,5 to latte 4,1, flat white 4, extra shot 0,4, deca available, all coffees
  available iced), warm (thee 3,3 across seven infusions, verse gemberthee 3,8, verse muntthee
  3,5, chai latte 3,8, dirty chai 4,2, warme chocolademelk 4,3, matcha latte 4,5, havermelk
  0,4), fris (Spa 2,6, Weldenhof sap 3,1, Ritchie 3,1, Proviant 3,5, Charitea Mate 4, Fentimans
  3,5, Bron Kombucha 4,2, huisgemaakte limonade 4,4 with syrups from de Siroperie), kindjes
  (kindersap 2,5, huisgemaakte kinderlimo 2,7, warme kinderchoco 3,6, koude kinderchoco 2,7).
  One bill per table.
- **The apero, and this is the newest true thing about the place.** Announced by the cafe on
  18 July 2026: from **14 August 2026**, open every Friday and Saturday **17.00 to 23.00** for
  apero. Aperol, a huisgemaakte Limoncello Spritz made from fresh lemons, Hugo Spritz, and the
  Josee Borrelbord with huisgemaakte dipjes. Confirmed again in an 11 August post and folded
  into the Facebook bio.
- **The room.** Open kitchen running into the room, wooden slatted counter with a cream
  terrazzo top, open shelving, hanging pans, plants at the windows, large street-facing windows.
- **The wall.** Rotating work by neighbourhood artists, with an opening evening for each new
  hang. An Instagram highlight is dedicated to one of the shows.
- **The buurt.** Corner of Vosstraat and Gitschotellei, directly opposite Te Boelaerpark, on the
  seam of Borgerhout, Deurne and Berchem. Cafe Josee was one of the first new addresses in the
  Boelaerbuurt as it revived. **Establishment history, not attributed to anyone currently there.**
- **Also true, from their own posts.** Kadobonnen in a free-chosen amount. The cafe has been the
  start point of a neighbourhood run. Open through school holidays and most public holidays.

## 5. Structure

`/` home · `/drankkaart` · `/apero` · `/het-cafe` · `/praktisch` · `/privacy`. Six routes.

The drinks card is **built into a route**, not linked out (build-agent S5). `/apero` exists
because the newest fact about the business is invisible on every aggregator record.

## 6. Integrations

Contact form on, wired to the shared `AISmith-functions` hardened `contact` fn, demo
destination `contact@aismith.io`. Newsletter off. Booking none. `Hours` and `Map` modules on.

## 7. Facts (source-ranked)

| fact | value | source |
|---|---|---|
| Name | Cafe Josee | GBP |
| Address | Vosstraat 2, 2140 Antwerpen (Borgerhout) | GBP, confirmed by their Instagram bio and Facebook |
| Phone | 0468 46 19 16 | GBP, Facebook |
| Category | Coffee shop | GBP |
| Price band | 10 to 20 euro per person, reported by 78 people | GBP |
| Rating | 4.4 from 485 reviews; Facebook 100 percent recommend from 92 | GBP, Facebook |
| Hours | Mon, Tue, Wed, Fri 08.45 to 16.30; Sat, Sun 10.00 to 16.30; **Thu closed** | GBP **and** their own Instagram bio, agreeing line for line |
| Evening hours | Fri and Sat 17.00 to 23.00 from 14 Aug 2026 | the cafe's own Instagram, 18 July and 11 Aug 2026. **Absent from GBP.** |
| Dine-in / delivery | dine-in yes, delivery no | GBP |
| Website | **none.** The GBP record still shows the "Add website" prompt | GBP |
| Public email | josee.cafe@gmail.com | Facebook. Recorded, deliberately not wired. |
| GBP attribute | "Identifies as women-owned" | GBP. Recorded, not used. |

## 8. Assets

- **Mark.** The cups-and-dome device, extracted from the card the cafe publishes as its own
  profile image and keyed off the printed ground. `public/cafe-josee-mark.png`. Real, not
  approximated, not a text wordmark.
- **Photography.** Seven of the cafe's own photos, referenced by their live Google Business
  Profile URLs: the room, the counter, two lattes, a brunch table, a lunch plate, coffee with
  something sweet, and the drinks card itself.
- **Ruled out as an image origin: Instagram and Facebook.** Both CDNs sign their image URLs
  and expire them. A page built on them looks correct on the day and breaks within days. With
  no website of their own, the GBP CDN is the only durable public origin for their photography.

## 9. What extraction left for you to fix

The full review list lives in the charter S11 (sixteen items) so it travels with the repo the
audit reads. In short: hours and prices are publicly sourced and unverified; the apero is
missing from their Google record; a stale directory listing is publishing wrong hours; no
person is named anywhere and no name may be attributed to the current operators; photography
and the mark are referenced rather than supplied; the contact form points at the AI Smith
catch-all and the origin is not yet registered in `CONTACT_TENANTS`.
