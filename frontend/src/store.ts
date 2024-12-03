import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./TrapTracker/reducers/UserReducer";
import ProfileReducer from "./TrapTracker/reducers/ProfileReducer";

const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
        profile: ProfileReducer,
    }),
});
export default store;