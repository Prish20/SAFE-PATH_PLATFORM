import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/post/getposts?userId=${currentUser?._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser?.isAdmin) {
      fetchPosts();
    }
  }, [currentUser?._id, currentUser?.isAdmin]);

  return (
    <div className="p-4">
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <div className="shadow-md sm:rounded-lg max-h-screen overflow-y-scroll">
          <div className="hidden md:grid grid-cols-6 bg-gray-50 dark:bg-gray-700 text-xs text-gray-700 font-bold uppercase dark:text-gray-400">
            <div className="px-4 py-3">Date updated</div>
            <div className="px-4 py-3">Post Image</div>
            <div className="px-4 py-3">Post Title</div>
            <div className="px-4 py-3">Category</div>
            <div className="px-4 py-3">Delete</div>
            <div className="px-4 py-3">Edit</div>
          </div>
          {userPosts.map((post) => (
            <div
              key={post.id}
              className="md:grid md:grid-cols-6 gap-4 p-4 border-b dark:bg-gray-800 dark:border-gray-700 flex flex-col"
            >
              <div className="md:col-span-1">
                <div className="text-xs md:text-base text-gray-500 dark:text-gray-400">
                  Date updated
                </div>
                <div>{new Date(post.updatedAt).toLocaleDateString()}</div>
              </div>
              <div className="md:col-span-1">
                <Link to={`/post/${post.slug}`}>
                  <div className="text-xs md:text-base text-gray-500 dark:text-gray-400 mx-auto">
                    Post Image
                  </div>
                  <img
                    src={post.image}
                    alt="post"
                    className="w-full h-20 object-cover"
                  />
                </Link>
              </div>
              <div className="md:col-span-1">
                <Link to={`/post/${post.slug}`}>
                <div className="text-xs md:text-base text-gray-500 dark:text-gray-400">
                  Post Title
                </div>
                <div>{post.title}</div>
                </Link>
              </div>
              <div className="md:col-span-1">
                <Link to={`/post/${post.slug}`}>
                <div className="text-xs md:text-base text-gray-500 dark:text-gray-400">
                  Category
                </div>
                <div>{post.category}</div>
                </Link>
              </div>
              <div className="md:col-span-1">
                <div className="text-xs md:text-base text-gray-500 dark:text-gray-400">
                  Edit
                </div>
                <Link to={`/update-post/${post._id}`}>
                <button className="text-red-600 hover:text-red-900 hover:underline">
                  Edit
                </button>
                </Link>
              </div>
              <div className="md:col-span-1">
                <div className="text-xs md:text-base text-gray-500 dark:text-gray-400">
                  Delete
                </div>
                <button className="text-blue-600 hover:text-blue-900 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-2xl text-center">No Posts</p>
      )}
    </div>
  );
}
