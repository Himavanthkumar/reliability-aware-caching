import { dbService } from "./db";

const API_BASE_URL = "http://localhost:3000/api";

export const fetchPosts = async (page = 1) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?page=${page}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    // Cache the fetched posts
    await Promise.all(data.posts.map(post => dbService.savePost(post, page)));

    return data;
  } catch (error) {
    console.log("Falling back to cached data...");
    const cachedPosts = await dbService.getPostsByPage(page);

    if (cachedPosts && cachedPosts.length > 0) {
      return {
        posts: cachedPosts,
        currentPage: page,
        // Estimate total pages based on cached data
        totalPages: Math.ceil((await dbService.getAllPosts()).length / 10)
      };
    }
    throw new Error("No cached data available");
  }
};
