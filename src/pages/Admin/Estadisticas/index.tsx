import EstadisticasClientes from './estadisticas-clientes'

const index = () => {
  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex flex-col gap-y-12'>
      <h1 className='text-2xl lg:text-3xl font-bold'>Estadísticas Generales</h1>
      <EstadisticasClientes />
    </section>
  )
}

export default index
