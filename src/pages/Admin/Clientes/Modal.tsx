import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'
import { User } from '../../../types/users'

const ModalCliente = ({
  setModal,
  getUsers,
  id_to_update,
  users
}: {
  setModal: (arg: boolean) => void
  getUsers: () => void
  id_to_update: number
  users: User[]
}) => {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [updateUser, setUpdateUser] = useState(false)
  const [user, setUser] = useState<User>({
    id: 0,
    user: '',
    name: '',
    password: ''
  })

  const apiUrl = import.meta.env.VITE_API_URL

  const onSubmit = async () => {
    setError('')
    setSending(true)
    try {
      if (updateUser) {
        const response = await axios.put(`${apiUrl}/users/${id_to_update}`, user)
        if (response.data.success) {
          getUsers()
          setModal(false)
        } else {
          setError(response.data.message)
          setSending(false)
        }
      } else {
        const response = await axios.post(`${apiUrl}/users`, user)
        if (response.data.success) {
          getUsers()
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
      const user = users.find(user => user.id === id_to_update)
      if (user) {
        setUser(user)
        setUpdateUser(true)
      }
    } else {
      setUpdateUser(false)
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
    setUser(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur'>
      <div className='w-full max-w-xl rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm lg:text-base'>
        <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
          <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
            {id_to_update ? 'Modificar Cliente' : 'Agregar Cliente'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Código / Usuario</label>
              <div className='relative'>
                <input
                  {...register('user')}
                  type='text'
                  value={user.user}
                  onChange={handleChange}
                  placeholder='Ingresar el usuario del cliente'
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
                  placeholder='Ingresar nombre del cliente'
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
                  placeholder='Ingresar un password para el cliente'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
              </div>
            </div>

            <div className='mb-4 mt-8'>
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
                    {id_to_update ? 'Modificar ' : 'Agregar '}
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

export default ModalCliente
