// ==============================================================================
// INTERNATIONALIZATION (i18n) - Sistema Traduzioni IT/EN
// ==============================================================================

const translations = {
    it: {
        // Header
        appTitle: "Piano Alimentare di Ambra",
        mealPlanFor: "Piano Alimentare di",
        appSubtitle: "Un piano personalizzato, vario e gustoso per ogni settimana.",

        // Buttons
        settings: "Impostazioni",
        print: "Stampa",
        clearPlan: "Cancella Piano",
        modifyIngredients: "Modifica Ingredienti",
        confirmClearPlan: "Sei sicuro di voler cancellare il piano alimentare salvato?\n\nQuesta azione non può essere annullata.",
        planCleared: "✅ Piano alimentare cancellato! Puoi generarne uno nuovo.",

        // Legend
        ingredientsAvailable: "Ingredienti disponibili",
        ingredientsToPurchase: "Ingredienti da acquistare",

        // Days
        monday: "Lunedì",
        tuesday: "Martedì",
        wednesday: "Mercoledì",
        thursday: "Giovedì",
        friday: "Venerdì",
        saturday: "Sabato",
        sunday: "Domenica",

        // Meals
        breakfast: "Colazione",
        morningSnack: "Spuntino Mattina",
        lunch: "Pranzo",
        afternoonSnack: "Spuntino Pomeriggio",
        dinner: "Cena",

        // Summary
        dailySummary: "Riepilogo Giornaliero",
        totalCalories: "Calorie Totali",
        proteins: "Proteine",
        carbs: "Carboidrati",
        fats: "Grassi",

        // Inventory
        inventoryTitle: "Inventario Ingredienti",
        hide: "Nascondi",
        show: "Mostra",
        ingredient: "Ingrediente",
        initialQuantity: "Quantità Iniziale",
        consumed: "Consumato",
        remaining: "Rimanente",
        status: "Stato",
        statusOK: "OK",
        statusLow: "Basso",
        statusOut: "Esaurito",
        totalIngredients: "Totale ingredienti",

        // Shopping List
        shoppingListTitle: "Lista della Spesa",
        shoppingListSubtitle: "Ingredienti suggeriti dall'IA per completare il piano alimentare:",
        totalQuantity: "Quantità totale",
        ingredientsToBuy: "ingredienti da acquistare",

        // Modal - API Key
        apiKeyTitle: "Configurazione Impostazioni",
        apiKeyDescription: "Per utilizzare questo strumento, hai bisogno di una API Key gratuita di Google AI Studio.",
        apiKeyHowTo: "Come ottenere la tua API Key:",
        apiKeyStep1: "Vai su",
        apiKeyStep2: "Accedi con il tuo account Google",
        apiKeyStep3: "Clicca su \"Create API Key\"",
        apiKeyStep4: "Copia la chiave e incollala qui sotto",
        userName: "Nome utente",
        userNameHelp: "Inserisci il nome della persona per cui vuoi creare il piano alimentare",
        dailyCalories: "Calorie giornaliere (kcal)",
        dailyCaloriesHelp: "Obiettivo calorico giornaliero per il piano alimentare (es: 1500-1600)",
        apiKeyLabel: "API Key di Google AI Studio:",
        apiKeyShow: "Mostra",
        apiKeyHide: "Nascondi",
        apiKeyWarning: "La tua API Key viene salvata solo nel tuo browser (localStorage) e non viene mai condivisa. Ogni utente deve inserire la propria chiave personale.",
        cancel: "Annulla",
        saveApiKey: "Salva Impostazioni",
        apiKeyFooter: "L'API Key è necessaria per generare i piani alimentari con l'intelligenza artificiale di Google Gemini. È gratuita e ha un limite generoso di richieste giornaliere.",

        // Modal - Ingredients
        ingredientsManagement: "Gestione Ingredienti",
        ingredientsDescription: "Inserisci gli ingredienti che hai a casa (con le quantità, es. \"pollo 500g, uova 6\"). L'IA creerà un piano fino a esaurimento scorte.",
        tabManual: "Inserimento Manuale",
        tabHistory: "Storico Ingredienti",
        tabShopping: "Lista Spesa",
        savedLists: "Liste Salvate:",
        ingredientsAvailableLabel: "Ingredienti disponibili:",
        loadExample: "Carica esempio",
        ingredientsPlaceholder: "Es: petto di pollo 500g, riso basmati 1kg, zucchine 3, pomodori 250g, uova 6...",
        listNamePlaceholder: "Nome lista (opzionale)",
        saveList: "Salva Lista",
        close: "Chiudi",
        generatePlan: "Genera Piano",

        // History Tab
        searchIngredient: "Cerca ingrediente...",
        previousIngredients: "Ingredienti usati in precedenza:",
        clearHistory: "Cancella storico",
        noHistory: "Nessun ingrediente nello storico",
        add: "Aggiungi",

        // Shopping Tab
        searchToBuy: "Cerca ingrediente da acquistare...",
        suggestedIngredients: "Ingredienti suggeriti dall'IA:",
        shoppingTabDesc: "Clicca su un ingrediente per segnarlo come acquistato e aggiungerlo al tuo inventario",
        noShoppingItems: "Nessun ingrediente da acquistare o genera prima un piano",
        suggested: "Suggerito",
        purchased: "Acquistato",

        // Alerts & Messages
        regenerateMeal: "Vuoi rigenerare il pasto",
        regenerateConfirm: "L'IA proporrà un'alternativa.",
        mealRegenerated: "Pasto rigenerato con successo!",
        apiKeyNotConfigured: "API Key non configurata!\n\nClicca su 'Impostazioni' per inserire la tua API Key di Google AI Studio.",
        enterValidQty: "Inserisci una quantità valida",
        addedToList: "aggiunto alla lista!",
        inventoryUpdated: "L'inventario è stato aggiornato automaticamente.",
        itemPurchased: "acquistato!\n\n📦 Aggiunto all'inventario\n🔄 Liste aggiornate",
        replaceIngredients: "Vuoi sostituire gli ingredienti correnti con l'esempio?",
        loading: "L'IA sta creando il tuo piano personalizzato...",

        // Warnings
        warningNoPlan: "Nessun piano disponibile per questo giorno.",
        warningSuggestedIngredients: "Questo giorno contiene ingredienti suggeriti che non sono nella tua lista.",

        // Week
        week: "Settimana",

        // Recipe Generator
        chooseMeal: "Scegli il Pasto",
        chooseMealDesc: "Seleziona per quale pasto vuoi generare le ricette",
        lunchRecipes: "Ricette per il mezzogiorno",
        dinnerRecipes: "Ricette per la sera",
        dailyRecipes: "Ricette AI del Giorno",
        recipesAI: "Ricette AI",
        recipesAIShort: "AI",
        recipesAITooltip: "Genera ricette AI con gli ingredienti del giorno",
        share: "Condividi",
        shareRecipes: "Condividi ricette",
        shareTitle: "🍽️ Ricette AI",
        generatingRecipes: "🤖 L'AI sta creando ricette deliziose...",
        analyzingIngredients: "Analizzando gli ingredienti del giorno...",

        // Recipe AI Prompts
        recipePromptContext_lunch: "per il pranzo (ricette più leggere e adatte al mezzogiorno)",
        recipePromptContext_dinner: "per la cena (ricette più sostanziose e della sera)",
        recipePromptIntro: "Sei uno chef esperto e creativo. Ho i seguenti ingredienti disponibili oggi",
        recipePromptRequest: "Per favore, crea 3-4 ricette originali e creative",
        recipePromptUsing: "utilizzando questi ingredienti.",
        recipePromptImportant: "IMPORTANTE: Le ricette devono essere LOW-FODMAP e senza glutine (gluten-free).",
        recipePromptProvide: "Per ogni ricetta fornisci:",
        recipePromptName: "**Nome della ricetta** (creativo e appetitoso)",
        recipePromptType: "**Tipo di piatto** (antipasto, primo, secondo, dessert, etc.)",
        recipePromptTime: "**Tempo di preparazione**",
        recipePromptDifficulty: "**Difficoltà** (Facile/Media/Difficile)",
        recipePromptIngredients: "**Ingredienti necessari** (dalla lista fornita + eventuali ingredienti base come sale, pepe, olio)",
        recipePromptSteps: "**Procedimento** (passaggi numerati e chiari)",
        recipePromptTip: "**Consiglio dello chef** (un piccolo suggerimento per rendere la ricetta speciale)",
        recipePromptFormat: "Formatta la risposta in modo chiaro e strutturato usando Markdown.",
        recipePromptCreative: "Sii creativo e proponi abbinamenti interessanti!",

        // Weekly Plan AI Prompt (main parts)
        planPromptIntro: "Sei un nutrizionista esperto. Crea un piano alimentare di 1 settimana (7 giorni) per",
        planPromptDiet: "che segue una dieta LOW-FODMAP e SENZA GLUTINE.",
        planPromptIngredients: "INGREDIENTI DISPONIBILI:",
        planPromptCalories: "OBIETTIVO CALORICO:",
        planPromptCaloriesPerDay: "kcal al giorno totali",
        planPromptInstructions: "ISTRUZIONI:",
        planPromptJsonOnly: "Rispondi SOLO con il JSON, senza altri testi.",
    },

    en: {
        // Header
        appTitle: "Meal Planner for Ambra",
        mealPlanFor: "Meal Plan for",
        appSubtitle: "A personalized, varied and tasty plan for every week.",

        // Buttons
        settings: "Settings",
        print: "Print",
        clearPlan: "Clear Plan",
        modifyIngredients: "Modify Ingredients",
        confirmClearPlan: "Are you sure you want to delete the saved meal plan?\n\nThis action cannot be undone.",
        planCleared: "✅ Meal plan deleted! You can generate a new one.",

        // Legend
        ingredientsAvailable: "Available ingredients",
        ingredientsToPurchase: "Ingredients to purchase",

        // Days
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",

        // Meals
        breakfast: "Breakfast",
        morningSnack: "Morning Snack",
        lunch: "Lunch",
        afternoonSnack: "Afternoon Snack",
        dinner: "Dinner",

        // Summary
        dailySummary: "Daily Summary",
        totalCalories: "Total Calories",
        proteins: "Proteins",
        carbs: "Carbs",
        fats: "Fats",

        // Inventory
        inventoryTitle: "Ingredients Inventory",
        hide: "Hide",
        show: "Show",
        ingredient: "Ingredient",
        initialQuantity: "Initial Quantity",
        consumed: "Consumed",
        remaining: "Remaining",
        status: "Status",
        statusOK: "OK",
        statusLow: "Low",
        statusOut: "Out",
        totalIngredients: "Total ingredients",

        // Shopping List
        shoppingListTitle: "Shopping List",
        shoppingListSubtitle: "AI-suggested ingredients to complete your meal plan:",
        totalQuantity: "Total quantity",
        ingredientsToBuy: "ingredients to buy",

        // Modal - API Key
        apiKeyTitle: "Settings Configuration",
        apiKeyDescription: "To use this tool, you need a free Google AI Studio API Key.",
        apiKeyHowTo: "How to get your API Key:",
        apiKeyStep1: "Go to",
        apiKeyStep2: "Sign in with your Google account",
        apiKeyStep3: "Click \"Create API Key\"",
        apiKeyStep4: "Copy the key and paste it below",
        userName: "User name",
        userNameHelp: "Enter the name of the person you want to create the meal plan for",
        dailyCalories: "Daily calories (kcal)",
        dailyCaloriesHelp: "Daily calorie target for the meal plan (e.g.: 1500-1600)",
        apiKeyLabel: "Google AI Studio API Key:",
        apiKeyShow: "Show",
        apiKeyHide: "Hide",
        apiKeyWarning: "Your API Key is stored only in your browser (localStorage) and is never shared. Each user must enter their own personal key.",
        cancel: "Cancel",
        saveApiKey: "Save Settings",
        apiKeyFooter: "The API Key is required to generate meal plans with Google Gemini artificial intelligence. It's free and has a generous daily request limit.",

        // Modal - Ingredients
        ingredientsManagement: "Ingredients Management",
        ingredientsDescription: "Enter the ingredients you have at home (with quantities, e.g. \"chicken 500g, eggs 6\"). The AI will create a plan until supplies run out.",
        tabManual: "Manual Input",
        tabHistory: "Ingredients History",
        tabShopping: "Shopping List",
        savedLists: "Saved Lists:",
        ingredientsAvailableLabel: "Available ingredients:",
        loadExample: "Load example",
        ingredientsPlaceholder: "E.g.: chicken breast 500g, basmati rice 1kg, zucchini 3, tomatoes 250g, eggs 6...",
        listNamePlaceholder: "List name (optional)",
        saveList: "Save List",
        close: "Close",
        generatePlan: "Generate Plan",

        // History Tab
        searchIngredient: "Search ingredient...",
        previousIngredients: "Previously used ingredients:",
        clearHistory: "Clear history",
        noHistory: "No ingredients in history",
        add: "Add",

        // Shopping Tab
        searchToBuy: "Search ingredient to buy...",
        suggestedIngredients: "AI-suggested ingredients:",
        shoppingTabDesc: "Click on an ingredient to mark it as purchased and add it to your inventory",
        noShoppingItems: "No ingredients to buy or generate a plan first",
        suggested: "Suggested",
        purchased: "Purchased",

        // Alerts & Messages
        regenerateMeal: "Do you want to regenerate the meal",
        regenerateConfirm: "The AI will suggest an alternative.",
        mealRegenerated: "Meal successfully regenerated!",
        apiKeyNotConfigured: "API Key not configured!\n\nClick 'Settings' to enter your Google AI Studio API Key.",
        enterValidQty: "Enter a valid quantity",
        addedToList: "added to the list!",
        inventoryUpdated: "The inventory has been updated automatically.",
        itemPurchased: "purchased!\n\n📦 Added to inventory\n🔄 Lists updated",
        replaceIngredients: "Do you want to replace current ingredients with the example?",
        loading: "The AI is creating your personalized plan...",

        // Warnings
        warningNoPlan: "No plan available for this day.",
        warningSuggestedIngredients: "This day contains suggested ingredients that are not in your list.",

        // Week
        week: "Week",

        // Recipe Generator
        chooseMeal: "Choose Meal",
        chooseMealDesc: "Select which meal you want to generate recipes for",
        lunchRecipes: "Recipes for midday",
        dinnerRecipes: "Recipes for evening",
        dailyRecipes: "AI Daily Recipes",
        recipesAI: "AI Recipes",
        recipesAIShort: "AI",
        recipesAITooltip: "Generate AI recipes with today's ingredients",
        share: "Share",
        shareRecipes: "Share recipes",
        shareTitle: "🍽️ AI Recipes",
        generatingRecipes: "🤖 AI is creating delicious recipes...",
        analyzingIngredients: "Analyzing today's ingredients...",

        // Recipe AI Prompts
        recipePromptContext_lunch: "for lunch (lighter recipes suitable for midday)",
        recipePromptContext_dinner: "for dinner (more substantial evening recipes)",
        recipePromptIntro: "You are an expert and creative chef. I have the following ingredients available today",
        recipePromptRequest: "Please create 3-4 original and creative recipes",
        recipePromptUsing: "using these ingredients.",
        recipePromptImportant: "IMPORTANT: The recipes must be LOW-FODMAP and gluten-free.",
        recipePromptProvide: "For each recipe provide:",
        recipePromptName: "**Recipe name** (creative and appetizing)",
        recipePromptType: "**Dish type** (appetizer, first course, main course, dessert, etc.)",
        recipePromptTime: "**Preparation time**",
        recipePromptDifficulty: "**Difficulty** (Easy/Medium/Hard)",
        recipePromptIngredients: "**Required ingredients** (from the provided list + any basic ingredients like salt, pepper, oil)",
        recipePromptSteps: "**Procedure** (numbered and clear steps)",
        recipePromptTip: "**Chef's tip** (a small suggestion to make the recipe special)",
        recipePromptFormat: "Format the response clearly and structured using Markdown.",
        recipePromptCreative: "Be creative and suggest interesting combinations!",

        // Weekly Plan AI Prompt (main parts)
        planPromptIntro: "You are an expert nutritionist. Create a 1-week (7 days) meal plan for",
        planPromptDiet: "following a LOW-FODMAP and GLUTEN-FREE diet.",
        planPromptIngredients: "AVAILABLE INGREDIENTS:",
        planPromptCalories: "CALORIE TARGET:",
        planPromptCaloriesPerDay: "kcal per day total",
        planPromptInstructions: "INSTRUCTIONS:",
        planPromptJsonOnly: "Reply ONLY with JSON, without any other text.",
    }
};

// Lingua corrente (default italiano)
let currentLang = localStorage.getItem('app_language') || 'it';

// Funzione per ottenere traduzione
function t(key) {
    return translations[currentLang][key] || key;
}

// Funzione per cambiare lingua
function setLanguage(lang) {
    if (lang !== 'it' && lang !== 'en') lang = 'it';
    currentLang = lang;
    localStorage.setItem('app_language', lang);
    updateUI();

    // Update language buttons if function exists
    if (typeof updateLanguageButtons === 'function') {
        updateLanguageButtons();
    }

    // Re-render UI to update days and weeks
    if (typeof renderUI === 'function') {
        renderUI();
    }
}

// Funzione per aggiornare tutti i testi nell'UI
function updateUI() {
    // Aggiorna tutti gli elementi con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (el.placeholder !== undefined) {
            el.placeholder = t(key);
        } else {
            el.textContent = t(key);
        }
    });

    // Aggiorna il rendering se c'è un piano
    if (typeof renderUI === 'function') {
        renderUI();
    }
}

// Array giorni e pasti tradotti
function getTranslatedDays() {
    return [
        t('monday'),
        t('tuesday'),
        t('wednesday'),
        t('thursday'),
        t('friday'),
        t('saturday'),
        t('sunday')
    ];
}

function getTranslatedMeals() {
    return [
        t('breakfast'),
        t('morningSnack'),
        t('lunch'),
        t('afternoonSnack'),
        t('dinner')
    ];
}
