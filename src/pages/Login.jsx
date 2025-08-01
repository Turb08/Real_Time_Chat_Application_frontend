import { useState } from "react";

function Login({ onLogin }) {
  // State to hold the username input
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    // Login component for entering username
    // It includes a form with an input field and a submit button
    // When the form is submitted, it calls the onLogin function with the entered username
    <div id="username-page">
      <div className="username-page-container">
        <h1 className="title">Type your username to enter the Chatroom</h1>
        <form id="usernameForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              placeholder="Username"
              autoComplete="off"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="accent username-submit">
              Start Chatting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
