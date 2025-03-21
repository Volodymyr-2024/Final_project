import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditProfile.module.css";
import { useEffect, useRef, useState } from "react";
import { getUserData, updateUser } from "../../constants/api";

function EditProfile(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    website: "",
    bio: "",
  });
  const [file, setFile] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(id);
        setUser(userData);
        setFormData({
          username: userData.username,
          website: userData.website || "",
          bio: userData.bio || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    if (formData.password && formData.password.length < 5) {
      setError("Password must be at least 5 characters long");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const updatedData = {
        username: formData.username,
        website: formData.website,
        bio: formData.bio,
      };

      if (formData.password) {
        updatedData.password = formData.password;
      }

      const form = new FormData();
      form.append("username", updatedData.username);
      form.append("bio", updatedData.bio);
      form.append("website", updatedData.website);

      if (updatedData.password) {
        form.append("password", updatedData.password);
      }

      if (file) {
        form.append("profileImage", file);
      }
      await updateUser(form, token);
      alert("Profile updated successfully");
      dialogRef.current.close();
      navigate(`/profile/${id}`);
    } catch (error) {
      alert("Failed to update profile");
      console.error("Error updating user:", error);
      setError(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h2>Edit Profile</h2>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.newPhoto}>
        <div className={styles.img_wrapper}>
          <img src={user.profileImage} alt="image_photo" />
        </div>
        <div className={styles.username}>
          <h4>{user.username}</h4>
          <p>{user.bio}</p>
        </div>
        <div className={styles.btn_wrapper}>
          <button onClick={() => dialogRef.current.showModal()}>
            New photo
          </button>
        </div>
      </div>

      <dialog ref={dialogRef} className={styles.dialog}>
        <h3>Upload New Photo</h3>
        <input type="file" onChange={handleFileChange} />
        <div className={styles.dialog_buttons}>
          <button onClick={handleSave} disabled={!file}>
            Upload
          </button>
          <button onClick={() => dialogRef.current.close()}>Cancel</button>
        </div>
      </dialog>

      <div className={styles.input_wrapper}>
        <h4>Username</h4>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div className={styles.input_wrapper}>
        <h4>Password</h4>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className={styles.input_wrapper}>
        <h4>Website</h4>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
      </div>
      <div className={styles.input_wrapper}>
        <h4>About</h4>
        <input
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
      </div>
      <div className={styles.btn_save}>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default EditProfile;
