import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api'

const initialState = {
  users: [],
  loadingUsers: 'idle',
};



export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await api.get('/user/');
  console.log('api response: ', response.data)
  return response.data;

})
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loadingUsers = 'success'
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loadingUsers = 'loading'
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loadingUsers = 'failed'
        console.error('Error fetching users:', action.error);
      })
  }

})

export default usersSlice.reducer;