import { useState } from "react";
import { addComment } from "../../constants/api";
import styles from "./AddComments.module.css";
import img_comments from "../../assets/img_comment.svg";

function AddComments({ postId, onCommentAdded }) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("A comment cannot be empty");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await addComment(userId, postId, text);
      onCommentAdded(response.comment);
      setText("");
    } catch (error) {
      setError(
        `Failed to add comment. Please try again. Error: ${error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <img src={img_comments} alt="icon_comment" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default AddComments;
