import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser?._id, currentUser?.isAdmin]);

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-2">
      {currentUser?.isAdmin && users.length > 0 ? (
        <div className="shadow-md sm:rounded-lg max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
          <div className="hidden md:grid grid-cols-6 bg-gray-50 dark:bg-gray-700 text-xs text-gray-700 font-bold uppercase dark:text-gray-400">
            <div className="px-4 py-3">Date created</div>
            <div className="px-4 py-3">User Image</div>
            <div className="px-4 py-3">Username</div>
            <div className="px-4 py-3">Email</div>
            <div className="px-4 py-3">Admin</div>
            <div className="px-4 py-3">Delete</div>
          </div>
          <AnimatePresence>
            {users.map((user) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="md:grid md:grid-cols-6 gap-4 p-4 border-b dark:bg-gray-800 dark:border-gray-700 flex flex-col"
              >
                <div className="md:col-span-1">
                  <div className="text-xs md:text-base text-gray-500 dark:text-gray-400">
                    Date Created
                  </div>
                  <div>{new Date(user.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="md:col-span-1">
                  <div className="text-xs md:text-base text-gray-500 dark:text-gray-400 mx-auto">
                    User Image
                  </div>
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="w-10 rounded-full"
                  />
                </div>
                <div className="md:col-span-1">
                  <div className="text-xs md:text-base text-gray-500 dark:text-gray-400">
                    Username
                  </div>
                  <div>{user.username}</div>
                </div>
                <div className="md:col-span-1">
                  <div className="text-xs md:text-base text text-gray-500 dark:text-gray-400">
                    Email
                  </div>
                  <div>{user.email}</div>
                </div>
                <div className="md:col-span-1 flex items-center">
                  <div className="text-xs md:text-base text-gray-500 dark:text-gray-400">
                    Admin
                  </div>
                  {user.isAdmin ? (
                    <FaCheck className="text-green-500 ml-2" />
                  ) : (
                    <FaTimes className="text-red-500 ml-2" />
                  )}
                </div>
                <div className="md:col-span-1">
                  <div className="text-xs md:text-base text-gray-500 dark:text-gray-400">
                    Delete
                  </div>
                  <button
                    className="text-blue-600 hover:text-blue-900 hover:underline"
                    onClick={() => {
                      setShowModal(true);
                      setUserIdToDelete(user._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p className="text-2xl text-center">No Users</p>
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="text-red-600" onClick={handleDeleteUser}>
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
