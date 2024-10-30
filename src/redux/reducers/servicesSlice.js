import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api'

const initialState = {
  services: [],
  loadingServices: 'idle',
};



export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const response = await api.get('/service/');
  console.log('api response: ', response.data)
  return response.data;

})
const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loadingServices = 'success'
      })
      .addCase(fetchServices.pending, (state) => {
        state.loadingServices = 'loading'
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loadingServices = 'failed'
        console.error('Error fetching services:', action.error);
      })
  }

})

export default servicesSlice.reducer;