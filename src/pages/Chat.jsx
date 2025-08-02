import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const messageAreaRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS("/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe("/topic/public", (payload) => {
          const message = JSON.parse(payload.body);
          setMessages((prev) => [...prev, message]);
        });
        client.publish({
          destination: "/app/chat.addUser",
          body: JSON.stringify({ sender: username, type: "JOIN" }),
        });
      },
      onStompError: (err) => {
        console.error("STOMP error", err);
      },
    });
    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && stompClient) {
      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify({
          sender: username,
          content: message,
          type: "CHAT",
        }),
      });
      setMessage("");
    }
  };

  useEffect(() => {
    const area = messageAreaRef.current;
    if (area) area.scrollTop = area.scrollHeight;
  }, [messages]);

  const getAvatarColor = (name) => {
    const colors = [
      "#2196F3",
      "#32c787",
      "#00BCD4",
      "#ff5652",
      "#ffc107",
      "#ff85af",
      "#FF9800",
      "#39bbb0",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = 31 * hash + name.charCodeAt(i);
    }
    return colors[Math.abs(hash % colors.length)];
  };

  return (
    <div id="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <h2>Spring WebSocket Chat Demo - By Alibou</h2>
        </div>
        <div className="connecting">Connected as {username}</div>
        <ul id="messageArea" ref={messageAreaRef}>
          {messages.map((msg, index) => (
            <li
              key={index}
              className={msg.type === "CHAT" ? "chat-message" : "event-message"}
            >
              {msg.type === "CHAT" && (
                <>
                  <i style={{ backgroundColor: getAvatarColor(msg.sender) }}>
                    {msg.sender[0]}
                  </i>
                  <span>{msg.sender}</span>
                </>
              )}
              <p>
                {msg.type === "JOIN"
                  ? `${msg.sender} joined!`
                  : msg.type === "LEAVE"
                  ? `${msg.sender} left!`
                  : msg.content}
              </p>
            </li>
          ))}
        </ul>

        <form id="messageForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-group clearfix">
              <input
                type="text"
                id="message"
                placeholder="Type a message..."
                autoComplete="off"
                className="form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="primary">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
