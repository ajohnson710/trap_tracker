import { Routes, Route, Navigate } from "react-router";
import DisplayAccounts from "./DisplayAccounts";
import Signup from "./Signup";
import Signin from "./Signin";
import Profile from "./Profile";
import Dashboard from "../Dashboard";


export default function Account() {
    // const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div id="wd-account-screen">

            <td valign="top">
                <Routes>
                    <Route path="/" element={<Navigate to="/TrapTracker/Account/signin" />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/getAccounts" element={<DisplayAccounts />} />

                </Routes>
            </td>

        </div>
    );
}

