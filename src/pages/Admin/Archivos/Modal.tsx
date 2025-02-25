import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'
import { File } from '../../../types/file'

const ModalArchivos = ({
  setModal,
  getFiles,
  files,
  id_to_update
}: {
  setModal: (arg: boolean) => void
  getFiles: () => void
  files: File[]
  id_to_update: number
}) => {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [updateFile, setUpdateFile] = useState(false)
  const [fileMain, setFileMain] = useState()
  const [file, setFile] = useState<File>({
    id: 0,
    category: 0,
    title: '',
    file: ''
  })

  const apiUrl = import.meta.env.VITE_API_URL

  const onSubmit = async () => {
    setError('')
    setSending(true)
    const formData = new FormData()
    formData.append('data', JSON.stringify(file))
    if (fileMain) {
      formData.append('file', fileMain)
    }

    try {
      if (updateFile) {
        const response = await axios.post(`${apiUrl}/files/${id_to_update}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (response?.data?.success) {
          getFiles()
          setModal(false)
        } else {
          setError(response.data?.message)
          setSending(false)
        }
      } else {
        const response = await axios.post(`${apiUrl}/files`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (response.data.success) {
          getFiles()
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
      const file = files.find(file => file.id === id_to_update)

      if (file) {
        setFile(file)
        setUpdateFile(true)
      }
    } else {
      setUpdateFile(false)
    }
  }, [id_to_update])

  const {
    register,
    handleSubmit,
    formState: {}
  } = useForm()

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'bottom-right', className: 'bg-primary text-white', duration: 4000 })
    }
  }, [error])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFile(prev => ({ ...prev, [name]: value }))
  }

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFile(prev => ({ ...prev, [name]: value }))
  }

  const getFile = e => {
    const file = e.target.files[0]
    setFileMain(file)
  }

  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur p-4'>
      <div className='w-full max-w-xl rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm lg:text-base'>
        <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
          <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
            {id_to_update ? 'Modificar Archivo' : 'Agregar Archivo'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Título</label>
              <div className='relative'>
                <input
                  {...register('title')}
                  type='text'
                  value={file.title}
                  onChange={handleChange}
                  placeholder='Ingresar el título del archivo'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
              </div>
            </div>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Categoría</label>
              <div className='relative'>
                <select
                  defaultValue={file.category ? file.category : 0}
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
                  <option
                    value='1'
                    selected={file.category === 1}
                    className='text-body dark:text-bodydark'
                  >
                    Catálogo
                  </option>
                  <option
                    value='2'
                    selected={file.category === 2}
                    className='text-body dark:text-bodydark'
                  >
                    Listado de precios
                  </option>
                </select>
              </div>
            </div>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Archivo</label>
              <div className='relative'>
                <input
                  type='file'
                  {...register('file')}
                  onChange={getFile}
                  className='file:mr-4 file:rounded-lg file:border-0 file:text-white file:bg-primary file:px-4 file:py-3 file:h-14 file:text-sm file:font-semibold hover:file:bg-opacity-90 file:cursor-pointer'
                />
              </div>
            </div>
            <div className='mb-4 mt-8'>
              {sending ? (
                <div className='mt-12 w-full flex justify-center'>
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

export default ModalArchivos
