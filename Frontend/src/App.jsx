import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/reset" element={<ResetPage />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/notifications" element={<NotificationsPage />}></Route>
        <Route path="/explore" element={<ExplorePage />}></Route>
        <Route path="/profile/:id" element={<ProfilePage />}></Route>
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
