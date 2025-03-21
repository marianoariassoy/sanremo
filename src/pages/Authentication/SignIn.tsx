import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'
import { User } from '../../types/users'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context'

import Logo from '../../images/logo/logo.png'
import Logo2 from '../../images/logo/logo-krumel-bn.png'
import Logo3 from '../../images/logo/logo-krachitos-bn.png'
import Logo4 from '../../images/logo/logo-criskey-bn.png'
import Logo5 from '../../images/logo/logo-cops-bn.png'

const SignIn: React.FC = () => {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const apiUrl = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const { login } = useAuth()

  const Error = ({ text }: { text: string }) => {
    return <div className='mt-2 text-sm text-primary font-medium'>👆 {text}</div>
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data: User) => {
    setError('')
    setSending(true)

    try {
      const response = await axios.post(`${apiUrl}/users/login`, data)
      if (response.data.success) {
        const token = response.data.token
        login(token)
        navigate('/')
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

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState)
  }

  return (
    <section className='fade-in flex h-screen items-center justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='flex flex-wrap items-center'>
            <div className='hidden w-full xl:block xl:w-1/2'>
              <div className='py-17.5 px-26 text-center'>
                <div className='mb-5.5 inline-block'>
                  <img
                    className='w-60'
                    src={Logo}
                    alt='Logo'
                  />
                </div>
                <div className='mt-15 flex items-center justify-center gap-x-2'>
                  <div>
                    <img
                      src={Logo2}
                      alt='Logo'
                      className='w-3/4'
                    />
                  </div>
                  <div>
                    <img
                      src={Logo3}
                      alt='Logo'
                      className='w-3/4'
                    />
                  </div>
                  <div>
                    <img
                      src={Logo4}
                      alt='Logo'
                      className='w-3/4'
                    />
                  </div>
                  <div>
                    <img
                      src={Logo5}
                      alt='Logo'
                      className='w-3/4'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2'>
              <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
                <span className='mb-1.5 block font-medium'>Iniciar sesión</span>
                <h2 className='mb-9 text-2xl font-bold text-black dark:text-white'>Panificadora San Remo SRL</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mb-4'>
                    <label className='mb-2.5 block font-medium text-black dark:text-white'>Usuario</label>
                    <div className='relative'>
                      <input
                        type='text'
                        {...register('user', {
                          required: 'Este dato es requerido',
                          maxLength: 50
                        })}
                        placeholder='Ingresa tu usuario'
                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                      />
                      {errors.user && <Error text={errors.user.message} />}
                      <span className='absolute right-4 top-4'>
                        <svg
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                          className='fill-gray-500 dark:fill-gray-400 w-6 h-6'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z'
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className='mb-6'>
                    <div className='flex justify-between items-center pr-4'>
                      <label className='mb-2.5 block font-medium text-black dark:text-white'>Contraseña</label>
                      <button
                        type='button'
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <svg
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                            className='fill-gray-500 dark:fill-gray-400 w-6 h-6'
                          >
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M10.0002 13.8619C7.23361 13.8619 4.86803 12.1372 3.92328 9.70241C4.86804 7.26761 7.23361 5.54297 10.0002 5.54297C12.7667 5.54297 15.1323 7.26762 16.0771 9.70243C15.1323 12.1372 12.7667 13.8619 10.0002 13.8619ZM10.0002 4.04297C6.48191 4.04297 3.49489 6.30917 2.4155 9.4593C2.3615 9.61687 2.3615 9.78794 2.41549 9.94552C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C13.5184 15.3619 16.5055 13.0957 17.5849 9.94555C17.6389 9.78797 17.6389 9.6169 17.5849 9.45932C16.5055 6.30919 13.5184 4.04297 10.0002 4.04297ZM9.99151 7.84413C8.96527 7.84413 8.13333 8.67606 8.13333 9.70231C8.13333 10.7286 8.96527 11.5605 9.99151 11.5605H10.0064C11.0326 11.5605 11.8646 10.7286 11.8646 9.70231C11.8646 8.67606 11.0326 7.84413 10.0064 7.84413H9.99151Z'
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                            className='fill-gray-500 dark:fill-gray-400 w-6 h-6'
                          >
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M4.63803 3.57709C4.34513 3.2842 3.87026 3.2842 3.57737 3.57709C3.28447 3.86999 3.28447 4.34486 3.57737 4.63775L4.85323 5.91362C3.74609 6.84199 2.89363 8.06395 2.4155 9.45936C2.3615 9.61694 2.3615 9.78801 2.41549 9.94558C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C11.255 15.3619 12.4422 15.0737 13.4994 14.5598L15.3625 16.4229C15.6554 16.7158 16.1302 16.7158 16.4231 16.4229C16.716 16.13 16.716 15.6551 16.4231 15.3622L4.63803 3.57709ZM12.3608 13.4212L10.4475 11.5079C10.3061 11.5423 10.1584 11.5606 10.0064 11.5606H9.99151C8.96527 11.5606 8.13333 10.7286 8.13333 9.70237C8.13333 9.5461 8.15262 9.39434 8.18895 9.24933L5.91885 6.97923C5.03505 7.69015 4.34057 8.62704 3.92328 9.70247C4.86803 12.1373 7.23361 13.8619 10.0002 13.8619C10.8326 13.8619 11.6287 13.7058 12.3608 13.4212ZM16.0771 9.70249C15.7843 10.4569 15.3552 11.1432 14.8199 11.7311L15.8813 12.7925C16.6329 11.9813 17.2187 11.0143 17.5849 9.94561C17.6389 9.78803 17.6389 9.61696 17.5849 9.45938C16.5055 6.30925 13.5184 4.04303 10.0002 4.04303C9.13525 4.04303 8.30244 4.17999 7.52218 4.43338L8.75139 5.66259C9.1556 5.58413 9.57311 5.54303 10.0002 5.54303C12.7667 5.54303 15.1323 7.26768 16.0771 9.70249Z'
                            ></path>
                          </svg>
                        )}
                      </button>
                    </div>
                    <div className='relative'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                          required: 'Este dato es requerido',
                          validate: value => value.length > 4 || 'La longitud debe ser mayor a 4 caracteres'
                        })}
                        placeholder='Ingresa tu contraseña'
                        className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                      />
                      {errors.password && <Error text={errors.password.message} />}

                      <span className='absolute right-4 top-4'>
                        <svg
                          className='fill-current'
                          width='22'
                          height='22'
                          viewBox='0 0 22 22'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g opacity='0.5'>
                            <path
                              d='M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z'
                              fill=''
                            />
                            <path
                              d='M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z'
                              fill=''
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className='mb-5'>
                    {sending ? (
                      <div>
                        <BeatLoader />
                      </div>
                    ) : (
                      <input
                        type='submit'
                        value='Ingresar'
                        className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90'
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex justify-center p-6'>
          <div className='text-black/30 flex gap-x-1'>
            <span>Desarrollo:</span>
            <a
              href='http://www.borderlain.com'
              target='_blank'
              rel='noreferrer'
              className='hover:underline '
            >
              Borderlain
            </a>
          </div>
        </div>
      </div>

      <Toaster />
    </section>
  )
}

export default SignIn
