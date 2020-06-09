const axios = require("axios");

const USER_TOKEN_KEY = "user-token";
const PLAYER_ID = "player-id";
const ls = localStorage;

const URL = "http://192.241.136.96:3001";

const METHOD = {
  POST: "post",
  DELETE: "delete",
  PUT: "put",
  GET: "get",
};

export function getUserToken() {
  return ls.getItem(USER_TOKEN_KEY);
}

export function getPlayerId() {
  return ls.getItem(PLAYER_ID);
}

export function getMatch(id) {
  return JSON.parse(ls.getItem(`match-${id}`));
}

const run = async (
  method,
  path,
  data = {},
  headers = { "user-token": getUserToken() }
) => {
  try {
    const res = await axios[method](`${URL}/${path}`, data, headers);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export function getMatchId() {
  const tokenizedUrl = window.location.href.split("/");
  return tokenizedUrl[tokenizedUrl.length - 1];
}

const getMatchById = async () => {
  const matchByIdUrl = `player/${getPlayerId()}/match/${getMatchId()}`;
  return await run(METHOD.GET, matchByIdUrl);
};

const getMatchesOfPlayer = async () => {
  const matchesOfPlayerUrl = `player/${getPlayerId()}/match`;
  return await run(METHOD.GET, matchesOfPlayerUrl);
};

const createMatch = async (rows, cols, bombs) => {
  const createUrl = `player/${getPlayerId()}/match`;
  const data = { rows, cols, bombs };
  const match = await run(METHOD.POST, createUrl, data);
  return match;
};

const login = async (email, password) => {
  const loginUrl = "auth/login";
  return await run(METHOD.POST, loginUrl, { email, password });
};

const saveMatch = async () => {
  const saveUrl = `player/${getPlayerId()}/match/${getMatchId()}`;
  return await run(METHOD.POST, saveUrl);
};

const exec = async (x, y, name) => {
  const execCmdUrl = `player/${getPlayerId()}/match/${getMatchId()}/command`;
  return await run(METHOD.POST, execCmdUrl, { x, y, name });
};

export default {
  getMatchById,
  getMatchesOfPlayer,
  login,
  createMatch,
  saveMatch,
  exec,
};
