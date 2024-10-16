import { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    setUser(credentialResponseDecoded);
    console.log(credentialResponseDecoded);
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    console.log("Logout Successful");
  };

  return (
    <div className="App">
      {user ? (
        <div className="box"> 
          <h2><p>Hello, {user.name}!</p></h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess} 
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
    </div>
  );
}

export default App;

