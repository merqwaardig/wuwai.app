# Wuwai landingpage handoff

Laatste update: 21 augustus 2026

## Huidige status

De nieuwe Wuwai-landingspagina met drie schermvullende stappen staat live in productie. GitHub `main` is de bron van waarheid en Vercel publiceert automatisch na een push naar `main`.

Productie en redirects:

- `https://www.wuwai.app`: primaire productiesite
- `https://wuwai.app`: permanente 308-redirect naar `https://www.wuwai.app`
- `https://www.wuwai.nl`: permanente 308-redirect naar `https://www.wuwai.app`
- `https://wuwai.nl`: permanente 308-redirect naar `https://www.wuwai.app`
- Alle vier domeinen tonen in Vercel `Valid Configuration`.
- De oude testsite op `.nl` is niet meer publiek bereikbaar via `wuwai.nl` of `www.wuwai.nl`.

## Projectlocaties

- Lokale bronmap: `/Users/macbook/Documents/Codex/2026-08-16/referenced-chatgpt-conversation-this-is-an/site`
- GitHub: `git@github.com:merqwaardig/wuwai.app.git`
- Productiebranch: `main`
- Vercel-project: `wuwai-app`
- Vercel-preview/productiedomein: `https://wuwai-app.vercel.app`
- Publieke website: `https://www.wuwai.app`
- Wuwai-app/login: `https://app.wuwai.org/login`

## Productrichting

Wuwai helpt mensen bewuster te ervaren wat lichaam, geest en ziel vertellen en dit te vertalen naar persoonlijke keuzes en beweging. De landingspagina moet warm, helder, menselijk en doelgericht blijven: niet belerend, niet medisch claimend en niet onnodig zweverig.

Lees vóór grote inhoudelijke of visuele wijzigingen:

- `PRODUCT.md`
- `DESIGN.md`
- `V2.md`

## Huidige landingspagina

De site bestaat uit drie schermvullende stappen:

1. **Persoonlijk**
   - Fullscreen hero met `hero-charge.webp`.
   - Geanimeerde kop: `Jouw tijd.`, `Jouw energie.`, `Jouw leven.`
   - CTA `Hoe het werkt` naar stap 2.
   - Subtiele, doorlopende herozoom zonder sprong of zichtbare animatielus.

2. **Doelgericht**
   - Hoofdboodschap: alles wat nodig is om bewust in beweging te komen.
   - Drie interactieve appschermen: Jouw doelen, Jouw lichaam en Jouw coach.
   - Screenshots zweven in lichte telefoonframes en wisselen focus via hover of klik.

3. **Resultaat**
   - `Meer balans. Meer energie. Meer flow.` animeert regel voor regel omhoog.
   - De vervolzin wordt daarna getypt.
   - Twee grotere polaroids, Be You-logo en CTA `Ontdek de app`.

De header bevat drie klikbare stappen en de CTA `Aanmelden`. Beide app-CTA's linken naar `https://app.wuwai.org/login`.

## Merkrichting die behouden moet blijven

- Het echte Wuwai-mandalalogo staat linksboven en is ook favicon/Apple Touch Icon.
- Be You is de bestemming en payoff, niet de merknaam.
- Gebruik de bestaande Wuwai-kleuren en groene knopverlopen uit de stylekit.
- De hero blijft fotografisch, ruimtelijk en menselijk.
- Stap 2 en 3 gebruiken een lichte, zachte Wuwai-wereld met diffuse diepte.
- Motion moet betekenis en flow ondersteunen zonder onrust te veroorzaken.
- `prefers-reduced-motion` moet gerespecteerd blijven.
- Vermijd generieke wellnessbeelden, goeroetaal, harde verkoopdruk en nieuwe lettertypes buiten de bestaande richting.

## Techniek

- Vite 6
- React 19
- TypeScript 5.9
- Node.js 22.13 of hoger
- Geen backend of database in deze landingspagina
- Vercel publiceert automatisch na een push naar GitHub `main`

Belangrijke bestanden:

- `app/page.tsx`: inhoud, drie stappen, navigatie en interacties
- `app/globals.css`: volledige visuele stijl, responsive gedrag en motion
- `index.html`: metadata, favicon, social preview en Google Analytics
- `public/hero-charge.webp`: geoptimaliseerde heroafbeelding
- `public/app-doelen.png`: screenshot Jouw doelen
- `public/app-lichaam.png`: screenshot Jouw lichaam
- `public/app-coach.png`: screenshot Jouw coach
- `public/polaroid-child.jpg` en `public/polaroid-elder.jpg`: resultaatbeelden
- `public/wuwai-logo.png`: Wuwai-logo en browsericoon
- `public/be-you.svg`: Be You-logo
- `tests/source.test.mjs`: bron- en regressiecontroles

## Analytics en privacy

Google Analytics staat rechtstreeks in `index.html` met measurement-ID:

- `G-Z8K5W1KJRV`

Er is nog geen cookiebanner of Consent Mode toegevoegd. Controleer vóór bredere marketing of de gewenste privacy- en toestemmingsflow nodig is en implementeer die dan bewust.

## Formulieren en gegevens

De huidige drie-stappenpagina bevat geen early-accessformulier en slaat geen persoonsgegevens op. `Aanmelden` en `Ontdek de app` verwijzen naar `https://app.wuwai.org/login`.

## Lokaal werken

Open een terminal in de lokale bronmap en gebruik:

```bash
npm install
npm run dev
```

De lokale preview staat normaal op:

- `http://localhost:5173/`

Controleer vóór publiceren:

```bash
npm test
git diff --check
```

Na goedgekeurde wijzigingen:

```bash
git add <gewijzigde-bestanden>
git commit -m "Beschrijvende commitboodschap"
git push origin main
```

Controleer daarna de nieuwe Vercel-deployment op desktop en mobiel.

## Laatste relevante commits

- `699e864` Smooth hero zoom and update site title
- `8bbcc76` Add Google Analytics tracking
- `3edfe61` Add narrative motion to V2 hero and results
- `ccf4654` Refine V2 hero and desktop result spacing
- `0ea5c0f` Polish V2 hero actions and result layout
- `b30f5be` Use optimized charge hero image
- `8e8913d` Refine V2 branding and device presentation
- `a2b6d41` Polish V2 experience showcase
- `82ecc5c` Create three-step Wuwai V2 experience

## Begin van een nieuwe Codex-chat

Gebruik bijvoorbeeld:

> Ga verder met de Wuwai-landingspagina in `/Users/macbook/Documents/Codex/2026-08-16/referenced-chatgpt-conversation-this-is-an/site`. Lees eerst `HANDOFF.md`, `PRODUCT.md`, `DESIGN.md` en `V2.md`, controleer de huidige Git-status en laat de bestaande productieversie intact totdat nieuwe wijzigingen getest en goedgekeurd zijn.

