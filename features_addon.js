// ==============================================================================
// FEATURE 2: RIGENERAZIONE SINGOLO PASTO
// ==============================================================================

window.regenerateMeal = async (day, mealName) => {
    const confirmed = confirm(`Vuoi rigenerare il pasto "${mealName}" per ${day}?\n\nL'IA proporrà un'alternativa.`);
    if (!confirmed) return;

    const loader = document.getElementById('loader');
    loader.classList.remove('hidden');

    const apiKey = getApiKey();
    if (!apiKey) {
        loader.classList.add('hidden');
        alert("⚠️ API Key non configurata!");
        return;
    }

    const ingredients = document.getElementById('ingredients-input').value;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    // Determina il range calorico per il pasto
    const calorieRanges = {
        "Colazione": "300-350 kcal (carboidrati + proteine)",
        "Spuntino Mattina": "100-150 kcal (frutta o yogurt, MAI solo limone!)",
        "Pranzo": "500-550 kcal (proteine + carboidrati + verdure)",
        "Spuntino Pomeriggio": "100-150 kcal (frutta, yogurt o frutta secca)",
        "Cena": "450-500 kcal (proteine + verdure + pochi carboidrati)"
    };

    const prompt = `
        Sei un nutrizionista esperto. Genera UN SINGOLO PASTO alternativo per la dieta LOW-FODMAP e SENZA GLUTINE.

        PASTO DA RIGENERARE: ${mealName}
        INGREDIENTI DISPONIBILI: ${ingredients}
        OBIETTIVO CALORICO: ${calorieRanges[mealName]}

        ISTRUZIONI:
        1. USA PREFERIBILMENTE gli ingredienti disponibili (aggiungi "fromAvailable": true)
        2. Se non ci sono ingredienti adatti, suggerisci alternative low-FODMAP (aggiungi "fromAvailable": false)
        3. VARIA rispetto ai pasti precedenti (evita ripetizioni)
        4. Il pasto deve essere DIVERSO da quello attuale

        Fornisci SOLO il JSON del pasto:
        {
          "items": [{"name": "Nome ingrediente", "quantity": grammi}],
          "kcal": valore,
          "P": grammi proteine,
          "C": grammi carboidrati,
          "F": grammi grassi,
          "fromAvailable": true/false
        }

        Rispondi SOLO con il JSON, senza altri testi.
    `;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const result = await response.json();
        const rawText = result.candidates[0].content.parts[0].text;
        const jsonText = rawText.replace(/^```json\s*/, '').replace(/```$/, '').trim();
        const newMeal = JSON.parse(jsonText);

        // Aggiorna il pasto nel piano
        const weekIndex = currentState.week;
        const dayKey = day;

        if (fullPlan[weekIndex] && fullPlan[weekIndex][dayKey]) {
            fullPlan[weekIndex][dayKey][mealName] = newMeal;

            // Ricalcola consumi
            calculateIngredientConsumption(ingredients);

            // Aggiorna UI
            renderDayContent();
            renderIngredientsTable();
            renderShoppingList();

            alert(`✅ Pasto "${mealName}" rigenerato con successo!`);
        }

    } catch (error) {
        console.error("❌ Errore rigenerazione pasto:", error);
        alert(`Errore durante la rigenerazione: ${error.message}`);
    } finally {
        loader.classList.add('hidden');
    }
};

// ==============================================================================
// FEATURE 3: ESPORTAZIONE PDF E STAMPA
// ==============================================================================

window.exportToPDF = () => {
    window.print();
};

window.printWeeklyPlan = () => {
    const printWindow = window.open('', 'PRINT', 'height=600,width=800');

    const weekPlan = fullPlan[currentState.week];
    if (!weekPlan) {
        alert('Nessun piano da stampare!');
        return;
    }

    let html = `
        <html>
        <head>
            <title>Piano Alimentare - Settimana ${currentState.week + 1}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #3b82f6; text-align: center; }
                h2 { color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; margin-top: 20px; }
                h3 { color: #475569; margin-top: 15px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
                th, td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; }
                th { background-color: #f1f5f9; font-weight: bold; }
                .meal { margin-bottom: 15px; page-break-inside: avoid; }
                .totals { background-color: #eff6ff; padding: 10px; border-radius: 5px; margin-top: 10px; }
                .shopping-list { background-color: #fff7ed; padding: 15px; border-left: 4px solid #f97316; margin-top: 20px; }
                ul { padding-left: 20px; }
                @media print {
                    .no-print { display: none; }
                    body { margin: 0; }
                }
            </style>
        </head>
        <body>
            <h1>🍽️ Piano Alimentare di Ambra</h1>
            <h2>Settimana ${currentState.week + 1}</h2>
            <p style="text-align: center; color: #64748b;">Piano LOW-FODMAP e SENZA GLUTINE</p>
    `;

    // Per ogni giorno
    DAYS.forEach(dayName => {
        const dayPlan = weekPlan[dayName];
        if (!dayPlan) return;

        html += `<div class="day" style="page-break-before: auto;">`;
        html += `<h2>${dayName}</h2>`;

        let dailyTotals = { kcal: 0, P: 0, C: 0, F: 0 };

        // Per ogni pasto
        MEALS.forEach(mealName => {
            const meal = dayPlan[mealName];
            if (!meal || !meal.items) return;

            dailyTotals.kcal += meal.kcal || 0;
            dailyTotals.P += meal.P || 0;
            dailyTotals.C += meal.C || 0;
            dailyTotals.F += meal.F || 0;

            html += `<div class="meal">`;
            html += `<h3>${mealName}</h3>`;
            html += `<table><tr><th>Ingrediente</th><th>Quantità</th></tr>`;

            meal.items.forEach(item => {
                html += `<tr><td>${item.name}</td><td>${item.quantity}g</td></tr>`;
            });

            html += `</table>`;
            html += `<p><small>Calorie: ${meal.kcal} | P: ${meal.P}g | C: ${meal.C}g | F: ${meal.F}g</small></p>`;
            html += `</div>`;
        });

        html += `<div class="totals">`;
        html += `<strong>Totali Giornalieri:</strong> `;
        html += `Calorie: ${dailyTotals.kcal.toFixed(0)} | `;
        html += `Proteine: ${dailyTotals.P.toFixed(1)}g | `;
        html += `Carboidrati: ${dailyTotals.C.toFixed(1)}g | `;
        html += `Grassi: ${dailyTotals.F.toFixed(1)}g`;
        html += `</div>`;
        html += `</div>`;
    });

    // Lista della spesa
    const suggestedIngredients = new Map();
    fullPlan.forEach(week => {
        DAYS.forEach(day => {
            const dayPlan = week[day];
            if (!dayPlan) return;
            MEALS.forEach(mealName => {
                const meal = dayPlan[mealName];
                if (!meal || !meal.items || meal.fromAvailable !== false) return;
                meal.items.forEach(item => {
                    if (suggestedIngredients.has(item.name)) {
                        suggestedIngredients.set(item.name, suggestedIngredients.get(item.name) + item.quantity);
                    } else {
                        suggestedIngredients.set(item.name, item.quantity);
                    }
                });
            });
        });
    });

    if (suggestedIngredients.size > 0) {
        html += `<div class="shopping-list" style="page-break-before: auto;">`;
        html += `<h2>🛒 Lista della Spesa</h2>`;
        html += `<p>Ingredienti suggeriti da acquistare:</p>`;
        html += `<ul>`;
        Array.from(suggestedIngredients.entries()).sort().forEach(([name, qty]) => {
            const formatted = qty >= 1000 ? `${(qty / 1000).toFixed(2)} kg` : `${Math.round(qty)} g`;
            html += `<li>${name}: ${formatted}</li>`;
        });
        html += `</ul>`;
        html += `</div>`;
    }

    html += `
            <p style="text-align: center; margin-top: 30px; color: #94a3b8; font-size: 12px;">
                Generato con Piano Dieta Ambra - ${new Date().toLocaleDateString('it-IT')}
            </p>
            <button class="no-print" onclick="window.print()" style="position: fixed; bottom: 20px; right: 20px; padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">
                🖨️ Stampa
            </button>
        </body>
        </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
};
