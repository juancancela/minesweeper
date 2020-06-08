const USER_TOKEN_KEY = "user-token";
const PLAYER_ID = "player-id";
const ls = localStorage;

export function setUserToken(token) {
  ls.setItem(USER_TOKEN_KEY, token);
}

export function getUserToken() {
  return ls.getItem(USER_TOKEN_KEY);
}

export function setPlayerId(userId) {
  ls.setItem(PLAYER_ID, userId);
}

export function getPlayerId() {
  return ls.getItem(PLAYER_ID);
}

export function resetStorage() {
  ls.clear();
}

export function setMatch(id, match) {
  ls.setItem(`match-${id}`, JSON.stringify(match));
}

export function getMatch(id) {
  return JSON.parse(ls.getItem(`match-${id}`));
}

export function getMatchId() {
  const tokenizedUrl = window.location.href.split("/");
  return tokenizedUrl[tokenizedUrl.length - 1];
}
