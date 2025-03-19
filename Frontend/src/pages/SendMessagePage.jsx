import { useParams } from "react-router-dom";
import Message from "../components/Message/Message";

function SendMessagePage(props) {
  const { targetUserId } = useParams();
  return (
    <div>
      <Message targetUserId={targetUserId} />
    </div>
  );
}

export default SendMessagePage;
