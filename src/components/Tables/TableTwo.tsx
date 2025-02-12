import { Link } from 'react-router-dom'

interface Data {
  id: number
  nro: string
  date: string
}

const TableOne = ({ data }: { data: Data[] }) => {
  return (
    <article className='w-full flex flex-col gap-y-4 text-sm lg:text-base'>
      <div className='rounded-sm border border-stroke bg-white p-2 lg:px-5 lg:pt-6 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 '>
        <div className='flex flex-col'>
          <div className='flex rounded-sm bg-gray-2 dark:bg-meta-4 mb-3'>
            <div className='p-2.5 py-4 w-16 lg:w-40'>
              <h5 className='font-medium hidden lg:block'>Nro. de pedido</h5>
              <h5 className='font-medium lg:hidden'>Nro.</h5>
            </div>
            <div className='p-2.5 py-4 flex-1'>
              <h5 className='font-medium'>Fecha</h5>
            </div>
            <div className='p-2.5 text-right py-4'></div>
          </div>

          {data.map((item, key) => (
            <div
              className='flex'
              key={key}
            >
              <div className='p-2 w-16 lg:w-40'>{item.nro}</div>
              <div className='p-2 flex-1 font-medium'>{item.date}</div>
              <div className='p-2 text-right'>
                <Link
                  to={`/pedidos/${item.id}`}
                  className='font-bold hover:text-primary'
                >
                  ver
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

export default TableOne
