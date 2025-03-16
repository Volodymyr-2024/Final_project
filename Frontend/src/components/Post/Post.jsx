import styles from "./Post.module.css";
import border from "../../assets/border.svg";
import like from "../../assets/like.svg";
import comment from "../../assets/comment.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  console.log(post);

  const createdAt = new Date(post.createdAt);
  const currentDate = new Date();
  const differenceDate = currentDate - createdAt;
  const differenceInDays = Math.floor(differenceDate / (1000 * 60 * 60 * 24));

  const [click, setClick] = useState(post.likeCount);

  const handleClick = () => {
    setClick((prev) => prev + 1);
  };

  const handleOpenPost = () => {
    userId === post.authorId
      ? navigate(`/profile/${userId}?postId=${post.postId}`)
      : navigate(`/other-profile/${userId}?postId=${post.postId}`);
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
        <button onClick={handleClick} className={styles.link}>
          follow
        </button>
      </div>
      <img
        src={post.image}
        alt="post.image"
        className={styles.post_img}
        onClick={handleOpenPost}
      />
      <img src={like} alt="like_image" className={styles.like_img} />
      <img src={comment} alt="comment_image" />
      <p className={styles.likes}>{click} likes</p>
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
