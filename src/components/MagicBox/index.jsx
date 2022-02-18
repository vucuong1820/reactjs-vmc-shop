import React from 'react';
import PropTypes from 'prop-types';
import useMagicColor from '../../hooks/useMagicColor';
import './style.scss'

MagicBox.propTypes = {
    
};

function MagicBox(props) {
    const color = useMagicColor()
    return (
        <div className='color-box' style={{backgroundColor:color}}>
            
        </div>
    );
}

export default MagicBox;