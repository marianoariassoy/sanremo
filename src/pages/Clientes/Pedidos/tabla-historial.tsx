import { Link } from 'react-router-dom'
import { Order } from '../../../types/order'

const TableOne = ({ data }: { data: Order[] }) => {
  return (
    <article className='w-full flex flex-col gap-y-4 text-sm lg:text-base'>
      <div className='rounded-sm border border-stroke bg-white p-2 lg:px-5 lg:pt-6 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 '>
        <table className='w-full'>
          <thead className='rounded-sm bg-gray-2 dark:bg-meta-4 mb-3'>
            <tr className='text-left'>
              <th className='p-2 py-4 w-16 lg:w-40'>
                <h5 className='font-medium text-nowrap'>Nro. </h5>
              </th>
              <th className='p-2 py-4 flex-1'>
                <h5 className='font-medium'>Pedido realizado</h5>
              </th>
              <th className='p-2 py-4'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, key) => (
              <tr key={key}>
                <td className='p-2 w-16 lg:w-40'>#{item.id}</td>
                <td className='p-2 flex-1 font-medium'>{item.created_at}</td>
                <td className='p-2 text-right'>
                  <Link
                    to={`/clientes/pedidos/${item.id}`}
                    className='font-bold hover:text-primary'
                  >
                    ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

export default TableOne
