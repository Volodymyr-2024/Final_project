import { useEffect, useState } from "react";
import styles from "./PostCard.module.css";
import {
  checkUserLike,
  getCommentsUsersByPostId,
  getData,
  getLikesUsersByPostId,
  getPostById,
  toggleLike,
} from "../../constants/api";
import close from "../../assets/btn_close.svg";
import UsersComment from "../UsersComment/UsersComment";
import AddComments from "../AddComments/AddComments";
import LikesPanel from "../LikesPanel/LikesPanel";
import ModalWindow from "../ModalWindow/ModalWindow";

function PostCard({ postId, onPostDelete, closePostCard }) {
  const [post, setPost] = useState(null);
  const [arrLikes, setArrLikes] = useState([]);
  const [arrComments, setArrComments] = useState([]);
  const [error, setError] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    try {
      const response = await toggleLike(postId, token);
      setIsLiked(response.isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
      setIsLiked((prev) => !prev);
    }
  };
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
      {isModal && <div className={styles.modal_background} />}
      <div className={styles.photo_wrapper}>
        <img src={post.image} alt="photo_image" />
      </div>
      <div className={styles.right_wrapper}>
        <div className={styles.user_wrapper}>
          <div className={styles.img_wrapper}>
            <img src={post.author?.profileImage} alt="photo_user" />
          </div>
          <h4>{post.author?.username}</h4>
          {post.author._id === localStorage.getItem("userId") && (
            <img
              src={close}
              alt="close_image"
              className={styles.modal_open}
              onClick={() => {
                setIsModal(true);
              }}
            />
          )}
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
              like={isLiked}
            />
          ))}
        </div>
        <div>
          <LikesPanel
            postId={postId}
            handleLikeClick={handleLikeClick}
            isLiked={isLiked}
          />
        </div>
        <div className={styles.add_comments}>
          <AddComments postId={postId} onCommentAdded={handleCommentAdded} />
        </div>
      </div>

      {isModal && (
        <ModalWindow
          closeModal={() => {
            setIsModal(false);
            closePostCard();
          }}
          postId={postId}
          onPostDelete={onPostDelete}
        />
      )}
    </div>
  );
}

export default PostCard;
