import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducers/UserReducer";

export default function Signup() {
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signup = async () => {
        try {
            if (!user.username || !user.password) {
                alert("Please enter a username and password");
                return;
            }
            const return_message = await client.signup(user);
            if (return_message.message === "User not added") {
                alert("user already exists, please enter a different username");
                return null;
            }
            dispatch(setCurrentUser(return_message.user));
            navigate("/TrapTracker/Account/profile");
        }
        catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="wd-signup-screen">
            <h1>Sign up</h1>
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="wd-username form-control mb-2" placeholder="username" />
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password"
                className="wd-password form-control mb-2" placeholder="password" />
            <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br />
            <Link to="/TrapTracker/Account/signin" className="wd-signin-link">Sign in</Link>
        </div>
    );
}

