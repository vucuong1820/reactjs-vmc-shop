import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

Counter.propTypes = {
    
};

function Counter(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const count = useSelector(state => state.count)
    function handleIncrease(){
        const action = increase();
        dispatch(action)
    }
    function handleDecrease(){
        const action = decrease();
        dispatch(action)
    }

    return (
        <div>
            Counter: {count}
            <Button className={classes.root}  onClick={handleIncrease}>Increase</Button>
            <Button className={classes.root} onClick={handleDecrease}>Decrease</Button>
        </div>
    );
}

export default Counter;