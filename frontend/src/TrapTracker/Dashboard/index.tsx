
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TrapTable from "../ScoreTables/TrapTable";

export default function Dashboard() {

    const [profile, setProfile] = useState<any>({});

    const { currentProfile } = useSelector((state: any) => state.profile);


    const fetchProfile = () => {
        setProfile(currentProfile);
    };

    // eslint-disable-next-line 
    useEffect(() => { fetchProfile(); }, [currentProfile]);
    return (
        <div>
            <h2>Dashboard</h2>
            <hr />
            <h3>Hello {profile.firstName}!</h3>
            <br />
            <TrapTable />
        </div>
    );
}