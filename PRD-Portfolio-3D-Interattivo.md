# PRD — Portfolio 3D Interattivo

> Sito web personale con scena 3D immersiva e pannello admin

| Campo | Valore |
|-------|--------|
| **Autore** | Davide Dickmann|
| **Versione** | 2.0 |
| **Data** | 16 Marzo 2026 |
| **Stato** | Draft |

---

## 1. Vision del Prodotto

Un portfolio personale che rompe gli schemi tradizionali. Al posto della classica pagina web statica, il visitatore entra in una scena 3D immersiva dove il protagonista — il developer — è al centro, circondato dalle sue passioni rappresentate come oggetti 3D tematici. Ogni passione è esplorabile con un click.

### 1.1 Obiettivo Principale

Creare un'esperienza memorabile che comunichi chi sei non solo come developer, ma come persona. Il sito deve trasmettere personalità, creatività e competenza tecnica allo stesso tempo.

### 1.2 Target Audience

- **Recruiter e hiring manager** — impressionare con un portfolio unico e tecnicamente ambizioso
- **Altri developer** — dimostrare padronanza di tecnologie 3D web e React
- **Potenziali clienti/collaboratori** — mostrare versatilità e passione per il design

---

## 2. Elemento Centrale: Il Volto 3D

### 2.1 Descrizione

Al centro della scena c'è il volto del developer, reso come modello 3D stilizzato e monocolore. Il modello deve essere riconoscibile: stessi tratti del viso, stessa struttura, con il cappellino indossato nella foto di riferimento.

### 2.2 Foto di Riferimento

*File: IMG_8875.png — Selfie frontale in spiaggia, con cappellino scuro e felpa blu. Il viso è ben illuminato e centrato.*

### 2.3 Specifiche del Modello 3D

| Proprietà | Requisito |
|-----------|-----------|
| **Stile** | Low-poly stilizzato o smooth minimal — NO iper-realistico |
| **Colore** | Monocolore verdone scuro (`#1B4332` o simile). Variazioni di tono per profondità e ombre, ma palette monocromatica |
| **Cappellino** | Deve essere presente e riconoscibile, stesso orientamento della foto |
| **Inquadratura** | Busto/testa frontale, leggermente angolato (3/4 leggero) |
| **Formato export** | `.GLB` o `.GLTF` (compatibile Three.js / Spline) |
| **Poligoni** | Ottimizzato per web — max 50k triangoli |
| **Animazione** | Leggero "respiro" (floating up/down) + lenta rotazione Y |

### 2.4 Tool per la Generazione

Tutto il workflow 3D si fa con un unico tool: **Meshy AI** (meshy.ai). Non serve saper modellare o usare Blender.

1. **Step 1 — Prepara la foto:** Rimuovi lo sfondo dalla foto di riferimento (IMG_8875.png). Meshy ha un tool integrato per farlo, oppure usa remove.bg. Serve una foto frontale con sfondo pulito.
2. **Step 2 — Image to 3D:** Vai su Meshy → Image to 3D, carica la foto senza sfondo. Se hai altre foto da angolazioni diverse, usa la funzione multi-view (fino a 3 foto aggiuntive) per un risultato più dettagliato e accurato.
3. **Step 3 — Stilizza e colora:** Una volta generato il modello base, usa la funzione Retexture/Stylize di Meshy con il prompt: `"monochrome dark green (#1B4332), minimal, stylized, low poly, matte finish"`. Questo applica il look monocromatico verdone scuro direttamente sul modello.
4. **Step 4 — Remesh e esporta:** Usa il Remesh integrato di Meshy per ottimizzare i poligoni (target: < 30k triangoli per il web). Esporta come `.GLB` (target dimensione file: < 2MB).

> **Suggerimenti per risultati migliori:**
> - Genera più versioni e scegli la migliore — ogni generazione può variare
> - Se il retro del modello non è perfetto, usa multi-view con foto da più angolazioni
> - Se il cappellino non viene riconosciuto bene, prova ad aggiungere nel prompt di texturing: `"wearing dark cap/hat"`

---

## 3. Oggetti 3D delle Passioni

Intorno al volto centrale, fluttuano 4 oggetti 3D, ognuno rappresentante una passione. Gli oggetti sono posizionati in punti fissi (non orbitano) e hanno un leggero movimento di floating.

**Generazione degli oggetti:** Tutti gli oggetti si creano con Meshy AI → Text to 3D. Per ogni oggetto, usare il prompt indicato nella tabella. Esportare in `.GLB` e ottimizzare con Remesh (target < 10k triangoli per oggetto, < 500KB per file).

### 3.1 Fotografia

| Proprietà | Valore |
|-----------|--------|
| **Oggetto 3D** | Macchina fotografica vintage / reflex stilizzata |
| **Colore** | Monocolore ambra caldo (`#E8A87C`) — stesso stile del volto |
| **Posizione** | In alto a sinistra del volto |
| **Animazione idle** | Leggero tilt avanti/indietro, come se scattasse |
| **Hover** | Si illumina, lieve zoom-in, linea di connessione al centro brilla |
| **Click** | Espande pannello laterale con i progetti fotografici |
| **Prompt Meshy** | `"vintage film camera, low poly, monochrome warm amber, stylized minimal, matte"` |

### 3.2 Videogiochi

| Proprietà | Valore |
|-----------|--------|
| **Oggetto 3D** | Game controller / joystick stilizzato |
| **Colore** | Monocolore viola (`#7C5CFC`) |
| **Posizione** | In alto a destra del volto |
| **Animazione idle** | Leggero dondolio laterale, come se venisse usato |
| **Hover** | Si illumina, lieve zoom-in, linea di connessione brilla |
| **Click** | Espande pannello con progetti gaming |
| **Prompt Meshy** | `"game controller joystick, low poly, monochrome purple, stylized minimal, matte"` |

### 3.3 Grafica

| Proprietà | Valore |
|-----------|--------|
| **Oggetto 3D** | Tavoletta grafica con pennino / pennello 3D |
| **Colore** | Monocolore rosso corallo (`#FF6B6B`) |
| **Posizione** | In basso a sinistra del volto |
| **Animazione idle** | Pennino che "disegna" lievemente nell'aria |
| **Hover** | Si illumina, lieve zoom-in, linea di connessione brilla |
| **Click** | Espande pannello con lavori grafici |
| **Prompt Meshy** | `"graphic tablet with stylus pen, low poly, monochrome coral red, stylized minimal, matte"` |

### 3.4 Cucina

| Proprietà | Valore |
|-----------|--------|
| **Oggetto 3D** | Pentolino / coltello da chef / cappello da chef stilizzato |
| **Colore** | Monocolore verde smeraldo (`#2ED573`) |
| **Posizione** | In basso a destra del volto |
| **Animazione idle** | Leggera "fumata" di vapore (particelle) sopra |
| **Hover** | Si illumina, lieve zoom-in, linea di connessione brilla |
| **Click** | Espande pannello con progetti culinari |
| **Prompt Meshy** | `"cooking pot with chef hat, low poly, monochrome emerald green, stylized minimal, matte"` |

---

## 4. Interazioni e UX

### 4.1 Comportamento Generale della Scena

- La scena è statica: gli oggetti non orbitano, restano in posizioni fisse intorno al volto
- Ogni oggetto ha un leggero movimento di "respiro" (floating su/giù) con ritmo unico
- Linee curve sottili collegano ogni oggetto al volto centrale (connessione visiva)
- Particelle di sfondo colorate che fluttuano lentamente per dare profondità
- Camera con leggero sway (ondeggiamento) per sensazione organica

### 4.2 Stato Hover su Oggetto

- L'oggetto si ingrandisce leggermente (scale 1.0 → 1.25)
- L'emissive intensity aumenta (glow effect)
- La linea di connessione al centro diventa più visibile
- Un label 2D (nome della passione + emoji) appare/si intensifica sopra l'oggetto
- Cursore → pointer

### 4.3 Stato Click / Selezione

- Pannello laterale slide-in da destra con:
  - Emoji + nome passione + descrizione breve
  - Lista dei progetti per quella passione (titolo + descrizione breve)
  - Ogni progetto è cliccabile per ulteriori dettagli
- Animazione d'entrata: slide + fade con stagger sui singoli progetti
- Click su sfondo o tasto "X" chiude il pannello

### 4.4 Responsive Behavior

- **Desktop (>1024px):** Scena 3D a tutta pagina, pannello laterale a destra
- **Tablet (768-1024px):** Scena 3D a tutta pagina, pannello dal basso (bottom sheet)
- **Mobile (<768px):** Scena 3D semplificata (meno particelle), pannello full-screen overlay. Valutare fallback 2D se performance insufficiente.

---

## 5. Design System

### 5.1 Palette Colori

| Ruolo | Colore | Uso |
|-------|--------|-----|
| **Background** | `#050510` | Sfondo scena 3D — quasi nero con riflesso blu |
| **Volto 3D** | `#1B4332` | Verdone scuro monocolore — identità principale |
| **Fotografia** | `#E8A87C` | Ambra caldo — macchina fotografica |
| **Videogiochi** | `#7C5CFC` | Viola elettrico — controller |
| **Grafica** | `#FF6B6B` | Rosso corallo — pennino/tavoletta |
| **Cucina** | `#2ED573` | Verde smeraldo — pentolino/chef |
| **Testo primario** | `#FFFFFF` | Titoli e testo in overlay |
| **Testo secondario** | `#555555` | Descrizioni e label minori |
| **Linee / accenti** | `#7C5CFC` @ 10-20% | Connessioni, orbit paths, ring attorno alla testa |

### 5.2 Tipografia

- **Font principale:** Outfit (Google Fonts) — moderno, geometrico, leggibile
- **Titolo nome:** 26px, weight 700, gradient bianco → verdone
- **Sottotitolo ("Software Developer"):** 12px, uppercase, letter-spacing 0.1em, colore #444
- **Label passioni:** 12px, uppercase, letter-spacing 0.06em, colore della passione o #555

### 5.3 Effetti Visivi

- Glass morphism: pannelli con background rgba + backdrop-filter blur
- Glow: emissive materials sugli oggetti + drop-shadow sulle emoji
- Particelle additive blending per sfondo cosmico
- Fog esponenziale per dare profondità alla scena
- Transizioni: `cubic-bezier(0.16, 1, 0.3, 1)` — overshoot morbido

---

## 6. Stack Tecnologico

| Layer | Tecnologia | Note |
|-------|-----------|------|
| **Framework** | Next.js 14+ (App Router) | SSR per SEO, Server Actions per API |
| **3D Editor** | Spline (spline.design) | Editor visuale per creare la scena 3D |
| **3D Runtime** | @splinetool/react-spline | Integrazione React della scena Spline |
| **Alternativa 3D** | React Three Fiber + drei | Se serve più controllo programmatico |
| **ORM** | Prisma | Type-safe, migrations, schema dichiarativo |
| **Database** | PostgreSQL (Supabase) | Free tier generoso, hosted, dashboard |
| **Auth Admin** | NextAuth.js v5 | Login admin con credenziali o GitHub OAuth |
| **File Storage** | Supabase Storage | Upload immagini + modelli .GLB |
| **Styling** | Tailwind CSS | Utility-first per overlay UI e admin |
| **UI Admin** | shadcn/ui | Componenti pronti per form, tabelle, dialog |
| **Animazioni UI** | Framer Motion | Pannelli, transizioni, stagger |
| **Validazione** | Zod | Schema validation per form e API |
| **Font** | Google Fonts (Outfit) | Caricamento via next/font |
| **Deploy** | Vercel | Integrazione nativa con Next.js |
| **Modello 3D volto** | Meshy AI (Image to 3D) | Foto → modello 3D → stilizza → esporta .GLB |
| **Oggetti 3D** | Meshy AI (Text to 3D) | Prompt testuale → modello 3D → esporta .GLB |

### 6.1 Struttura Progetto Next.js

```
app/
  layout.tsx                    — Layout globale, font, metadata
  page.tsx                      — Home: scena 3D + overlay UI
  passions/
    [slug]/page.tsx             — Pagina dettaglio per ogni passione
  admin/
    layout.tsx                  — Layout admin (sidebar + auth check)
    page.tsx                    — Dashboard admin (overview)
    passions/
      page.tsx                  — Lista passioni (CRUD)
      [id]/edit/page.tsx        — Modifica passione
      new/page.tsx              — Nuova passione
    projects/
      page.tsx                  — Lista tutti i progetti
      [id]/edit/page.tsx        — Modifica progetto
      new/page.tsx              — Nuovo progetto
    settings/page.tsx           — Impostazioni sito (nome, bio, social)
  api/
    auth/[...nextauth]/route.ts — NextAuth endpoint
    upload/route.ts             — Upload file a Supabase Storage

components/
  scene/
    Scene3D.tsx                 — Wrapper Spline / R3F
    PassionNode.tsx             — Singolo oggetto passione nella scena
  ui/
    PassionPanel.tsx            — Pannello slide-in laterale
    PassionLabels.tsx           — Label 2D sovrapposti alla scena
    Header.tsx                  — Nome + titolo
  admin/
    Sidebar.tsx                 — Navigazione admin
    PassionForm.tsx             — Form crea/modifica passione
    ProjectForm.tsx             — Form crea/modifica progetto
    FileUploader.tsx            — Upload immagini e modelli 3D
    ModelPreview.tsx            — Preview 3D del modello .GLB

lib/
  prisma.ts                     — Client Prisma singleton
  supabase.ts                   — Client Supabase per storage
  auth.ts                       — Configurazione NextAuth
  validators.ts                 — Schema Zod per form

prisma/
  schema.prisma                 — Schema del database
  seed.ts                       — Dati iniziali (seed)
```

---

## 7. Backend e Pannello Admin

### 7.1 Architettura

Il backend utilizza le Server Actions di Next.js (App Router) per le operazioni CRUD, Prisma come ORM per interagire con PostgreSQL su Supabase, e Supabase Storage per i file (immagini progetti + modelli .GLB degli oggetti 3D). L'accesso all'area admin è protetto da NextAuth.js, con un singolo utente admin autenticato via credenziali o GitHub OAuth.

### 7.2 Schema Database (Prisma)

Lo schema Prisma definisce le entità principali del portfolio. Le passioni sono completamente dinamiche: puoi aggiungerne, modificarle o rimuoverle dall'admin senza toccare codice.

```prisma
// prisma/schema.prisma

model SiteConfig {
  id            String   @id @default("main")
  ownerName     String                         // Nome visualizzato
  title         String   @default("Software Developer")
  bio           String?                        // Bio / tagline
  avatarUrl     String?                        // URL modello 3D volto (.GLB)
  githubUrl     String?
  linkedinUrl   String?
  instagramUrl  String?
  emailContact  String?
  updatedAt     DateTime @updatedAt
}

model Passion {
  id          String    @id @default(cuid())
  name        String                         // es: "Fotografia"
  slug        String    @unique              // es: "fotografia"
  description String                         // Breve descrizione
  emoji       String                         // es: "📷"
  color       String                         // Hex, es: "#E8A87C"
  modelUrl    String?                        // URL modello 3D (.GLB)
  positionX   Float     @default(0)          // Posizione nella scena 3D
  positionY   Float     @default(0)
  positionZ   Float     @default(0)
  sortOrder   Int       @default(0)          // Ordinamento
  isVisible   Boolean   @default(true)       // Mostra/nascondi
  projects    Project[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Project {
  id          String   @id @default(cuid())
  title       String                         // es: "Street Photography Milano"
  slug        String   @unique
  description String                         // Descrizione breve
  longDesc    String?  @db.Text              // Descrizione completa (markdown)
  coverImage  String?                        // URL immagine copertina
  images      String[]                       // Array URL immagini galleria
  externalUrl String?                        // Link esterno (GitHub, live)
  tags        String[]                       // Tag liberi
  isFeatured  Boolean  @default(false)       // In evidenza
  isVisible   Boolean  @default(true)        // Mostra/nascondi
  sortOrder   Int      @default(0)
  passionId   String
  passion     Passion  @relation(fields: [passionId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 7.3 Relazioni tra Entità

- **SiteConfig** — record singolo con le info generali del sito (nome, bio, link social, URL del modello 3D del volto)
- **Passion** — ogni passione/ambito. Contiene il colore, la posizione 3D, il modello 3D dell'oggetto, e ha molti Project collegati
- **Project** — singolo progetto dentro una passione. Ha immagini, descrizione, link. Se cancelli una passione, i progetti vengono cancellati a cascata (`onDelete: Cascade`)

### 7.4 Supabase Storage — Buckets

I file (immagini e modelli 3D) vengono salvati su Supabase Storage, organizzati in bucket separati:

| Bucket | Tipi file | Contenuto |
|--------|-----------|-----------|
| `avatars` | .glb, .gltf | Modello 3D del volto centrale |
| `passion-models` | .glb, .gltf | Modelli 3D degli oggetti passione (macchina foto, controller, ecc.) |
| `project-images` | .jpg, .png, .webp | Immagini copertina e galleria dei progetti |

Tutti i bucket sono privati in scrittura (solo admin autenticato) e pubblici in lettura (gli URL sono accessibili dal frontend per renderizzare la scena 3D).

### 7.5 Pannello Admin — Funzionalità

L'admin è accessibile all'URL `/admin` e protetto da autenticazione. Solo l'utente admin può accedere. L'interfaccia usa shadcn/ui per un look pulito e professionale.

#### 7.5.1 Dashboard

- Overview con contatori: numero passioni, numero progetti totali, spazio storage usato
- Link rapidi a "Aggiungi passione" e "Aggiungi progetto"

#### 7.5.2 Gestione Passioni

- Lista passioni con drag-and-drop per riordinare (`sortOrder`)
- Form crea/modifica con campi: nome, slug (auto-generato), descrizione, emoji, colore (color picker), posizione 3D (X, Y, Z con slider), visibilità (toggle)
- Upload modello 3D: uploader con preview inline del .GLB (mini viewer Three.js)
- Bottone elimina con conferma modale (avvisa che cancella anche i progetti)

#### 7.5.3 Gestione Progetti

- Lista progetti filtrabile per passione
- Form crea/modifica con campi: titolo, slug, descrizione breve, descrizione completa (editor markdown), immagine copertina (upload), galleria immagini (upload multiplo), link esterno, tag, featured (toggle), visibilità
- Selezione passione di appartenenza (dropdown)
- Preview immagini caricate con possibilità di riordino e cancellazione

#### 7.5.4 Impostazioni Sito

- Nome, titolo, bio
- Link social (GitHub, LinkedIn, Instagram, email)
- Upload/cambia modello 3D del volto con preview

### 7.6 API / Server Actions

Le operazioni CRUD usano le Server Actions di Next.js (no API REST tradizionali). Questo semplifica il codice e mantiene tutto type-safe con TypeScript e Zod.

| Server Action | Descrizione |
|---------------|-------------|
| `getPassions()` | Ritorna tutte le passioni visibili con progetti (usata dal frontend 3D) |
| `getPassionBySlug(slug)` | Ritorna passione singola con tutti i progetti |
| `createPassion(data)` | Crea nuova passione (admin only) |
| `updatePassion(id, data)` | Modifica passione esistente (admin only) |
| `deletePassion(id)` | Elimina passione + progetti a cascata (admin only) |
| `reorderPassions(ids[])` | Aggiorna sortOrder (admin only) |
| `createProject(data)` | Crea nuovo progetto (admin only) |
| `updateProject(id, data)` | Modifica progetto esistente (admin only) |
| `deleteProject(id)` | Elimina progetto (admin only) |
| `updateSiteConfig(data)` | Aggiorna impostazioni sito (admin only) |
| `uploadFile(bucket, file)` | Upload file a Supabase Storage, ritorna URL pubblico |
| `deleteFile(bucket, path)` | Elimina file da Supabase Storage |

### 7.7 Autenticazione Admin

- **Provider:** NextAuth.js v5 con Credentials provider (email + password) oppure GitHub OAuth
- **Utente singolo:** solo tu puoi accedere. L'email admin è configurata tramite variabile d'ambiente `ADMIN_EMAIL`
- **Middleware:** tutte le route `/admin/*` sono protette. Se non autenticato, redirect a `/admin/login`
- **Server Actions protette:** ogni action di scrittura verifica la sessione con `getServerSession()` prima di eseguire

### 7.8 Flusso Dati: Admin → Frontend 3D

Il flusso è semplice e sfrutta le capacità di Next.js App Router:

1. L'admin crea/modifica una passione e uploada il modello 3D (.GLB) e le immagini dei progetti
2. I dati vengono salvati in PostgreSQL (via Prisma), i file in Supabase Storage
3. La home page (Server Component) chiama `getPassions()` per ottenere i dati aggiornati
4. La scena 3D riceve i dati come props e carica i modelli .GLB dalle URL di Supabase Storage
5. I dati vengono cached con Next.js ISR (revalidate ogni 60 secondi) per performance

---

## 8. Roadmap di Sviluppo

### Fase 1 — Setup Progetto e 3D Assets (Settimana 1-2)

1. Crea account Meshy AI (meshy.ai) — piano gratuito per iniziare
2. Genera il modello 3D del volto: rimuovi sfondo dalla foto → Image to 3D → Retexture monocolore verdone → Remesh → Esporta .GLB
3. Genera i 4 oggetti 3D delle passioni con Text to 3D (usa i prompt nel PRD) → Esporta .GLB
4. Setup Next.js + Tailwind + Prisma + Supabase + NextAuth + deploy Vercel
5. Configura schema Prisma + prima migration + seed dati iniziali
6. Carica i modelli .GLB su Supabase Storage (bucket `avatars` e `passion-models`)

### Fase 2 — Backend e Admin Panel (Settimana 2-3)

1. Configura NextAuth con login admin
2. Crea le Server Actions per CRUD passioni e progetti
3. Configura Supabase Storage (bucket + upload route)
4. Costruisci admin panel: dashboard, form passioni, form progetti
5. Implementa upload immagini e modelli 3D con preview

### Fase 3 — Scena 3D (Settimana 3-4)

1. Costruisci la scena 3D (Spline o R3F) con dati dinamici dal DB
2. Carica modelli .GLB dinamicamente dalle URL Supabase
3. Animazioni idle, particelle, luci, fog
4. Hover + click con pannello laterale dinamico

### Fase 4 — Interattività e Contenuti (Settimana 4-5)

1. Pagine dettaglio progetto con galleria immagini
2. Popola i dati reali dei progetti tramite admin panel
3. Label 2D sovrapposti alla scena (sincronizzati con DB)
4. Drag-and-drop riordinamento passioni nell'admin

### Fase 5 — Polish e Deploy (Settimana 5-6)

1. Responsive: adatta per tablet e mobile
2. Performance: lazy loading modelli, ISR, riduzione particelle su mobile
3. SEO: metadata dinamici da SiteConfig, Open Graph, sitemap
4. Test cross-browser e test admin panel
5. Deploy finale su Vercel + dominio custom

---

## 9. Performance Requirements

| Metrica | Target |
|---------|--------|
| **First Contentful Paint** | < 1.5s |
| **3D Scene Load** | < 3s su connessione 4G |
| **FPS scena 3D** | 60fps su desktop, 30fps+ su mobile |
| **Dimensione totale modelli GLB** | < 5MB combinati |
| **Lighthouse Performance Score** | > 80 |
| **Bundle JS (senza 3D)** | < 200KB gzipped |

---

## 10. Da Definire (Action Items)

Elementi che necessitano input dal developer per completare il PRD:

| # | Item | Stato |
|---|------|-------|
| 1 | Nome completo per l'header del sito | **DA FORNIRE** |
| 2 | Lista progetti reali per ogni passione (2-3 per categoria) | **DA FORNIRE** |
| 3 | Breve bio / tagline personale | **DA FORNIRE** |
| 4 | Link social (GitHub, LinkedIn, Instagram, etc.) | **DA FORNIRE** |
| 5 | Dominio/sottodominio per il portfolio | **DA FORNIRE** |
| 6 | Preferenza stile volto: low-poly geometrico vs smooth minimal | **DA DECIDERE** |
| 7 | Sezioni aggiuntive? (About, Contact, CV, Blog) | **DA DECIDERE** |
| 8 | Creare account Meshy AI (meshy.ai) — piano gratuito | **DA FARE** |
| 9 | Progetto Supabase "portfolio" | **FATTO ✅** |
| 10 | Configurare bucket Supabase Storage (avatars, passion-models, project-images) | **DA FARE** |
| 11 | Email e password per login admin panel | **DA FORNIRE** |
| 12 | Provider auth preferito: credenziali semplici o GitHub OAuth? | **DA DECIDERE** |

---

*Fine del documento — v2.0*
