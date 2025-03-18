import styles from "./ModalWindow.module.css";
import { deletePost } from "../../constants/api";
import EditPostModal from "../EditPostModal/EditPostModal";
import { useState } from "react";

function ModalWindow({
  closeModal,
  postId,
  onPostDelete,
  post,
  onUpdate,
  update,
}) {
  const postUrl = `${window.location.origin}/posts/${postId}`;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
    setIsEditModalOpen(true);
  };

  const handleGoToPost = () => {
    window.open(postUrl, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      alert("The link has been copied!");
    });
  };

  return (
    <div className={styles.modal_window}>
      <p onClick={handleDelete}>Delete</p>
      <p onClick={handleEdit}>Edit</p>
      <p onClick={handleGoToPost}>Go to post</p>
      <p onClick={handleCopyLink}>Copy link</p>
      <p onClick={closeModal}>Cancel</p>

      {isEditModalOpen && (
        <EditPostModal
          postId={postId}
          initialDescription={post.description}
          initialImage={post.image}
          onClose={() => {
            setIsEditModalOpen(false);
            closeModal();
          }}
          onUpdate={onUpdate}
          update={update}
        />
      )}
    </div>
  );
}

export default ModalWindow;
