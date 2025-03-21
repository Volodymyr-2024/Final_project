import { useCallback, useEffect, useState } from "react";
import Post from "../Post/Post";
import styles from "./FourPost.module.css";
import { fetchFourPosts, getFollowers, followUser } from "../../constants/api";
import all_comments from "../../assets/all_comments.svg";

function FourPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [followers, setFollowers] = useState({});
  const [followStatus, setFollowStatus] = useState({});

  const userId = localStorage.getItem("userId");

  const getPost = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchFourPosts(page);
      setPosts(data);

      const followersData = {};
      const followStatusData = {};
      for (const post of data) {
        const followers = await getFollowers(post.authorId);
        followersData[post.authorId] = followers;

        const isFollowing = followers.some(
          (users) =>
            users.follower._id === userId && users.following === post.authorId
        );
        followStatusData[post.authorId] = isFollowing;
      }
      setFollowers(followersData);
      setFollowStatus(followStatusData);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [page, userId]);

  useEffect(() => {
    getPost();
  }, [page, getPost]);

  const handleFollow = async (authorId) => {
    try {
      await followUser(userId, authorId);

      setFollowStatus((prev) => ({
        ...prev,
        [authorId]: !prev[authorId],
      }));
    } catch (error) {
      console.error("Error following:", error);
    }
  };

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page - 1);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <div className={styles.wrapper}>
        {posts.map((post, index) => (
          <Post
            key={index}
            post={post}
            followers={followers[post.authorId] || []}
            isFollowing={followStatus[post.authorId] || false}
            onFollow={handleFollow}
          />
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
