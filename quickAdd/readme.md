# 📚 Club Informatique – Gestion des élèves et des présences

Ce projet est une application Django simple pour **gérer les inscriptions d'élèves à un club informatique**, suivre leurs **présences**, et générer des **exports** (Word, impression). Il permet également d'effectuer **l'appel quotidien**, tout en assurant un bon suivi de la participation.

---

## ✅ Fonctionnalités principales

### 👨‍🎓 Gestion des élèves
- Ajout d’un élève via un formulaire simple
- Enregistrement de :
  - Prénom / Nom
  - Niveau (6ᵉ, 5ᵉ, 4ᵉ, 3ᵉ)
  - Classe
  - Thème choisi
  - Date d’inscription automatique

### 🧾 Liste des élèves
- Vue tableau détaillée des élèves inscrits
- Statistiques automatiques par niveau (3ᵉ → 6ᵉ)
- Exportation :
  - 📄 En Word (`.docx`)
  - 🖨 Impression directe depuis le navigateur
- Tri dynamique par colonne :
  - A → Z
  - Dates (plus récent → plus ancien)
  - Cours suivis

### 📅 Présence & Appel
- Appel journalier (un seul appel autorisé par jour)
- Bouton “En attente” → “✅ Confirmé” lors de la validation
- Possibilité **d’annuler une confirmation** (erreur de clic)
- Possibilité de refaire l'appel **le jour suivant (minuit passé)**
- Cours suivis incrémentés automatiquement

---

## 🔧 Technologies utilisées

|     Outil       |             Description                |
|-----------------|----------------------------------------|
| **Django**      | Framework web principal                |
| **SQLite**      | Base de données par défaut             |
| **HTML/CSS**    | Interfaces personnalisées              |
| **JavaScript**  | Tri des tableaux, appel dynamique      |
| **python-docx** | Exportation de la liste au format Word |

---

## 🚀 Installation & Exécution

⚠️ Créer un superutilisateur (admin) pour supprimer où modifier les élèves via l'interface d'administration Django ⚠️

1. **Cloner le projet**
```bash
git clone "lien du depo"
cd "nom du projet"
python -m venv env
source env/bin/activate  # Sur Windows : env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
python manage.py createsuperuser
python manage.py runserver