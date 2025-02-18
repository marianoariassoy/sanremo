import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { es } from 'date-fns/locale'

const DateRangeComponent = ({
  startDate,
  endDate,
  handleDateChange
}: {
  startDate: Date
  endDate: Date
  handleDateChange: (ranges: any) => void
}) => {
  const showDateDisplay = () => {
    const dateDisplay = document.getElementById('DateRange')
    if (dateDisplay) {
      dateDisplay.classList.toggle('hidden')
      dateDisplay.classList.toggle('block')
    }
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <div
        className='relative lg:hidden w-full border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none transition focus:border-primary active:border-primary bg-white dark:bg-form-input  dark:border-form-strokedark rounded-lg cursor-pointer'
        onClick={showDateDisplay}
      >
        <div>Fecha</div>
        <span className='absolute top-1/2 right-2 -translate-y-1/2 z-10'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g opacity='0.8'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z'
                fill='#637381'
              ></path>
            </g>
          </svg>
        </span>
      </div>
      <div
        className='hidden lg:block'
        id='DateRange'
      >
        <DateRange
          ranges={[{ startDate, endDate, key: 'selection' }]}
          locale={es}
          onChange={handleDateChange}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          className='w-full shadow-default bg-white dark:bg-meta-4'
          showDateDisplay={false}
        />
      </div>
    </div>
  )
}

export default DateRangeComponent
