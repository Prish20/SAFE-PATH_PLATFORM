import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Updated user data:", formData);
  };

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
          />
        </div>
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          className="rounded-full border-2 border-gray-300 text-center shadow-md w-full box-border"
        />
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          className="rounded-full border-2 border-gray-300 text-center shadow-md w-full box-border"
        />
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          className="rounded-full border-2 border-gray-300 text-center shadow-md w-full box-border"
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          className="rounded-full"
        >
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
