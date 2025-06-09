export interface Categorie {
  id: number
  nom: string
}

export const Niveau = {
  DEBUTANT: 'Débutant',
  INTERMEDIAIRE: 'Intermédiaire',
  AVANCE: 'Avancé',
  EXPERT: 'Expert'
} as const

export type Niveau = (typeof Niveau)[keyof typeof Niveau]

export interface Connaissance {
  id: number
  nom: string
  description?: string
  niveau: Niveau
  date_apprentissage?: string
  categorie_id: number
}
