const index = () => {
  return (
    <section className='fade-in p-4 md:p-6 2xl:p-10 flex items-start flex-col gap-y-6'>
      <h1 className='text-2xl lg:text-3xl font-bold text-primary'>Contacto</h1>
      <p className='max-w-4xl font-medium'>
        Estamos aquí para ayudarte. Si tenés dudas, necesitás asistencia o simplemente querés compartir tus comentarios,
        no dudes en contactarnos. Nuestro equipo está listo para acompañarte en cada paso y asegurarte una experiencia
        sin complicaciones.
      </p>
      <a
        href='https://wa.me/5493416143469'
        target='_blank'
        rel='noreferrer'
        className='flex items-center gap-x-2 bg-primary text-white py-4 px-6 rounded-full hover:bg-opacity-90  transition-colors text-sm lg:text-base'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 448 512'
          fill='currentColor'
          className='w-6 h-6'
        >
          <path d='M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z' />
        </svg>
        <span>Whatsapp: +54 9 341 6143469 </span>
      </a>
      <a
        href='mailto:contacto@panificadorasanremo.com.ar'
        target='_blank'
        rel='noreferrer'
        className='flex items-center gap-x-2 bg-primary text-white py-4 px-6 rounded-full hover:bg-opacity-90  transition-colors text-sm lg:text-base'
      >
        <svg
          viewBox='0 0 18 19'
          fill='currentColor'
          className='w-6 h-6'
        >
          <path
            d='M15.7499 2.75208H2.2499C1.29365 2.75208 0.478027 3.53957 0.478027 4.52395V13.6364C0.478027 14.5927 1.26553 15.4083 2.2499 15.4083H15.7499C16.7062 15.4083 17.5218 14.6208 17.5218 13.6364V4.49583C17.5218 3.53958 16.7062 2.75208 15.7499 2.75208ZM15.7499 4.0177C15.778 4.0177 15.8062 4.0177 15.8343 4.0177L8.9999 8.4052L2.16553 4.0177C2.19365 4.0177 2.22178 4.0177 2.2499 4.0177H15.7499ZM15.7499 14.0865H2.2499C1.96865 14.0865 1.74365 13.8615 1.74365 13.5802V5.2552L8.3249 9.47395C8.52178 9.61457 8.74678 9.67083 8.97178 9.67083C9.19678 9.67083 9.42178 9.61457 9.61865 9.47395L16.1999 5.2552V13.6083C16.2562 13.8896 16.0312 14.0865 15.7499 14.0865Z'
            fill=''
          ></path>
        </svg>
        <span className='hidden lg:block'>
          E-mail: <span className='underline'>contacto@panificadorasanremo.com.ar</span>
        </span>
        <span className='block lg:hidden'>
          <span className='underline'>contacto@panificadorasanremo.com.ar</span>
        </span>
      </a>
    </section>
  )
}

export default index
