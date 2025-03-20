import { useEffect, useState } from "react";
import styles from "./Explore.module.css";
import { getAllPost } from "../../constants/api";
import { useNavigate } from "react-router-dom";

function Explore(props) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPost();
        const shuffleData = data.sort(() => Math.random - 0.5);
        setPosts(shuffleData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleOpenPost = (post) => {
    userId === post.author._id
      ? navigate(`/profile/${userId}?postId=${post._id}`)
      : navigate(`/other-profile/${post.author._id}?postId=${post._id}`);
  };

  return (
    <div className={styles.wrapper}>
      {posts.map((post, index) => (
        <div key={index} className={styles.img_wrapper}>
          <img
            src={post.image}
            alt="post_image"
            onClick={() => {
              handleOpenPost(post);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Explore;
