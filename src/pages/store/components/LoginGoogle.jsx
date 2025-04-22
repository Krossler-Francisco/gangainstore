import { useEffect } from "react";

function LoginGoogle({ onLogin }) {
  useEffect(() => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id: "TU_CLIENT_ID_AQUI",
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-button"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleCredentialResponse = (response) => {
    const jwt = response.credential;
    const userData = parseJwt(jwt);
    onLogin(userData);
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  return <div id="google-button"></div>;
}

export default LoginGoogle;