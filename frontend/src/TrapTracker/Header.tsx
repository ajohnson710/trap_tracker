import { useSelector } from "react-redux";
import "./index.css";
import { useEffect, useState } from "react";

export default function Header() {
    const [user, setUser] = useState({});
    const { currentUser } = useSelector((state: any) => state.user);

    const fetchUser = () => {
        setUser(currentUser);
    }


    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line
    }, [currentUser]);

    return (
        <div>
            <div className="header">
                <h1>Trap Tracker</h1>
            </div>
            {user ? (
                <div>
                    <nav className="nav">
                        <a className="nav-link active lg" aria-current="page" href="#/TrapTracker/Dashboard">Dashboard</a>
                        <span>    </span>
                        <a className="nav-link active lg" aria-current="page" href="#/TrapTracker/Account/Profile">Profile</a>
                    </nav>
                </div>
            ) : (
                <div>
                    <nav className="nav">
                        <a className="nav-link active lg" aria-current="page" href="#/TrapTracker/Account/Signin">Sign In</a>
                        <span>    </span>
                        <a className="nav-link active lg" aria-current="page" href="#/TrapTracker/Account/Signup">Sign Up</a>
                    </nav>
                </div>
            )}
        </div>
    );
}
