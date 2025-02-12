import { Link } from 'react-router-dom'
import PedidoDetalles from '../../components/PedidoDetalles'

const detalles = () => {
  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 max-w-5xl flex items-start flex-col gap-y-6'>
      <PedidoDetalles />

      <div className='w-full flex'>
        <Link
          to='/historial-pedidos'
          className='flex items-center gap-x-2 bg-primary text-white py-4 px-6 rounded-full hover:bg-opacity-90  transition-colors text-sm lg:text-base font-medium'
        >
          Volver al listado
        </Link>
      </div>
    </section>
  )
}

export default detalles
