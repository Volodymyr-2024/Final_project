import { useParams } from "react-router-dom";
import Message from "../components/Message/Message";

function SendMessagePage(props) {
  const currentUserId = localStorage.getItem("userId");
  const { userId, targetUserId } = useParams();
  return (
    <div>
      <Message currentUserId={currentUserId} targetUserId={targetUserId} />
    </div>
  );
}

export default SendMessagePage;
