import { useLocation } from "react-router-dom";
import styles from "./ModalWindow.module.css";
import { deletePost } from "../../constants/api";

function ModalWindow({ closeModal, postId, onPostDelete }) {
  const location = useLocation();
  const postUrl =
    window.location.origin + location.pathname + `?postId=${postId}`;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const token = localStorage.getItem("token");
        const result = await deletePost(postId, token);
        alert(result.message || "Post successfully deleted");
        closeModal();
        if (onPostDelete) {
          onPostDelete();
        }
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const handleEdit = () => {
    console.log("Editing post");
    closeModal(false);
  };

  const handleGoToPost = () => {
    window.open(postUrl, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      alert("Ссылка скопирована!");
    });
    closeModal(false);
  };

  return (
    <div className={styles.modal_window}>
      <p onClick={handleDelete}>Delete</p>
      <p onClick={handleEdit}>Edit</p>
      <p onClick={handleGoToPost}>Go to post</p>
      <p onClick={handleCopyLink}>Copy link</p>
      <p
        onClick={() => {
          closeModal(false);
        }}
      >
        Cancel
      </p>
    </div>
  );
}

export default ModalWindow;
