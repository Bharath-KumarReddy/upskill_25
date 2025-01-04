import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalPrice: 0,
  showPaymentForm: false,
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice += action.payload.price;
    },

    updateQuantity(state, action) {
      const { id, delta } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        const newQuantity = item.quantity + delta;
        if (newQuantity > 0) {
          state.cart = state.cart.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          );
          state.totalPrice += delta * item.price;
        } else {
          state.cart = state.cart.filter((cartItem) => cartItem.id !== id);
          state.totalPrice -= item.price * item.quantity;
        }
      }
    },

    setShowPaymentForm(state, action) {
      state.showPaymentForm = action.payload;
    },


    togglePaymentForm(state) {
      state.showPaymentForm = !state.showPaymentForm;
    },


  },
});


export const {
  addToCart,
  updateQuantity,
  setShowPaymentForm,
  togglePaymentForm,
} = cartReducer.actions;

export default cartReducer.reducer;
