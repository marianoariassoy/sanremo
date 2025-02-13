import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'
import Loader from '../../../components/Loader'
import useFetch from '../../../hooks/useFetch'

interface User {
  id: number
  name: string
  user: string
  password: string
}

interface Data {
  name: string
  user: string
  password: string
}

const Nuevo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [sended, setSended] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<User>({ id: 0, name: '', user: '', password: '' })

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'bottom-right', className: 'bg-primary text-white', duration: 4000 })
    }
  }, [error])

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost/sites/sanremo-backend/users/data/${id}`)
      if (response.data) {
        const data = response.data
        setUser(data)
      }
    }
    fetchUser()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const Error = ({ text }: { text: string }) => {
    return <div className='mt-2 text-sm text-primary font-medium'>👆 {text}</div>
  }

  const onSubmit = async () => {
    setError('')
    setSending(true)

    try {
      const response = await axios.put(`http://localhost/sites/sanremo-backend/users/update/${id}`, user)
      if (response.data.success) {
        navigate('/admin/clientes')
      } else {
        setError(response.data.message)
        setSending(false)
      }
    } catch (error) {
      setError(error)
      setSending(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6 max-w-3xl'>
      <div className='w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm lg:text-base'>
        <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
          <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>Modificar Cliente</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Código / Usuario</label>
              <div className='relative'>
                <input
                  {...register('user')}
                  type='text'
                  value={user.user}
                  onChange={handleChange}
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
              </div>
            </div>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Nombre / Razón Social</label>
              <div className='relative'>
                <input
                  {...register('name')}
                  type='text'
                  value={user.name}
                  onChange={handleChange}
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
              </div>
            </div>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Password</label>
              <div className='relative'>
                <input
                  {...register('password')}
                  type='text'
                  value={user.password}
                  onChange={handleChange}
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
              </div>
            </div>

            <div className='mb-4 mt-8'>
              {sending ? (
                <div className='mt-6 flex justify-center'>
                  <BeatLoader />
                </div>
              ) : sended ? (
                <button
                  className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 font-medium'
                  disabled
                >
                  Modificar Cliente
                </button>
              ) : (
                <button className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 font-medium'>
                  Modificar Cliente
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </section>
  )
}

export default Nuevo
