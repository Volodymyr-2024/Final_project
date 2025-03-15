import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export const getData = (date) => {
  const createdAt = new Date(date);
  const now = new Date();
  const timeDiff = now - createdAt;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  let timeString = "";
  if (days > 0) {
    timeString = days === 1 ? "1 day" : `${days} days`;
  } else if (hours > 0) {
    timeString = hours === 1 ? "1 h" : `${hours} h`;
  } else if (minutes > 0) {
    timeString = minutes === 1 ? "1 min" : `${minutes} min`;
  } else {
    timeString = seconds === 1 ? "1 sec" : `${seconds} sec`;
  }
  return timeString;
};

export const registerUser = async (userdata) => {
  try {
    const response = await api.post("/auth/register", userdata);
    return response.data;
  } catch (error) {
    console.error("Error of regisration:", error.response || error);
    throw new Error(
      error.response?.data?.message || error.message || "Error of regisration"
    );
  }
};

export const loginUser = async (userdata) => {
  try {
    const response = await api.post("/auth/login", userdata);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "Unknown error";
  }
};

export const resetPassword = async (userdata) => {
  try {
    const response = await api.post("/auth/reset", userdata);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "Unknown error";
  }
};

export const fetchFourPosts = async (page) => {
  try {
    const response = await api.get(`/posts/fourposts?page=${page}`);
    const posts = response.data.map((post) => ({
      authorImage: post._doc.author.profileImage,
      author: post._doc.author.username,
      image: post._doc.image,
      description: post._doc.description,
      createdAt: post._doc.createdAt,
      updatedAt: post._doc.updatedAt,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
    }));
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error.response?.data || error.message || "Unknown error";
  }
};

export const getNotifications = async () => {
  try {
    const response = await api.get("/notifications");
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error.response || error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error fetching notifications"
    );
  }
};

export const getUserData = async (userId) => {
  try {
    const response = await api.get(`/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error.response || error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error fetching user data"
    );
  }
};

export const getUserPost = async (userId, token) => {
  try {
    const response = await api.get(`/posts`, {
      params: {
        author: userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const getPostById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

export const getFollowers = async (userId) => {
  try {
    const response = await api.get(`/followers/${userId}/followers`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch followers: " + error.message);
  }
};

export const getFollowing = async (userId) => {
  try {
    const response = await api.get(`/followers/${userId}/following`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch following: " + error.message);
  }
};

export const updateUser = async (formData, token) => {
  try {
    const response = await api.put(`/profile/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error.response || error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Error updating user data"
    );
  }
};

export const getCommentByPostId = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch comments"
    );
  }
};

export const getLikesUsersByPostId = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/likes-per-users`);
    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error.response || error);
    return;
  }
};
export const getCommentsUsersByPostId = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data.map((comment) => ({
      ...comment,
      user: comment.user,
      image: comment.image,
    }));
  } catch (error) {
    console.error("Error fetching comments:", error.response || error);
    return [];
  }
};

export const addComment = async (userId, postId, text) => {
  try {
    const response = await api.post("/posts/comment", {
      userId,
      postId,
      text,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error.response || error);
    throw error;
  }
};

export const toggleLike = async (userId, postId) => {
  try {
    const response = await api.post("/posts/like", { userId, postId });
    return response.data;
  } catch (error) {
    console.error("Error toggling like:", error.response || error);
    throw error;
  }
};
export const checkUserLike = async (userId, postId) => {
  try {
    const response = await api.post("/posts/likes/check", { userId, postId });
    return response.data;
  } catch (error) {
    console.error("Error checking like:", error.response || error);
    throw error;
  }
};
