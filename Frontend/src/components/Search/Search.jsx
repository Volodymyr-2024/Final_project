import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import clean from "../../assets/clean.svg";
import { api } from "../../constants/api";
import { useNavigate } from "react-router-dom";

function Search(props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setQuery(e.target.value);
  };
  const handleClean = () => {
    setQuery("");
    setResults([]);
  };

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await api.get("/search/users", {
          params: { query },
        });
        setResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query]);

  const goToOtherUser = (userId) => {
    const currentUsedId = localStorage.getItem("userId");
    const path =
      currentUsedId === userId
        ? `/profile/${userId}`
        : `/other-profile/${userId}`;

    navigate(path);
  };

  return (
    <div className={styles.wrapper}>
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleSubmit}
      />
      <button className={styles.img_container} onClick={handleClean}>
        <img src={clean} alt="clean_icon" className={styles.clean} />
      </button>
      {loading && <p style={{ marginLeft: 20 }}>Loading...</p>}
      <p className={styles.recent}>Recent</p>
      <div className={styles.results}>
        {results.length > 0 ? (
          <ul>
            {results.map((user, index) => (
              <div
                key={index}
                className={styles.user_container}
                onClick={() => {
                  goToOtherUser(user._id);
                }}
              >
                <img
                  src={user.profileImage || "/path/to/default-profile.png"}
                  alt="icon_user"
                />
                <p>{user.username}</p>
              </div>
            ))}
          </ul>
        ) : (
          <p style={{ marginLeft: 24 }}>No results found</p>
        )}
      </div>
    </div>
  );
}

export default Search;
