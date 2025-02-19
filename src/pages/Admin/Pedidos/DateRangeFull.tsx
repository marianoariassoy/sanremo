import { DateRange, DefinedRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { es } from 'date-fns/locale'
import { addDays } from 'date-fns'

const DateRangeComponent = ({
  startDate,
  endDate,
  handleDateChange
}: {
  startDate: Date
  endDate: Date
  handleDateChange: (ranges: any) => void
}) => {
  const customStaticRanges = [
    {
      label: 'Hoy',
      range: () => ({
        startDate: new Date(),
        endDate: new Date()
      })
    },
    {
      label: 'Ayer',
      range: () => ({
        startDate: addDays(new Date(), -1),
        endDate: addDays(new Date(), -1)
      })
    },
    {
      label: 'Esta semana',
      range: () => ({
        startDate: addDays(new Date(), -new Date().getDay()),
        endDate: new Date()
      })
    },
    {
      label: 'Últimos 7 días',
      range: () => ({
        startDate: addDays(new Date(), -7),
        endDate: new Date()
      })
    },
    {
      label: 'Este mes',
      range: () => ({
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date()
      })
    },
    {
      label: 'Últimos 30 días',
      range: () => ({
        startDate: addDays(new Date(), -30),
        endDate: new Date()
      })
    }
  ]

  return (
    <div className='flex flex-col lg:flex-row bg-white shadow-default dark:bg-meta-4'>
      <div className='w-full max-w-xs h-full'>
        <DefinedRange
          locale={es}
          onChange={handleDateChange}
          ranges={[{ key: 'selection' }]}
          className='bg-white dark:bg-meta-4 w-full border-r-0'
          staticRanges={customStaticRanges}
          inputRanges={[]}
        />
      </div>
      <div>
        <DateRange
          ranges={[{ startDate, endDate, key: 'selection' }]}
          locale={es}
          onChange={handleDateChange}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          showDateDisplay={false}
          className='bg-white dark:bg-meta-4 border-l'
          months={2}
          direction='horizontal'
        />
      </div>
    </div>
  )
}

export default DateRangeComponent
