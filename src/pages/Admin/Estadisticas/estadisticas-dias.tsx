import { useState, useEffect } from 'react'
import axios from 'axios'
import { Product } from '../../../types/product'
import { Order } from '../../../types/order'
import Tabla from './tabla-dias'
import Loader from '../../../components/Loader'

const estadisticas = ({ clients }: { clients: string }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingOrders, setLoadingOrders] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL

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
      const response = await axios.get(`${apiUrl}/orders/all/actives`)
      if (response.data) {
        if (clients === 'all') {
          const data = response.data
          setOrders(data)
        } else {
          const activeOrders = response.data
          const data = activeOrders.filter(order => order.user_id === +clients)
          setOrders(data)
          console.log(data)
        }
        setLoadingOrders(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts()
    getOrders()
  }, [clients])

  return (
    <section className='fade-in'>
      {loadingProducts || loadingOrders ? (
        <Loader />
      ) : (
        <Tabla
          products={products}
          orders={orders}
        />
      )}
    </section>
  )
}

export default estadisticas
