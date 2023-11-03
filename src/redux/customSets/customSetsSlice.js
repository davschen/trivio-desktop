import { createSlice } from "@reduxjs/toolkit";

const initialCustomSetsState = {
  myCustomSets: [],
  recommendedSets: [],
  setIDAuthorDict: {},
  currentCustomSet: null,
}

const customSetsSlice = createSlice({
  name: 'customSets',
  initialState: initialCustomSetsState,
  reducers: {
    updateCustomSets: (state, action) => {
      state.myCustomSets = action.payload;
    },
    updateRecommendedSets: (state, action) => {
      state.recommendedSets = action.payload;
    },
    addAuthorNames: (state, action) => {
      // The format of the action.payload is: [[<setID>, <authorName>]]
      for (let i = 0; i < action.payload.length; i++) {
        const setID = action.payload[i][0];
        const authorName = action.payload[i][1];
        state.setIDAuthorDict[setID] = authorName;
      }
    },
    assignCurrentCustomSet: (state, action) => {
      state.currentCustomSet = action.payload;
    }
  }
});

export const { updateCustomSets, 
  updateRecommendedSets, 
  addAuthorNames,
  assignCurrentCustomSet } = customSetsSlice.actions;
export default customSetsSlice.reducer;
