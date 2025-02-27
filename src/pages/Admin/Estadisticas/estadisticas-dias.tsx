import { useState, useEffect } from 'react'
import axios from 'axios'
import { Product } from '../../../types/product'
import { Order } from '../../../types/order'
import Tabla from './tabla-dias'
import Loader from '../../../components/Loader'

const estadisticas = () => {
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
      const response = await axios.get(`${apiUrl}/orders`)
      if (response.data) {
        setOrders(response.data)
        setLoadingOrders(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts()
    getOrders()
  }, [])

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex flex-col gap-y-6'>
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
