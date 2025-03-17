import s from "./UsersComment.module.css";
import heart from "../../assets/heart_like.svg";
import heartFilled from "../../assets/heart_like_red.svg";

function UsersComment({ image, username, text, likeCount, createdAt, like }) {
  return (
    <div className={s.wrapper}>
      <div className={s.image_wrapper}>
        <img src={image || "default-image.png"} alt="img_user" />
      </div>
      <div className={s.content_wrapper}>
        <div className={s.username_text}>
          <h4>{username || "Unknown User"}</h4>
          <p>{text}</p>
        </div>
        <div className={s.likes}>
          <span>{createdAt}</span>
          <span>Likes: {likeCount}</span>
        </div>
      </div>
      <div className={s.img_likes}>
        <img src={like ? heartFilled : heart} alt="img_like" />
      </div>
    </div>
  );
}

export default UsersComment;
