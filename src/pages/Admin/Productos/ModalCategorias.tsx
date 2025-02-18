import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'
import { Category } from '../../../types/category'

const ModalCategorias = ({
  setModal,
  getCategories,
  id_to_update,
  categories
}: {
  setModal: (arg: boolean) => void
  getCategories: () => void
  id_to_update: number
  categories: Category[]
}) => {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<Category>({
    id: 0,
    title: ''
  })
  const apiUrl = import.meta.env.VITE_API_URL

  const onSubmit = async () => {
    setError('')
    setSending(true)
    try {
      if (update) {
        const response = await axios.put(`${apiUrl}/categories/${id_to_update}`, category)
        if (response.data.success) {
          getCategories()
          setModal(false)
        } else {
          setError(response.data.message)
          setSending(false)
        }
      } else {
        const response = await axios.post(`${apiUrl}/categories`, category)
        if (response.data.success) {
          getCategories()
          setModal(false)
        } else {
          setError(response.data.message)
          setSending(false)
        }
      }
    } catch (error) {
      setError(error)
      setSending(false)
    }
  }

  useEffect(() => {
    const category = categories.find(category => category.id === id_to_update)
    if (category) {
      setCategory(category)
      setUpdate(true)
    } else {
      setUpdate(false)
    }
  }, [id_to_update])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'bottom-right', className: 'bg-primary text-white', duration: 4000 })
    }
  }, [error])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategory(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur p-4'>
      <div className='w-full max-w-xl rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm lg:text-base'>
        <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
          <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
            {update ? 'Modificar Categoria' : 'Agregar Categoria'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Nombre</label>
              <div className='relative'>
                <input
                  {...register('title')}
                  type='text'
                  value={category.title}
                  onChange={handleChange}
                  placeholder='Ingresar el nombre de la categoría'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
              </div>
            </div>
            <div className='mb-4'>
              {sending ? (
                <div className='mt-6 w-full flex justify-center'>
                  <BeatLoader />
                </div>
              ) : (
                <div className='flex gap-x-4'>
                  <button
                    className='w-full cursor-pointer rounded-lg border border-secondary bg-secondary p-4 text-white transition hover:bg-opacity-90 font-medium'
                    onClick={() => setModal(false)}
                  >
                    Cerrar
                  </button>
                  <button className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 font-medium'>
                    {update ? 'Modificar' : 'Crear'}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default ModalCategorias
