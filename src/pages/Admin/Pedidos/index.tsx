import PedidosDetalles from './pedidosDetalles'

const detalles = () => {
  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6'>
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
        <PedidosDetalles />
        <PedidosDetalles />
        <PedidosDetalles />
        <PedidosDetalles />
        <PedidosDetalles />
      </div>
    </section>
  )
}

export default detalles
