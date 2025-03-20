import { useState } from "react";
import styles from "./UserSelection.module.css";
import { useEffect } from "react";
import { getAllUsers } from "../../constants/api";

function UserSelection(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Users error:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={styles.wrapper}>
      <h2>Select a user from the list with whom you want to start chatting:</h2>
      {users.length > 0 ? (
        users.map((user, index) => (
          <ul key={index} className={styles.user_wrapper}>
            <div className={styles.img_wrapper}>
              <img
                src={user.userImage || "https://www.placeholder.com/150"}
                alt="user_icon"
              />
            </div>
            <li>{user.username}</li>
          </ul>
        ))
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
}

export default UserSelection;
