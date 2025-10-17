/**
 * Recipe Manager - Gestione generazione ricette AI
 * Gestisce chiamate API Gemini e conversione Markdown
 */

class RecipeManager {
    constructor(stateManager) {
        this.state = stateManager;
        this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent';
    }

    /**
     * Genera ricette per un pasto specifico
     * @param {string} mealType - 'lunch' o 'dinner'
     * @param {Object} dayPlan - Piano del giorno
     * @param {string} dayName - Nome del giorno
     * @returns {Promise<string>} HTML delle ricette
     */
    async generateRecipes(mealType, dayPlan, dayName) {
        const apiKey = this.state.get('apiKey');
        if (!apiKey) {
            throw new Error('API Key non configurata');
        }

        // Raccogli ingredienti del pasto selezionato
        const ingredients = this.collectIngredients(mealType, dayPlan);

        if (ingredients.length === 0) {
            throw new Error('Nessun ingrediente trovato per questo pasto');
        }

        // Crea prompt per l'AI
        const prompt = this.createPrompt(mealType, ingredients);

        console.log(`[RecipeManager] Generating recipes for ${mealType} with ${ingredients.length} ingredients`);

        // Chiama API Gemini
        const response = await fetch(`${this.apiEndpoint}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.9,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 8192,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const recipesText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!recipesText) {
            throw new Error('Nessuna ricetta generata dall\'AI');
        }

        // Converti Markdown in HTML
        return this.convertMarkdownToHTML(recipesText);
    }

    /**
     * Raccogli ingredienti per il tipo di pasto
     * @param {string} mealType - 'lunch' o 'dinner'
     * @param {Object} dayPlan - Piano del giorno
     * @returns {Array<string>} Lista ingredienti
     */
    collectIngredients(mealType, dayPlan) {
        const mealsToInclude = mealType === 'lunch' ? ['Pranzo'] : ['Cena'];
        const ingredientsList = [];
        const ingredientsSet = new Set();

        mealsToInclude.forEach(mealName => {
            const meal = dayPlan[mealName];
            if (!meal || !meal.items) return;

            meal.items.forEach(item => {
                const key = `${item.name}-${item.quantity}`;
                if (!ingredientsSet.has(key)) {
                    ingredientsSet.add(key);
                    ingredientsList.push(`${item.name} (${item.quantity}g)`);
                }
            });
        });

        return ingredientsList;
    }

    /**
     * Crea prompt per l'AI
     * @param {string} mealType - 'lunch' o 'dinner'
     * @param {Array<string>} ingredients - Lista ingredienti
     * @returns {string} Prompt per l'AI
     */
    createPrompt(mealType, ingredients) {
        const mealContext = mealType === 'lunch'
            ? 'per il pranzo (ricette più leggere e adatte al mezzogiorno)'
            : 'per la cena (ricette più sostanziose e della sera)';

        return `Sei uno chef esperto e creativo. Ho i seguenti ingredienti disponibili oggi ${mealContext}:

${ingredients.join(', ')}

Per favore, crea 3-4 ricette originali e creative ${mealContext} utilizzando questi ingredienti.
IMPORTANTE: Le ricette devono essere LOW-FODMAP e senza glutine (gluten-free).

Per ogni ricetta fornisci:
1. **Nome della ricetta** (creativo e appetitoso)
2. **Tipo di piatto** (antipasto, primo, secondo, dessert, etc.)
3. **Tempo di preparazione**
4. **Difficoltà** (Facile/Media/Difficile)
5. **Ingredienti necessari** (dalla lista fornita + eventuali ingredienti base come sale, pepe, olio)
6. **Procedimento** (passaggi numerati e chiari)
7. **Consiglio dello chef** (un piccolo suggerimento per rendere la ricetta speciale)

Formatta la risposta in modo chiaro e strutturato usando Markdown.
Sii creativo e proponi abbinamenti interessanti!`;
    }

    /**
     * Converti Markdown in HTML
     * @param {string} markdown - Testo Markdown
     * @returns {string} HTML
     */
    convertMarkdownToHTML(markdown) {
        let html = markdown;

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-purple-600 mt-8 mb-4 pb-2 border-b-2 border-purple-200">$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mt-6 mb-4">$1</h1>');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-800">$1</strong>');

        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

        // Lists
        html = html.replace(/^\d+\.\s(.*)$/gim, '<li class="ml-4 my-1">$1</li>');
        html = html.replace(/^-\s(.*)$/gim, '<li class="ml-4 my-1">• $1</li>');

        // Wrap lists
        html = html.replace(/(<li.*<\/li>)/gis, '<ul class="space-y-1 my-3">$1</ul>');

        // Paragraphs
        html = html.replace(/\n\n/g, '</p><p class="my-3 text-gray-700">');
        html = '<p class="my-3 text-gray-700">' + html + '</p>';

        // Line breaks
        html = html.replace(/\n/g, '<br>');

        return html;
    }
}
