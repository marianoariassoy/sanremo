import { Product } from '../../../types/product'
import { Order } from '../../../types/order'
import { useEffect, useState } from 'react'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, eachWeekOfInterval, format } from 'date-fns'
import { es } from 'date-fns/locale'

const tablaEstadisticas = ({ products, orders }: { products: Product[]; orders: Order[] }) => {
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const firstDayOfMonth = startOfMonth(currentMonth)
  const lastDayOfMonth = endOfMonth(currentMonth)

  useEffect(() => {
    filterOrders(startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }), endOfWeek(lastDayOfMonth, { weekStartsOn: 1 }))
  }, [])

  useEffect(() => {
    filterOrders(startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }), endOfWeek(lastDayOfMonth, { weekStartsOn: 1 }))
  }, [currentMonth])

  const weeks = eachWeekOfInterval(
    {
      start: startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }),
      end: endOfWeek(lastDayOfMonth, { weekStartsOn: 1 })
    },
    { weekStartsOn: 1 }
  )

  const filterOrders = (start: Date, end: Date) => {
    const result = orders.filter(date => new Date(date.created_at) >= start && new Date(date.created_at) <= end)
    setFilteredOrders(result)
  }

  const getWeek = (date: Date) => {
    const dayOfTheWeek = format(date, 'w')
    return dayOfTheWeek
  }

  return (
    <article className='w-full flex flex-col gap-y-4 text-sm lg:text-base'>
      <div className='flex'>
        <button
          className='flex-1 flex justify-center'
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 320 512'
            className='w-6 h-6 fill-current hover:text-primary'
          >
            <path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z' />
          </svg>
        </button>
        <div className='font-bold capitalize'>{format(currentMonth, 'MMMM yyyy', { locale: es })}</div>
        <button
          className='flex-1 flex justify-center'
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
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
                  <h5 className='font-medium text-nowrap'>Producto/Semana</h5>
                </th>
                {weeks.map((weekStart, index) => {
                  return (
                    <th
                      key={index}
                      className='p-2 py-4'
                    >
                      <h5 className='font-medium whitespace-nowrap'>
                        {format(weekStart, 'dd/MM')} al {format(endOfWeek(weekStart, { weekStartsOn: 1 }), 'dd/MM')}
                      </h5>
                    </th>
                  )
                })}
                <th>Total</th>
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

                  {weeks.map((day, index) => {
                    return (
                      <td
                        key={index}
                        className='p-2'
                      >
                        {filteredOrders
                          .filter(order => getWeek(new Date(order.created_at)) == getWeek(day))
                          .reduce((acc, order) => {
                            return acc + order.products.filter(product => product.id === item.id).length
                          }, 0)}
                      </td>
                    )
                  })}
                  <td className='font-bold'>
                    {filteredOrders.reduce((acc, order) => {
                      return acc + order.products.filter(product => product.id === item.id).length
                    }, 0)}
                  </td>
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
