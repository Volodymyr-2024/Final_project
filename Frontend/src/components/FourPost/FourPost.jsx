import { useEffect, useState } from "react";
import Post from "../Post/Post";
import styles from "./FourPost.module.css";
import { fetchFourPosts } from "../../constants/api";
import all_comments from "../../assets/all_comments.svg";

function FourPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const getPost = async () => {
    try {
      setLoading(true);
      const data = await fetchFourPosts(page);
      setPosts(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const data = await fetchFourPosts(page);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    getPost();
  }, [page]);

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page - 1);

  if (loading) {
    return <p>Dowloads...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className={styles.wrapper}>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      <div className={styles.button_wrapper}>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Back
        </button>
        <button onClick={handleNextPage} disabled={posts.length < 4}>
          Forward
        </button>
      </div>
      {posts.length < 4 && (
        <div className={styles.all_updates}>
          <img src={all_comments} alt="all_comment_image" />
          <h3>You've seen all the updates</h3>
          <p>You have viewed all new publications</p>
        </div>
      )}
    </div>
  );
}

export default FourPost;
