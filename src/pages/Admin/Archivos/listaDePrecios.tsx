import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BeatLoader } from 'react-spinners'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

interface FormValues {
  file: FileList
}

const listadeprecios = () => {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const apiUrl = import.meta.env.VITE_API_URL

  const Error = ({ text }: { text: string }) => {
    return <div className='mt-2 text-sm text-primary font-medium'>👆 {text}</div>
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    setError('')
    setSending(true)

    const formData = new FormData()
    formData.append('file', data.file[0])

    try {
      const response = await axios.post(`${apiUrl}/files/precios`, formData)
      if (response.data.success) {
        setSending(false)
        toast.success(response.data.message, { position: 'bottom-right', duration: 4000 })
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
    <div className='fade-in'>
      <div className='rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] '>
        <form
          className='p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6 flex flex-col gap-y-3'
          onSubmit={handleSubmit(onSubmit)}
          encType='multipart/form-data'
        >
          <div className='space-y-6'>
            <div>
              <input
                type='file'
                {...register('file', {
                  required: 'Este dato es requerido'
                })}
                className='focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-none focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400 custom-class'
              />
              {errors.file && <Error text={errors.file.message} />}
            </div>
          </div>
          <div>
            {sending ? (
              <div>
                <BeatLoader />
              </div>
            ) : (
              <input
                type='submit'
                value='Subir Lista de precios'
                className='cursor-pointer font-medium rounded-lg bg-primary px-6 py-3 text-white transition hover:bg-opacity-90'
              />
            )}
          </div>
          <div className='text-secondary text-sm'>
            Subir archivo de lista de precios de San Remo. El archivo debe ser en formato xlsx.{' '}
            <a
              href='https://ligadecapitanes.com.ar/sanremo-api/uploads/listadeprecios-sanremo.xlsx'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-primary underline'
            >
              Descargar lista de precios
            </a>
          </div>
        </form>
      </div>

      <Toaster />
    </div>
  )
}

export default listadeprecios
