import Tabla from './tabla-pedidos'

const formulario = () => {
  const data = [
    {
      id: 1,
      code: '01',
      title: 'Pebetes x 6 u',
      category: 'San Remo'
    },
    {
      id: 2,
      code: '02',
      title: 'Hamburguesa  x  4   u ',
      category: 'San Remo'
    },
    {
      id: 3,
      code: '03',
      title: 'Pebetes x 6 u',
      category: 'San Remo'
    },
    {
      id: 4,
      code: '04',
      title: 'Pebetes x 6 u',
      category: 'San Remo'
    },
    {
      id: 5,
      code: '05',
      title: 'Pebetes x 6 u',
      category: 'San Remo'
    },
    {
      id: 6,
      code: '06',
      title: 'Pebetes x 6 u',
      category: 'San Remo'
    },
    {
      id: 7,
      code: '07',
      title: 'Pebetes x 6 u',
      category: 'San Remo'
    },
    {
      id: 8,
      code: '08',
      title: 'Papas fritas Tradicionales 24 x 55 ',
      category: 'Krachitos'
    },
    {
      id: 9,
      code: '09',
      title: 'Papas fritas C/ Americano   24 x 55  ',
      category: 'Krachitos'
    },
    {
      id: 10,
      code: '10',
      title: 'Papas fritas C/A KETCHUP   24 x 55 ',
      category: 'Krachitos'
    },
    {
      id: 11,
      code: '11',
      title: 'Papas fritas Jamón Serrano  24 x 55',
      category: 'Krachitos'
    },
    {
      id: 12,
      code: '12',
      title: 'Copos de Maiz Azucarado x  4 kgs',
      category: 'Cereales'
    },
    {
      id: 13,
      code: '13',
      title: 'Copos de Maiz Azucarado x  1 kgs',
      category: 'Cereales'
    },
    {
      id: 14,
      code: '14',
      title: 'Copos de Maiz Sin Azucar x  3,5 kgs',
      category: 'Cereales'
    }
  ]

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

  const timeSlots = generateTimeSlots('06:00', '15:00', 30)

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6 w-full max-w-5xl'>
      <h1 className='text-2xl lg:text-3xl font-bold'>Realizar Pedido</h1>

      <Tabla
        data={data.filter(item => item.category === 'San Remo')}
        category={'San Remo'}
      />

      <Tabla
        data={data.filter(item => item.category === 'Krachitos')}
        category={'Krachitos'}
      />

      <Tabla
        data={data.filter(item => item.category === 'Cereales')}
        category={'Cereales'}
      />

      <div className='rounded-sm w-full border border-stroke bg-white p-2 lg:px-5 lg:pt-6 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 text-sm lg:text-base'>
        <div className='flex items-center rounded-sm '>
          <div className='p-2.5 py-4 w-12 lg:w-26'>
            <h5 className='font-bold lg:text-xl'>Retiro</h5>
          </div>
          <div className='p-2.5 py-4 flex-1 flex flex-col lg:flex-row gap-x-4 gap-y-2'>
            <input
              type='date'
              name='date'
              id='date'
              className='w-full rounded-lg border border-stroke bg-transparent px-2 py-1 lg:p-2 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary placeholder:text-gray-300 text-sm lg:text-base'
              placeholder='Fecha y hora de retiro'
            />
            <div className='w-full relative'>
              <select className='w-full relative z-20 appearance-none border border-stroke bg-transparent py-1 px-2 lg:py-4 lg:pl-6 pr-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input rounded-lg text-sm lg:text-base'>
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
              <span className='absolute top-1/2 right-2 z-10 -translate-y-1/2'>
                <svg
                  className='w-5 h-5 fill-gray-500 dark:fill-gray-400'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M3.04175 9.99984C3.04175 6.15686 6.1571 3.0415 10.0001 3.0415C13.8431 3.0415 16.9584 6.15686 16.9584 9.99984C16.9584 13.8428 13.8431 16.9582 10.0001 16.9582C6.1571 16.9582 3.04175 13.8428 3.04175 9.99984ZM10.0001 1.5415C5.32867 1.5415 1.54175 5.32843 1.54175 9.99984C1.54175 14.6712 5.32867 18.4582 10.0001 18.4582C14.6715 18.4582 18.4584 14.6712 18.4584 9.99984C18.4584 5.32843 14.6715 1.5415 10.0001 1.5415ZM9.99998 10.7498C9.58577 10.7498 9.24998 10.4141 9.24998 9.99984V5.4165C9.24998 5.00229 9.58577 4.6665 9.99998 4.6665C10.4142 4.6665 10.75 5.00229 10.75 5.4165V9.24984H13.3334C13.7476 9.24984 14.0834 9.58562 14.0834 9.99984C14.0834 10.4141 13.7476 10.7498 13.3334 10.7498H10.0001H9.99998Z'
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full flex justify-end'>
        <button className='inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-20 rounded-lg'>
          Realizar pedido
        </button>
      </div>
    </section>
  )
}

export default formulario
