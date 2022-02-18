import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./style.scss";
ColorBox.propTypes = {};

function ColorBox(props) {
    function getRandomColor(){
        const COLOR_LIST = ['green','blue','purple','deeppink','yellow']
        const randomIndex = Math.trunc(Math.random() * COLOR_LIST.length);
        return COLOR_LIST[randomIndex]        
    }

    const [color , setColor ] = useState(() => {
        const initState = localStorage.getItem('color_box') || 'deeppink';
        return initState
    })
    const handleOnClick = () => {
        const newColor = getRandomColor();
        setColor(newColor)
        localStorage.setItem('color_box',newColor)
    }
    return (
        <div 
        className='color-box'
        style={{backgroundColor: color }}
        onClick={handleOnClick}
        >
        
        </div>
    );
}

export default ColorBox;