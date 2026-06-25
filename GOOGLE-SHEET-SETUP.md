# 📊 Brancher les inscriptions sur un Google Sheet

Suis ces étapes une seule fois (~5 minutes). Ensuite chaque inscription sur le site
tombe automatiquement dans ton tableur.

---

## Étape 1 — Crée le Google Sheet

1. Va sur https://sheets.new (ça crée une feuille vide)
2. Renomme-la « Inscriptions Matinées du Bac »
3. Sur la **première ligne**, écris ces titres de colonnes (une par cellule) :

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Date | Prénom | Classe | Email | Matière | Session |

---

## Étape 2 — Ajoute le script

1. Dans le menu : **Extensions → Apps Script**
2. Efface tout le code présent, et colle **exactement** ceci :

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.prenom || '',
      data.classe || '',
      data.email || '',
      data.matiere || '',
      data.session || ''
    ]);
    // (Optionnel) recevoir un email à chaque inscription :
    // MailApp.sendEmail('TON-EMAIL@gmail.com', 'Nouvelle inscription',
    //   data.prenom + ' (' + data.classe + ') - ' + data.matiere + ' - ' + data.session + ' - ' + data.email);
    return ContentService.createTextOutput(JSON.stringify({ok: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok: false, error: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Clique sur 💾 **Enregistrer** (icône disquette)

---

## Étape 3 — Publie le script (déploiement)

1. En haut à droite : **Déployer → Nouveau déploiement**
2. Clique sur l'engrenage ⚙️ → choisis **Application Web**
3. Configure :
   - **Description** : Inscriptions
   - **Exécuter en tant que** : *Moi* (ton compte)
   - **Qui a accès** : **Tout le monde** ← très important
4. Clique **Déployer**
5. Google te demande d'autoriser → accepte (clique « Autoriser », choisis ton compte,
   « Paramètres avancés » → « Accéder à … (non sécurisé) » → Autoriser).
   *(C'est normal, c'est ton propre script.)*
6. **Copie l'URL** qui s'affiche (elle ressemble à
   `https://script.google.com/macros/s/AKfyc…/exec`)

---

## Étape 4 — Donne-moi l'URL

Colle cette URL dans le fichier `index.html`, ligne où il est écrit :

```javascript
const GSHEET_URL = ''; // ← colle ton URL ici entre les guillemets
```

Ou envoie-la moi et je la mets pour toi.

---

## C'est fait ! ✅

Teste une inscription sur le site → la ligne apparaît dans ton Google Sheet en direct.

> 💡 Le formulaire continue aussi d'enregistrer les inscriptions localement
> (pour que les profs les voient dans leur dashboard). Le Google Sheet est ta
> base de données centrale, accessible partout, exportable, partageable.
