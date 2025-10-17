# JavaScript Modules - Piano Alimentare AI

Architettura modulare per migliorare manutenibilità e scalabilità.

## 📁 Struttura

```
js/
├── state-manager.js      # Gestione centralizzata stato (Pattern Observer)
├── inventory-manager.js  # Gestione inventario ingredienti
├── recipe-manager.js     # Generazione ricette AI
└── README.md            # Questa documentazione
```

## 🏗️ Architettura

### State Manager (Pattern Observer)

Gestisce tutto lo stato dell'applicazione in modo centralizzato.

**Features:**
- ✅ Subscription pattern per reagire ai cambiamenti
- ✅ Batch save in localStorage (salva dopo 1s di inattività)
- ✅ Load automatico da localStorage
- ✅ Type-safe state access

**Utilizzo:**

```javascript
// Inizializza state manager
const state = new StateManager();
state.init();

// Imposta valori
state.set('userName', 'Ambra', true); // true = persist in localStorage

// Leggi valori
const userName = state.get('userName');

// Sottoscrivi a cambiamenti
const unsubscribe = state.subscribe('fullPlan', (newPlan, fullState) => {
    console.log('Piano aggiornato!', newPlan);
    renderUI();
});

// Aggiorna oggetti parzialmente
state.update('currentState', { week: 1, day: 'Martedì' }, true);

// Rimuovi sottoscrizione
unsubscribe();
```

---

### Inventory Manager

Gestisce calcolo consumo ingredienti, ordinamento e status.

**Features:**
- ✅ Caching automatico dei calcoli
- ✅ Normalizzazione nomi ingredienti
- ✅ Parse quantità con unità di misura
- ✅ Calcolo stato (OK, Basso, Esaurito, Da definire)

**Utilizzo:**

```javascript
const inventory = new InventoryManager(stateManager);

// Calcola consumo (con cache)
const result = inventory.calculateConsumption("pollo 500g, uova 6");

// Ottieni status ingrediente
const item = { initial: 500, consumed: 450 };
const status = inventory.getStatus(item);
// => { status: 'low', text: 'Basso', color: 'bg-yellow-200', emoji: '🟡' }

// Pulisci cache
inventory.clearCache();
```

---

### Recipe Manager

Gestisce generazione ricette tramite AI Gemini.

**Features:**
- ✅ Raccolta ingredienti per pasto
- ✅ Prompt generation ottimizzato
- ✅ Conversione Markdown → HTML
- ✅ Error handling robusto

**Utilizzo:**

```javascript
const recipes = new RecipeManager(stateManager);

// Genera ricette
try {
    const html = await recipes.generateRecipes('lunch', dayPlan, 'Lunedì');
    document.getElementById('recipes-content').innerHTML = html;
} catch (error) {
    console.error('Errore generazione ricette:', error);
}

// Conversione Markdown
const html = recipes.convertMarkdownToHTML('## Titolo\n\n**Bold** e *italic*');
```

---

## 🔄 Integrazione con HTML Monolitico

I moduli sono compatibili al 100% con l'HTML esistente. Per integrarli:

### Opzione 1: Script Tags (Attuale)

```html
<script src="./js/state-manager.js"></script>
<script src="./js/inventory-manager.js"></script>
<script src="./js/recipe-manager.js"></script>
<script>
    // Usa i moduli
    const state = new StateManager();
    const inventory = new InventoryManager(state);
</script>
```

### Opzione 2: ES6 Modules (Future)

```html
<script type="module">
    import { StateManager } from './js/state-manager.js';
    import { InventoryManager } from './js/inventory-manager.js';
    // ...
</script>
```

---

## 📊 Performance

### Batch Save
Invece di salvare immediatamente in localStorage, lo State Manager accoda i salvataggi e li esegue in batch dopo 1 secondo di inattività.

**Prima:**
```javascript
// 10 chiamate a localStorage.setItem()
localStorage.setItem('fullPlan', ...);
localStorage.setItem('inventory', ...);
// ... 8 volte in più
```

**Dopo:**
```javascript
// 1 sola chiamata batch dopo 1s
state.set('fullPlan', ..., true);
state.set('inventory', ..., true);
// => localStorage batch save dopo 1s
```

**Risultato:** Riduzione write a localStorage del 90%

---

## 🎯 Vantaggi Architettura Modulare

| Aspetto | Prima (Monolite) | Dopo (Modulare) |
|---------|------------------|-----------------|
| **Linee di codice** | 2500+ in 1 file | 3 moduli < 300 linee |
| **Testabilità** | Difficile | Facile (unit tests) |
| **Riusabilità** | Impossibile | Alta |
| **Manutenibilità** | Bassa | Alta |
| **Cache collision** | Frequente | Mai |
| **localStorage writes** | Molte | Batch (1s delay) |

---

## 🚀 Prossimi Step

1. ✅ State Manager implementato
2. ✅ Inventory Manager implementato
3. ✅ Recipe Manager implementato
4. ⏳ UI Manager (rendering components)
5. ⏳ API Manager (Gemini calls centralizzate)
6. ⏳ Migrazione completa da monolite a moduli

---

## 📝 Note

- I moduli sono **backwards compatible** con il codice esistente
- Possono essere usati gradualmente (migrazione incrementale)
- Pronti per TypeScript (basta rinominare .js → .ts e aggiungere types)
