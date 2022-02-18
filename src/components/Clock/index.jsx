import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useClock from '../../hooks/useClock';

Clock.propTypes = {
    
};

function Clock(props) {
    const {timeString} = useClock()
    return (
        <div style={{color:'deeppink'}}>
            {timeString}
        </div>
    );
}

export default Clock;