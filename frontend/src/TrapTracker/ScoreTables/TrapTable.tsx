import { useEffect, useState } from "react";
import * as client from "./client";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function TrapTable() {
    const [user, setUser] = useState<any>({});
    const [gameid, setGameid] = useState<number>(0);
    const [newgame, setNewgame] = useState<any>({
        score: 0,
        firstName: "",
        lastName: "",
        station1: 0,
        station2: 0,
        station3: 0,
        station4: 0,
        station5: 0,
        date_played: "",
        location: "",
        title: "Member"
    });

    const [updatedGame, setUpdatedGame] = useState<any>({
        id: 0,
        station1: 0,
        station2: 0,
        station3: 0,
        station4: 0,
        station5: 0,
        score: 0
    });
    const [trapTable, setTrapTable] = useState<any>([]);
    const { currentUser } = useSelector((state: any) => state.user);
    const navigate = useNavigate();

    const fetchUser = () => {
        if (!currentUser) return navigate("/TrapTracker/Account/Signin");
        setUser(currentUser);
    }


    const fetchTrapTable = async () => {
        const trapTable = await client.get_trap_games(user);
        setTrapTable(trapTable);
    };

    const fetchGame = async (id: number) => {
        const game = await client.get_game(id);
        if (!game) return;
        setUpdatedGame(game);
    }

    const addTrapGame = async () => {
        await client.add_trap_game(newgame);
        fetchTrapTable();
    }

    const deleteTrapGame = async (id: number) => {
        await client.delete_trap_game(id);
        fetchTrapTable();
    }

    const updateTrapGame = async () => {
        try {
            await client.update_trap_game(updatedGame, updatedGame.id);
            if (!updatedGame) return;
        }
        catch (e) {
            alert("Error Invalid ID, Please enter a Valid ID from the existing trap table");
            console.log("error", e);
        }
        fetchTrapTable();
    }

    // eslint-disable-next-line 
    useEffect(() => { fetchUser(); }, []);
    // eslint-disable-next-line 



    return (
        <div>
            <h1>Trap Table</h1>
            <button onClick={fetchTrapTable}>Refresh </button>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Score</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Station 1</th>
                            <th>Station 2</th>
                            <th>Station 3</th>
                            <th>Station 4</th>
                            <th>Station 5</th>
                            <th>Date Played</th>
                            <th>Location</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trapTable.map((trap: any) => (
                            <tr>
                                <td>{trap.id}</td>
                                <td>{trap.score}</td>
                                <td>{trap.firstName}</td>
                                <td>{trap.lastName}</td>
                                <td>{trap.station1}</td>
                                <td>{trap.station2}</td>
                                <td>{trap.station3}</td>
                                <td>{trap.station4}</td>
                                <td>{trap.station5}</td>
                                <td>{trap.date_played}</td>
                                <td>{trap.location}</td>
                                <td>{trap.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <hr />
            <h4>Delete Game</h4>
            <input placeholder="Enter ID" onChange={(e) => setGameid(Number(e.target.value))} />
            <button onClick={() => deleteTrapGame(gameid)}> Delete </button>
            <hr />
            <h4>Add Game</h4>
            <input placeholder="First Name" onChange={(e) => setNewgame({ ...newgame, firstName: e.target.value })} />
            <input placeholder="Last Name" onChange={(e) => setNewgame({ ...newgame, lastName: e.target.value })} />
            <br />
            {["Station 1", "Station 2", "Station 3", "Station 4", "Station 5"].map((station, index) => (
                <div key={index}>
                    <label>{station}</label>
                    <select onChange={(e) => setNewgame({ ...newgame, [`station${index + 1}`]: Number(e.target.value) })}>
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
            <br />
            <input placeholder="Date Played" onChange={(e) => setNewgame({ ...newgame, date_played: e.target.value })} />
            <input placeholder="Location" onChange={(e) => setNewgame({ ...newgame, location: e.target.value })} />
            <br />
            <button onClick={() => addTrapGame()}> Add </button>
            <hr />
            <h4>Update Station Scores</h4>
            <input placeholder="Enter ID" onChange={((e) => setGameid(Number(e.target.value)))} />
            <button onClick={() => fetchGame(gameid)}>Fetch Game Info</button>
            {updatedGame.id !== 0 && (
                <>
                    {["Station 1", "Station 2", "Station 3", "Station 4", "Station 5"].map((station, index) => (
                        <div key={index}>
                            <label>{station}</label>
                            <select value={updatedGame[`station${index + 1}`]} onChange={(e) => setUpdatedGame({ ...updatedGame, [`station${index + 1}`]: Number(e.target.value) })}>
                                {[0, 1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </>
            )}
            <button onClick={() => updateTrapGame()}> Update </button>
            <br />


        </div>



    );
}