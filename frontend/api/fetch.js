export default async function fetchJson(endpoint, method, token, data) {
  try {
    const args = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      redirect: "follow",
      body: data && JSON.stringify(data),
    };
    const response = await fetch(`https://api.ketchup.sh${endpoint}`, args);

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const resData = await response.json();

    if (response.ok) {
      return resData;
    }

    const error = new Error(response.statusText);
    error.response = response;
    error.data = resData;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}
