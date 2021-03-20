import fetchJson from "./fetch";

export async function getRooms(token) {
  const res = await fetchJson("/room/", "GET", token);
  return res;
}

export async function getUser(token) {
  return await fetchJson("/user/me", "GET", token);
}

export async function createRoom(token, name, duration) {
  return await fetchJson("/room/", "POST", token, {
    duration: duration,
    name: name,
  });
}

export async function joinRoom(token, uuid) {
  return await fetchJson(`/user/room`, "POST", token, {
    new_room_id: uuid,
  });
}

export async function leaveRoom(token) {}
