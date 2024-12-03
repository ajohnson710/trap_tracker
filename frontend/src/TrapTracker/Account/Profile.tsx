import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducers/UserReducer";
import { setCurrentProfile } from "../reducers/ProfileReducer";
import * as client from "./client";

export default function Profile() {
    const [user, setUser] = useState<any>({
        id: 0,
        username: "",
        password: ""
    });
    const [profile, setProfile] = useState<any>({
        firstName: "",
        lastName: "",
        title: "Member"
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.user);
    const { currentProfile } = useSelector((state: any) => state.profile);


    const fetchUser = () => {
        if (!currentUser) return navigate("/TrapTracker/Account/Signin");
        console.log("currentUser", currentUser);
        setUser(currentUser);
    }

    const fetchProfile = () => {
        setProfile(currentProfile);
    };


    const updateUser = async () => {
        const updatedUser = await client.updateUser(user);
        dispatch(setCurrentUser(updatedUser));
    };

    const updateProfile = async () => {
        const updatedProfile = await client.updateProfile(profile, user.id);
        dispatch(setCurrentProfile(updatedProfile));
    };

    // eslint-disable-next-line 
    useEffect(() => { fetchUser(); }, [currentUser]);
    // eslint-disable-next-line 
    useEffect(() => { fetchProfile(); }, [currentProfile]);
    return (
        <div className="wd-profile-screen">
            <h2>Profile</h2>
            <hr />
            {profile && user && (
                <div>
                    <h3>Update Trap Tracker user information</h3>
                    <label>Username: </label>
                    <input defaultValue={user.username} id="wd-username" className="form-control mb-2"
                        onChange={(e) => setUser({ ...user, username: e.target.value })} /><br />
                    <label>Password: </label>
                    <input defaultValue={user.password} id="wd-password" className="form-control mb-2"
                        onChange={(e) => setUser({ ...user, password: e.target.value })} /><br />
                    <button onClick={updateUser} className="btn btn-primary w-100 mb-2"> Update User </button>
                    <h3>Update Trap Tracker Profile information</h3>
                    <label>First Name: </label>
                    <input defaultValue={profile.firstName} id="wd-firstname" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} /><br />
                    <label>Last Name: </label>
                    <input defaultValue={profile.lastName} id="wd-lastname" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} /><br />
                    <label>Title: </label>
                    <select defaultValue={profile.title} id="wd-role" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, title: e.target.value })}>
                        <option value="Member">Member</option>
                        <option value="E-Board">E-Board</option>
                    </select><br />
                    <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update Profile </button>
                    {/* <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
                        Sign out
                    </button> */}
                </div>
            )}
        </div>);
}

