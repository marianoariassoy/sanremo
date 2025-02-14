import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'
import { Product } from '../../../types/product'
import { Category } from '../../../types/category'

const ModalProducto = ({
  setModal,
  getProducts,
  id_to_update,
  products
}: {
  setModal: (arg: boolean) => void
  getProducts: () => void
  id_to_update: number
  products: Product[]
}) => {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [product, setProduct] = useState<Product>({
    id: 0,
    code: '',
    title: '',
    category: 0,
    top: 0
  })

  const apiUrl = import.meta.env.VITE_API_URL

  const onSubmit = async () => {
    setError('')
    setSending(true)
    try {
      if (update) {
        const response = await axios.put(`${apiUrl}/products/${id_to_update}`, product)
        if (response.data.success) {
          getProducts()
          setModal(false)
        } else {
          setError(response.data.message)
          setSending(false)
        }
      } else {
        const response = await axios.post(`${apiUrl}/products`, product)
        if (response.data.success) {
          getProducts()
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
    if (id_to_update) {
      const product = products.find(product => product.id === id_to_update)
      if (product) {
        setProduct(product)
        setUpdate(true)
      }
    } else {
      setUpdate(false)
    }
  }, [id_to_update])

  useEffect(() => {
    getCategories()
  }, [])

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur p-4'>
      <div className='w-full max-w-xl rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm lg:text-base'>
        <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
          <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
            {update ? 'Modificar Producto' : 'Agregar Producto'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Nombre</label>
              <div className='relative'>
                <input
                  {...register('title')}
                  type='text'
                  value={product.title}
                  onChange={handleChange}
                  placeholder='Ingresar el nombre del producto'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
              </div>
            </div>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Código</label>
              <div className='relative'>
                <input
                  {...register('code')}
                  type='text'
                  value={product.code}
                  onChange={handleChange}
                  placeholder='Ingresar el código del producto'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
              </div>
            </div>

            <label className='mb-2.5 block font-medium text-black dark:text-white'>Categoría</label>

            <div className='relative z-20 bg-white dark:bg-form-input mb-8'>
              {loading ? (
                <div className='py-2'>
                  <BeatLoader />
                </div>
              ) : (
                <select
                  defaultValue={product.category ? product.category : 0}
                  {...register('category')}
                  onChange={handleChangeCategory}
                  className={`relative z-20 w-full appearance-none border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input rounded-lg`}
                >
                  <option
                    value='0'
                    disabled
                    className='text-body dark:text-bodydark'
                  >
                    Seleccione una categoría
                  </option>
                  {categories.map(item => (
                    <option
                      key={item.id}
                      value={item.id}
                      className='text-body dark:text-bodydark'
                    >
                      {item.title}
                    </option>
                  ))}
                </select>
              )}

              <span className='absolute top-1/2 right-2 z-10 -translate-y-1/2'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g opacity='0.8'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z'
                      fill='#637381'
                    ></path>
                  </g>
                </svg>
              </span>
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

export default ModalProducto
