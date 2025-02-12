import TableOne from '../../components/Tables/TableOne'

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
  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6 w-full max-w-5xl'>
      <h1 className='text-2xl lg:text-3xl font-bold'>Realizar Pedido</h1>

      <TableOne
        data={data.filter(item => item.category === 'San Remo')}
        category={'San Remo'}
      />

      <TableOne
        data={data.filter(item => item.category === 'Krachitos')}
        category={'Krachitos'}
      />

      <TableOne
        data={data.filter(item => item.category === 'Cereales')}
        category={'Cereales'}
      />

      <div className='rounded-sm w-full border border-stroke bg-white p-2 lg:px-5 lg:pt-6 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 text-sm lg:text-base'>
        <div className='flex items-center rounded-sm '>
          <div className='p-2.5 py-4 w-12 lg:w-26'>
            <h5 className='font-bold lg:text-xl'>Retiro</h5>
          </div>
          <div className='p-2.5 py-4 flex-1'>
            <input
              type='datetime-local'
              name='date'
              id='date'
              className='w-full max-w-xl rounded-lg border border-stroke bg-transparent px-2 py-1 lg:p-2 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary placeholder:text-gray-300 text-sm lg:text-base'
              placeholder='Fecha y hora de retiro'
            />
          </div>
          <div className='p-2.5 text-right py-4 text-primary'>
            <svg
              className='fill-current w-5 h-5 lg:w-8 lg:h-8'
              viewBox='0 0 18 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z'
                fill=''
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div className='w-full flex justify-end'>
        <button className='inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-20'>
          Realizar pedido
        </button>
      </div>
    </section>
  )
}

export default formulario
