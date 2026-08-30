# Teststrategi – Kraftly Mina sidor

## 1. Vad testar vi inte?

Vi testar inte externa bibliotek i sig, eftersom det är bibliotekens ansvar att fungera korrekt. Vi fokuserar på vår egen kod och på att vi använder de externa biblioteken på rätt sätt.

### Chart.js

Vi testar inte om Chart.js kan skapa och visa ett diagram. Däremot testar vi att vår egen kod skickar rätt data och rätt konfiguration till Chart.js.

### Vue Router

Vi testar inte Vue Routers interna funktionalitet. Däremot kan vi testa att vår kod navigerar till rätt sida när användaren utför en viss handling.

### Sammanfattning

Vi testar alltså:

* vår egen logik
* vår egen komponentfunktionalitet
* användarinteraktioner som är viktiga för applikationen
* att vi integrerar externa bibliotek på rätt sätt

Vi testar inte:

* interna funktioner i externa bibliotek
* om Chart.js fungerar som bibliotek
* om Vue Router fungerar internt

---

## 2. Testnivåer

Vi använder tre olika nivåer av tester.

### Enhetstest – Vitest

Enhetstester används när vi skapar eller ändrar en mindre funktion eller annan isolerad logik.

Exempel:

* formatering av priser
* validering
* beräkningar
* funktioner i stores

### Komponenttest – Vitest + Vue Testing Library

Komponenttester används när en komponent innehåller viktig användarinteraktion, rendering av data eller funktionalitet som behöver testas tillsammans med användargränssnittet.

Exempel:

* formulär
* knappar
* felmeddelanden
* komponenter som visar data
* användarinteraktioner

### E2E-test – Cypress

E2E-tester används för viktiga användarflöden som går genom flera sidor eller komponenter.

Exempel:

* inloggning
* navigering mellan sidor
* viktiga formulärflöden

---

## 3. Mockning av API

Vi använder samma strategi för alla tester inom respektive testnivå.

### Komponenttester

I komponenttester mockar vi API-anrop med `vi.mock`.

Det gör att testerna inte behöver använda ett riktigt API och att vi kan kontrollera vilken data komponenten får.

### E2E-tester

I E2E-tester använder vi Kraftlys mock-API.

På så sätt kan vi testa hela användarflöden utan att vara beroende av riktig produktionsdata.

---

## 4. Krav för Pull Request

En Pull Request får endast mergas när alla relevanta tester är gröna.

### Ny logik

När ny logik eller funktionalitet läggs till ska den ha relevanta tester.

### Buggfix

Varje buggfix ska ha ett regressionstest.

Regressionstestet ska visa att buggen är löst och hjälpa till att förhindra att samma bugg kommer tillbaka i framtiden.

---

## 5. Testtäckning

Vi har inget fast krav på en viss procent testtäckning, till exempel 80 %.

I stället fokuserar vi på att viktig logik och viktig funktionalitet har meningsfulla och relevanta tester.

En hög procent testtäckning garanterar inte att testerna är bra. Det viktigaste är att testerna täcker de delar av applikationen där fel skulle få stor påverkan.

---

## 6. Namngivning och placering

Testerna skrivs på engelska eftersom koden i projektet är på engelska.

Enhetstester placeras nära den kod som testas.

Exempel:

```text
src/
└── utils/
    ├── format.js
    └── format.test.js
```

På så sätt blir det tydligt vilken kod varje test hör till.

---

## 7. Testprinciper

När vi skriver tester följer vi dessa principer:

1. Vi testar vår egen kod och inte externa bibliotek.
2. Ny viktig logik ska ha relevanta tester.
3. Buggfixar ska ha regressionstester.
4. Komponenttester använder `vi.mock` för API-anrop.
5. E2E-tester använder Kraftlys mock-API.
6. Alla relevanta tester måste vara gröna innan en PR mergas.
7. Vi fokuserar på meningsfull testning i stället för ett specifikt procentkrav för coverage.

---

## 8. Testkommandon

### Köra tester

```bash
npm test
```

Används för att köra Vitest enligt projektets konfiguration.

### Köra tester en gång

```bash
npm run test:run
```

Används för att köra testerna en gång, exempelvis innan en Pull Request mergas eller i CI.

### Öppna Cypress

```bash
npm run cy:open
```

Används för att öppna Cypress och köra eller kontrollera E2E-tester.

---

## 9. Testöversikt

| Testnivå      | Verktyg                      | Används för                                                |
| ------------- | ---------------------------- | ---------------------------------------------------------- |
| Enhetstest    | Vitest                       | Funktioner och isolerad logik                              |
| Komponenttest | Vitest + Vue Testing Library | Komponenter, rendering och användarinteraktion             |
| E2E           | Cypress                      | Kritiska användarflöden över flera sidor eller komponenter |

---

## 10. Vad vi medvetet inte testar

Vi testar inte:

* externa bibliotekens interna funktionalitet
* Chart.js egen funktionalitet
* Vue Routers interna funktionalitet
* sådant som ligger utanför vår egen kodbas

Vi testar däremot att **vår kod använder dessa bibliotek korrekt**.

Målet med teststrategin är att fånga fel i vår egen kod, skydda viktig funktionalitet och göra det säkrare att ändra och vidareutveckla applikationen.