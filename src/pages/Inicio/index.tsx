import { useAuth } from '../../context'
import { Link } from 'react-router-dom'

const index = () => {
  const { userData } = useAuth()

  return (
    <section className='p-4 md:p-6 2xl:p-10 fade-in flex items-start flex-col gap-y-6'>
      <h1 className='text-2xl lg:text-3xl font-bold'>Bienvenido {userData.name} 👋</h1>
      <p className='max-w-4xl font-medium text-sm lg:text-base'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nostrum optio laudantium consequuntur
        exercitationem ea tenetur iusto natus, obcaecati maxime corporis rem, nisi corrupti illo! Nam ullam sequi quae
        dolore.
      </p>

      {userData.role === 'user' && (
        <div className='mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <Link
            to='/formulario-pedidos'
            className='flex items-center gap-x-2 bg-primary text-white py-4 px-6 rounded-full hover:bg-opacity-90  transition-colors text-sm lg:text-base font-medium'
          >
            Formulario de pedidos
          </Link>
          <Link
            to='/historial-pedidos'
            className='flex items-center gap-x-2 bg-primary text-white py-4 px-6 rounded-full hover:bg-opacity-90  transition-colors text-sm lg:text-base font-medium'
          >
            Historial de pedidos
          </Link>
          <Link
            to='/ayuda'
            className='flex items-center gap-x-2 bg-primary text-white py-4 px-6 rounded-full hover:bg-opacity-90  transition-colors text-sm lg:text-base font-medium'
          >
            Ayuda
          </Link>
          <Link
            to='/contacto'
            className='flex items-center gap-x-2 bg-primary text-white py-4 px-6 rounded-full hover:bg-opacity-90  transition-colors text-sm lg:text-base font-medium'
          >
            Contacto
          </Link>
        </div>
      )}

      {userData.role === 'admin' && <></>}
    </section>
  )
}

export default index
