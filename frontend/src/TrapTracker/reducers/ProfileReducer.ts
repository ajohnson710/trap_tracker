import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentProfile: {
        firstName: "Jane",
        lastName: "Doe",
        title: "Member"
    },
};
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setCurrentProfile: (state, action) => {
            state.currentProfile = action.payload;
        },
    },
});
export const { setCurrentProfile } = profileSlice.actions;
export default profileSlice.reducer;

