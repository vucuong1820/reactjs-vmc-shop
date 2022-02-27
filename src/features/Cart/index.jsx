import React from 'react';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from './selectors';

CartFeature.propTypes = {
    
};

function CartFeature(props) {
    const cartTotalPrice = useSelector(cartTotalSelector)
    return (
        <div>
            CartFeature {cartTotalPrice}
        </div>
    );
}

export default CartFeature;