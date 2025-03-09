import styles from "./Post.module.css";
import border from "../../assets/border.svg";
import like from "../../assets/like.svg";
import comment from "../../assets/comment.svg";
import { useState } from "react";

function Post({ post }) {
  const createdAt = new Date(post.createdAt);
  const currentDate = new Date();
  const differenceDate = currentDate - createdAt;
  const differenceInDays = Math.floor(differenceDate / (1000 * 60 * 60 * 24));

  const [click, setClick] = useState(post.likeCount);

  const handleClick = () => {
    setClick((prev) => prev + 1);
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
      <img src={post.image} alt="post.image" className={styles.post_img} />
      <img src={like} alt="like_image" className={styles.like_img} />
      <img src={comment} alt="comment_image" />
      <p className={styles.likes}>{click} likes</p>
      <p>{post.description || "Нет описания"}</p>
      <div>
        <p>Количество комментариев: {post.commentCount}</p>
      </div>
      <div>
        <h3>Последние комментарии:</h3>
        <ul>
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <li key={comment._id}>
                <p>
                  {comment.user.username}: {comment.text}
                </p>
              </li>
            ))
          ) : (
            <li>Нет комментариев</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Post;
