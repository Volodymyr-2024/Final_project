import { useState, useEffect } from "react";
import styles from "./EditPostModal.module.css";
import { updatePost } from "../../constants/api";

function EditPostModal({
  postId,
  initialDescription,
  initialImage,
  onClose,
  onUpdate,
}) {
  const [description, setDescription] = useState(initialDescription);
  const [image, setImage] = useState(initialImage);
  const [newImage, setNewImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (image && image.startsWith("blob:")) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      setError("Description cannot be empty.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("description", description);
      if (newImage) {
        formData.append("image", newImage);
      }

      const response = await updatePost(postId, formData);
      onUpdate(response);
      onClose();
    } catch (error) {
      setError(`Failed to update post. Please try again., ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modal_background}>
      <div className={styles.modal_content}>
        <h2>Edit Post</h2>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.form_group}>
          <label>Description</label>
          <textarea value={description} onChange={handleDescriptionChange} />
        </div>
        <div className={styles.form_group}>
          <label>Image</label>
          <input type="file" onChange={handleImageChange} />
          {image && (
            <img
              src={image}
              alt="Current post"
              className={styles.current_image}
            />
          )}
        </div>
        <div className={styles.buttons}>
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditPostModal;
