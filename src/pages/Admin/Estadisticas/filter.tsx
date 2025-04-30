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
  const apiUrl = import.meta.env.VITE_API_URL as string

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
    <div className='relative w-full max-w-xl'>
      <select
        onChange={e => setClients(e.target.value)}
        className='w-full appearance-none border border-stroke bg-white py-4 pl-6 pr-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input rounded-lg'
      >
        <option value='all'>Todos los clientes</option>
        {data.map(client => (
          <option
            key={client.id}
            value={client.id}
          >
            {client.name} ({client.user})
          </option>
        ))}
      </select>
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
  )
}

export default filter
