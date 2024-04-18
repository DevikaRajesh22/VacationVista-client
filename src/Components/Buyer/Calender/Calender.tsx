import { useState } from 'react'
import { DateRangePicker } from 'react-date-range';
import {format} from 'date-fns'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './Calender.css'

const Calender = () => {
    
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

    return (
        <div className='container'>
            <span onClick={handleClick} className='calender text-gray-800'>
                Select Dates
            </span>
            {openDate && <DateRangePicker
            className='dateRange'
                ranges={[date]}
                onChange={handleChange}
                minDate={new Date()}
            />}
        </div>
    )
}

export default Calender
