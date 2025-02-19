import { Link } from 'react-router-dom'
import { Order } from '../../../types/order'
import formatDate from '../../../utils/date'

const TableOne = ({ data }: { data: Order[] }) => {
  return (
    <article className='w-full flex flex-col gap-y-4 text-sm lg:text-base'>
      <div className='rounded-sm border border-stroke bg-white p-2 lg:px-5 lg:pt-6 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 '>
        <div className='w-full overflow-x-auto'>
          <table className='w-full'>
            <thead className='rounded-sm bg-gray-2 dark:bg-meta-4 mb-3'>
              <tr className='text-left'>
                <th className='p-2 py-4 w-16 lg:w-40'>
                  <h5 className='font-medium'>Nro. </h5>
                </th>
                <th className='p-2 py-4 flex-1'>
                  <h5 className='font-medium text-nowrap'>Pedido realizado</h5>
                </th>
                <th className='p-2 py-4 flex-1'>
                  <h5 className='font-medium text-nowrap'>Fecha retiro</h5>
                </th>
                <th className='p-2 py-4'></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, key) => (
                <tr
                  key={key}
                  className='border-b border-gray-100 dark:border-strokedark'
                >
                  <td className='p-2 0'>#{item.id}</td>
                  <td className='p-2 font-medium'>{formatDate(new Date(item.created_at))} </td>
                  <td className='p-2 font-medium text-nowrap'>
                    {formatDate(new Date(item.pickup_date))} {item.pickup_hour} hs.
                  </td>
                  <td className='p-2 flex justify-end'>
                    <Link
                      to={`/clientes/pedidos/${item.id}`}
                      className='text-secondary hover:text-primary'
                    >
                      <svg
                        className='fill-current'
                        width='21'
                        height='20'
                        viewBox='0 0 21 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M10.8749 13.8619C8.10837 13.8619 5.74279 12.1372 4.79804 9.70241C5.74279 7.26761 8.10837 5.54297 10.8749 5.54297C13.6415 5.54297 16.0071 7.26762 16.9518 9.70243C16.0071 12.1372 13.6415 13.8619 10.8749 13.8619ZM10.8749 4.04297C7.35666 4.04297 4.36964 6.30917 3.29025 9.4593C3.23626 9.61687 3.23626 9.78794 3.29025 9.94552C4.36964 13.0957 7.35666 15.3619 10.8749 15.3619C14.3932 15.3619 17.3802 13.0957 18.4596 9.94555C18.5136 9.78797 18.5136 9.6169 18.4596 9.45932C17.3802 6.30919 14.3932 4.04297 10.8749 4.04297ZM10.8663 7.84413C9.84002 7.84413 9.00808 8.67606 9.00808 9.70231C9.00808 10.7286 9.84002 11.5605 10.8663 11.5605H10.8811C11.9074 11.5605 12.7393 10.7286 12.7393 9.70231C12.7393 8.67606 11.9074 7.84413 10.8811 7.84413H10.8663Z'
                          fill=''
                        ></path>
                      </svg>
                    </Link>
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

export default TableOne
