import axios from "axios";
import { getCachedData, setCachedData } from "../services/cache.service.js";

const POSTS_PER_PAGE = 10;
const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const cacheKey = `posts:page:${page}`;

    // Try to get data from cache
    const cachedPosts = await getCachedData(cacheKey);
    if (cachedPosts) {
      return res.json(cachedPosts);
    }

    // If not in cache, fetch from API
    const response = await axios.get(API_URL);
    const allPosts = response.data;

    // Implement pagination
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const paginatedPosts = allPosts.slice(startIndex, endIndex);

    const result = {
      posts: paginatedPosts,
      currentPage: page,
      totalPages: Math.ceil(allPosts.length / POSTS_PER_PAGE)
    };

    // Cache the result
    await setCachedData(cacheKey, result);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
