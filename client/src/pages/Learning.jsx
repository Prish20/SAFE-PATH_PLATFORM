import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { Button, Modal } from "flowbite-react";
import ResponsiveHeader from "../components/ResponsiveHeader";
import useWindowSize from "../Hooks/useWindowSize";
import { useSelector } from "react-redux";
import ResponsiveNav from "../components/ResponsiveNav";


export default function LearningPage() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const size = useWindowSize();


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/post/getposts", {
          params: {
            limit: 12,
            order: "desc",
          },
        });
        if (Array.isArray(res.data.posts)) {
          setPosts(res.data.posts);
        } else {
          console.error("Fetched data is not an array:", res.data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleReadMore = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="p-4 max-w-screen-lg mx-auto min-h-screen">
      <div className="mb-5">
        {size.width < 768 && (currentUser.isAdmin ? <ResponsiveNav /> : <ResponsiveHeader />)}
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Eucational Posts</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className=" max-h-[calc(100vh-150px)] overflow-y-auto scrollbar-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <motion.div
                  key={post._id}
                  className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4 relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-40 object-cover rounded-lg mb-2"
                      />
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                      <div
                        className="text-gray-700 dark:text-gray-300 mb-2"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            post.content.slice(0, 100) + "..."
                          ), // Show a snippet of the content
                        }}
                      ></div>
                      <p className="text-gray-500 dark:text-gray-400 mb-2">
                        <strong>Category:</strong> {post.category}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 mb-2">
                        <strong>Date:</strong>{" "}
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </p>
                      <Button
                        size="lg"
                        className="absolute bottom-2 right-8 outline text-red-500"
                        onClick={() => handleReadMore(post)}
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500">No posts available</p>
            )}
          </div>
        </div>
      </div>
      {selectedPost && (
        <Modal show={true} onClose={handleCloseModal} size="lg">
          <Modal.Header className="m-8 self-center">{selectedPost.title}</Modal.Header>
          <Modal.Body className="m-8">
            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
            )}
            <div
              className="text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(selectedPost.content),
              }}
            ></div>
            <p className="text-gray-500 dark:text-gray-400 mt-4">
              <strong>Category:</strong> {selectedPost.category}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              <strong>Date:</strong>{" "}
              {new Date(selectedPost.updatedAt).toLocaleDateString()}
            </p>
          </Modal.Body>
          <Modal.Footer className="ml-8 mb-4">
            <Button onClick={handleCloseModal} className="outline text-red-500">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
