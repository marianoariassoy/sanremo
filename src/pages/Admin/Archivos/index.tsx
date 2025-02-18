import Catalogo from './catalogo'
import Listadeprecios from './listadepreciosok'

const index = () => {
  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex flex-col gap-y-6 max-w-5xl'>
      <h1 className='text-2xl lg:text-3xl font-bold'>Archivos para descargar</h1>

      <Catalogo />
      <Listadeprecios />
    </section>
  )
}

export default index
