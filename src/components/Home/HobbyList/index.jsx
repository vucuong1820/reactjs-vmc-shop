import React from 'react';
import PropTypes from 'prop-types';
import './HobbyList.css'
HobbyList.propTypes = {
    hobbyList: PropTypes.array,
    activeId: PropTypes.number,
    handleActiveClick: PropTypes.func,
};

HobbyList.defaultProps = {
    hobbyList: [],
    activeId: null,
    handleActiveClick: null,
};

function HobbyList(props) {
    const {hobbyList, activeId, handleActiveClick} = props;
    const handleClick = (hobby) => {
        console.log('hobby click')
        handleActiveClick?.(hobby)
    }
    return (
        <ul className='hobby-list'>
            {
                hobbyList.map(hobby => (
                    <li 
                    key={hobby.id}
                    className={hobby.id === activeId ? 'active' : ''}
                    onClick = {() => handleClick(hobby)}
                    >
                        {hobby.title}
                    </li>
                ))
            }
        </ul>
    );
}

export default HobbyList;