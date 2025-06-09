CREATE DATABASE IF NOT EXISTS mes_connaissances CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mes_connaissances;

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS connaissances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  niveau ENUM('Débutant', 'Intermédiaire', 'Avancé', 'Expert') NOT NULL,
  date_apprentissage DATE,
  categorie_id INT NOT NULL,
  FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Seed data
INSERT INTO categories (nom) VALUES ('Frontend'), ('Backend'), ('BDD'), ('Outils');

INSERT INTO connaissances (nom, description, niveau, date_apprentissage, categorie_id)
VALUES
  ('React', 'Librairie JS pour le frontend', 'Avancé', '2021-04-12', 1),
  ('Git', 'Gestionnaire de version', 'Expert', '2019-09-01', 4),
  ('MySQL', 'SGBD relationnel', 'Intermédiaire', '2020-01-15', 3);
  ('PHP', 'Langage de script côté serveur', 'Avancé', '2020-06-20', 2),
  ('Node.js', "Environnement d'exécution JavaScript côté serveur", 'Avancé', '2021-03-05', 2);
