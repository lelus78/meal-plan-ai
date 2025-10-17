/**
 * State Manager - Gestione centralizzata dello stato dell'applicazione
 * Pattern: Observer per notificare i cambiamenti
 */

class StateManager {
    constructor() {
        this.state = {
            fullPlan: [],
            ingredientsInventory: {},
            currentWeek: 0,
            currentDay: 'Lunedì',
            apiKey: null,
            userName: 'Ambra',
            dailyCalories: 1500,
            confirmedIngredients: []
        };

        this.listeners = new Map();
        this.saveQueue = [];
        this.saveTimer = null;
    }

    /**
     * Sottoscrivi ai cambiamenti di stato
     * @param {string} key - Chiave dello stato da osservare
     * @param {Function} callback - Funzione da chiamare al cambiamento
     */
    subscribe(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        this.listeners.get(key).push(callback);

        // Restituisci funzione per rimuovere la sottoscrizione
        return () => {
            const callbacks = this.listeners.get(key);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        };
    }

    /**
     * Notifica i listener di un cambiamento
     * @param {string} key - Chiave dello stato cambiata
     * @param {*} value - Nuovo valore
     */
    notify(key, value) {
        if (this.listeners.has(key)) {
            this.listeners.get(key).forEach(callback => {
                try {
                    callback(value, this.state);
                } catch (error) {
                    console.error(`[StateManager] Error in listener for "${key}":`, error);
                }
            });
        }
    }

    /**
     * Imposta un valore nello stato
     * @param {string} key - Chiave dello stato
     * @param {*} value - Valore da impostare
     * @param {boolean} persist - Se true, salva in localStorage
     */
    set(key, value, persist = false) {
        const oldValue = this.state[key];
        this.state[key] = value;

        // Notifica i listener
        this.notify(key, value);

        // Batch save in localStorage se richiesto
        if (persist) {
            this.queueSave(key, value);
        }

        console.log(`[State] ${key}:`, oldValue, '→', value);
    }

    /**
     * Ottieni un valore dallo stato
     * @param {string} key - Chiave dello stato
     * @returns {*} Valore dello stato
     */
    get(key) {
        return this.state[key];
    }

    /**
     * Aggiorna parzialmente un oggetto nello stato
     * @param {string} key - Chiave dell'oggetto
     * @param {Object} updates - Aggiornamenti parziali
     * @param {boolean} persist - Se true, salva in localStorage
     */
    update(key, updates, persist = false) {
        if (typeof this.state[key] !== 'object') {
            console.error(`[StateManager] Cannot update non-object key: ${key}`);
            return;
        }

        this.state[key] = { ...this.state[key], ...updates };
        this.notify(key, this.state[key]);

        if (persist) {
            this.queueSave(key, this.state[key]);
        }
    }

    /**
     * Accoda un salvataggio in localStorage (batch save)
     * @param {string} key - Chiave da salvare
     * @param {*} value - Valore da salvare
     */
    queueSave(key, value) {
        this.saveQueue.push({ key, value });

        // Cancella timer precedente
        if (this.saveTimer) {
            clearTimeout(this.saveTimer);
        }

        // Salva dopo 1 secondo di inattività
        this.saveTimer = setTimeout(() => {
            this.flushSaves();
        }, 1000);
    }

    /**
     * Esegui tutti i salvataggi in coda
     */
    flushSaves() {
        if (this.saveQueue.length === 0) return;

        console.log(`[State] Flushing ${this.saveQueue.length} saves to localStorage`);

        this.saveQueue.forEach(({ key, value }) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error(`[State] Error saving ${key}:`, error);
            }
        });

        this.saveQueue = [];
        this.saveTimer = null;
    }

    /**
     * Carica lo stato da localStorage
     * @param {string} key - Chiave da caricare
     * @param {*} defaultValue - Valore di default se non trovato
     * @returns {*} Valore caricato o default
     */
    load(key, defaultValue = null) {
        try {
            const stored = localStorage.getItem(key);
            if (stored) {
                const value = JSON.parse(stored);
                this.state[key] = value;
                console.log(`[State] Loaded ${key} from localStorage`);
                return value;
            }
        } catch (error) {
            console.error(`[State] Error loading ${key}:`, error);
        }
        return defaultValue;
    }

    /**
     * Inizializza lo stato da localStorage
     */
    init() {
        this.load('fullPlan', []);
        this.load('ingredientsInventory', {});
        this.load('apiKey', null);
        this.load('userName', 'Ambra');
        this.load('dailyCalories', 1500);
        this.load('confirmed_ingredients', []);

        console.log('[StateManager] Initialized with state:', this.state);
    }

    /**
     * Pulisci tutto lo stato
     */
    clear() {
        Object.keys(this.state).forEach(key => {
            this.set(key, null);
            localStorage.removeItem(key);
        });
        console.log('[StateManager] State cleared');
    }
}

// Export singleton instance
const stateManager = new StateManager();
