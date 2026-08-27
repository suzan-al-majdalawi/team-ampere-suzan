# Övning 1 · Test-kata i par – enhetstester på portalens logik
*Torsdag 27/8, 09:15–10:45 · Vecka 2 · Kursmål 1, 5*

## Vad ni ska göra

Ni jobbar i **par** i en klon av Kraftly-portalen (inte teamets repo – det här är sandlådan). Målet är inte att bli klara med allt, utan att skriva **många små tester snabbt** och träna rytmen *rött → grönt → refaktorera*.

**Ping-pong-regeln:** person A skriver ett test som failar. Person B skriver *minsta möjliga kod* som gör det grönt – och skriver sedan nästa failande test. A kodar. Och så vidare. Byt roll vid varje test, inte varje uppgift. Den som inte skriver *läser* det andra skriver och ställer frågor.

## Setup (5 min)

```bash
git clone <länk i Slack> kraftly-kata && cd kraftly-kata
npm install
npm test          # watch-läge – låt det ligga i en egen terminal hela passet
```

Vitest är förinstallerat. Testerna hittas automatiskt om filen heter `*.test.js` och ligger bredvid koden i `src/utils/`.

Varje test följer AAA – arrange, act, assert:

```js
import { it, expect } from 'vitest'
import { formatPrice } from './price'

it('använder svenskt decimalkomma', () => {
  const result = formatPrice(1.42)       // act
  expect(result).toBe('1,42 kr/kWh')     // assert
})
```

## Uppgifterna – i ordning, en fil per uppgift

Skriv testet **först**, se det bli rött, skriv sedan koden. Kör aldrig vidare från ett grönt test utan att fråga: *"vilket fall täcker vi inte?"*

### Kata 1 · `src/utils/user.js` – `firstName(fullName)` (uppvärmning, ~10 min)

Dashboarden gör `userStore.user.name.split(' ')[0]` – direkt i templaten. Bryt ut det.

Testa minst: `'Anna Andersson'` → `'Anna'` · ett enda ord · **`undefined`** (det är buggen som kraschar dashboarden innan datan laddats – ert test ska bevisa att den är borta).

### Kata 2 · `src/utils/format.js` – `formatAmount(kr)` och `formatKwh(value)` (~15 min)

Fakturasidan visar `{{ invoice.amount }} kr` – 1204 blir "1204 kr". Kraftlys designer vill ha "1 204 kr".

Testa minst: `412` → `'412 kr'` · `1204` → `'1 204 kr'` · `1234567` → `'1 234 567 kr'` · ören: `99.5` → `'99,50 kr'` · `undefined` → `'–'`.

> Fälla: `toLocaleString('sv-SE')` ser rätt ut men failar med *"expected '1 204 kr' to be '1 204 kr'"* – två strängar som ser identiska ut. Skillnaden är tecknet mellan 1 och 204: hårt mellanslag (U+00A0) mot vanligt. `'1 204'.charCodeAt(1)` avslöjar det. Bestäm i paret vilket ni vill ha – och gör testet till beslutet.

`formatKwh(730)` → `'730 kWh'`, avrunda decimaler.

### Kata 3 · `src/utils/invoice.js` – `invoiceStatus(invoice, today)` (~20 min)

Mock-API:et har bara två statusar: `Betald` och `Obetald`. Men fakturan F-2026-06 förföll 31 juli – den borde visas som **Förfallen**.

```js
invoiceStatus({ status: 'Obetald', due: '2026-07-31' }, new Date('2026-08-27'))  // → 'Förfallen'
```

**Obs `today`-parametern.** Skriv funktionen så att *dagens datum skickas in*. Varför? Diskutera i paret innan ni kodar: vad händer med ett test som bygger på `new Date()` när ni kör det i oktober? (Svar: det går sönder utan att koden ändrats. Tester ska vara *deterministiska*.)

**Sätt `today` till mitt på dagen i testet**, t.ex. `new Date('2026-08-27T15:30:00')` – inte `new Date('2026-08-27')`. Riktiga anrop sker klockan 15:30, inte vid midnatt, och gränsfallet "förfaller idag" avslöjar bara en naiv `<`-jämförelse om klockslaget finns med. Och: `new Date('2026-08-27')` är **UTC**-midnatt, inte svensk – på en dator väster om Greenwich är det fortfarande den 26:e. Tolka `'ÅÅÅÅ-MM-DD'` själva med `new Date(år, månad - 1, dag)` så slipper ni det. Bra kandidat för en liten `src/utils/date.js` som kata 4 också kan använda.

Testa minst: betald → `'Betald'` oavsett datum · obetald + passerad → `'Förfallen'` · obetald + **förfaller idag** → `'Obetald'` (gränsfallet!) · obetald + framtid → `'Obetald'`.
Bonus: `unpaidTotal(invoices)` – summan av allt som inte är betalt.

### Kata 4 · `src/utils/validateMove.js` – `validateMove(form, today)` (~25 min)

Flyttanmälan har `// TODO validation` – och skickar vad som helst till API:et. Skriv en validering som returnerar **ett objekt med fel per fält** (tomt objekt = giltigt):

```js
validateMove({ address: 'Solvägen 12', zip: '80267', city: 'Gävle', date: '2026-10-01', contract: 'Rörligt pris' }, today)
// → {}
validateMove({ ...valid, zip: '802 67' }, today)
// → { zip: 'Postnummer ska vara fem siffror' }
```

Regler (de står faktiskt redan i UI:t – läs sidan): alla fält ifyllda · postnummer = exakt fem siffror · datum i formatet ÅÅÅÅ-MM-DD · **minst 14 dagar fram i tiden** ("Anmälan måste göras senast 14 dagar före flytt").

Testa gränsfallet: exakt 14 dagar fram ska vara OK, 13 ska inte. Samma datumfälla som i kata 3 – jämför *dagar*, inte tidpunkter (`startOfDay`), annars blir "exakt 14 dagar" fel så fort `today` har ett klockslag.

### Stretch · `src/utils/consumption.js`

`peakMonth(months, values)` → `{ month: 'Jan', value: 730 }` · `yearlyTotal(values)` · `vsAverage(values)` = senaste månaden mot årssnittet i procent. Vad händer med tom lista?

## Kopplingen till M1

Allt ni skrev idag är **direkt användbart i teamets repo** – det är samma kodbas. Eftermiddagen handlar om att föra över det (via PR, som vanligt). M1 kräver ≥ 10 meningsfulla test – ni har förmodligen 20 efter förmiddagen. *Meningsfulla* betyder: varje test skulle fånga en riktig bugg om den återkom.

## Uppsamling 10:45 – förbered ett svar per par

1. Vilket test var svårast att formulera – och varför?
2. Vilket gränsfall hittade ni *tack vare* att ni skrev testet?