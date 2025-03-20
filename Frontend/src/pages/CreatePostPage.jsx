import CreatePost from "../components/CreatePost/CreatePost";
import ProfilePage from "./ProfilePage";
import "../App.css";

function CreatePostPage(props) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.65)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
      />
      <div style={{ zIndex: 1 }}>
        <ProfilePage />
      </div>
      <div className="create_post_container">
        <CreatePost />
      </div>
    </div>
  );
}

export default CreatePostPage;
