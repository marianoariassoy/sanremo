import TableTwo from '../../components/Tables/TableTwo'

const formulario = () => {
  const data = [
    {
      id: 1,
      nro: '#12345',
      date: '01/10/2025'
    },
    {
      id: 2,
      nro: '#12345',
      date: '01/10/2025'
    },
    {
      id: 3,
      nro: '#12345',
      date: '01/10/2025'
    },
    {
      id: 5,
      nro: '#12345',
      date: '01/10/2025'
    }
  ]
  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6 w-full max-w-5xl'>
      <h1 className='text-2xl lg:text-3xl font-bold'>Historial de pedidos</h1>

      <TableTwo data={data} />
    </section>
  )
}

export default formulario
