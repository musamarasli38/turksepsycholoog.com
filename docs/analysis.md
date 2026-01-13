# Projectanalyse - Turksepsycholoog.com

## 1. Context

Turksepsycholoog.com is een full-stack webplatform dat de opdrachtgever ondersteunt bij
afspraakbeheer, automatische afspraakherinneringen (sms/email), dynamische documentgeneratie en een
dashboard voor beheer en documentgeneratie.

Het doel is het ontwikkelen van een moderne, schaalbare en kostenefficiënte website die
repetitieve administratieve taken automatiseert, met behoud van bestaande tools die de cliënt
reeds gebruikt. Op langere termijn kan het platform uitgebreid worden naar een gemeenschappelijke
low-cost oplossing voor zorgverstrekkers met een gelijkaardige culturele en taalkundige doelgroep
in België en Europa.

## 2. Probleemstelling

### 2.1 Ruimte voor automatisering
De opdrachtgever ervaart vandaag meerdere manuele en tijdrovende processen, waaronder:
- Handmatig inplannen van afspraken
- Manueel versturen of onthouden van afspraakherinneringen
- Handmatig opstellen van rapportbrieven op basis van vaste sjablonen

Deze manuele workflow leidt tot:
- Tijdverlies
- Verhoogde foutgevoeligheid
- Extra cognitieve belasting voor de zorgverlener

Automatisering van deze processen kan de administratieve last aanzienlijk verminderen.


### 2.2 Beperkende bestaande platformen

De opdrachtgever heeft reeds ervaring met bestaande afspraak- en automatiseringsplatformen.
Deze platformen bieden vaak:
- Grote all-in-one pakketten
- Functionaliteiten die niet nodig zijn (eigen agenda, mobiele apps, EHR-opslag)
- Essentiële features (bv. gepersonaliseerde profielpagina) enkel in duurdere abonnementen

Dit resulteert in:
- Onnodige maandelijkse kosten
- Afhankelijkheid van meerdere tools
- Extra beheercomplexiteit

Er is nood aan een gerichte, minimale en betaalbare oplossing die focust op wat echt nodig is.

### 2.3 Behoud van bestaande tools

De opdrachtgever werkt reeds efficiënt met bestaande tools, waaronder:

- Gmail / Google Calendar (gedeelde agenda)
- OneNote voor notities
- OneDrive voor documentopslag en administratie

Een belangrijk uitgangspunt van dit project is integratie i.p.v. vervanging:
de website moet aansluiten op deze bestaande tools en niet alles willen centraliseren of dupliceren.

### 2.4 Moderne persoonlijke website

De cliënt heeft momenteel wel de nodige domein en vraagt om op eerste instantie hier een moderne persoonlijke website te maken met ruimte tot het omzetten naar een gemeenschappelijke platform voor andere cliënten. Ze heeft geen voorkeur van thema of design.

Naast automatisering wenst de opdrachtgever:

- Een moderne, professionele en responsieve website
- Een persoonlijke online aanwezigheid
- Ruimte voor toekomstige uitbreiding naar een breder platform

Er zijn geen vaste design- of thema-vereisten, wat flexibiliteit biedt in UI/UX-keuzes.

## 3. Doelgroepen

- Cliënten met een Turkse taal- en cultuurachtergrond in België en Europa
- Zelfstandige zorgverleners die hun administratie willen automatiseren in een kosteffectieve manier

## 4. Doelstellingen

### Functionele doelstellingen
- Een moderne, responsieve en uitbreidbare website
- Online afspraken kunnen boeken, wijzigen en annuleren
- Automatische afspraakherinneringen via e-mail en/of sms
- Integratie met de bestaande Gmail / Google Calendar van de zorgverlener
- Genereren van documenten op basis van sjablonen en dynamische data

### Niet-functionele doelstellingen
- GDPR-conforme verwerking van persoonsgegevens
- Basis security (HTTPS, secrets management, logging)
- Open-source oplevering met duidelijke documentatie
- Schaalbare en onderhoudbare architectuur

## 5. Scope-afbakening (MVP)
### Binnen scope
- Frontend (Next.js / React, Tailwind)
- Backend API (Node.js of Laravel)
- Database (PostgreSQL of MySQL/MariaDB)
- Afspraakbeheer
- Email- en SMS-reminders
- Agenda-integratie (Google Calendar)
- Basis documentgeneratie (geen persistente opslag)
- Unit tests en end-to-end tests
- Basis SEO, cookiebanner en privacybeleid
- Git/Github versiebeheer

### Buiten scope (niet-MVP)
- Volledig EHR-systeem
- Langdurige medische archivering
- Geavanceerde klinische of diagnostische tools
- Betalingen en facturatie
- Mobiele applicaties

## 6. Ontwikkelproces
De focus ligt op een werkende Minimum Viable Product. Er is één full-stack ontwikkelaar die de project volledig zelfstandig ontwikkelt en al bekend is met de nodige tools en technologiëen. De opdrachtgever is beschikbaar voor testing en bijsturing te geven op afgewerkte delen. Hierdoor kiezen we voor een Agile/Scrum methodologie met dagelijkse iteraties binnen een sprint (scrum-Lite / Lean), aangepast aan solo-ontwikkeling.

## 7. Toekomstige richting

Na oplevering van het MVP kan het basisproduct verder evolueren naar:
- Ondersteuning van meerdere zorgverleners
- Configuratie per zorgverlener (branding, instellingen)
- Uitbreiding naar andere talen en culturen
- Verdere automatisering via externe integraties

Deze uitbreidingen vallen buiten de huidige scope, maar worden meegenomen in de architecturale keuzes.