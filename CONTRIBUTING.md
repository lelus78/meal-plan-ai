# 🔧 Guida allo Sviluppo

## Strategia di Branching

### Branch Principali

#### `main` (Produzione)
- **Scopo**: Versione stabile e pubblica su GitHub Pages
- **URL**: https://lelus78.github.io/piano-dieta/piano_dieta_mensile_IA.html
- **Regole**:
  - ❌ NON fare commit diretti
  - ✅ Riceve solo merge da `development` dopo testing
  - ✅ Ogni commit deve essere testato e funzionante

#### `development` (Sviluppo)
- **Scopo**: Branch di sviluppo attivo per nuove funzionalità e miglioramenti
- **Stato corrente**: ⚡ BRANCH ATTIVO
- **Regole**:
  - ✅ Tutti i nuovi sviluppi vanno qui
  - ✅ Testing e sperimentazione
  - ✅ Quando stabile → merge su `main`

---

## 🚀 Workflow di Sviluppo

### 1. Lavorare su una nuova funzionalità

```bash
# Assicurati di essere su development
git checkout development

# Aggiorna con le ultime modifiche
git pull origin development

# Lavora sul codice...
# Fai modifiche, testa localmente

# Aggiungi e committa
git add .
git commit -m "Descrizione chiara della modifica"

# Push su development
git push origin development
```

### 2. Testare localmente

```bash
# Avvia il server locale
python start_server.py

# Apri: http://localhost:8000/piano_dieta_mensile_IA.html
# Testa tutte le funzionalità
```

### 3. Merge su main (solo quando stabile)

```bash
# Torna su main
git checkout main

# Fai il merge da development
git merge development

# Push su main (aggiorna GitHub Pages)
git push origin main

# Torna su development per continuare lo sviluppo
git checkout development
```

---

## 📝 Convenzioni Commit

Usa messaggi commit chiari e descrittivi:

```
✅ Buoni esempi:
- "Aggiunto filtro ricerca ingredienti"
- "Fix: Corretto bug calcolo calorie"
- "Migliorato UI modale API Key"
- "Ottimizzato per mobile Safari"

❌ Da evitare:
- "fix"
- "aggiornamento"
- "test"
```

---

## 🔍 Checklist pre-merge su main

Prima di fare merge da `development` → `main`, verifica:

- [ ] ✅ Codice testato localmente
- [ ] ✅ Funziona su Desktop (Chrome, Firefox, Edge)
- [ ] ✅ Funziona su Mobile (Android Chrome, iOS Safari)
- [ ] ✅ API Key personale funziona correttamente
- [ ] ✅ localStorage salva i dati
- [ ] ✅ Nessun errore nella console
- [ ] ✅ README aggiornato se necessario

---

## 🐛 Fix di Bug Urgenti

Se c'è un bug critico in produzione:

```bash
# Crea un hotfix branch da main
git checkout main
git checkout -b hotfix/nome-bug

# Fixa il bug
# Testa

# Merge su main
git checkout main
git merge hotfix/nome-bug
git push origin main

# Merge anche su development
git checkout development
git merge hotfix/nome-bug
git push origin development

# Elimina il branch hotfix
git branch -d hotfix/nome-bug
```

---

## 📊 Stato Attuale

- **Branch attivo**: `development` 🟢
- **Ultimo deploy main**: Commit iniziale con sistema API Key
- **Prossimi sviluppi**: Da definire

---

## 🆘 Comandi Utili

```bash
# Vedi su quale branch sei
git branch

# Vedi lo stato dei file
git status

# Vedi la differenza delle modifiche
git diff

# Vedi lo storico commit
git log --oneline

# Annulla modifiche non committate
git restore nome-file.html

# Torna all'ultimo commit
git reset --hard HEAD
```

---

## 🎯 Best Practices

1. **Committa spesso** - Piccoli commit sono meglio di uno grande
2. **Testa sempre** - Controlla che tutto funzioni prima del push
3. **Branch development** - Tutto lo sviluppo va qui
4. **Main stabile** - Main deve essere sempre funzionante
5. **Messaggi chiari** - I commit message aiutano a capire la storia

---

## 📱 Test su dispositivi

### Desktop
- Chrome (Windows/Mac/Linux)
- Firefox
- Safari (Mac)
- Edge

### Mobile
- iPhone Safari (iOS)
- Chrome (Android)
- Firefox Mobile (Android)

### Test online prima del merge
Puoi creare un GitHub Pages anche per il branch development:
- Vai su Settings → Pages
- Scegli branch `development`
- Ottieni: `https://lelus78.github.io/piano-dieta/?branch=development`

---

**Buono sviluppo! 🚀**
