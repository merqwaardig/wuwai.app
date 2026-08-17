# Wuwai landingpage handoff

Laatste update: 17 augustus 2026

## Doel

Wuwai helpt mensen losse signalen uit lichaam, geest en ziel samen te brengen. De landingpage beweegt van herkenning naar inzicht, natuurlijk ritme, bewuste keuzes en uiteindelijk Be You: dichter komen bij wie je eigenlijk bent.

De site moet warm, helder en menselijk blijven. Niet belerend, niet medisch claimend en niet zweverig. Eén dominante gedachte per scherm. Motion ondersteunt betekenis en voortgang, zonder onrust toe te voegen.

Lees bij ontwerpwerk eerst:

- `PRODUCT.md`
- `DESIGN.md`

## Projectlocaties

- Lokale projectmap: `/Users/macbook/Documents/Codex/2026-08-16/referenced-chatgpt-conversation-this-is-an/site`
- GitHub: `git@github.com:merqwaardig/wuwai.app.git`
- Branch: `main`
- Vercel-project: `wuwai-app`
- Vercel-productiedomein: `https://wuwai-app.vercel.app`
- Gewenste domeinen: `https://www.wuwai.app` en `https://wuwai.app`

## Techniek

- Vite 6
- React 19
- TypeScript
- Node.js 22.13 of hoger
- Geen backend of database
- Vercel publiceert automatisch na een push naar `main`

Belangrijke bestanden:

- `app/page.tsx`: inhoud, secties, navigatie en formuliergedrag
- `app/globals.css`: volledige visuele stijl, responsive layout en motion
- `public/`: Wuwai-logo, Be You-logo en zeven chakra-assets
- `tests/source.test.mjs`: basiscontroles op de negen schermen, navigatie en goedgekeurde copy

## Huidige landingspagina

De pagina bestaat uit negen schermen:

1. Intro met CTA, Be You-logo en acht thema's
2. Fundament: zeven herkenningssignalen
3. Ervaren: lichaam, geest en ziel
4. Wilskracht: energetisch profiel en zes natuurlijke ritmes
5. Liefde en verbinding: loslaten wat niet meer past
6. Communicatie: zien, begrijpen en doen
7. Intuïtie: elke dag een stap vooruit
8. Spiritualiteit: bewust kiezen voor energie, balans en bewustzijn
9. Be You en early-accessformulier

De header bevat negen klikbare navigatiepunten. Ieder inhoudsscherm heeft onderaan een pijl naar het volgende scherm. Desktop en mobiel zijn gecontroleerd op viewportbalans, gelijke ritmeblokken en horizontale overflow.

## Merkrichting die behouden moet blijven

- Het echte Wuwai-mandalalogo staat linksboven.
- Be You is de bestemming en payoff, niet de merknaam.
- Liefde en verbinding vormen inhoudelijk het hart.
- Montserrat wordt gebruikt voor koppen en Lato voor tekst.
- De zeven chakrakleuren dragen de voortgang.
- De basis is warm wit en lichtgrijs met zachte, diffuse diepte.
- Vermijd generieke wellnessbeelden, goeroetaal, neonspiritualiteit en harde verkoopdruk.
- Wijzig logo's, kerncopy of de negen-schermenstructuur niet zonder expliciete afstemming.

## Formulier en gegevensopslag

Het early-accessformulier is momenteel alleen een frontenddemo.

- Naam en e-mailadres worden niet verstuurd of opgeslagen.
- Verzenden voorkomt alleen de standaard browseractie en toont lokaal een melding.
- De pagina vermeldt transparant dat de opslagkoppeling nog ontbreekt.

Voordat echte inschrijvingen worden verzameld moet een bestemming worden gekozen, bijvoorbeeld een mailinglijst of database. Voeg daarna ook passende privacytekst, toestemming, foutafhandeling, spambeveiliging en een echte successtatus toe. Doe niet alsof een inschrijving is opgeslagen voordat de backendkoppeling aantoonbaar werkt.

## Openstaand: domein koppelen

`wuwai.app` en `www.wuwai.app` zijn al aan het Vercel-project toegevoegd, maar Vercel toont nog `Invalid Configuration`.

Cloud86 beheert het domein. De juiste route is inmiddels gevonden:

1. Cloud86 openen.
2. `Domeinnamen` openen.
3. Bij `wuwai.app` kiezen voor `Beheer domein`.
4. Op de beheerpagina `DNS beheren` openen.
5. In Vercel bij zowel `wuwai.app` als `www.wuwai.app` `View DNS configuration` openen.
6. De exacte, door Vercel getoonde waarden gebruiken.
7. In Cloud86 alleen het website-record voor `@` en het record voor `www` aanpassen of vervangen.
8. MX-, SPF-, DKIM- en overige TXT-records ongemoeid laten.
9. Opslaan, wachten op DNS-propagatie en in Vercel bij beide domeinen op `Refresh` klikken.

Gebruik geen gegokte of verouderde Vercel-waarden. Neem altijd de project-specifieke waarden uit `View DNS configuration` over. Verander de nameservers niet zolang records via `DNS beheren` aangepast kunnen worden.

De gewenste Vercel-configuratie is:

- `www.wuwai.app`: Production en primair domein
- `wuwai.app`: 308-redirect naar `www.wuwai.app`

Na geldige DNS-configuratie hoort Vercel automatisch het HTTPS-certificaat te regelen.

## Controleren en publiceren

Voer vanuit de projectmap uit:

```bash
npm test
```

Dit bouwt de productieversie en voert de broncontroles uit.

Na goedgekeurde wijzigingen:

```bash
git add <gewijzigde-bestanden>
git commit -m "Beschrijvende commitboodschap"
git push
```

Controleer daarna de Vercel-deployment op desktop en mobiel. Test minimaal:

- Alle negen headerpunten navigeren naar het juiste scherm.
- De CTA's gaan naar het formulier.
- Iedere pijl gaat naar het volgende scherm.
- Er is geen horizontale overflow.
- De actieve navigatiestip verandert tijdens scrollen.
- `prefers-reduced-motion` blijft gerespecteerd.
- Het formulier claimt geen opslag zolang er geen backend is.

## Relevante commits

- `b0c9906` Refine Wuwai story details and flow
- `2ccc586` Polish Wuwai mobile journey and navigation
- `0cf997d` Prepare Wuwai landing page for Vercel
- `2c95302` Make Wuwai journey navigation reliable
- `7e0a70a` Build Wuwai Be You landing page

## Eerstvolgende aanbevolen stappen

1. DNS bij Cloud86 afronden en beide domeinen in Vercel groen krijgen.
2. `www.wuwai.app` en de redirect vanaf `wuwai.app` testen.
3. Beslissen waar early-accessinschrijvingen worden opgeslagen.
4. Formulier echt koppelen en de volledige verzendflow testen.
5. Daarna pas een nieuwe inhoudelijke of visuele feedbackronde starten.

