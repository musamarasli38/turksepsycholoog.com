# Sprint Logs - Turksepsycholoog.com

## Sprint 1 – Frontend MVP & Internationalisatie
**Periode:** 14/01/26 - 20/01/26  
**Sprint doel:** Technische basis leggen + volledige frontend MVP met i18n

---

### Day 1 – 14/01/26

**Vandaag gepland:**
- Architecturale keuze documenteren
- Node.js backend skeleton opzetten
- Basis health endpoint
- Start DB schema
- Werkende production opzetten

**Uitgevoerd:**
- Backend beslist op Node.js
- Oude backend verwijderd
- Nieuwe branch `develop` aangemaakt
- Project analysis document aangevuld

**Blokkades:**
- Eerste twee issues in GitHub per ongeluk verwijderd

**Reflectie:**
- Focus op gekende tools (Node.js i.p.v. Laravel)
- Zoeken naar tools dat werk kan versnellen

---

### Day 2 – 15/01/26


**Vandaag gepland:**
- Laravel backend netjes verwijderen
- Zapier-automatisering voorbereiden
- Google Calendar OAuth setup (feature)
- Push appointment to calendar (feature)
- Email reminder integration (feature)
- Appointment model + API (create/cancel/update) (issues #10 e.a.)

**Uitgevoerd:**
- Laravel backend opruimen niet gelukt; setup bleef hangen
- Veel tijd verloren aan project setup en tooling
- Lean keuze: automatisering (afspraken/reminders) verplaatsen naar Google Workspace/Zapier i.p.v. custom code
- Beslist om genoemde issues te wijzigen/annuleren

**Blokkades:**
- Laravel removal + setup frictie
- OAuth/Calendar setup niet rond gekregen

**Reflectie:**
- Tijdverlies op infrastructuur -> focus op core waarde
- Lean pivot: bestaande tools gebruiken voor afspraken en reminders
- Issues herprioriteren i.p.v. alles zelf bouwen

---

### Day 3 – 16/01/26

**Vandaag gepland:**
- External appointment tool research and setup (nieuw issue)

**Uitgevoerd:**
- Tijd beperkt; geen code-push gedaan
- Onderzoek gedaan naar meertalige afspraak/agenda tools (4 tools getest)
- Calendly geselecteerd: gratis tier met nodige functies, beste fit ondanks geen Turks

**Blokkades:**
- Geen tijd; geen commit/push

**Reflectie:**
- Research-dag zonder output; keuze voor Calendly voorkomt custom build

---

### Day 4 – 17/01/26

**Vandaag gepland:**
- Backend eindelijk afronden (Node.js setup)
- Internationalisatie (i18n) implementeren (nieuw issue)
- Database opzetten
- External appointment tool research and setup (nieuw issue)

**Uitgevoerd:**
- Node_modules per ongeluk mee gepusht door foutieve folderstructuur/.gitignore
- Lokale develop branch liep uit sync met remote; force push nodig
- Alle node_modules manueel verwijderd en project opnieuw gecloned
- Branches terug gesynchroniseerd op beide toestellen
- Calendly keuze bevestigd; setup voorbereid voor integratie
- DB opgezet voor backend in supabase, profiles, pages, contact_messages en page_translations tables aangemaakt
- admin opgezet

**Blokkades:**
- Node_modules in git; foutieve .gitignore locatie
- Lokale/remote branch mismatch; moest force pushen
- Context switch tussen twee machines vertraagde afronding

**Reflectie:**
- next-intl heeft specifieke patronen die gevolgd moeten worden
- Aligned implementation with official example-app-router
- setRequestLocale cruciaal voor correcte locale context
- Calendly biedt genoeg functies; geen Turks maar aanvaardbaar voor MVP
- Git hygiëne bewaken: juiste .gitignore en folderstructuur vóór commits
- Werken op meerdere machines vergt strikte branch sync

---

### Day 5 – 18/01/26

**Vandaag gepland:**
- Offline dag (familieverplichtingen)

**Uitgevoerd:**
- Geen werkzaamheden (alleen kort met Calendly gespeeld, geen commit)

**Blokkades:**
- Geen; dag niet gewerkt

**Reflectie:**
- Rustdag; geen voortgang

---

### Day 6 – 19/01/26

**Vandaag gepland:**
- Privacy policy issues
- Frontend content
- Internationalization

**Uitgevoerd:**
- Next.js versie gedowngraded i.v.m. problemen met laatste release
- Hero content component uitgewerkt
- Calendly iframe element toegevoegd
- Calendly + Zapier + smstools flow opgezet: afspraken via Calendly → Google Calendar met telefoonnummer voor SMS reminders
- Onderzoek gedaan naar i18n aanpak; nog niet gestart met implementatie (eerst content afronden)

**Blokkades:**
- Versie-issues met recente Next.js release vereisten downgrade

**Reflectie:**
- Eerst content klaarzetten vóór multilanguage design
- Volgende stap: i18n aanpak uitvoeren na content-stabilisatie

---

### Day 7 – 20/01/26

**Vandaag gepland:**
- About me, Contact en Home aanvullen met relevante inhoud
- Privacy Policy, Cookie Policy, GDPR pagina's toevoegen
- Internationalisatie afronden (routing, middleware, translations, language switcher)
- External appointment tool linken aan cta buttons

**Uitgevoerd:**
- next-intl volledige setup afgerond: routing (/nl, /tr), middleware, request config, translations (nl/tr), language switcher werkend
- PrivacyPolicy, CookiePolicy, GDPRPolicy
- Menu component klaar met talen-switch en CTA naar Calendly
- Kleine responsive tweaks toegepast

**Blokkades:**
- Eerder: circular dependency bij i18n (opgelost); Tailwind default grays op headings (opgelost)

**Reflectie:**
- i18n alleen stabiel na correcte locale tagging (setRequestLocale) en middleware config
- Lean keuze om externe tools (Calendly/Zapier/smstools) te gebruiken versnelt MVP

---

## Sprint Review

**Behaalde doelen:**
- Volledige frontend MVP met alle pagina's  
- Internationalisatie NL/TR volledig werkend  
- Afsprakenbeheer en sms reminders automatisatie
- GDPR/Privacy compliance pagina's
- Responsive design met Tailwind  
- Professional moderne website 

**Niet behaald:**
- Database uitwerking (verschoven naar Sprint 2)
- Afspraakbeheer backend (verschoven naar Sprint 2)
- Document generatie met bijhorende dashboard en user auth (Nog geen zekerheid over uitvoering)
- Backend API (verschoven naar Sprint 2)


**Technische debt:**
- Readme en documentatie nog niet volledig
- Geen unit tests yet
- Geen E2E tests yet

**Lessons learned:**
1. Next.js App Router + next-intl specifieke setup met locale in subpath
2. Client/server component scheiding oppassen voor bepaalde hooks
3. AI agents zeer handig, gebruikt bij inhoud genereren, vertalen, database querries opzetten
4. AI agents niet altijd betrouwbaar, documentatie van gebruikte tools nakijken voor correcte uitvoering
5. Stabiele ontwikkelingsomgeving is key
6. Agile/Lean aanpak is zeer nuttig om snel keuzes te maken en vooruitgang te boeken bij problemen of twijfel, ook focus verbeteren van gekende technologiën zoals next.js in combinatie met verbetering van werkproces door gebruik van ai tools

---

## Sprint 2 Planning (Preview)

**Sprint doel:** Dashboard Documentgeneratie + Backend API (authenticatie) + Database

**Backlog items:**
- Authentication voor dashboard
- Uitwerking backend
- Unit tests voor backend
- API documentatie
- Frontend documentatie

