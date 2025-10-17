# 📝 Changelog

Tutte le modifiche importanti al progetto saranno documentate in questo file.

Il formato è basato su [Keep a Changelog](https://keepachangelog.com/it/1.0.0/),
e questo progetto aderisce al [Semantic Versioning](https://semver.org/lang/it/).

---

## [1.0.0] - 2025-01-16

### 🎉 Rilascio Iniziale

#### ✨ Features Aggiunte
- **Sistema completo di piano alimentare settimanale** con integrazione Google Gemini AI
- **Gestione API Key personale** - Ogni utente inserisce la propria chiave
- **Modale configurazione** user-friendly per setup iniziale
- **Gestione inventario ingredienti** con tracking consumi in tempo reale
- **Lista della spesa intelligente** - Ingredienti suggeriti dall'IA separati da quelli disponibili
- **Storico ingredienti** - Salvataggio automatico ingredienti usati per riutilizzo rapido
- **Tab organizzate** nel modale ingredienti:
  - ✍️ Inserimento Manuale
  - 📜 Storico Ingredienti
  - 🛒 Lista Spesa
- **Filtri di ricerca** in tempo reale per storico e lista spesa
- **Aggiornamento dinamico inventario** - Quando si acquistano ingredienti, l'inventario si aggiorna automaticamente
- **Codice colore ingredienti** - Visualizzazione stato (OK, Medio, Basso, Esaurito)
- **Salvataggio liste ingredienti** - Possibilità di salvare e richiamare liste personali
- **Interfaccia responsive** - Ottimizzata per desktop, tablet e smartphone
- **Ottimizzazioni iOS/Safari** - Meta tag specifici per iPhone/iPad
- **Calcolo automatico macronutrienti** - Calorie, proteine, carboidrati, grassi
- **Piano LOW-FODMAP e senza glutine** - Specifico per esigenze dietetiche di Ambra
- **5 pasti al giorno** - Colazione, Spuntino Mattina, Pranzo, Spuntino Pomeriggio, Cena
- **Badge visuali** - Indicatori chiari per ingredienti disponibili vs da acquistare

#### 🔐 Sicurezza
- API Key salvata solo in localStorage (privacy garantita)
- Nessuna API Key hardcoded nel codice sorgente
- Validazione base delle API Key (controllo prefisso "AIza")
- Ogni utente usa la propria chiave personale Google

#### 🎨 UI/UX
- Design moderno con Tailwind CSS
- Animazioni smooth su hover e transizioni
- Modale API Key automatica al primo avvio
- Pulsante ⚙️ Impostazioni per gestire l'API Key
- Icone emoji per migliore UX
- Feedback visivo su tutte le azioni
- Colori coerenti e accessibili

#### 📱 Mobile
- Meta tag Apple per web app
- Interfaccia touch-friendly
- Layout responsive con grid
- Ottimizzato per Safari iOS

#### 🛠️ Tecnico
- localStorage API per persistenza dati
- Fetch API per chiamate Gemini
- Gestione errori completa
- Console logging per debugging
- Normalizzazione nomi ingredienti per evitare duplicati
- Parsing intelligente quantità (g, kg, l, ml, pezzi)

#### 📚 Documentazione
- README completo con istruzioni
- CONTRIBUTING.md con workflow Git
- TODO.md con roadmap futura
- ISTRUZIONI_IPHONE.md per risoluzione problemi iOS
- Script Python per server locale di test

#### 🚀 Deployment
- Repository GitHub pubblico: https://github.com/lelus78/meal-plan-ai
- GitHub Pages configurato
- Branch `main` per produzione
- Branch `development` per sviluppo
- Workflow Git documentato

---

## [1.1.0] - 2025-01-16 (Branch Development)

### ✨ Features Aggiunte

#### PWA - Progressive Web App
- **Manifest.webmanifest** per installazione su dispositivi mobili
- **Service Worker** per funzionamento offline
- Caching intelligente dei file per velocità e offline-first
- **Installabile come app nativa** su iOS/Android
- Meta tag ottimizzati per mobile e PWA
- Supporto shortcuts per azioni rapide

#### Rigenerazione Singolo Pasto
- **Pulsante 🔄** su ogni card pasto
- L'IA rigenera solo il pasto selezionato con alternative
- Non serve rigenerare tutta la settimana
- **Aggiornamento automatico** dell'inventario dopo rigenerazione
- Suggerimenti vari per evitare ripetizioni

#### Esportazione PDF e Stampa
- **Pulsante 🖨️ Stampa** nel menu principale
- Layout ottimizzato per stampa professionale
- Include tutti i giorni della settimana formattati
- Mostra lista della spesa completa
- Totali nutrizionali giornalieri
- Data di generazione automatica
- Page-break intelligente per stampa pulita

### 📄 File Aggiunti
- `manifest.webmanifest` - Configurazione PWA
- `sw.js` - Service Worker per offline
- `features_addon.js` - Funzioni rigenerazione e stampa
- `ICONE_PWA.md` - Guida per creare icone app

### 🔄 Changed
- Aggiunto pulsante rigenerazione su tutte le meal-card
- Aggiunto pulsante stampa nell'header
- Registrazione automatica Service Worker all'avvio

### 📝 Note
- Le icone PWA vanno create separatamente (icon-192.png e icon-512.png)
- Tutte le features sono retrocompatibili
- Nessuna breaking change

---

## [Unreleased] - Branch Development

### In Lavorazione
_Pronto per merge su main_

### Pianificato
- Vedi [TODO.md](TODO.md) per la roadmap completa

---

## Note di Versione

### Versioning
- **MAJOR** (X.0.0): Modifiche incompatibili che richiedono azioni dall'utente
- **MINOR** (0.X.0): Nuove funzionalità retrocompatibili
- **PATCH** (0.0.X): Bug fix e piccoli miglioramenti

### Categorie Changelog
- **✨ Added**: Nuove funzionalità
- **🔄 Changed**: Modifiche a funzionalità esistenti
- **⚠️ Deprecated**: Funzionalità che saranno rimosse in futuro
- **🗑️ Removed**: Funzionalità rimosse
- **🐛 Fixed**: Bug fix
- **🔐 Security**: Modifiche relative alla sicurezza
- **🎨 UI/UX**: Miglioramenti interfaccia utente
- **⚡ Performance**: Ottimizzazioni prestazioni
- **📚 Documentation**: Aggiornamenti documentazione

---

**Link Utili**:
- [Repository GitHub](https://github.com/lelus78/meal-plan-ai)
- [GitHub Pages](https://lelus78.github.io/meal-plan-ai/piano_dieta_mensile_IA.html)
- [Roadmap](TODO.md)
- [Guida Sviluppo](CONTRIBUTING.md)
