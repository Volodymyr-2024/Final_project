import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import web from "../../assets/web.svg";
import {
  getFollowers,
  getFollowing,
  getUserData,
  getUserPost,
  followUser,
  unfollowUser,
} from "../../constants/api";
import PostCard from "../PostCard/PostCard";

function Profile({ editUser }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const storedUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const finalUserId = editUser ? storedUserId : id;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const postIdFromUrl = new URLSearchParams(search).get("postId");

  useEffect(() => {
    if (postIdFromUrl) {
      setSelectedPostId(postIdFromUrl);
    }
  }, [search]);

  const handleClick = (post) => {
    setSelectedPostId(post._id), setIsModalOpen(true);
    navigate(`?postId=${post._id}`);
    window.scrollTo(0, 0);
  };

  const handleCloseModal = () => {
    setSelectedPostId(null);
    setIsModalOpen(false);
    navigate(window.location.pathname);
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

  const checkIfFollowing = async () => {
    try {
      const followersData = await getFollowers(finalUserId);
      const isFollowing = followersData.some(
        (follower) => follower.follower._id === storedUserId
      );
      setIsFollowing(isFollowing);
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(storedUserId, finalUserId);
      } else {
        await followUser(storedUserId, finalUserId, token);
      }
      setIsFollowing((prev) => !prev);
      const updatedFollowers = await getFollowers(finalUserId);
      setFollowers(updatedFollowers);
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

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

        await checkIfFollowing();
      } catch (error) {
        console.error("Error fetching user data or posts:", error);
      }
    };
    fetchData();
  }, [finalUserId, id, token]);

  const handlePostDelete = async () => {
    try {
      const userPosts = await getUserPost(finalUserId, token);
      setPosts(userPosts || []);
    } catch (error) {
      console.error("Error fetching posts after deletion:", error);
    }
  };

  const handlePostUpdate = async () => {
    try {
      const userPosts = await getUserPost(finalUserId, token);
      setPosts(userPosts || []);
    } catch (error) {
      console.error("Error fetching posts after update:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.user_wrapper}>
        <div className={styles.img_wrapper}>
          <img
            src={user.profileImage || "/path/to/default-profile.png"}
            alt="image_profile"
          />
        </div>
        <div className={styles.user_description}>
          <div className={styles.username}>
            <h4>{user.username}</h4>
            {editUser ? (
              <button onClick={() => navigate(`/edit-profile/${id}`)}>
                Edit profile
              </button>
            ) : (
              <div className={styles.other_profile_btn_container}>
                <button
                  className={`${styles.btn_follow} ${
                    isFollowing ? styles.following : ""
                  }`}
                  onClick={handleFollow}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
                <button className={styles.btn_message}>Message</button>
              </div>
            )}
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
      {selectedPostId && <div className={styles.overlay}></div>}

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

      {selectedPostId && (
        <div className={styles.dialog}>
          {selectedPostId && (
            <PostCard
              postId={selectedPostId}
              onPostDelete={handlePostDelete}
              closePostCard={handleCloseModal}
              onUpdate={handlePostUpdate}
            />
          )}
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
