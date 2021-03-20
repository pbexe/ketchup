import "../styles/globals.css";
// import { SSRKeycloakProvider, SSRCookies } from "@react-keycloak/ssr";

// const keycloakCfg = {
//   url: "http://localhost:8080/auth",
//   realm: "Test",
//   clientId: "react-test",
// };

function MyApp({ Component, pageProps }) {
  // if (typeof window === "undefined") {
  //   return <Component {...pageProps} />;
  // }
  // const Keycloak = require("keycloak-js");
  // const ReactKeycloakProvider = require("@react-keycloak/web");
  // const keycloak = new Keycloak();

  // return (
  //   <ReactKeycloakProvider authClient={keycloak}>
  //     <Component {...pageProps} />;
  //   </ReactKeycloakProvider>
  // );

  return <Component {...pageProps} />;
  // <SSRKeycloakProvider>

  // </SSRKeycloakProvider>;
}

export default MyApp;
