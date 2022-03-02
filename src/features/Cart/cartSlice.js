import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: JSON.parse(localStorage.getItem('cart_items')) || {},
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },

    hideMiniCart(state) {
      state.showMiniCart = false;
    },

    addToCart(state, action){
        // newItem = {id, product, quantity}
        const {userId, newItem} = action.payload;
        if(Object.keys(state.cartItems).includes(userId.toString())){
          const index = state.cartItems?.[userId].findIndex(x => x.id === newItem.id);
          if(index >= 0){
              state.cartItems[userId][index].quantity += newItem.quantity
          }else {
              state.cartItems[userId].push(newItem)
          }

        }else {
          state.cartItems[userId] = []
          state.cartItems[userId].push(newItem)
        }
        
        localStorage.setItem('cart_items',JSON.stringify(state.cartItems))
    },
    setQuantity(state, action){
        const {userId, productId, quantity} = action.payload;
        const index = state.cartItems[userId].findIndex(x => x.id === productId);
        if(index >= 0){
            state.cartItems[userId][index].quantity = quantity;
        }
        localStorage.setItem('cart_items',JSON.stringify(state.cartItems))
    },
    removeFromCart(state, action){
        const {userId, productId} = action.payload;
        state.cartItems[userId] = state.cartItems[userId].filter(x => x.id !== productId)
        localStorage.setItem('cart_items',JSON.stringify(state.cartItems))
    },
  },
});

const { actions, reducer } = cartSlice;

export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions;
export default reducer;
