import s from "./LikesPanel.module.css";
import likes from "../../assets/notifications.svg";
import message from "../../assets/message.svg";
import { useState } from "react";
import { useEffect } from "react";
import { getData, getLikeCountByPost } from "../../constants/api";

function LikesPanel({ postId }) {
  const [likeCount, setLikeCount] = useState(0);
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const data = await getLikeCountByPost(postId);
        setLikeCount(data.likeCount);
        const formattedDate = getData(data.createdAt);
        setDate(formattedDate);
      } catch (error) {
        setError("Failed to fetch like count", error.message);
      }
    };
    fetchLikeCount();
  }, [postId]);
  getData();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.like_img}>
        <img src={likes} alt="icon_likes" />
        <img src={message} alt="icon_message" />
      </div>
      <h4>{likeCount} likes</h4>
      <span>{date}</span>
    </div>
  );
}

export default LikesPanel;
