import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';

import ApiRoutes from 'src/core/apiRoutes';

const API = new ApiRoutes();

export const fetchabcs = createAsyncThunk('abcs/fetchabcs', async () => {
  const response = await API.fetchAllabcProfile();
  return response;
});

export const abcsAdapter = createEntityAdapter({
  selectId: (abc) => abc.id,
});

const abcsSlice = createSlice({
  name: 'abcs',
  initialState: abcsAdapter.getInitialState({
    loading: false
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchabcs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchabcs.fulfilled, (state, action) => {
      abcsAdapter.setAll(state, action.payload.result);
      state.loading = false;
    });
    builder.addCase(fetchabcs.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const {
  selectById: selectabcById,
  selectIds: selectabcIds,
  selectEntities: selectabcEntities,
  selectAll: selectAllabcs,
  selectTotal: selectTotalabcs
} = abcsAdapter.getSelectors(state => state.abcs);

export default abcsSlice.reducer;
