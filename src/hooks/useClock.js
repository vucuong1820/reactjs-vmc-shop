import  { useEffect, useState } from 'react';

function useClock(props) {
    const [timeString, setTimeString] = useState('')
    function formatDate(date){
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours() ;
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes() ;
        const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds() ;
        return `${hours}:${minutes}:${seconds}`
    }
    useEffect(() => {
        const useClockInterval = setInterval(() => {
            const now = new Date()
            setTimeString(formatDate(now))
        },1000)
        
        return () => {
            clearTimeout(useClockInterval)
        }
    })
    return {timeString}
}

export default useClock;