const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md h-full transition-all hover:shadow-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-600 line-clamp-3">{post.body}</p>
      </div>
    </div>
  );
};

export default PostCard;
