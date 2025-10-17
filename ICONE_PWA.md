# 🎨 Icone PWA - Da Creare

Per completare la PWA, servono le icone dell'app.

## Icone Necessarie

1. **icon-192.png** - 192x192 pixel
2. **icon-512.png** - 512x512 pixel

## Come Crearle

### Opzione 1: Usa un generatore online

1. Vai su https://www.favicon-generator.org/ o https://realfavicongenerator.net/
2. Carica un logo/immagine (es: emoji 🍽️ o 🥗)
3. Genera le icone in varie dimensioni
4. Scarica icon-192.png e icon-512.png
5. Mettile nella cartella del progetto

### Opzione 2: Crea manualmente

Usa un tool come:
- **Canva** (gratuito)
- **Figma** (gratuito)
- **Photoshop/GIMP**

**Design suggerito:**
- Sfondo blu (#3b82f6)
- Emoji o icona cibo/dieta al centro
- Bordo arrotondato
- Font: Inter (lo stesso dell'app)

### Opzione 3: Usa emoji come icona

Converti un emoji in PNG:
1. Vai su https://emoji-to-png.com/
2. Cerca "fork and knife" 🍴 o "green salad" 🥗
3. Scarica in 192px e 512px
4. Rinomina come icon-192.png e icon-512.png

## Posizione File

```
meal-plan-ai/
├── icon-192.png    ← Metti qui
├── icon-512.png    ← Metti qui
├── manifest.webmanifest
└── piano_dieta_mensile_IA.html
```

## Colori Consigliati

Per coerenza con l'app:
- **Primary Blue**: #3b82f6
- **Orange**: #f97316 (per lista spesa)
- **Green**: #10b981 (per ingredienti OK)
- **Background**: #f9fafb

## Note

- Le icone devono essere **quadrate**
- Formato **PNG** con sfondo
- **Maskable** = funziona su tutti i dispositivi
- Test su https://maskable.app/ per verificare

---

**Temporary**: Per ora l'app funziona anche senza icone, ma apparirà con icona predefinita browser su iOS/Android quando installata.
