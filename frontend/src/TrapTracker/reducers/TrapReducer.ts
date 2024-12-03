import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    trapGames: []
};
const trapGameSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setCurrentTrapGames: (state, action) => {
            state.trapGames = action.payload;
        },
    },
});
export const { setCurrentTrapGames } = trapGameSlice.actions;
export default trapGameSlice.reducer;