import fetchJson from "./fetch";

export async function rooms() {
  const res = await fetchJson("/room/", "GET");
  return res;
}

export async function user() {
  return await fetchJson("/user/", "GET");
}
