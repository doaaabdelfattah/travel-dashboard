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
  try {
    const response = await api.get('/service/');
    return response.data;

  } catch (error) {
    return (error.message)
  }

})


// =========== Add NEW Service =================

export const addServiceWithImage = createAsyncThunk('services/create', async (info, { rejectWithValue, fulfillWithValue }) => {
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
    const { data } = await api.post('service/serviceImage', info, config2);
    return fulfillWithValue(data);

  } catch (error) {
    console.error('API error:', error.message);
    return rejectWithValue(error.response?.data || error.message);

  }
})


// =========== Delete Service =================

export const deleteService = createAsyncThunk('services/deleteService', async (id) => {

  try {
    const response = await api.delete(`service/${id}`);
    console.log('API delete response:', response.data); // Log API response
    return response.data;
  } catch (error) {
    console.error('API error:', error.message); // Log any errors
    return error.message;
  }
});

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    servicesCleanUp: (state) => {
      state.services = []
    }
  },
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
      .addCase(deleteService.fulfilled, (state, action) => {
        // state.service = state.services.filter((service) => service._id !== action.payload)
        console.log('action payload: ', action.payload.data)

      })


  }

})
export const { servicesCleanUp } = servicesSlice.actions;

export default servicesSlice.reducer;