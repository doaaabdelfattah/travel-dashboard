import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api'

const initialState = {
  currency: [],
  loadingCurrency: 'idle',
};



export const fetchCurrency = createAsyncThunk('currency/fetchCurrency', async () => {
  const response = await api.get('/currency/');
  console.log('api response: ', response.data)
  return response.data;

})
const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.currency = action.payload;
        state.loadingCurrency = 'success'
      })
      .addCase(fetchCurrency.pending, (state) => {
        state.loadingCurrency = 'loading'
      })
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.loadingCurrency = 'failed'
        console.error('Error fetching orders:', action.error);
      })
  }

})

export default currencySlice.reducer;