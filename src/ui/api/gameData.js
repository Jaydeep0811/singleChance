import axios from "axios";
import { getCookie } from "../utils/functions";

export const get_balance = async function () {
  try {
    const { data } = await axios("api/v1/user/balance/");
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};

export const create_game = async function (body) {
  try {
    const { data } = await axios.post("api/v1/game/create/", body);
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};

export const game_history = async function () {
  let cookies = "e51331a2-1fc9-40c5-9d9e-ffa6dcc863ae";
  try {
    const { data } = await axios("api/v1/game/history/" + cookies + "/");
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};

export const predict_winner = async function (game_id) {
  try {
    const { data } = await axios("api/v1/game/predict-winner/", {
      params: {
        game_id: game_id,
      },
    });
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};
