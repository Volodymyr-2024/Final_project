import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

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
    console.log(posts);
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
