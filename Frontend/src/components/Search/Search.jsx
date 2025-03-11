import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import clean from "../../assets/clean.svg";
import { api } from "../../constants/api";

function Search(props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setQuery(e.target.value);
  };
  const handleClean = () => {
    setQuery("");
    setResults([]);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await api.get("/search/users", {
          params: { query },
        });
        setResults(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query]);
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
      {loading && <p>Loading...</p>}
      <p className={styles.recent}>Recent</p>
      <div className={styles.results}>
        {results.length > 0 ? (
          <ul>
            {results.map((user, index) => (
              <div key={index} className={styles.user_container}>
                <img src={user.profileImage} alt="" />
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
