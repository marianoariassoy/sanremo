import EstadisticasClientes from './estadisticas-clientes'
import EstadisticasMeses from './estadisticas-meses'
import EstadisticasDias from './estadisticas-dias'
import EtadisticasSemanas from './estadisticas-semanas'

const index = () => {
  return (
    <section>
      <EstadisticasClientes />
      <EstadisticasDias />
      <EtadisticasSemanas />
      <EstadisticasMeses />
    </section>
  )
}

export default index
