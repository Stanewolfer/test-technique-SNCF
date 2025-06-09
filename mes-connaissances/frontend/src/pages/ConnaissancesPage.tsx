import { useEffect, useState } from 'react'
import { Niveau, type Categorie, type Connaissance } from '../types'
import { fetchAPI, postAPI, deleteAPI } from '../services/api'

export default function ConnaissancesPage() {
  const [connaissances, setConnaissances] = useState<Connaissance[]>([])
  const [categories, setCategories] = useState<Categorie[]>([])
  const [selectedCat, setSelectedCat] = useState<number | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingConnaissance, setEditingConnaissance] =
    useState<Connaissance | null>(null)

  const [formNom, setFormNom] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formNiveau, setFormNiveau] = useState('')
  const [formDateApprentissage, setFormDateApprentissage] = useState('')
  const [formCategorieId, setFormCategorieId] = useState<number | null>(null)

  useEffect(() => {
    loadData()
  }, [selectedCat])

  const loadData = async () => {
    const cats = await fetchAPI<Categorie[]>('/categories.php')
    setCategories(cats)

    const endpoint = selectedCat
      ? `/connaissances.php?categorie_id=${selectedCat}`
      : '/connaissances.php'
    const data = await fetchAPI<Connaissance[]>(endpoint)
    setConnaissances(data)
  }

  const handleDelete = async (id: number) => {
    await deleteAPI(`/connaissances.php?id=${id}`)
    loadData()
  }

  const openModalForCreate = () => {
    setEditingConnaissance(null)
    setFormNom('')
    setFormDescription('')
    setFormNiveau('')
    setFormDateApprentissage('')
    setFormCategorieId(null)
    setIsModalOpen(true)
  }

  const openModalForEdit = (con: Connaissance) => {
    setEditingConnaissance(con)
    setFormNom(con.nom)
    setFormDescription(con.description ?? '')
    setFormNiveau(con.niveau)
    setFormDateApprentissage(con.date_apprentissage ?? '')
    setFormCategorieId(con.categorie_id ?? null)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formNom || !formNiveau || !formCategorieId) {
      alert('Veuillez remplir au moins le nom, le niveau et la catégorie.')
      return
    }

    const connaissancePayload = {
      nom: formNom,
      description: formDescription,
      niveau: formNiveau,
      date_apprentissage: formDateApprentissage || null,
      categorie_id: formCategorieId
    }

    if (editingConnaissance) {
      await postAPI(
        `/connaissances.php?id=${editingConnaissance.id}`,
        connaissancePayload
      )
    } else {
      await postAPI('/connaissances.php', connaissancePayload)
    }

    closeModal()
    loadData()
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Mes Connaissances</h1>

      <div className='mb-6 flex gap-2'>
        <select
          onChange={e => setSelectedCat(Number(e.target.value) || null)}
          className='p-2 border rounded'
        >
          <option value=''>-- Toutes les catégories --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.nom}
            </option>
          ))}
        </select>

        <button
          onClick={openModalForCreate}
          className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
        >
          + Ajouter
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {connaissances.map(con => (
          <div
            key={con.id}
            className='bg-stone-200 shadow-md rounded-lg p-4 flex flex-col justify-between min-h-[130px] hover:shadow-lg transition-shadow duration-200'
          >
            <h2 className='text-xl font-semibold'>{con.nom}</h2>
            <p className='text-sm text-gray-600'>{con.description}</p>
            <span className='inline-block mt-2 px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded max-w-max'>
              {con.niveau}
            </span>
            {con.date_apprentissage && (
              <p className='text-xs text-gray-500 mt-1'>
                Date d'apprentissage : {con.date_apprentissage}
              </p>
            )}
            <div className='mt-3 flex space-x-4'>
              <button
                onClick={() => openModalForEdit(con)}
                className='text-sm text-yellow-600 hover:underline'
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(con.id)}
                className='text-sm text-red-600 hover:underline'
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-[#00000058] flex justify-center items-center z-50'>
          <div className='bg-white rounded p-6 w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>
              {editingConnaissance
                ? 'Modifier une connaissance'
                : 'Ajouter une connaissance'}
            </h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block font-medium mb-1'>Nom *</label>
                <input
                  type='text'
                  value={formNom}
                  onChange={e => setFormNom(e.target.value)}
                  className='w-full p-2 border rounded'
                  required
                />
              </div>

              <div>
                <label className='block font-medium mb-1'>Description</label>
                <textarea
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className='w-full p-2 border rounded'
                  rows={3}
                />
              </div>

              <div>
                <label className='block font-medium mb-1'>Niveau *</label>
                <select
                  value={formNiveau}
                  onChange={e => setFormNiveau(e.target.value)}
                  className='w-full p-2 border rounded'
                  required
                >
                  {(Object.values(Niveau) as string[]).map(niveau => (
                    <option key={niveau} value={niveau}>
                      {niveau}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block font-medium mb-1'>
                  Date d'apprentissage
                </label>
                <input
                  type='date'
                  value={formDateApprentissage}
                  onChange={e => setFormDateApprentissage(e.target.value)}
                  className='w-full p-2 border rounded'
                />
              </div>

              <div>
                <label className='block font-medium mb-1'>Catégorie *</label>
                <select
                  value={formCategorieId ?? ''}
                  onChange={e =>
                    setFormCategorieId(Number(e.target.value) || null)
                  }
                  className='w-full p-2 border rounded'
                  required
                >
                  <option value=''>-- Sélectionnez une catégorie --</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex justify-end space-x-2'>
                <button
                  type='button'
                  onClick={closeModal}
                  className='px-4 py-2 border rounded hover:bg-gray-100'
                >
                  Annuler
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
