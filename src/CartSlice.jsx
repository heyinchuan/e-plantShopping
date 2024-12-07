import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const {name, image, cost} = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({name, image, cost: parseFloat(cost.replace('$', '')), quantity: 1});
      }
    },
    removeItem: (state, action) => {
      const { name } = action.payload;
      state.items = state.items.filter(item => item.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.name === name);
      if (itemIndex !== -1) {
        if (quantity === 0) {
          // 如果数量变为0，移除商品
          state.items.splice(itemIndex, 1);
        } else {
          // 否则更新数量
          state.items[itemIndex].quantity = quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
