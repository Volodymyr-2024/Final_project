import { useParams } from "react-router-dom";
import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import {
  getFollowers,
  getFollowing,
  getUserData,
  getUserPost,
} from "../../constants/api";

function Profile(props) {
  const storedUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const finalUserId = id || storedUserId;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(finalUserId);
        setUser(userData);

        const userPosts = await getUserPost(finalUserId, token);
        setPosts(userPosts || []);

        const followersData = await getFollowers(id);
        setFollowers(followersData || []);

        const followingData = await getFollowing(id);
        setFollowing(followingData);
      } catch (error) {
        console.error("Error fetching user data or posts:", error);
      }
    };
    fetchData();
  }, [finalUserId]);
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
            <button>Edit profile</button>
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
        </div>
      </div>
      <div className={styles.posts}>
        {posts.slice(0, 6).map((post, id) => (
          <img src={post.image} alt="" key={id} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
