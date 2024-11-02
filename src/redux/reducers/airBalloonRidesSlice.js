import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api'

const initialState = {
  rides: [],
  loadingRides: 'idle',
  loadingAddRide: 'idle'
};



export const fetchRides = createAsyncThunk('rides/fetchRides', async () => {
  try {
    const response = await api.get('/balloon-rides/');
    // console.log('api response: ', response.data)
    return response.data;
  } catch (error) {
    return error.message;
  }
})


export const addNewRide = createAsyncThunk('rides/addNewRide', async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await api.post('balloon-rides/', info);
    console.log('api response: ', data)
    return fulfillWithValue(data);
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);

  }
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
      .addCase(addNewRide.fulfilled, (state, action) => {
        state.loadingAddRide = 'succeed';
        state.rides = [...state.rides, action.payload]
        console.log('Action payload:', action.payload);
      })
      .addCase(addNewRide.rejected, (state, action) => {
        state.loadingAddRide = 'failed',
          state.error = action.payload
      })
  }

})

export default airBalloonRides.reducer;