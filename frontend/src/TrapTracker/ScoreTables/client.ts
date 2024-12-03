import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const GAMES_API = `${REMOTE_SERVER}/api/games`;
const axios_api = axios.create();

export const get_trap_games = async (user: any) => {
    console.log("user", user);
    const response = await axios_api.post(`${GAMES_API}/trap`, user);
    console.log("response.data", response.data.games);
    const games_list = response.data.games;
    const games_json_list = games_list.map((game: any) => {
        return {
            id: game[0],
            score: game[1],
            firstName: game[2],
            lastName: game[3],
            station1: game[4],
            station2: game[5],
            station3: game[6],
            station4: game[7],
            station5: game[8],
            datePlayed: game[9],
            location: game[10],
            title: game[11],
        };
    });
    return games_json_list;
};

export const add_trap_game = async (game: any) => {
    console.log("game", game);
    // Make sure data is correct before sending to server
    game.score = game.station1 + game.station2 + game.station3 + game.station4 + game.station5;
    const response = await axios_api.post(`${GAMES_API}/trap/add`, { game: game });
    console.log("response.data", response.data);
    return response.data;
};

export const update_trap_game = async (game: any, gameid: any) => {
    // Make sure data is correct before sending to server
    game.score = game.station1 + game.station2 + game.station3 + game.station4 + game.station5;
    console.log("game", game);
    console.log("gameid", gameid);
    const response = await axios_api.put(`${GAMES_API}/trap/update`, { game: game, id: gameid });
    console.log("response.data", response.data);
    return response.data;
};

export const delete_trap_game = async (id: any) => {
    const response = await axios_api.post(`${GAMES_API}/trap/delete`, { id: id });
    console.log("response.data", response.data);
    return response.data;
};

export const get_game = async (id: any) => {
    const response = await axios_api.post(`${GAMES_API}/trap/game`, { id: id });
    console.log("response.data", response.data.game);
    if (response.data.message === "Game not found") {
        alert("game not found, please enter valid credentials");
        return null;
    }
    const game_array = response.data.game[0];
    const game_json = {
        id: game_array[0],
        station1: game_array[1],
        station2: game_array[2],
        station3: game_array[3],
        station4: game_array[4],
        station5: game_array[5],
    };
    console.log("game_json", game_json);
    return game_json;
}