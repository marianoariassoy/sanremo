import { useState, useEffect } from 'react'
import Tabla from './Tabla'
import Loader from '../../../components/Loader'
import axios from 'axios'
import Confirm from '../../../components/Confirm'
import Modal from './Modal'
import { User } from '../../../types/users'

const productos = () => {
  const [users, setUser] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [id_to_delete, setIdToDelete] = useState(0)
  const [id_to_update, setIdToUpdate] = useState(0)
  const [modal, setModal] = useState(false)
  const apiUrl = import.meta.env.VITE_API_URL

  const getUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apiUrl}/users`)
      if (response.data) {
        setUser(response.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteItem = async (id: number) => {
    setIdToDelete(0)
    try {
      const response = await axios.delete(`${apiUrl}/users/${id}`)
      if (response.data) {
        getUsers()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const addUser = () => {
    setIdToUpdate(0)
    setModal(true)
  }

  const updateUser = (id: number) => {
    setIdToUpdate(id)
    setModal(true)
  }

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6'>
      <div className='w-full flex justify-between'>
        <div>
          <h1 className='text-2xl lg:text-3xl font-bold'>Clientes ({users?.length})</h1>
        </div>
        <div>
          <button
            className='inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-20 rounded-lg'
            onClick={() => addUser()}
          >
            Agregar
          </button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Tabla
          data={users}
          setIdToDelete={setIdToDelete}
          updateUser={updateUser}
        />
      )}

      <Confirm
        id_to_delete={id_to_delete}
        setIdToDelete={setIdToDelete}
        deleteItem={deleteItem}
        title='¿Está seguro de eliminar este cliente?'
      />

      {modal && (
        <Modal
          setModal={setModal}
          getUsers={getUsers}
          id_to_update={id_to_update}
          users={users}
        />
      )}
    </section>
  )
}

export default productos
