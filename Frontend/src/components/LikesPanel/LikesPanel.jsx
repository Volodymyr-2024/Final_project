import s from "./LikesPanel.module.css";
import likes from "../../assets/notifications.svg";
import like_red from "../../assets/heart_like_red.svg";
import message from "../../assets/message.svg";
import { useState, useEffect } from "react";
import { getData, getLikeCountByPost } from "../../constants/api";

function LikesPanel({ postId, isLiked, handleLikeClick }) {
  const [likeCount, setLikeCount] = useState(false);
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const handleLikeCount = () => {
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const data = await getLikeCountByPost(postId);
        setLikeCount(data.likeCount);

        const formattedDate = getData(data.createdAt);
        setDate(formattedDate);
      } catch (error) {
        setError("Failed to fetch like count: " + error.message);
      }
    };
    fetchLikeCount();
  }, [postId]);

  if (error) {
    return <div className={s.error}>{error}</div>;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.like_img}>
        <img
          src={isLiked ? like_red : likes}
          alt="icon_likes"
          className={s.like}
          onClick={() => {
            handleLikeClick();
            handleLikeCount();
          }}
        />
        <img src={message} alt="icon_message" />
      </div>
      <h4>{likeCount} likes</h4>
      <span>{date}</span>
    </div>
  );
}

export default LikesPanel;
