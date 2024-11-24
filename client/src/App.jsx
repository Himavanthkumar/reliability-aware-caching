import PostList from "./components/PostList";
import NetworkStatus from "./components/NetworkStatus";
const App = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <PostList />
      <NetworkStatus />
    </main>
  );
};

export default App;
