import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Tabla from '../../Clientes/Pedidos/tabla-pedidos'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'
import toast, { Toaster } from 'react-hot-toast'
import SuccessfulComponent from '../../../components/SuccessfulComponent'
import { Product } from '../../../types/product'
import { Order } from '../../../types/order'

const formulario = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [order, setOrder] = useState<Order>()
  const [sended, setSended] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const apiUrl = import.meta.env.VITE_API_URL
  const { id } = useParams()

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      setLoading(true)
      const responseProducts = await axios.get(`${apiUrl}/products`)
      if (responseProducts.data) {
        const response = await axios.get(`${apiUrl}/orders/${id}`)
        if (response.data) {
          const orders = response.data[0].products
          setOrder(response.data[0])

          const productsUpdate = responseProducts.data.map(product => {
            const find = orders.find(order => order.id === product.id)
            return {
              ...product,
              amount: find ? find.amount : product.amount
            }
          })
          setProducts(productsUpdate)
          setLoading(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const generateTimeSlots = (start: string, end: string, stepMinutes: number): string[] => {
    const times: string[] = []
    let currentTime = new Date()
    const [startHour, startMinute] = start.split(':').map(Number)
    const [endHour, endMinute] = end.split(':').map(Number)

    currentTime.setHours(startHour, startMinute, 0, 0)
    const endTime = new Date()
    endTime.setHours(endHour, endMinute, 0, 0)

    while (currentTime <= endTime) {
      const hours = currentTime.getHours().toString().padStart(2, '0')
      const minutes = currentTime.getMinutes().toString().padStart(2, '0')
      times.push(`${hours}:${minutes}`)
      currentTime.setMinutes(currentTime.getMinutes() + stepMinutes)
    }

    return times
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async data => {
    setError('')
    setSending(true)

    const dataSend = {
      user_id: order?.user_id,
      date: data.date,
      hour: data.hour,
      products: products
        .filter(product => product.amount > 0)
        .map(product => {
          return {
            id: product.id,
            amount: product.amount
          }
        })
    }
    try {
      const response = await axios.put(`${apiUrl}/orders/update/${order?.id}`, dataSend)
      if (response.data.success) {
        setSending(false)
        setSended(true)
      } else {
        setError(response.data.message)
        setSending(false)
      }
    } catch (error) {
      setError(error)
      setSending(false)
    }
  }

  const timeSlots = generateTimeSlots('06:00', '15:00', 30)

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'bottom-right', className: 'bg-primary text-white', duration: 4000 })
    }
  }, [error])

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex flex-col gap-y-6 w-full max-w-5xl'>
      {loading ? (
        <div>
          <BeatLoader />
        </div>
      ) : (
        <>
          <h1 className='text-2xl lg:text-3xl font-bold'>
            Modificar Pedido #{order?.id} de <br /> {order?.user_name} ({order?.user_code})
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-y-6'
          >
            <Tabla
              products={products}
              setProducts={setProducts}
            />

            <div className='rounded-sm w-full border border-stroke bg-white p-2 lg:px-5 lg:pt-6 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 text-sm lg:text-base'>
              <div className='flex items-start rounded-sm gap-4'>
                <div className='p-2.5 py-4 w-12 lg:w-26'>
                  <h5 className='font-bold lg:text-xl'>Retiro</h5>
                </div>
                <div className='p-2.5 py-4 flex-1 flex flex-col lg:flex-row gap-x-4 gap-y-2'>
                  <div className='w-full flex flex-col'>
                    <input
                      {...register('date')}
                      type='date'
                      defaultValue={order?.pickup_date}
                      className='w-full h-14 rounded-lg border border-stroke bg-transparent px-2 py-1 lg:p-2 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary placeholder:text-gray-300 text-sm lg:text-base'
                      placeholder='Fecha y hora de retiro'
                    />
                  </div>
                  <div className='w-full '>
                    <div className='relative'>
                      <div className='w-full flex flex-col'>
                        <select
                          {...register('hour')}
                          defaultValue={order?.pickup_hour}
                          className='w-full h-14 relative z-20 appearance-none border border-stroke bg-transparent py-1 px-2 lg:py-4 lg:pl-6 pr-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input rounded-lg text-sm lg:text-base'
                        >
                          <option
                            value=''
                            disabled
                            className='text-body dark:text-bodydark'
                          >
                            Seleccione la hora
                          </option>
                          {timeSlots.map(hour => {
                            return (
                              <option
                                key={hour}
                                value={hour}
                              >
                                {hour}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                      <span className='absolute top-1/2 right-2 z-10 -translate-y-1/2'>
                        <svg
                          className='w-5 h-5 fill-gray-500 dark:fill-gray-400'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M3.04175 9.99984C3.04175 6.15686 6.1571 3.0415 10.0001 3.0415C13.8431 3.0415 16.9584 6.15686 16.9584 9.99984C16.9584 13.8428 13.8431 16.9582 10.0001 16.9582C6.1571 16.9582 3.04175 13.8428 3.04175 9.99984ZM10.0001 1.5415C5.32867 1.5415 1.54175 5.32843 1.54175 9.99984C1.54175 14.6712 5.32867 18.4582 10.0001 18.4582C14.6715 18.4582 18.4584 14.6712 18.4584 9.99984C18.4584 5.32843 14.6715 1.5415 10.0001 1.5415ZM9.99998 10.7498C9.58577 10.7498 9.24998 10.4141 9.24998 9.99984V5.4165C9.24998 5.00229 9.58577 4.6665 9.99998 4.6665C10.4142 4.6665 10.75 5.00229 10.75 5.4165V9.24984H13.3334C13.7476 9.24984 14.0834 9.58562 14.0834 9.99984C14.0834 10.4141 13.7476 10.7498 13.3334 10.7498H10.0001H9.99998Z'
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full flex justify-end'>
              {sending ? (
                <div>
                  <BeatLoader />
                </div>
              ) : (
                <button className='w-full lg:w-auto bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-20 rounded-lg'>
                  Modificar pedido
                </button>
              )}
            </div>
          </form>
        </>
      )}

      <Toaster />

      {sended && (
        <SuccessfulComponent
          title='El pedido fue modificado correctamente'
          destination='/admin/pedidos'
        />
      )}
    </section>
  )
}

export default formulario
