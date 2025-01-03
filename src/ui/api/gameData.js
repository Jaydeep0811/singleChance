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

export const create_game = async function () {
  try {
    const { data } = await axios("api/v1/game/create/");
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};

export const game_history = async function () {
  let cookies = getCookie("accessToken");
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
        game_id: game_id
      }
    });
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};
