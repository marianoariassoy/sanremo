import Tabla from './tabla-Historial'

const historialAdmin = () => {
  const data = [
    {
      id: 1,
      nro: '#12345',
      date: '01/10/2025',
      client: 'Cliente 1'
    },
    {
      id: 2,
      nro: '#12345',
      date: '01/10/2025',
      client: 'Cliente 1'
    },
    {
      id: 3,
      nro: '#12345',
      date: '01/10/2025',
      client: 'Cliente 1'
    },
    {
      id: 5,
      nro: '#12345',
      date: '01/10/2025',
      client: 'Cliente 1'
    }
  ]

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6 w-full max-w-5xl'>
      <div>filtros</div>
      <h1 className='text-2xl lg:text-3xl font-bold'>Historial de pedidos</h1>

      <Tabla
        data={data}
        admin={true}
      />
    </section>
  )
}

export default historialAdmin
