import { configureStore } from '@reduxjs/toolkit';

import { appApi } from '../services/appApi'
import { youtubeApi } from '../services/youtubeApi';
import { tweetApi } from '../services/tweetApi';

export default configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
    [tweetApi.reducerPath]: tweetApi.reducer,
  },
});

