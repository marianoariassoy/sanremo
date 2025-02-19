import { useAuth } from '../../context'

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
    </section>
  )
}

export default index
