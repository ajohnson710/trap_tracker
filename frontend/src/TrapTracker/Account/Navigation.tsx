// import { useSelector } from "react-redux";
import { Link } from "react-router";


export default function TrapTrackerNavigation() {
    // const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    return (
        <div>
            <Link to={`/TrapTracker/Account/getAccounts`} > Get Accounts </Link> <br />
        </div>

        // currentUser ? (
        //     <div id="tt-account-navigation" className="list-group fs-5 rounded-0">
        //         <Link className="list-group-item text-danger border border-0" to={`/TrapTracker/Account/Profile`} > Profile </Link> <br />
        //         <Link className="list-group-item text-danger border border-0" to={`/TrapTracker/Account/Signout`} > Signout </Link> <br />
        //     </div>
        // ) : (
        //     <div>
        //         <Link to={`/TrapTracker/Account/Signin`} > Signin </Link> <br />
        //         <Link to={`/TrapTracker/Account/Signup`} > Signup </Link> <br />
        //     </div>
        // )
    );

};