import { createSlice } from '@reduxjs/toolkit';


let cart = JSON.parse(localStorage.getItem('cart'));

export const cartSlice = createSlice({
  name: 'cart',
  initialState: cart ? cart : [],
  reducers: {
    addToCart: (state, action) => {
        let notAlreadyInCart = true;
        state.map((product, index) => {
            if (action.payload.productId === product.productId && action.payload.size === product.size) {
                if (state[index].quantity + action.payload.quantity <= product.maxQuantity) {
                    state[index].quantity += action.payload.quantity;
                    alert('This item has been added to your cart!');
                } else {
                    alert(`Sorry, the maximum limit for this item is ${product.maxQuantity}.`);
                }
                notAlreadyInCart = false;
            }
            return true;
        })
        if (notAlreadyInCart) {
            state.push(action.payload);
            alert('This item has been added to your cart!');
        }
        localStorage.setItem('cart', JSON.stringify(state));
        return state;
    },
    updateCart: (state, action) => {
        const newState = state;
        newState.find((item) => item.cartId === action.payload.cartId).quantity = action.payload.quantity;
        localStorage.setItem('cart', JSON.stringify(newState));
        return newState;
    },
    removeFromCart: (state, action) => {
        localStorage.setItem('cart', JSON.stringify(state.filter(item => item.cartId !== action.payload.cartId)));
        return state.filter(item => item.cartId !== action.payload.cartId);
    }
  },
});

export const { addToCart, updateCart, removeFromCart } = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
