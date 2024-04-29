import { useState,useEffect } from 'react'
import { DateRangePicker } from 'react-date-range';
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

const Calender:React.FC<CalendarProps> = ({ dateRange, onDateChange}) => {

    const handleDateClick=(newDate:{startDate:Date,endDate:Date})=>{
        onDateChange(newDate)
    }
    
    const [openDate,setOpenDate]=useState(false)
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })

    const handleChange=(ranges)=>{
        setDate(ranges.selection)
    }

    const handleClick=()=>{
        setOpenDate((prev)=>!prev)
    }

    const formatDate = (date: Date): string => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className='container'>
            <span onClick={()=>{
                handleClick()
                handleDateClick({startDate: date.startDate, endDate: date.endDate})
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
