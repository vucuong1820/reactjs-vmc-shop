import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

Counter.propTypes = {
    
};

function Counter(props) {
    //1
    const [count, setCount] = useState(0)
    const prevCount = useRef(count)
    
    //3
    useEffect(() => {
        prevCount.current = count
    },[count])

    const handleIncrease = () => {
        setCount(count => count + 1)
    }
    //2
    return (
        <div>
            <p>Previous State: {prevCount.current}</p>
            <p>Current State: {count}</p>
            <button onClick={handleIncrease}>Increase</button>
        </div>
    );
}

export default Counter;