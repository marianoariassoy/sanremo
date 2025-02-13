import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Nuevo = () => {
  const [addProduct, setAddProduct] = useState(true)
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    if (pathname === '/admin/productos/nuevo') {
      setAddProduct(true)
    } else {
      setAddProduct(false)
    }
  }, [pathname])

  const categories = [
    {
      id: 1,
      title: 'Lista general'
    },
    {
      id: 2,
      title: 'Krach-itos'
    },
    {
      id: 3,
      title: 'Cereales'
    }
  ]

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6 max-w-2xl'>
      <div className='w-full  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm lg:text-base'>
        <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
          <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
            {addProduct ? 'Agregar Producto' : 'Modificar Producto'}
          </h2>

          <form>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Nombre</label>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Ingresar nombre del producto'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
              </div>
            </div>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>Código</label>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Ingresar el código del producto'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                />
              </div>
            </div>

            <label className='mb-2.5 block font-medium text-black dark:text-white'>Categoría</label>

            <div className='relative z-20 bg-white dark:bg-form-input mb-8'>
              <select
                name='categorie'
                className={`relative z-20 w-full appearance-none border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input rounded-lg`}
              >
                <option
                  value=''
                  disabled
                  className='text-body dark:text-bodydark'
                >
                  Seleccione una categoría
                </option>

                {categories.map(item => (
                  <option
                    key={item.id}
                    value={item.id}
                    className='text-body dark:text-bodydark'
                  >
                    {item.title}
                  </option>
                ))}
              </select>

              <span className='absolute top-1/2 right-2 z-10 -translate-y-1/2'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g opacity='0.8'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z'
                      fill='#637381'
                    ></path>
                  </g>
                </svg>
              </span>
            </div>

            <div className='mb-4'>
              <button className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 font-medium'>
                {addProduct ? 'Crear Producto' : 'Modificar Producto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Nuevo
