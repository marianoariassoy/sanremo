import { useState, useEffect } from 'react'
import PedidosDetalles from './pedidosDetalles'
import axios from 'axios'
import Loader from '../../../components/Loader'
import { Order } from '../../../types/order'
import Confirm from '../../../components/Confirm'
import { parseISO } from 'date-fns'
import DateRange from './DateRange'

const detalles = () => {
  const [data, setData] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [id_to_delete, setIdToDelete] = useState(0)
  const [loading, setLoading] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL

  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const endOfTodary = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const [startDate, setStartDate] = useState(startOfToday)
  const [endDate, setEndDate] = useState(endOfTodary)

  useEffect(() => {
    getOrders()
  }, [])

  useEffect(() => {
    filterOrders(startDate, endDate)
  }, [data])

  useEffect(() => {
    filterOrders(startDate, endDate)
  }, [startDate, endDate])

  const filterOrders = (start: Date, end: Date) => {
    const filtered = data.filter(order => {
      const orderDate = parseISO(order.pickup_date)
      return orderDate >= start && orderDate <= end
    })
    setFilteredOrders(filtered)
  }

  const handleDateChange = (ranges: any) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const getOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apiUrl}/orders`)
      if (response.data) {
        // const data = response.data.filter(order => order.active)
        setData(response.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateOrder = async () => {
    const newOrder = data.map()
  }

  const deleteItem = async (id: number) => {
    setIdToDelete(0)
    try {
      const response = await axios.delete(`${apiUrl}/orders/${id}`)
      if (response.data) {
        getOrders()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex flex-col-reverse lg:flex-row gap-4'>
      <div className='w-full flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 items-start'>
        {loading ? (
          <Loader />
        ) : filteredOrders.length === 0 ? (
          <div>No hay pedidos en esta fecha 🥲</div>
        ) : (
          filteredOrders.map(order => {
            return (
              <PedidosDetalles
                key={order.id}
                order={order}
                setIdToDelete={setIdToDelete}
                getOrders={getOrders}
              />
            )
          })
        )}
      </div>

      <DateRange
        startDate={startDate}
        endDate={endDate}
        handleDateChange={handleDateChange}
      />

      <Confirm
        id_to_delete={id_to_delete}
        setIdToDelete={setIdToDelete}
        deleteItem={deleteItem}
        title='¿Está seguro de eliminar esta orden?'
      />
    </section>
  )
}

export default detalles
