import { User } from '../../../types/users'
import { Product } from '../../../types/product'
import { Order } from '../../../types/order'

const tablaEstadisticas = ({ users, products, orders }: { users: User[]; products: Product[]; orders: Order[] }) => {
  return (
    <article className='w-full flex flex-col gap-y-4 text-sm lg:text-base'>
      <div className='rounded-sm border border-stroke bg-white p-2 lg:px-5 lg:pt-6 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4'>
        <div className='w-full overflow-x-auto'>
          <table className='w-full'>
            <thead className='rounded-sm bg-gray-2 dark:bg-meta-4 mb-3'>
              <tr className='text-left'>
                <th className='p-2 py-4 w-16 lg:w-40'>
                  <h5 className='font-medium text-nowrap'>Producto</h5>
                </th>
                {users.map(user => {
                  return (
                    <th
                      key={user.id}
                      className='p-2 py-4'
                    >
                      <h5 className='font-medium text-nowrap'>{user.name}</h5>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {products.map(item => (
                <tr key={item.id}>
                  <td className='p-2 text-nowrap pr-4'>
                    #{item.code} {item.title}
                  </td>
                  {users.map(user => {
                    return (
                      <td
                        key={user.id}
                        className='p-2'
                      >
                        {orders
                          .filter(order => order.user_id === user.id)
                          .reduce((acc, order) => {
                            return acc + order.products.filter(product => product.id === item.id).length
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
