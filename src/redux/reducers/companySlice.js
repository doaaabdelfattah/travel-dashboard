import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api'

const initialState = {
  company: [],
  loadingCompany: 'idle',
};



export const fetchCompany = createAsyncThunk('company/fetchCompany', async () => {
  const response = await api.get('/company/');
  console.log('api response: ', response.data)
  return response.data;

})
const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.company = action.payload;
        state.loadingCompany = 'success'
      })
      .addCase(fetchCompany.pending, (state) => {
        state.loadingCompany = 'loading'
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.loadingCompany = 'failed'
        console.error('Error fetching companies:', action.error);
      })
  }

})

export default companySlice.reducer;