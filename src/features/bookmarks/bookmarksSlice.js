import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    bookmarks: [],
    error: null,
  },
  reducers: {
    setBookmarks(state, action) {
      state.bookmarks = action.payload;
    },
    addBookmark(state, action) {
      state.bookmarks.push(action.payload);
      AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(state.bookmarks));
    },
    removeBookmark(state, action) {
      state.bookmarks = state.bookmarks.filter((job) => job.id !== action.payload.id);
      AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(state.bookmarks));
    },
  },
});

export const { setBookmarks, addBookmark, removeBookmark } = bookmarkSlice.actions;

export const loadBookmarks = () => async (dispatch) => {
  try {
    const storedJobs = await AsyncStorage.getItem('bookmarkedJobs');
    if (storedJobs) {
      dispatch(setBookmarks(JSON.parse(storedJobs)));
    }
  } catch (error) {
    console.error('Failed to load bookmarks:', error);
  }
};

export default bookmarkSlice.reducer;
