import { useState } from 'react'
import EstadisticasMeses from './estadisticas-meses'
import EstadisticasDias from './estadisticas-dias'
import EtadisticasSemanas from './estadisticas-semanas'
import Filter from './filter'

const index = () => {
  const [clients, setClients] = useState<string>('all')

  console.log(clients)

  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex flex-col gap-y-12'>
      <div>
        <h1 className='text-2xl lg:text-3xl font-bold mb-3'>Estadísticas de Clientes</h1>
        <Filter setClients={setClients} />
      </div>

      <EstadisticasDias clients={clients} />
      <EtadisticasSemanas clients={clients} />
      <EstadisticasMeses clients={clients} />
    </section>
  )
}

export default index
