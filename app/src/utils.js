const USER_TOKEN_KEY = "user-token";
const PLAYER_ID = "player-id";
const ls = localStorage;

export function getPosKeyCodes() {
  return {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    Q: 81,
    W: 87,
    E: 69,
  };
}

export function getApiUrl() {
  return "http://localhost:3004/";
}

export function redirectTo(currentPath, targetPath) {
  window.location.href = window.location.href.replace(currentPath, targetPath);
}

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
  ls.removeItem(USER_TOKEN_KEY);
  ls.removeItem(PLAYER_ID);
}

export function setMatch(id, match) {
  ls.setItem(`match-${id}`, JSON.stringify(match));
}

export function getMatch(id) {
  return JSON.parse(ls.getItem(`match-${id}`));
}