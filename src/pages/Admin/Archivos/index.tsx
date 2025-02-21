import { useState, useEffect } from 'react'
import Loader from '../../../components/Loader'
import axios from 'axios'
import { File } from '../../../types/file'
import Modal from './Modal'
import Confirm from '../../../components/Confirm'
import Tabla from './Tabla'

const index = () => {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(true)
  const [id_to_delete, setIdToDelete] = useState(0)
  const [id_to_update, setIdToUpdate] = useState(0)
  const apiUrl = import.meta.env.VITE_API_URL
  const [modal, setModal] = useState(false)

  const getFiles = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apiUrl}/files`)
      if (response.data) {
        setFiles(response.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteItem = async (id: number) => {
    setIdToDelete(0)
    try {
      const response = await axios.delete(`${apiUrl}/files/${id}`)
      if (response.data) {
        getFiles()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFiles()
  }, [])

  const addFile = () => {
    setIdToUpdate(0)
    setModal(true)
  }
  const updateFile = (id: number) => {
    setIdToUpdate(id)
    setModal(true)
  }

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex flex-col gap-y-6 max-w-5xl'>
      <div className='w-full flex flex-col lg:flex-row justify-between gap-4'>
        <div>
          <h1 className='text-xl lg:text-3xl font-bold'>Archivos ({files?.length})</h1>
        </div>
        <div className='flex flex-col lg:flex-row gap-x-4 gap-y-2'>
          <button
            className='inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-20 rounded-lg text-sm lg:text-base'
            onClick={() => addFile()}
          >
            Agregar
          </button>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <Tabla
          data={files}
          setIdToDelete={setIdToDelete}
          updateFile={updateFile}
        />
      )}

      <Confirm
        id_to_delete={id_to_delete}
        setIdToDelete={setIdToDelete}
        deleteItem={deleteItem}
        title='¿Está seguro de eliminar este archivo?'
      />

      {modal && (
        <Modal
          setModal={setModal}
          getFiles={getFiles}
          files={files}
          id_to_update={id_to_update}
        />
      )}
    </section>
  )
}

export default index
