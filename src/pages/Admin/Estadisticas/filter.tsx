import axios from 'axios'
import Loader from '../../../components/Loader'
import { useState, useEffect } from 'react'
import { User } from '../../../types/users'

interface FilterProps {
  setClients: (arg: string) => void
}

const filter = ({ setClients }: FilterProps) => {
  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    getClients()
  }, [])

  const getClients = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${apiUrl}/users`)
      if (response.data) {
        setData(response.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <Loader />

  return (
    <select
      onChange={e => setClients(e.target.value)}
      className='w-full max-w-xl relative z-20 appearance-none border border-stroke bg-white py-4 pl-6 pr-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input rounded-lg'
    >
      <option disabled>Seleccionar un Cliente</option>
      <option value='all'>Todos</option>
      {data.map(client => (
        <option
          key={client.id}
          value={client.id}
        >
          {client.name} ({client.user})
        </option>
      ))}
    </select>
  )
}

export default filter
