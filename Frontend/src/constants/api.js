import axios from "axios";

const api = axios.create({
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
