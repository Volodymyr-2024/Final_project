import styles from "./CreatePost.module.css";
import load from "../../assets/load_image.svg";
import { useEffect, useRef, useState } from "react";
import { createPost, getUserData } from "../../constants/api";
import { useNavigate } from "react-router-dom";

function CreatePost(props) {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const postData = { description: text, image: file };
      const newPost = await createPost(postData);
      console.log("Post created:", newPost);
      alert("Post created successfully!");
      navigate(`/profile/${userId}`);
      setText("");
      setFile(null);
      setPreview("");
    } catch (error) {
      setError(error.message);
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const dialogRef = useRef(null);
  const userId = localStorage.getItem("userId");

  const maxLength = 2200;
  const handleTextChange = (event) => {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      dialogRef.current.close();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.upper_block}>
        <h2>Create new post</h2>
        <p>Share</p>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.container_img_text} onSubmit={handleSubmit}>
        <div className={styles.load_img_wrapper}>
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              onClick={() => dialogRef.current.showModal()}
              style={{ maxHeight: "154px" }}
            />
          ) : (
            <img
              src={load}
              alt="icon_load"
              onClick={() => dialogRef.current.showModal()}
            />
          )}
        </div>
        <div className={styles.rigth_container}>
          <div className={styles.rigth_upp}>
            <div className={styles.userinfo_wrapper}>
              <img src={user.profileImage} alt="" />
              <h4>{user.username}</h4>
            </div>
            <div className={styles.text}>
              <textarea value={text} onChange={handleTextChange}></textarea>
              <div className={styles.input_text}>
                {text.length}/{maxLength}
              </div>
            </div>
          </div>
          <div className={styles.rigth_bottom}>
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Post"}
            </button>
          </div>
        </div>
      </form>

      <dialog ref={dialogRef} className={styles.dialog}>
        <h3>Upload New Photo</h3>
        <input type="file" onChange={handleFileChange} />
        <div className={styles.dialog_buttons}>
          <button disabled={!file}>Upload</button>
          <button onClick={() => dialogRef.current.close()}>Cancel</button>
        </div>
      </dialog>
    </div>
  );
}

export default CreatePost;
