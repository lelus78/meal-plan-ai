# 📱 Come aprire il Piano Alimentare su iPhone

## Problema
iPhone/Safari non può aprire direttamente file HTML condivisi via AirDrop, WhatsApp o email perché non ha un browser file locale.

## ✅ Soluzioni (in ordine di facilità)

### **Soluzione 1: Usa GitHub Pages (CONSIGLIATA)** 🌐

Questa è la soluzione migliore perché entrambi potete accedere allo stesso file online.

1. **Crea un account GitHub** (se non ce l'hai già): https://github.com/signup
2. **Crea un nuovo repository pubblico** chiamato "meal-plan-ai"
3. **Carica il file** `piano_dieta_mensile_IA.html` nel repository
4. **Vai su Settings → Pages**
5. **Abilita GitHub Pages** selezionando "main branch"
6. **Dopo 1-2 minuti**, il tuo sito sarà disponibile a: `https://tuousername.github.io/meal-plan-ai/piano_dieta_mensile_IA.html`
7. **Condividi questo link** con tua moglie - funzionerà perfettamente su iPhone!

**Vantaggi**:
- ✅ Funziona su tutti i dispositivi
- ✅ Stessi dati condivisi (localStorage separato per dispositivo)
- ✅ Gratuito
- ✅ Aggiornamenti facili

---

### **Soluzione 2: Usa Netlify Drop** 🚀

Ancora più semplice di GitHub!

1. Vai su: https://app.netlify.com/drop
2. **Trascina il file HTML** nella pagina
3. **Netlify genera un link** tipo `https://random-name.netlify.app`
4. **Condividi il link** con tua moglie
5. **Puoi aggiornare** il file trascinandone una nuova versione

**Vantaggi**:
- ✅ Semplicissimo (drag & drop)
- ✅ Gratuito
- ✅ Link permanente

---

### **Soluzione 3: Usa l'app "Documents" (solo per tua moglie)** 📂

Installare un'app su iPhone che può aprire file HTML locali.

1. **Installa "Documents by Readdle"** dall'App Store (gratis)
2. **Condividi il file** via AirDrop/WhatsApp
3. **Apri il file con Documents**
4. **Tocca il file HTML** e si aprirà come pagina web

**Svantaggi**:
- ❌ Devi ricondividere il file ogni volta che lo aggiorni
- ❌ Dati localStorage separati (non sincronizzati)

---

### **Soluzione 4: Server locale temporaneo** 💻

Se hai Python installato sul tuo computer:

1. **Apri il terminale/CMD** nella cartella del file
2. **Esegui**:
   ```bash
   python -m http.server 8000
   ```
3. **Trova il tuo IP locale** (es: 192.168.1.10)
4. **Su iPhone, apri Safari** e vai a: `http://192.168.1.10:8000/piano_dieta_mensile_IA.html`

**Nota**: Funziona solo quando:
- ✅ Il computer è acceso
- ✅ Siete sulla stessa rete WiFi

---

## 🎯 Soluzione RACCOMANDATA

**Usa Netlify Drop** se vuoi qualcosa di veloce (5 minuti).
**Usa GitHub Pages** se vuoi qualcosa di più professionale e controllabile.

Entrambe le soluzioni permettono di:
- ✅ Aprire il file su iPhone senza problemi
- ✅ Condividere un semplice link
- ✅ Aggiornare facilmente il file quando serve

---

## 📝 Note importanti

1. **localStorage è separato per dispositivo**: Ogni telefono avrà il suo storico ingredienti e liste salvate
2. **API Key Google**: Assicurati che l'API key sia nel file HTML prima di caricarlo online
3. **Privacy**: Se usi GitHub Pages/Netlify, il file sarà pubblico online. Se vuoi privacy assoluta, usa la Soluzione 3 o 4

---

## ❓ Serve aiuto?

Se hai problemi, contattami e ti aiuto a configurare GitHub Pages o Netlify!
