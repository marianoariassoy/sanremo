import { useState, useEffect } from 'react'
import axios from 'axios'
import { User } from '../../../types/users'
import { Product } from '../../../types/product'
import { Order } from '../../../types/order'
import Tabla from './tabla-clientes'
import Loader from '../../../components/Loader'
import { parseISO } from 'date-fns'
import DateRange from '../Pedidos/DateRangeFull'

const estadisticas = () => {
  const [users, setUser] = useState<User[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingOrders, setLoadingOrders] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL

  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
  const endOfTodary = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const [startDate, setStartDate] = useState(startOfToday)
  const [endDate, setEndDate] = useState(endOfTodary)

  const getUsers = async () => {
    try {
      setLoadingUsers(true)
      const response = await axios.get(`${apiUrl}/users`)
      if (response.data) {
        setUser(response.data)
        setLoadingUsers(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getProducts = async () => {
    try {
      setLoadingProducts(true)
      const response = await axios.get(`${apiUrl}/products`)
      if (response.data) {
        setProducts(response.data)
        setLoadingProducts(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getOrders = async () => {
    try {
      setLoadingOrders(true)
      const response = await axios.get(`${apiUrl}/orders`)
      if (response.data) {
        setOrders(response.data)
        setLoadingOrders(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const filterOrders = (start: Date, end: Date) => {
    const filtered = orders.filter(order => {
      const orderDate = parseISO(order.created_at)
      return orderDate >= start && orderDate <= end
    })
    setFilteredOrders(filtered)
  }

  useEffect(() => {
    getUsers()
    getProducts()
    getOrders()
  }, [])

  useEffect(() => {
    filterOrders(startDate, endDate)
  }, [startDate, endDate])

  useEffect(() => {
    filterOrders(startDate, endDate)
  }, [orders])

  const handleDateChange = (ranges: any) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex flex-col gap-y-6'>
      {loadingUsers || loadingProducts || loadingOrders ? (
        <Loader />
      ) : (
        <div className='flex flex-col gap-4'>
          <div>
            <DateRange
              startDate={startDate}
              endDate={endDate}
              handleDateChange={handleDateChange}
            />
          </div>

          <Tabla
            users={users}
            products={products}
            orders={filteredOrders}
          />
        </div>
      )}
    </section>
  )
}

export default estadisticas
