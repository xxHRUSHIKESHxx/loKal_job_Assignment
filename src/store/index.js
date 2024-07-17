import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from '../features/jobs/jobsSlice';
import bookmarkReducer from '../features/bookmarks/bookmarksSlice';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    bookmarks: bookmarkReducer,
  },
});

export default store;
