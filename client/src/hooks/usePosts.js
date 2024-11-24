import { useState, useEffect } from "react";
import { fetchPosts } from "../services/api";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts(page);
      setPosts(prev => [...prev, ...data.posts]);
      setHasMore(page < data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return { posts, loading, error, hasMore, loadMore };
};
