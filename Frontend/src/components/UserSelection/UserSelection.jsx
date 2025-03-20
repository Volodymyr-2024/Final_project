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
      {users.length > 0 ? (
        users.map((user, index) => (
          <div key={index}>
            <div>
              <img src={user.userImage} alt="user_icon" />
            </div>
            <h4>{user.username}</h4>
          </div>
        ))
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
}

export default UserSelection;
