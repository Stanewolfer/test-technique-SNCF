# 🧠 Mes Connaissances

Application web pour gérer vos connaissances personnelles, classées par catégories, avec un niveau d’évaluation et une date d’acquisition.

---

## 🚀 Stack Technique

### Frontend
- React 18
- TypeScript
- TailwindCSS
- Vite.js

### Backend
- PHP natif (sans framework)
- MySQL

---

## 🧱 Structure du projet

```
mes-connaissances/
├── backend/
│ ├── db/
│ │ └── connection.php
│ ├── api/
│ │ ├── categories.php
│ │ └── connaissances.php
│ └── init.sql
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── types.ts
│ │ └── App.tsx / main.tsx
│ └── tailwind.config.js / postcss.config.js / vite.config.ts
├── README.md
```


---

## 🗄️ Base de Données

### Table `categories`

| Champ | Type         | Contraintes                 |
| ----- | ------------ | --------------------------- |
| id    | INT          | PRIMARY KEY, AUTO_INCREMENT |
| nom   | VARCHAR(255) | NOT NULL                    |

### Table `connaissances`

| Champ              | Type                                                  | Contraintes                               |
| ------------------ | ----------------------------------------------------- | ----------------------------------------- |
| id                 | INT                                                   | PRIMARY KEY, AUTO_INCREMENT               |
| nom                | VARCHAR(255)                                          | NOT NULL                                  |
| description        | TEXT                                                  | OPTIONNEL                                 |
| niveau             | ENUM('Débutant', 'Intermédiaire', 'Avancé', 'Expert') | NOT NULL                                  |
| date_apprentissage | DATE                                                  | OPTIONNEL                                 |
| categorie_id       | INT                                                   | FOREIGN KEY vers categories(id), NOT NULL |

📂 Script d'initialisation disponible dans `backend/init.sql`

---

## 📦 Installation

### 1. Cloner le repo

```bash
git clone https://github.com/votre-utilisateur/mes-connaissances.git
cd mes-connaissances
```
### 2. ⚙️ Backend
1. Importer la base de données :
```bash

mysql -u root -p -e "source backend/init.sql"
```
2. Lancer le serveur PHP :
```bash
cd mes-connaissances/backend
php -S localhost:8000

```
Les API seront accessibles via :
```
http://localhost:8000/api/categories.php
http://localhost:8000/api/connaissances.php
```

### 3. 💻 Frontend

```bash
cd mes-connaissances/frontend
npm install
npm run dev
```
## 📊 API Documentation

### 📂 Catégories (/api/categories.php)

| Méthode | Endpoint               | Description             |
| ------- | ---------------------- | ----------------------- |
| GET     | `/categories.php`      | Liste des catégories    |
| POST    | `/categories.php`      | Ajouter une catégorie   |
| PUT     | `/categories.php?id=1` | Modifier une catégorie  |
| DELETE  | `/categories.php?id=1` | Supprimer une catégorie |


### 🧠 Connaissances (/api/connaissances.php)
| Méthode | Endpoint                            | Description                       |
| ------- | ----------------------------------- | --------------------------------- |
| GET     | `/connaissances.php`                | Liste de toutes les connaissances |
| GET     | `/connaissances.php?categorie_id=3` | Filtrer par catégorie             |
| POST    | `/connaissances.php`                | Ajouter une connaissance          |
| PUT     | `/connaissances.php?id=4`           | Modifier une connaissance         |
| DELETE  | `/connaissances.php?id=4`           | Supprimer une connaissance        |
