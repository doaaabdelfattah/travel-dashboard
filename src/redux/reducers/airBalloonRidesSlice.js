import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api'

const initialState = {
  rides: [],
  loadingRides: 'idle',
};



export const fetchRides = createAsyncThunk('rides/fetchRides', async () => {
  const response = await api.get('/balloon-rides/');
  console.log('api response: ', response.data)
  return response.data;

})
const airBalloonRides = createSlice({
  name: 'rides',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRides.fulfilled, (state, action) => {
        state.rides = action.payload;
        state.loadingRides = 'success'
      })
      .addCase(fetchRides.pending, (state) => {
        state.loadingRides = 'loading'
      })
      .addCase(fetchRides.rejected, (state, action) => {
        state.loadingRides = 'failed'
        console.error('Error fetching rides:', action.error);
      })
  }

})

export default airBalloonRides.reducer;