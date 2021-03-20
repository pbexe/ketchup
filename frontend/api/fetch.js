export default async function fetchJson(endpoint, method, data) {
  try {
    const args = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: data && JSON.stringify(data),
    };
    const response = await fetch(
      `https://1042b460f22f.ngrok.io${endpoint}`,
      args
    );

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new Error(response.statusText);
    error.response = response;
    error.data = data;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}