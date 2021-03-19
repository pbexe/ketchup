import { useEffect } from "react"
import useUser from "../lib/useUser"
import fetchJson from "../lib/fetchJson";

export default function Login() {

  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true
  })

  const login = async () => {
    await mutateUser(
      fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: 'alex' }),
      }),
    );
  }

  return (
    <button onClick={login}>Login</button>
  )
}