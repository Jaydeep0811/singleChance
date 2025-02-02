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

export const set_autoclame = async function (bool) {
  let user_id = JSON.parse(localStorage.getItem("userDetails")).id ;
  try {
    const { data } = await axios.patch("api/v1/user/balance/", {
      is_claimed: bool,
      user_id: user_id,
    });
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

export const game_history = async function (id) {
  // e51331a2-1fc9-40c5-9d9e-ffa6dcc863ae
  // let cookies = "e51331a2-1fc9-40c5-9d9e-ffa6dcc863ae";
  try {
    const { data } = await axios("api/v1/game/history/" + id + "/");
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};


export const predict_winner = async function (game_id) {
  try {
    const { data } = await axios.post("api/v1/game/predict-winner/", {
      game_id: game_id,
    });
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};

export const get_game_result = async function (id, page, pageSize = 10) {
  try {
    const { data } = await axios("api/v1/game/result/" + id + "/?pageIndex=" + page + "&perPage=" + pageSize);
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};

export const get_unclamed_tickets = async function (id) {
  try {
    const { data } = await axios("api/v1/game/history/unclaimed/" + id + "/");
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};

export const claim_unclamed_tickets = async function (id) {
  try {
    const { data } = await axios.patch("api/v1/game/claim/ticket/", {
      ticket_id: id,
    });
    return data;
  } catch (error) {
    console.log("error on  API", error);
    return error;
  }
};
