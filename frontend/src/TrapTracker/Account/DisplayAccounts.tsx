import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function DisplayAccounts() {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [error, setError] = useState(null);
    const USERS_API = "http://localhost:4000/api/users";

    useEffect(() => {
        // Fetch data using Axios
        axios
            .get(`${USERS_API}`)
            .then((response) => {
                setAccounts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError(error.message);
            });
    }, []);



    return (
        <div>
            <h1>Accounts</h1>
            {error ? (
                <p>Error: {error}</p>
            ) : accounts ? (
                accounts.map((data, index) => (
                    <div key={index}>
                        <p>user: {data[1]}</p>
                        <p>pass: {data[2]}</p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}