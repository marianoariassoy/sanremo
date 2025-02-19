import { useState, useEffect } from 'react'
import Tabla from './TablaCategorias'
import Loader from '../../../components/Loader'
import axios from 'axios'
import Confirm from '../../../components/Confirm'
import Modal from './ModalCategorias'
import { Category } from '@/types/category'

const categorias = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [id_to_delete, setIdToDelete] = useState(0)
  const [id_to_update, setIdToUpdate] = useState(0)
  const [modal, setModal] = useState(false)
  const apiUrl = import.meta.env.VITE_API_URL

  const getCategories = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apiUrl}/categories`)
      if (response.data) {
        setCategories(response.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const addCategory = () => {
    setIdToUpdate(0)
    setModal(true)
  }

  const updateCategory = (id: number) => {
    setIdToUpdate(id)
    setModal(true)
  }

  const deleteItem = async (id: number) => {
    setIdToDelete(0)
    try {
      const response = await axios.delete(`${apiUrl}/categories/${id}`)
      if (response.data) {
        getCategories()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6'>
      <div className='w-full flex flex-col lg:flex-row justify-between gap-4'>
        <div>
          <h1 className='text-xl lg:text-3xl font-bold'>Categorías ({categories?.length})</h1>
        </div>
        <div className='flex flex-col lg:flex-row gap-x-4 gap-y-2'>
          <button
            className='inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-20 rounded-lg text-sm lg:text-base'
            onClick={() => addCategory()}
          >
            Agregar
          </button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Tabla
          data={categories}
          setIdToDelete={setIdToDelete}
          updateCategory={updateCategory}
        />
      )}

      <Confirm
        id_to_delete={id_to_delete}
        setIdToDelete={setIdToDelete}
        deleteItem={deleteItem}
        title='¿Está seguro de eliminar esta categoría?'
      />

      {modal && (
        <Modal
          setModal={setModal}
          getCategories={getCategories}
          id_to_update={id_to_update}
          categories={categories}
        />
      )}
    </section>
  )
}

export default categorias
