import { useNavigate, useParams } from "react-router-dom";
import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import web from "../../assets/web.svg";

import {
  getFollowers,
  getFollowing,
  getUserData,
  getUserPost,
} from "../../constants/api";
import PostCard from "../PostCard/PostCard";

function Profile(props) {
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const finalUserId = id || storedUserId;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (post) => {
    setSelectedPostId(post._id), setIsModalOpen(true);
    window.scrollTo(0, 0);
  };

  const handleCloseModal = () => {
    setSelectedPostId(null);
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!finalUserId) {
      console.error("User ID is missing");
      return;
    }
    const fetchData = async () => {
      try {
        const userData = await getUserData(finalUserId);
        setUser(userData);

        const userPosts = await getUserPost(finalUserId, token);
        setPosts(userPosts || []);

        const followersData = await getFollowers(finalUserId);
        setFollowers(followersData || []);

        const followingData = await getFollowing(finalUserId);
        setFollowing(followingData);
      } catch (error) {
        console.error("Error fetching user data or posts:", error);
      }
    };
    fetchData();
  }, [finalUserId, id, token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.user_wrapper}>
        <div className={styles.img_wrapper}>
          <img src={user.profileImage} alt="image_profile" />
        </div>
        <div className={styles.user_description}>
          <div className={styles.username}>
            <h4>{user.username}</h4>
            <button onClick={() => navigate(`/edit-profile/${id}`)}>
              Edit profile
            </button>
          </div>
          <div className={styles.posts_count}>
            <p>
              {posts ? posts.length : 0}
              <span>posts</span>
            </p>
            <p>
              {followers ? followers.length : 0} <span>followers</span>
            </p>
            <p>
              {following.length} <span>following</span>
            </p>
          </div>
          <span className={styles.bio}>{user.bio}</span>
          {user.website && (
            <div className={styles.website}>
              <a href={user.website} rel="website">
                <img src={web} alt="Website" className={styles.webIcon} />
                {user.website}
              </a>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && <div className={styles.overlay}></div>}

      <div className={styles.posts}>
        {posts.slice(0, 6).map((post) => (
          <img
            src={post.image}
            alt="post_image"
            key={post._id}
            onClick={() => {
              handleClick(post);
            }}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.dialog}>
          {selectedPostId && <PostCard postId={selectedPostId} />}
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
