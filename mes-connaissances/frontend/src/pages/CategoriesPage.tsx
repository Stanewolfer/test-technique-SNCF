import { useEffect, useState } from 'react'
import type { Categorie } from '../types'
import { fetchAPI, postAPI, putAPI, deleteAPI } from '../services/api'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Categorie[]>([])
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')

  const loadCategories = async () => {
    const cats = await fetchAPI<Categorie[]>('/categories.php')
    setCategories(cats)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleAdd = async () => {
    if (!newName.trim()) return
    await postAPI('/categories.php', { nom: newName })
    setNewName('')
    loadCategories()
  }

  const handleUpdate = async (id: number) => {
    await putAPI(`/categories.php?id=${id}`, { nom: editName })
    setEditingId(null)
    setEditName('')
    loadCategories()
  }

  const handleDelete = async (id: number) => {
    await deleteAPI(`/categories.php?id=${id}`)
    loadCategories()
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Gestion des Catégories</h1>

      <div className='mb-6 flex gap-2'>
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder='Nouvelle catégorie'
          className='p-2 border rounded flex-grow'
        />
        <button
          onClick={handleAdd}
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={!newName.trim()}
        >
          Ajouter
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {categories.map(cat => (
          <div
            key={cat.id}
            className='bg-stone-200 shadow-md rounded-lg p-4 flex flex-col justify-between min-h-[130px]'
          >
            <div className='mb-4 min-h-[2.5rem]'>
              {editingId === cat.id ? (
                <input
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className='border p-2 rounded w-full'
                  autoFocus
                />
              ) : (
                <h3 className='text-lg font-semibold'>{cat.nom}</h3>
              )}
            </div>

            <div className='flex justify-end space-x-3'>
              {editingId === cat.id ? (
                <>
                  <button
                    onClick={() => handleUpdate(cat.id)}
                    className='px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer'
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null)
                      setEditName('')
                    }}
                    className='px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer'
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(cat.id)
                      setEditName(cat.nom)
                    }}
                    className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer'
                    aria-label={`Modifier la catégorie ${cat.nom}`}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className='px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer'
                    aria-label={`Supprimer la catégorie ${cat.nom}`}
                  >
                    Supprimer
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
