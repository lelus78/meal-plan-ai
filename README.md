# 🍽️ Piano Alimentare AI - Ambra

Un sistema intelligente per la gestione del piano alimentare settimanale con IA, ottimizzato per dieta LOW-FODMAP e senza glutine.

## ✨ Caratteristiche

- 📅 **Piano settimanale automatico** generato da AI (Google Gemini)
- 🥗 **Dieta personalizzata**: LOW-FODMAP e senza glutine
- 📊 **Calcolo automatico** di calorie, proteine, carboidrati e grassi
- 📦 **Gestione inventario** ingredienti con tracking consumi
- 🛒 **Lista della spesa intelligente** con ingredienti da acquistare
- 📜 **Storico ingredienti** per riutilizzo rapido
- 🔍 **Filtri di ricerca** per trovare velocemente ingredienti
- 💾 **Salvataggio locale** di liste e storico (localStorage)
- 📱 **Completamente responsive** - funziona su desktop, tablet e smartphone
- 🍎 **Ottimizzato per iOS/iPhone**

## 🚀 Come usare

### Online (GitHub Pages)
Apri semplicemente: **[https://lelus78.github.io/piano-dieta/piano_dieta_mensile_IA.html](https://lelus78.github.io/piano-dieta/piano_dieta_mensile_IA.html)**

Il sito sarà disponibile dopo aver abilitato GitHub Pages (vedi istruzioni sotto).

### Locale

1. Scarica il file `piano_dieta_mensile_IA.html`
2. Apri il file in un browser moderno (Chrome, Firefox, Safari)
3. Oppure usa il server locale Python:
   ```bash
   python start_server.py
   ```

## 🔑 Configurazione API Key

Il sistema usa Google Gemini AI. Per utilizzarlo:

1. Vai su [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una API Key gratuita
3. Sostituisci la chiave nel file HTML alla riga 187

## 📱 Compatibilità

- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Edge
- ✅ iPhone/iPad (Safari)
- ✅ Android (Chrome)

## 🛠️ Tecnologie utilizzate

- HTML5
- JavaScript (ES6+)
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Google Gemini AI](https://ai.google.dev/) - Generazione piani alimentari
- LocalStorage API - Persistenza dati

## 📝 Funzionalità principali

### Gestione Ingredienti
- **Tab Inserimento Manuale**: Inserisci ingredienti con quantità
- **Tab Storico**: Riutilizza velocemente ingredienti usati in precedenza
- **Tab Lista Spesa**: Marca ingredienti come acquistati

### Piano Alimentare
- 5 pasti al giorno (Colazione, 2 Spuntini, Pranzo, Cena)
- Distribuzione calorica ottimizzata
- Varietà nei pasti per evitare ripetizioni
- Badge visivi per ingredienti disponibili vs. da acquistare

### Inventario
- Tracking in tempo reale delle quantità
- Codice colore per stato ingredienti (OK, Medio, Basso, Esaurito)
- Aggiornamento dinamico quando acquisti nuovi ingredienti

## 🤝 Contributi

Questo è un progetto personale per la gestione alimentare di Ambra.

## 📄 Licenza

Uso personale - Tutti i diritti riservati

## 👨‍💻 Autore

Creato con ❤️ per Ambra

---

**Nota**: Ricorda di non condividere pubblicamente la tua API Key di Google!
