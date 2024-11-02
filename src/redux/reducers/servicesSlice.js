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
  services: [],
  loadingServices: 'idle',
  loadingAddService: 'idle',
  error: null,
};


// ========== get all Services ================
export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const response = await api.get('/service/');
  console.log('api response: ', response.data)
  return response.data;

})



// =========== Add NEW Service =================

export const addServiceWithImage = createAsyncThunk('services/create', async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    // Upload single image
    const singleImageFormData = new FormData();
    singleImageFormData.append('imageUrl', info.get('imageUrl'));

    const uploadResponse = await api.post('/uploads/', singleImageFormData, config);
    const imageUrl = uploadResponse.data.imageUrl;
    const public_id = uploadResponse.data.public_id;

    // Upload multiple images
    const multipleImageFormData = new FormData();
    const imageFiles = info.getAll('imageUrls');
    imageFiles.forEach(file => {
      multipleImageFormData.append('imageUrls', file);
    });

    const uploadMultiple = await api.post('/uploads/upload-multiple', multipleImageFormData, config);
    const imageUrls = uploadMultiple.data.imageUrls;
    const public_ids = uploadMultiple.data.public_ids;

    // Update the info object with correct data
    info.set('imageUrl', imageUrl);
    info.set('public_id', public_id);
    info.set('imageUrls', JSON.stringify(imageUrls));
    info.set('public_ids', JSON.stringify(public_ids));

    // Upload All Service info
    const { data } = await api.post('services/', info, config2);
    return fulfillWithValue(data);

  } catch (error) {
    console.error('API error:', error.message);
    return rejectWithValue(error.response?.data || error.message);

  }
})





const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===== Fetch all Services =======
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
      // ===== Add new Service =======
      .addCase(addServiceWithImage.fulfilled, (state, action) => {
        state.services = [...state.services, action.payload]
        state.loadingAddService = 'succeeded'
        state.error = null
      })
      .addCase(addServiceWithImage.rejected, (state, action) => {
        state.loadingAddService = 'failed',
          state.error = action.payload
      })
      .addCase(addServiceWithImage.pending, (state) => {
        state.loadingAddService = 'loading',
          state.error = null
      })


  }

})

export default servicesSlice.reducer;