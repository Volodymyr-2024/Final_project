import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ResetPage from "./pages/ResetPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import NotificationsPage from "./pages/NotificationsPage";
import ExplorePage from "./pages/ExplorePage";
import NotFoundPage from "./pages/NotFoundPage";
import EdirProfilePage from "./pages/EdirProfilePage";
import BackMenu from "./components/BackMenu/BackMenu";
import Footer from "./components/Footer/Footer";
import CreatePostPage from "./pages/CreatePostPage";
import OtherProfilePage from "./pages/OtherProfilePage";

function App() {
  const location = useLocation();
  const hideLayoutPages = ["/register", "/login", "/reset"];
  const hideLayout = hideLayoutPages.includes(location.pathname);

  return (
    <div className="wrapper">
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset" element={<ResetPage />} />
      </Routes>
      {!hideLayout && (
        <div className="main-content">
          <div className="sidebar">
            <BackMenu />
          </div>
          <div className="content">
            <Routes>
              <Route path="/main" element={<MainPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/create" element={<CreatePostPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/other-profile/:id" element={<OtherProfilePage />} />
              <Route path="/edit-profile/:id" element={<EdirProfilePage />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      )}
      {!hideLayout && <Footer className="footer" />}
    </div>
  );
}

export default App;
