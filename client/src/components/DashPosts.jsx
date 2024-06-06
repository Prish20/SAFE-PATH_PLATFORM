import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  
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

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-4">
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <div className="shadow-md sm:rounded-lg max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
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
                <button
                  className="text-blue-600 hover:text-blue-900 hover:underline"
                  onClick={() => {
                    setShowModal(true);
                    setPostIdToDelete(post._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-2xl text-center">No Posts</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
        className="mx-auto self-center"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="text-red-600" onClick={handleDeletePost}>
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
