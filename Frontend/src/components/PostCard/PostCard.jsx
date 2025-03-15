import { useEffect, useState } from "react";
import styles from "./PostCard.module.css";
import {
  getCommentsUsersByPostId,
  getData,
  getLikesUsersByPostId,
  getPostById,
} from "../../constants/api";
import close from "../../assets/btn_close.svg";
import UsersComment from "../UsersComment/UsersComment";
import AddComments from "../AddComments/AddComments";
import LikesPanel from "../LikesPanel/LikesPanel";

function PostCard({ postId }) {
  const [post, setPost] = useState(null);
  const [arrLikes, setArrLikes] = useState([]);
  const [arrComments, setArrComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPost = async (postId) => {
      try {
        const [PostById, arrLikes, arrComments] = await Promise.all([
          getPostById(postId),
          getLikesUsersByPostId(postId),
          getCommentsUsersByPostId(postId),
        ]);
        setPost(PostById);
        setArrLikes(arrLikes || []);
        setArrComments(arrComments || []);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to load post data. Please try again later.");
      }
    };

    getPost(postId);
  }, [postId]);

  const commentsWithLikes = arrComments.map((comment) => {
    const likeInfo = arrLikes.find((like) => like.user === comment.user);
    return {
      ...comment,
      likeCount: likeInfo ? likeInfo.likeCount : 0,
      createdAt: getData(comment.createdAt),
    };
  });

  const handleCommentAdded = (newComment) => {
    setArrComments((prevComments) => [...prevComments, newComment]);
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  const date = getData(post.createdAt);

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
            <h4>{post.author?.username}</h4>
            <p>{post.description}</p>
          </div>
        </div>
        <div className={styles.date}>
          <span>{date}</span>
        </div>
        <div className={styles.users_wrapper}>
          {commentsWithLikes.map((comment, index) => (
            <UsersComment
              key={index}
              username={comment.user}
              image={comment.image}
              text={comment.text}
              likeCount={comment.likeCount}
              createdAt={comment.createdAt}
              postId={postId}
            />
          ))}
        </div>
        <div>
          <LikesPanel postId={postId} />
        </div>
        <div className={styles.add_comments}>
          <AddComments postId={postId} onCommentAdded={handleCommentAdded} />
        </div>
      </div>
    </div>
  );
}

export default PostCard;
