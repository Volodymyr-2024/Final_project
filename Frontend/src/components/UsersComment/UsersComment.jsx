import s from "./UsersComment.module.css";
import heart from "../../assets/heart_like.svg";
import heartFilled from "../../assets/heart_like_red.svg";
import { useEffect, useState } from "react";
import { checkUserLike } from "../../constants/api";

function UsersComment({ image, username, text, likeCount, createdAt, postId }) {
  const [isLiked, setIsLiked] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId || !postId) return;
    const checkLike = async () => {
      try {
        const response = await checkUserLike(userId, postId);
        setIsLiked(response.isLiked);
      } catch (error) {
        console.error("Error checking like:", error);
      }
    };

    checkLike();
  }, [userId, postId]);

  return (
    <div className={s.wrapper}>
      <div className={s.image_wrapper}>
        <img src={image || "default-image.png"} alt="img_user" />
      </div>
      <div className={s.content_wrapper}>
        <div className={s.username_text}>
          <h4>{username || "Unknown User"}</h4>
          <p>{text}</p>
        </div>
        <div className={s.likes}>
          <span>{createdAt}</span>
          <span>Likes: {likeCount}</span>
        </div>
      </div>
      <div className={s.img_likes}>
        <img src={isLiked ? heartFilled : heart} alt="img_like" />
      </div>
    </div>
  );
}

export default UsersComment;
