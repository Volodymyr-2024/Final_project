import Chat from "../components/Chat/Chat";

function ChatPage(props) {
  const token = localStorage.getItem("token");
  return (
    <div>
      {token ? (
        <Chat userId="user1" targetUserId="user2" token={token} />
      ) : (
        <p>Please, log in</p>
      )}
    </div>
  );
}

export default ChatPage;
