import axios from "axios";
import apiClient from "./apiClient";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
const axios_api = axios.create();

export const get_users = async () => {
    const response = await axios_api.get(`${USERS_API}`);
    console.log("response.data", response.data.users);
    return response.data;
};

export const getProfile = async (id: any) => {
    const response = await axios_api.post(`${USERS_API}/profile`, { id: id });
    if (response.data.message === "Profile not found") {
        alert("profile not found, please enter valid credentials");
        return null;
    }
    console.log("response.data.profile", response.data.profile);

    const profile_array = response.data.profile[0];
    const profile_json = {
        firstName: profile_array[1],
        lastName: profile_array[2],
        gradDate: profile_array[3],
        joinDate: profile_array[4],
        dob: profile_array[5],
        title: profile_array[6]
    };
    return profile_json;
};

export const signup = async (user: any) => {
    console.log("user, USERS_API", user, USERS_API);
    const response = await apiClient.post(`${USERS_API}/signup`, user);
    console.log(response.data);
    return response.data;
};


export const signin = async (credentials: any) => {
    console.log("credentials, USERS_API", credentials, USERS_API);
    const response = await axios_api.post(`${USERS_API}/signin`, credentials);
    if (response.data.message === "User not found") {
        alert("user not found, please enter valid credentials");
        return null;
    }
    console.log("response.data.user", response.data.user);
    const user_array = response.data.user[0];
    const user_json = { id: user_array[0], username: user_array[1], password: user_array[2] };
    return user_json;
};

export const updateUser = async (user: any) => {
    const response = await axios_api.put(`${USERS_API}/update`, user);
    console.log("response.data", response.data);
    const user_json = response.data.user;
    return user_json;
};

export const updateProfile = async (profile: any, id: any) => {
    console.log("profile, id", profile, id);
    const response = await axios_api.put(`${USERS_API}/profile/update`, { profile: profile, id: id });
    console.log("response.data", response.data);
    const profile_array = response.data.profile[0];
    const profile_json = {
        firstName: profile_array[1],
        lastName: profile_array[2],
        gradDate: profile_array[3],
        joinDate: profile_array[4],
        dob: profile_array[5],
        title: profile_array[6]
    };
    return profile_json;
};








