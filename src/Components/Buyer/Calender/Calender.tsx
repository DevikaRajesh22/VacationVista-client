import { useState } from 'react'
import { DateRangePicker, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './Calender.css'

interface CalendarProps {
    dateRange: {
        startDate: Date;
        endDate: Date;
    };
    onDateChange: (newDate: { startDate: Date; endDate: Date }) => void;
}

interface RangeSelection {
    startDate: Date;
    endDate: Date;
}

const Calender: React.FC<CalendarProps> = ({ dateRange, onDateChange }) => {

    const handleDateClick = (newDate: RangeSelection) => {
        onDateChange(newDate)
    }

    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState<RangeSelection>({
        startDate: new Date(),
        endDate: new Date(),
    })

    const handleChange = (ranges: { [key: string]: Range }) => {
        if (ranges.selection) {
            const { startDate, endDate } = ranges.selection;
            if (startDate && endDate) {
                setDate({ startDate, endDate });
                onDateChange({ startDate, endDate });
            }
        }
    };

    const handleClick = () => {
        setOpenDate((prev) => !prev)
    }

    const formatDate = (date: Date): string => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className='container'>
            <span onClick={() => {
                handleClick()
                handleDateClick({ startDate: date.startDate, endDate: date.endDate })
            }} className='calender text-gray-800'>
                Select Dates
            </span>
            {openDate && <DateRangePicker
                className='dateRange'
                ranges={[date]}
                onChange={handleChange}
                minDate={new Date()}
            />}
            {
                date && <p className='text-sm text-gray-800 mt-10'>Dates : {formatDate(dateRange.startDate)} to {formatDate(dateRange.endDate)}</p>
            }
        </div>
    )
}

export default Calender
