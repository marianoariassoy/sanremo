import { useState, useEffect } from 'react'
import Tabla from './tablahistorial'
import Loader from '../../../components/Loader'
import { Order } from '../../../types/order'
import axios from 'axios'
import { parseISO } from 'date-fns'
import DateRange from './DateRange'
import Users from './UsersSelect'

const historialAdmin = () => {
  const [data, setData] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [userFiltered, setUserFiltered] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL

  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3)
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

  useEffect(() => {
    const ordersByName = data.filter(order => order.user_name === userFiltered)
    const orderByDate = ordersByName.filter(order => {
      const orderDate = parseISO(order.pickup_date)
      return orderDate >= startDate && orderDate <= endDate
    })
    setFilteredOrders(orderByDate)
  }, [userFiltered])

  const filterOrders = (start: Date, end: Date) => {
    if (userFiltered) {
      const ordersByName = data.filter(order => order.user_name === userFiltered)
      const filtered = ordersByName.filter(order => {
        const orderDate = parseISO(order.pickup_date)
        return orderDate >= start && orderDate <= end
      })
      setFilteredOrders(filtered)
    } else {
      const filtered = data.filter(order => {
        const orderDate = parseISO(order.pickup_date)
        return orderDate >= start && orderDate <= end
      })
      setFilteredOrders(filtered)
    }
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
        const data = response.data.filter(order => !order.active)
        setData(data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex flex-col gap-y-6'>
      <div className='w-full 0'>
        <h1 className='text-2xl lg:text-3xl font-bold'>Historial de pedidos</h1>
      </div>
      <div className='flex gap-4 flex-col-reverse lg:flex-row'>
        <div className='flex-1'>{loading ? <Loader /> : <Tabla data={filteredOrders} />}</div>
        <div className='flex flex-col gap-y-2 lg:gap-y-4'>
          <DateRange
            startDate={startDate}
            endDate={endDate}
            handleDateChange={handleDateChange}
          />

          <Users setUserFiltered={setUserFiltered} />
        </div>
      </div>
    </section>
  )
}

export default historialAdmin
