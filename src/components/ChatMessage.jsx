function ChatMessage({ message, getAvatarColor }) {
  const { type, sender, content } = message;

  if (type === "JOIN" || type === "LEAVE") {
    return (
      <li className="event-message">
        <p>
          {sender} {type === "JOIN" ? "joined!" : "left!"}
        </p>
      </li>
    );
  }

  return (
    <li className="chat-message">
      <i style={{ backgroundColor: getAvatarColor(sender) }}>{sender[0]}</i>
      <span>{sender}</span>
      <p>{content}</p>
    </li>
  );
}

export default ChatMessage;
