import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'

interface Data {
  name: string
  user: string
  password: string
}

const Nuevo = () => {
  const [sended, setSended] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const Error = ({ text }: { text: string }) => {
    return <div className='mt-2 text-sm text-primary font-medium'>👆 {text}</div>
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data: Data) => {
    setError('')
    setSending(true)
    try {
      const response = await axios.post('http://localhost/sites/sanremo-backend/users/create', data)
      if (response.data.success) {
        setError('')
        setSending(false)
        setSended(true)
        toast.success(response.data.message, {
          position: 'bottom-right',
          duration: 4000
        })
        setTimeout(() => {
          navigate('/admin/clientes')
        }, 4500)
      } else {
        setError(response.data.message)
        setSending(false)
      }
    } catch (error) {
      setError(error)
      setSending(false)
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'bottom-right', className: 'bg-primary text-white', duration: 4000 })
    }
  }, [error])

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6 max-w-3xl'>
      <div className='w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm lg:text-base'>
        <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
          <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>Agregar Cliente</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Código / Usuario</label>
              <div className='relative'>
                <input
                  type='text'
                  {...register('user', {
                    required: 'Este dato es requerido',
                    validate: value => value.length > 3 || 'La longitud debe ser mayor a 4 caracteres'
                  })}
                  placeholder='Ingresar el usuario del cliente'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
                {errors.user && <Error text={errors.user.message} />}
              </div>
            </div>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Nombre / Razón Social</label>
              <div className='relative'>
                <input
                  {...register('name', { required: 'Este dato es requerido' })}
                  type='text'
                  placeholder='Ingresar nombre del cliente'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
                {errors.name && <Error text={errors.name.message} />}
              </div>
            </div>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Password</label>
              <div className='relative'>
                <input
                  type='text'
                  {...register('password', {
                    required: 'Este dato es requerido',
                    validate: value => value.length > 3 || 'La longitud debe ser mayor a 4 caracteres'
                  })}
                  placeholder='Ingresar un password para el cliente'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
                {errors.password && <Error text={errors.password.message} />}
              </div>
            </div>

            <div className='mb-4 mt-8'>
              {sending ? (
                <div className='mt-6 w-full flex justify-center'>
                  <BeatLoader />
                </div>
              ) : sended ? (
                <button
                  className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 font-medium'
                  disabled
                >
                  Crear Cliente
                </button>
              ) : (
                <button className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 font-medium'>
                  Crear Cliente
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
