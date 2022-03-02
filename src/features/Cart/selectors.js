import { createSelector } from "@reduxjs/toolkit"

const cartItemsSelector = state => state.cart.cartItems;
const currenUserId = state => state.user.current.id ;

// count number of product in cart

export const cartItemsCountSelector = createSelector(
    currenUserId,
    cartItemsSelector,
    (userId, cartItems) => {
        
        if(!userId) return;

        if(Object.keys(cartItems).includes(userId.toString())){
            return cartItems[userId].reduce((count, item) => count + item.quantity,0)
        }

    }
)

// calculate total price of cart

export const cartTotalSelector = createSelector(
    currenUserId,
    cartItemsSelector,
    (userId,cartItems) => {

        if(!userId) return;

        if(Object.keys(cartItems).includes(userId.toString())){
            return cartItems[userId].reduce((total, item) => total + (item.product.salePrice * item.quantity),0);
        }
        
    }
)