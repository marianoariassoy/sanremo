import { Product } from '../../../types/product'
import { Order } from '../../../types/order'
import { useEffect, useState } from 'react'
import { format, eachMonthOfInterval, startOfYear, endOfYear } from 'date-fns'
import { es } from 'date-fns/locale'

const tablaEstadisticas = ({ products, orders }: { products: Product[]; orders: Order[] }) => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])

  const months = eachMonthOfInterval({
    start: startOfYear(new Date(year, 0, 1)),
    end: endOfYear(new Date(year, 0, 1))
  })

  // const getMonth = (date: Date) => {
  //   return Number(format(date, 'M'))
  // }

  const getMonth = (date: Date) => {
    return date.getMonth() + 1 // devuelve 5 para mayo
  }

  // const filterOrders = (start: Date, end: Date) => {
  //   const filtered = orders.filter(order => {
  //     const orderDate = new Date(order.pickup_date)
  //     return orderDate >= start && orderDate <= end
  //   })
  //   setFilteredOrders(filtered)
  //   console.log(filtered)
  // }

  const filterOrders = (start: Date, end: Date) => {
    const filtered = orders.filter(order => {
      const orderDate = new Date(order.pickup_date) // fuerza zona horaria local
      return orderDate >= start && orderDate <= end
    })
    setFilteredOrders(filtered)
  }

  useEffect(() => {
    filterOrders(startOfYear(new Date(year, 0, 1)), endOfYear(new Date(year, 0, 1)))
  }, [year])

  return (
    <article className='w-full flex flex-col gap-y-4 text-sm lg:text-base'>
      <div className='flex items-center gap-x-4'>
        <button
          className='flex-1 flex justify-center'
          onClick={() => setYear(prev => prev - 1)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 320 512'
            className='w-6 h-6 fill-current hover:text-primary'
          >
            <path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z' />
          </svg>
        </button>
        <span className='font-bold'>{year}</span>
        <button
          className='flex-1 flex justify-center'
          onClick={() => setYear(prev => prev + 1)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 320 512'
            className='w-6 h-6 fill-current hover:text-primary'
          >
            <path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z' />
          </svg>
        </button>
      </div>

      <div className='rounded-sm border border-stroke bg-white p-2 lg:px-5 lg:pt-6 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4'>
        <div className='w-full overflow-x-auto'>
          <table className='w-full'>
            <thead className='rounded-sm bg-gray-2 dark:bg-meta-4 mb-3'>
              <tr className='text-left'>
                <th className='p-2 py-4 w-16 lg:w-40'>
                  <h5 className='font-medium text-nowrap'>Producto/Mes</h5>
                </th>
                <th className='pr-8'>Total</th>

                {months.map((month, index) => {
                  return (
                    <th
                      key={index}
                      className='p-2 py-4'
                    >
                      <h5 className='font-medium text-nowrap capitalize'>{format(month, 'MMMM', { locale: es })}</h5>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {products.map(item => (
                <tr
                  key={item.id}
                  className='border-b border-gray-100'
                >
                  <td className='p-2 text-nowrap pr-8'>
                    #{item.code} {item.title}
                  </td>
                  <td className='font-bold'>
                    {filteredOrders.reduce((acc, order) => {
                      return (
                        acc +
                        order.products
                          .filter(product => product.id === item.id)
                          .reduce((acc_product, product) => {
                            return acc_product + product.amount
                          }, 0)
                      )
                    }, 0)}
                  </td>
                  {months.map((month, index) => {
                    const monthNumber = month.getMonth() + 1
                    return (
                      <td
                        key={index}
                        className='p-2'
                      >
                        {filteredOrders
                          .filter(order => getMonth(new Date(order.pickup_date)) === monthNumber)
                          .reduce((acc, order) => {
                            return (
                              acc +
                              order.products
                                .filter(product => product.id === item.id)
                                .reduce((acc_product, product) => {
                                  return acc_product + product.amount
                                }, 0)
                            )
                          }, 0)}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  )
}

export default tablaEstadisticas
