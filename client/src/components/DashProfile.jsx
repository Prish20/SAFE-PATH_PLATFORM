import { Alert, Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

export default function DashProfile() {
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(false);
  const [updateUserError, setUpdateUserError] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made!");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.user));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully!");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
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
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign OUt</span>
      </div>
      {updateUserSuccess && (
        <Alert type="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert type="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
    </div>
  );
}
