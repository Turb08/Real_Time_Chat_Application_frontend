import { useState } from "react";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import "./styles/main.css";

function App() {
  const [username, setUsername] = useState(null);

  return (
    <>
      {username ? (
        <Chat username={username} />
      ) : (
        <Login onLogin={(name) => setUsername(name)} />
      )}
    </>
  );
}

export default App;
