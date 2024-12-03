import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { setCurrentUser } from "../reducers/UserReducer";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { setCurrentProfile } from "../reducers/ProfileReducer";

export default function Signin() {
    const [credentials, setCredentials] = useState<any>({
        username: "",
        password: ""

    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signin = async () => {
        console.log("credentials", credentials);
        try {
            const user = await client.signin(credentials);
            if (!user) return;
            dispatch(setCurrentUser(user));
            const profile = await client.getProfile(user.id);
            dispatch(setCurrentProfile(profile));
            navigate("/TrapTracker/Dashboard");
        }
        catch (e) {
            console.log(e);
        }

    };
    return (
        <div id="wd-signin-screen">
            <h3>Sign in</h3>
            <input defaultValue={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} id="wd-username" placeholder="username" className="form-control mb-2" />
            <input defaultValue={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} id="wd-password" placeholder="password" type="password" className="form-control mb-2" />
            <button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100" > Sign in </button> <br />
            <Link id="wd-signup-link" to="/TrapTracker/Account/Signup">Sign up</Link>
        </div >
    );
}

