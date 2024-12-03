import { Navigate, Route, Routes } from "react-router";
import Account from "./Account";
import Header from "./Header";
import Dashboard from "./Dashboard";

export default function TrapTracker() {
    return (
        <div >
            <Header />
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="Account" />} />
                    <Route path="Account/*" element={<Account />} />
                    <Route path="Dashboard/*" element={<Dashboard />} />
                </Routes>
            </div>
        </div>
    );
}