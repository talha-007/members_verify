import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from '../api/userServices';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  message: null,
};

export const userLogin = createAsyncThunk('user/login', async (data) => {
  try {
    const res = await authService.login(data);
    localStorage.setItem('user', JSON.stringify(res?.data?.data));
    return res?.data;
  } catch (error) {
    return error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.data = action.payload;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loading = 'rejected';
    });
  },
});

export default userSlice.reducer;
