import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchJobs } from '../../api/jobsApi';

export const loadJobs = createAsyncThunk('jobs/loadJobs', async (page) => {
  const response = await fetchJobs(page);
  console.log('reponse data from jobslices' , response);
  return response.jobs;
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadJobs.fulfilled, (state, action) => {
        state.jobs = [...state.jobs, ...action.payload];
        state.loading = false;
      })
      .addCase(loadJobs.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export default jobsSlice.reducer;
