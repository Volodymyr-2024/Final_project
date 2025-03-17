import styles from "./Post.module.css";
import border from "../../assets/border.svg";
import like from "../../assets/like.svg";
import like_red from "../../assets/heart_like_red.svg";
import comment from "../../assets/comment.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserLike, toggleLike } from "../../constants/api";

function Post({ post }) {
  console.log(post);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const createdAt = new Date(post.createdAt);
  const currentDate = new Date();
  const differenceDate = currentDate - createdAt;
  const differenceInDays = Math.floor(differenceDate / (1000 * 60 * 60 * 24));

  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!userId || !post.postId) return;
    const checkLike = async () => {
      try {
        const response = await checkUserLike(userId, post.postId);
        setIsLiked(response.isLiked);
      } catch (error) {
        console.error("Error checking like:", error);
      }
    };

    checkLike();
  }, [userId, post.postId]);

  const handleLikeClick = async () => {
    try {
      const response = await toggleLike(post.postId, token);
      setLikeCount(response.likeCount);
      setIsLiked(response.isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };

  const handleOpenPost = () => {
    userId === post.authorId
      ? navigate(`/profile/${userId}?postId=${post.postId}`)
      : navigate(`/other-profile/${post.authorId}?postId=${post.postId}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={border} alt="border_foto" className={styles.border_foto} />
        <img
          src={post.authorImage || ""}
          alt={post.authorImage}
          className={styles.user_image}
        />
        <p>{post.author}</p>
        <span>
          {differenceInDays > 0 ? `${differenceInDays} day` : "Less than a day"}
        </span>
        <button className={styles.link}>follow</button>
      </div>
      <img
        src={post.image}
        alt="post.image"
        className={styles.post_img}
        onClick={handleOpenPost}
      />
      <img
        src={isLiked ? like_red : like}
        alt="like_image"
        className={styles.like_img}
        onClick={handleLikeClick}
      />
      <img src={comment} alt="comment_image" />
      <p className={styles.likes}>{likeCount} likes</p>
      <p className={styles.description}>{post.description || "Нет описания"}</p>
      <div>
        <p className={styles.comments}>
          View all comments: ({post.commentCount})
        </p>
      </div>
    </div>
  );
}

export default Post;
