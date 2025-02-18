import { useState, useEffect } from 'react'
import Tabla from './tabla-historial'
import axios from 'axios'
import Loader from '../../../components/Loader'
import { Order } from '../../../types/order'
import { useAuth } from '../../../context'

const formulario = () => {
  const [data, setData] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL
  const { userData } = useAuth()

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apiUrl}/orders`)
      if (response.data) {
        const dataFiltered = response.data.filter(order => order.user_id === userData.id)
        setData(dataFiltered)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6 w-full max-w-5xl'>
      <h1 className='text-2xl lg:text-3xl font-bold'>Historial de pedidos</h1>

      {loading ? <Loader /> : data.length > 0 ? <Tabla data={data} /> : <p>No hay pedidos realizados</p>}
    </section>
  )
}

export default formulario
