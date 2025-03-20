import { useState } from "react";
import styles from "./UserSelection.module.css";
import { useEffect } from "react";
import { getAllUsers } from "../../constants/api";
import { Link, useParams } from "react-router-dom";

function UserSelection(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Users error:", error);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h2>Select a user from the list with whom you want to start chatting:</h2>
      {users.length > 0 ? (
        users.map((user, index) => (
          <Link
            key={index}
            className={styles.user_wrapper}
            to={`/messages/${userId}/${user.userId}`}
          >
            <div className={styles.img_wrapper}>
              <img
                src={user.userImage || "/default-profile.png"}
                alt="user_icon"
              />
            </div>
            <p>{user.username}</p>
          </Link>
        ))
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
}

export default UserSelection;
