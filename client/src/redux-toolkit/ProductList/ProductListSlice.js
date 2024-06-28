import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllWineData = createAsyncThunk(
  "wines/fetchAllWineData",
  async (api) => {
    const dataPromises = api.map(({ url, type }) =>
      fetch(url)
        .then((response) => response.json())
        .then((data) =>
          data
            .filter((item) => item.image.endsWith(".png"))
            .slice(100, 151)
            .map((item) => ({
              ...item,
              price: Math.floor(Math.random() * 500) + 1000,
              type,
            }))
        )
    );

    const allData = await Promise.all(dataPromises);
    const dataArray = allData.map((data, index) => ({
      type: api[index].type,
      value: data,
    }));

    return dataArray;
  }
);

const wineSlice = createSlice({
  name: "wines",
  initialState: { wines: [], filteredWines: [], fetched: false },
  reducers: {
    setFilteredWines: (state, action) => {
      state.filteredWines = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllWineData.fulfilled, (state, action) => {
      state.wines = action.payload;
      state.fetched = true;
    });
  },
});

export const { setFilteredWines } = wineSlice.actions;
export default wineSlice.reducer;
