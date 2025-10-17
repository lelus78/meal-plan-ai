/**
 * Inventory Manager - Gestione inventario ingredienti
 * Gestisce calcolo consumo, ordinamento, e rendering tabella
 */

class InventoryManager {
    constructor(stateManager) {
        this.state = stateManager;
        this.sortBy = 'name';
        this.sortOrder = 'asc';
        this.cache = new Map();
    }

    /**
     * Normalizza nome ingrediente
     */
    normalizeName(name) {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, ' ')
            .replace(/seche/gi, 'secche')
            .trim();
    }

    /**
     * Parse ingredienti iniziali da testo
     */
    parseIngredients(text) {
        const ingredients = {};
        const lines = text.split(',').map(s => s.trim());

        lines.forEach(line => {
            const match = line.match(/^(.+?)\s+(\d+(?:\.\d+)?)\s*(g|kg|l|ml)?$/i);
            if (match) {
                let name = this.normalizeName(match[1]);
                let quantity = parseFloat(match[2]);
                const unit = match[3]?.toLowerCase();

                // Converti kg in g
                if (unit === 'kg') quantity *= 1000;

                ingredients[name] = {
                    initial: quantity,
                    originalName: match[1].trim()
                };
            } else {
                const name = this.normalizeName(line);
                ingredients[name] = {
                    initial: 0,
                    originalName: line.trim()
                };
            }
        });

        return ingredients;
    }

    /**
     * Calcola consumo ingredienti (con cache)
     */
    calculateConsumption(initialIngredientsText) {
        console.log("🔄 Calculating ingredient consumption...");

        // Cache key
        const fullPlan = this.state.get('fullPlan');
        const cacheKey = `calc_${initialIngredientsText}_${JSON.stringify(fullPlan).substring(0, 100)}`;

        // Check cache
        if (this.cache.has(cacheKey)) {
            console.log("[PERF] Using cached calculation");
            const cached = this.cache.get(cacheKey);
            this.state.set('ingredientsInventory', cached, true);
            return cached;
        }

        // Parse initial ingredients
        const initialIngredients = initialIngredientsText
            ? this.parseIngredients(initialIngredientsText)
            : {};

        const inventory = {};

        // First pass: collect ALL ingredients from plan
        fullPlan.forEach(week => {
            ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'].forEach(day => {
                const dayPlan = week[day];
                if (!dayPlan) return;

                ['Colazione', 'Spuntino Mattina', 'Pranzo', 'Spuntino Pomeriggio', 'Cena'].forEach(mealName => {
                    const meal = dayPlan[mealName];
                    if (!meal || !meal.items) return;

                    meal.items.forEach(item => {
                        const ingredientName = this.normalizeName(item.name);
                        const initialQty = initialIngredients[ingredientName]?.initial || 0;

                        if (!inventory[ingredientName]) {
                            inventory[ingredientName] = {
                                initial: initialQty,
                                consumed: 0,
                                originalName: item.name
                            };
                        }
                    });
                });
            });
        });

        // Second pass: calculate consumption
        fullPlan.forEach(week => {
            ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'].forEach(day => {
                const dayPlan = week[day];
                if (!dayPlan) return;

                ['Colazione', 'Spuntino Mattina', 'Pranzo', 'Spuntino Pomeriggio', 'Cena'].forEach(mealName => {
                    const meal = dayPlan[mealName];
                    if (!meal || !meal.items) return;

                    meal.items.forEach(item => {
                        const ingredientName = this.normalizeName(item.name);
                        if (inventory[ingredientName]) {
                            inventory[ingredientName].consumed += item.quantity || 0;
                        }
                    });
                });
            });
        });

        // Save to cache
        this.cache.set(cacheKey, inventory);

        // Save to state
        this.state.set('ingredientsInventory', inventory, true);

        console.log(`📊 Inventory calculated: ${Object.keys(inventory).length} ingredients`);
        return inventory;
    }

    /**
     * Pulisci cache calcoli
     */
    clearCache() {
        this.cache.clear();
        console.log('[InventoryManager] Cache cleared');
    }

    /**
     * Ordina inventario
     */
    sort(sortBy, sortOrder) {
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
        return this;
    }

    /**
     * Ottieni status ingrediente
     */
    getStatus(item) {
        const remaining = item.initial - item.consumed;

        if (item.initial === 0 && item.consumed > 0) {
            return { status: 'undefined', text: 'Da definire', color: 'bg-gray-200 text-gray-700', emoji: '⚪' };
        }
        if (remaining <= 0) {
            return { status: 'out', text: 'Esaurito', color: 'bg-red-200 text-red-700', emoji: '🔴' };
        }
        if (remaining < item.consumed * 0.3) {
            return { status: 'low', text: 'Basso', color: 'bg-yellow-200 text-yellow-700', emoji: '🟡' };
        }
        return { status: 'ok', text: 'OK', color: 'bg-green-200 text-green-700', emoji: '🟢' };
    }
}
