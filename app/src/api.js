import axios from "axios";
import { getUserToken, getPlayerId, getMatchId } from "./store";

const URL = "http://localhost:3004";

const METHOD = {
  POST: "post",
  DELETE: "delete",
  PUT: "put",
  GET: "get",
};

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
