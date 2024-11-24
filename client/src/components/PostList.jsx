import { useRef, useCallback } from "react";
import PostCard from "./PostCard";
import { usePosts } from "../hooks/usePosts";

const PostList = () => {
  const { posts, loading, error, hasMore, loadMore } = usePosts();
  const observer = useRef();

  const lastPostRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {posts.map((post, index) => (
        <div
          ref={index === posts.length - 1 ? lastPostRef : null}
          key={post.id}
          className="flex"
        >
          <PostCard post={post} />
        </div>
      ))}
      {loading && <div className="text-center col-span-full">Loading...</div>}
    </div>
  );
};

export default PostList;
