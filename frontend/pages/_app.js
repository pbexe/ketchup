import "../styles/globals.css";
// import { SSRKeycloakProvider, SSRCookies } from "@react-keycloak/ssr";

// const keycloakCfg = {
//   url: "http://localhost:8080/auth",
//   realm: "Test",
//   clientId: "react-test",
// };

import cookie from "cookie";
import { SSRKeycloakProvider, SSRCookies } from "@react-keycloak/ssr";

const keycloakCfg = {
  realm: "ketchup",
  url: "https://ketchup-keycloak.herokuapp.com/auth",
  clientId: "frontend",
};

function MyApp({ Component, pageProps, cookies }) {
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

  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakCfg}
      persistor={SSRCookies(cookies)}
    >
      <Component {...pageProps} />
    </SSRKeycloakProvider>
  );
  // <SSRKeycloakProvider>

  // </SSRKeycloakProvider>;
}

function parseCookies(req) {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || "");
}

MyApp.getInitialProps = async (context) => {
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context.ctx.req),
  };
};

export default MyApp;
