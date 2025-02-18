import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import axios from 'axios'
import Loader from '../../../components/Loader'
import { Order } from '../../../types/order'
import { useAuth } from '../../../context'
import formatDate from '../../../utils/date'

const detalles = () => {
  const { id } = useParams()
  const [data, setData] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const apiUrl = import.meta.env.VITE_API_URL
  const { userData } = useAuth()

  useEffect(() => {
    getOrder()
  }, [])

  const getOrder = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apiUrl}/orders/${id}`)
      if (response.data) {
        setData(response.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef })
  const file = `pedido-sanremo.xlsx`

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Detalle del pedido')

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(dataBlob, file)
  }

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex flex-col gap-y-6 max-w-5xl'>
      {loading ? (
        <Loader />
      ) : (
        <article
          className='rounded-sm border border-stroke p-4 lg:px-5 lg:pt-6 pb-2 shadow-default dark:border-strokedark  sm:px-7.5 xl:pb-4 w-full bg-white dark:bg-meta-4'
          ref={contentRef}
        >
          <div className='border-b border-stroke pb-4 dark:border-strokedark flex justify-between gap-x-8'>
            <div className='flex flex-col lg:flex-row justify-between flex-1'>
              <div>
                <h2 className='font-bold'>Pedido #{data[0].id}</h2>
                {userData.role === 'admin' && (
                  <h3>
                    {data[0].user_name} - #{data[0].user_code}
                  </h3>
                )}
                <p className='text-sm font-bold'>
                  Fecha de retiro: {formatDate(new Date(data[0].pickup_date))} {data[0].pickup_hour} hs.
                </p>
                <p className='text-sm text-secondary'>Fecha de pedido: {formatDate(new Date(data[0].created_at))}</p>
              </div>
            </div>
            <div className='flex items-center gap-x-2'>
              <button
                className='text-secondary hover:text-primary print:hidden'
                onClick={() => reactToPrintFn()}
              >
                <svg
                  className='fill-current w-6 h-6'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M6.99578 4.08398C6.58156 4.08398 6.24578 4.41977 6.24578 4.83398V6.36733H13.7542V5.62451C13.7542 5.42154 13.672 5.22724 13.5262 5.08598L12.7107 4.29545C12.5707 4.15983 12.3835 4.08398 12.1887 4.08398H6.99578ZM15.2542 6.36902V5.62451C15.2542 5.01561 15.0074 4.43271 14.5702 4.00891L13.7547 3.21839C13.3349 2.81151 12.7733 2.58398 12.1887 2.58398H6.99578C5.75314 2.58398 4.74578 3.59134 4.74578 4.83398V6.36902C3.54391 6.41522 2.58374 7.40415 2.58374 8.61733V11.3827C2.58374 12.5959 3.54382 13.5848 4.74561 13.631V15.1665C4.74561 16.4091 5.75297 17.4165 6.99561 17.4165H13.0041C14.2467 17.4165 15.2541 16.4091 15.2541 15.1665V13.6311C16.456 13.585 17.4163 12.596 17.4163 11.3827V8.61733C17.4163 7.40414 16.4561 6.41521 15.2542 6.36902ZM4.74561 11.6217V12.1276C4.37292 12.084 4.08374 11.7671 4.08374 11.3827V8.61733C4.08374 8.20312 4.41953 7.86733 4.83374 7.86733H15.1663C15.5805 7.86733 15.9163 8.20312 15.9163 8.61733V11.3827C15.9163 11.7673 15.6269 12.0842 15.2541 12.1277V11.6217C15.2541 11.2075 14.9183 10.8717 14.5041 10.8717H5.49561C5.08139 10.8717 4.74561 11.2075 4.74561 11.6217ZM6.24561 12.3717V15.1665C6.24561 15.5807 6.58139 15.9165 6.99561 15.9165H13.0041C13.4183 15.9165 13.7541 15.5807 13.7541 15.1665V12.3717H6.24561Z'
                    fill=''
                  ></path>
                </svg>
              </button>
              <button
                className='text-secondary hover:text-primary print:hidden'
                onClick={exportToExcel}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  className='fill-current w-5 h-5'
                >
                  <path d='M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3L304 256l0-96c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32l0 96-57.7 0C138 256 128 266 128 278.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5l107.1-99.9z' />
                </svg>
              </button>
            </div>
          </div>
          <div className='py-4 text-sm lg:text-base'>
            {data[0].products.map(item => (
              <div
                key={item.id}
                className='flex justify-between border-b border-gray-100 py-1'
              >
                <div className='w-12'>{item.code}</div>
                <div className='flex-1'>{item.title}</div>
                <div>{item.amount} u</div>
              </div>
            ))}
          </div>
        </article>
      )}

      <div className='flex justify-end'>
        <Link
          to={userData.role === 'admin' ? '/admin/pedidos/historial' : '/clientes/historial'}
          className='inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-20 rounded-lg'
        >
          Volver al listado
        </Link>
      </div>
    </section>
  )
}

export default detalles
