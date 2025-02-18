import { useState, useEffect } from 'react'
import Tabla from './tabla-Historial'
import Loader from '../../../components/Loader'
import { Order } from '../../../types/order'
import axios from 'axios'

const historialAdmin = () => {
  const [data, setData] = useState<Order[]>([])
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    getOrders()
  }, [])

  useEffect(() => {
    if (user === '') return
    const userFiltered = data.filter(order => order.user_name === user)
    setData(userFiltered)
  }, [user])

  const getOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apiUrl}/orders`)
      if (response.data) {
        setData(response.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6 w-full max-w-5xl'>
      <div>filtros</div>
      <div className='flex gap-x-1 text-2xl lg:text-3xl font-bold'>
        <h1>Historial de pedidos </h1>
        {user !== '' && (
          <button
            className='underline hover:text-primary'
            onClick={() => setUser('')}
          >
            {user}
          </button>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Tabla
          data={data}
          setUser={setUser}
        />
      )}
    </section>
  )
}

export default historialAdmin
