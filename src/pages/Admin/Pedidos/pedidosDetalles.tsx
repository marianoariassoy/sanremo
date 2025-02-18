import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { Order } from '../../../types/order'
import { useReactToPrint } from 'react-to-print'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'
import formatDate from '../../../utils/date'

const Detalles = ({ order, setIdToDelete }: { order: Order; setIdToDelete: (id: number) => void }) => {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [active, setActive] = useState(order.active)
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef })
  const file = `pedido-sanremo-#${order.id}.xlsx`
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'bottom-right', className: 'bg-primary text-white', duration: 4000 })
    }
  }, [error])

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(order.products)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Detalle de pedido')
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(dataBlob, file)
  }

  const updadeActive = async () => {
    try {
      setSending(true)
      const response = await axios.put(`${apiUrl}/orders/${order.id}`, { active: !active })
      if (response.data.success) {
        setActive(!active)
        setSending(false)

        toast.success(response.data.message, {
          position: 'bottom-right',
          className: 'bg-primary text-white',
          duration: 4000
        })
      } else {
        setError(response.data.message)
        setSending(false)
      }
    } catch (error) {
      setError(error.message)
      setSending(false)
    }
  }

  return (
    <article
      className='rounded-sm border border-stroke p-4 lg:px-5 lg:pt-6 pb-2 shadow-default dark:border-strokedark  sm:px-7.5 xl:pb-4 w-full bg-white dark:bg-meta-4'
      ref={contentRef}
    >
      <div className='border-b border-stroke pb-4 dark:border-strokedark flex items-start justify-between'>
        <div>
          <h2>{order.user_name}</h2>
          <h2 className='font-bold'>#{order.user_code}</h2>
          <p className='text-sm text-secondary'>Fecha de pedido: {formatDate(new Date(order.created_at))}</p>
        </div>
        <div className='flex items-center gap-x-2'>
          {/* <button className='text-secondary hover:text-primary print:hidden'>
            <svg
              width='21'
              height='21'
              viewBox='0 0 21 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M17.0911 3.53206C16.2124 2.65338 14.7878 2.65338 13.9091 3.53206L5.6074 11.8337C5.29899 12.1421 5.08687 12.5335 4.99684 12.9603L4.26177 16.445C4.20943 16.6931 4.286 16.9508 4.46529 17.1301C4.64458 17.3094 4.90232 17.3859 5.15042 17.3336L8.63507 16.5985C9.06184 16.5085 9.45324 16.2964 9.76165 15.988L18.0633 7.68631C18.942 6.80763 18.942 5.38301 18.0633 4.50433L17.0911 3.53206ZM14.9697 4.59272C15.2626 4.29982 15.7375 4.29982 16.0304 4.59272L17.0027 5.56499C17.2956 5.85788 17.2956 6.33276 17.0027 6.62565L16.1043 7.52402L14.0714 5.49109L14.9697 4.59272ZM13.0107 6.55175L6.66806 12.8944C6.56526 12.9972 6.49455 13.1277 6.46454 13.2699L5.96704 15.6283L8.32547 15.1308C8.46772 15.1008 8.59819 15.0301 8.70099 14.9273L15.0436 8.58468L13.0107 6.55175Z'
                fill='currentColor'
              ></path>
            </svg>
          </button> */}
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
          <button
            className='text-secondary hover:text-primary print:hidden'
            onClick={() => setIdToDelete(order.id)}
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='cursor-pointer fill-gray-700 hover:text-error-500 dark:fill-gray-400 dark:hover:text-error-500'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M6.54142 3.7915C6.54142 2.54886 7.54878 1.5415 8.79142 1.5415H11.2081C12.4507 1.5415 13.4581 2.54886 13.4581 3.7915V4.0415H15.6252H16.666C17.0802 4.0415 17.416 4.37729 17.416 4.7915C17.416 5.20572 17.0802 5.5415 16.666 5.5415H16.3752V8.24638V13.2464V16.2082C16.3752 17.4508 15.3678 18.4582 14.1252 18.4582H5.87516C4.63252 18.4582 3.62516 17.4508 3.62516 16.2082V13.2464V8.24638V5.5415H3.3335C2.91928 5.5415 2.5835 5.20572 2.5835 4.7915C2.5835 4.37729 2.91928 4.0415 3.3335 4.0415H4.37516H6.54142V3.7915ZM14.8752 13.2464V8.24638V5.5415H13.4581H12.7081H7.29142H6.54142H5.12516V8.24638V13.2464V16.2082C5.12516 16.6224 5.46095 16.9582 5.87516 16.9582H14.1252C14.5394 16.9582 14.8752 16.6224 14.8752 16.2082V13.2464ZM8.04142 4.0415H11.9581V3.7915C11.9581 3.37729 11.6223 3.0415 11.2081 3.0415H8.79142C8.37721 3.0415 8.04142 3.37729 8.04142 3.7915V4.0415ZM8.3335 7.99984C8.74771 7.99984 9.0835 8.33562 9.0835 8.74984V13.7498C9.0835 14.1641 8.74771 14.4998 8.3335 14.4998C7.91928 14.4998 7.5835 14.1641 7.5835 13.7498V8.74984C7.5835 8.33562 7.91928 7.99984 8.3335 7.99984ZM12.4168 8.74984C12.4168 8.33562 12.081 7.99984 11.6668 7.99984C11.2526 7.99984 10.9168 8.33562 10.9168 8.74984V13.7498C10.9168 14.1641 11.2526 14.4998 11.6668 14.4998C12.081 14.4998 12.4168 14.1641 12.4168 13.7498V8.74984Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className='py-4 text-sm lg:text-base border-b border-stroke pb-4 mb-4 dark:border-strokedark'>
        <h2 className='font-bold mb-2'>Pedido #{order.id}</h2>

        {order.products.map(item => (
          <div
            key={item.id}
            className='flex justify-between'
          >
            <div className='w-12'>{item.code}</div>
            <div className='flex-1'>{item.title}</div>
            <div>{item.amount}</div>
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-y-2'>
        <div className='font-bold'>
          Retira {formatDate(new Date(order.pickup_date))} - {order.pickup_hour} hs.
        </div>
        <div className='flex gap-x-2 justify-between'>
          <div className='font-bold'>Pedido confirmado</div>
          <div>
            {sending ? (
              <div className='mb-2'>
                <BeatLoader />
              </div>
            ) : (
              <button onClick={updadeActive}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  className={`fill-current w-7 h-7 ${active ? 'text-secondary hover:text-success' : 'text-success'}`}
                >
                  <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z' />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <Toaster />
    </article>
  )
}

export default Detalles
