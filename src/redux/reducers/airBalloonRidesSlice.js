import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api'


const config = {
  headers: {
    'content-type': `multipart/form-data`,
  }
};
const config2 = {
  headers: {
    'Content-Type': 'application/json',
  }
};


const initialState = {
  rides: [],
  selectedRides: [],
  loadingSelectedRides: 'idle',
  loadingRides: 'idle',
  loadingAddRide: 'idle',
  error: null
};



export const fetchRides = createAsyncThunk('rides/fetchRides', async () => {
  try {
    const response = await api.get('/balloon-rides/');

    return response.data;
  } catch (error) {
    return error.message;
  }
})


export const addNewRide = createAsyncThunk('rides/addNewRide', async (info, { rejectWithValue, fulfillWithValue }) => {
  try {



    // Upload single image
    const singleImageFormData = new FormData();
    for (const [key, value] of info.entries()) {
      if (key === 'imageUrl' && value instanceof File) {
        singleImageFormData.append('imageUrl', value);
        break; // Stop after finding the first `File` entry for `imageUrl`
      }
    }
    // Array.from(formData.entries());
    if (Array.from(singleImageFormData.entries()).length > 0) {
      const uploadResponse = await api.post('/upload/', singleImageFormData, config);
      const imageUrl = uploadResponse.data.imageUrl;
      const public_id = uploadResponse.data.public_id;
      // Update the info object with correct data
      info.set('imageUrl', imageUrl);
      info.set('public_id', public_id);
    }
    // Upload multiple images

    const multipleImageFormData = new FormData();
    const imageFiles = info.getAll('imageUrls');
    imageFiles.forEach(file => {
      multipleImageFormData.append('imageUrls', file);
    });

    if (Array.from(multipleImageFormData.entries()).length > 0) {
      const uploadMultiple = await api.post('/upload/upload-multiple', multipleImageFormData, config);
      const imageUrls = uploadMultiple.data.imageUrls;
      const public_ids = uploadMultiple.data.public_ids;
      // Update the info object with correct data
      info.set('imageUrls', JSON.stringify(imageUrls));
      info.set('public_ids', JSON.stringify(public_ids));
    }




    // Upload All Service info
    const { data } = await api.post('balloon-rides/rideImage', info, config2);
    return fulfillWithValue(data);

  } catch (error) {
    console.error('API error:', error.message);
    return rejectWithValue(error.response?.data || error.message);

  }
})



export const fetchRideByServiceID = createAsyncThunk('rides/allServiceRides', async (id, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await api.get(`balloon-rides/service/${id}`);
    return fulfillWithValue(data);
  } catch (error) {
    return rejectWithValue(error.message)
  }
})




const airBalloonRidesSlice = createSlice({
  name: 'rides',
  initialState,
  reducers: {
    resetLoadingState(state) {
      state.loadingAddRide = 'idle';
    },
  },
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
      .addCase(addNewRide.pending, (state) => {
        state.loadingAddRide = 'loading';
        // state.error = action.payload
      })
      .addCase(fetchRideByServiceID.pending, (state) => {
        state.loadingSelectedRides = 'loading';
      })
      .addCase(fetchRideByServiceID.fulfilled, (state, action) => {
        state.loadingSelectedRides = 'succeed';
        state.selectedRides = action.payload;
      })
      .addCase(fetchRideByServiceID.rejected, (state, action) => {
        state.loadingSelectedRides = 'failed';
        state.error = action.payload;
      })

  },

})
export const { resetLoadingState } = airBalloonRidesSlice.actions;
export default airBalloonRidesSlice.reducer;