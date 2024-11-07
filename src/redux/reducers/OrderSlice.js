import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api'

const initialState = {
  orders: [],
  loadingOrders: 'idle',
  error: null,
};



export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {

    const response = await api.get('/orders/');
    console.log('api response: ', response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return error.message
  }

})
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    ordersCleanUp: (state) => {
      state.orders = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload
        state.loadingOrders = 'success'
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loadingOrders = 'loading'
        state.error = null
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loadingOrders = 'failed'
        state.error = action.error
        console.error('Error fetching orders:', action.error);
      })
  }

})
export const { ordersCleanUp } = orderSlice.actions;
export default orderSlice.reducer;