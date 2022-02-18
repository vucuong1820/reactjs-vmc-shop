import  { useEffect, useRef, useState } from 'react';


function useMagicColor(props) {
    function randomColor(currentColor){
        const COLOR_LIST = ['red','blue','yellow','green']
        const curentColorIndex = COLOR_LIST.indexOf(currentColor)
        let newColorIndex = curentColorIndex 
        while(newColorIndex === curentColorIndex){
            newColorIndex = Math.trunc(Math.random() * COLOR_LIST.length)
        }

        return COLOR_LIST[newColorIndex]
    }
    const [color, setColor] = useState('transparent')
    const colorRef = useRef('transparent')
    useEffect(() => {
        const colorInterval = setInterval(() => {
            const newColor = randomColor(colorRef.current)
            console.log(colorRef.current)
            setColor(newColor)
            colorRef.current = newColor
        },1000)
        return () => {
            clearInterval(colorInterval)
        }
    },[])
    return color
}

export default useMagicColor;