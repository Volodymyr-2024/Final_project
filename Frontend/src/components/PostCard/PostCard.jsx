import { useEffect, useState } from "react";
import styles from "./PostCard.module.css";
import { getPostById } from "../../constants/api";
import close from "../../assets/btn_close.svg";

function PostCard({ postId }) {
  const [post, setPost] = useState([]);
  const createdAt = new Date(post.createdAt);
  const now = new Date();
  const timeDiff = now - createdAt;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  let timeString = "";
  if (days > 0) {
    timeString = days === 1 ? "1 day" : `${days} days`;
  } else if (hours > 0) {
    timeString = hours === 1 ? "1 h" : `${hours} h`;
  } else if (minutes > 0) {
    timeString = minutes === 1 ? "1 min" : `${minutes} min`;
  } else {
    timeString = seconds === 1 ? "1 sec" : `${seconds} sec`;
  }

  useEffect(() => {
    const getPost = async (postId) => {
      try {
        const PostById = await getPostById(postId);
        setPost(PostById);
        console.log(PostById);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    getPost(postId);
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.photo_wrapper}>
        <img src={post.image} alt="photo_image" />
      </div>
      <div className={styles.right_wrapper}>
        <div className={styles.user_wrapper}>
          <div className={styles.img_wrapper}>
            <img src={post.author?.profileImage} alt="photo_user" />
          </div>
          <h4>{post.author?.username}</h4>
          <img src={close} alt="close_image" />
        </div>
        <div className={styles.description_post}>
          <div className={styles.img_wrapper}>
            <img src={post.author?.profileImage} alt="photo_user" />
          </div>
          <div className={styles.description}>
            <p>
              {post.author?.username} {post.description}
            </p>
            <span>{timeString}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
