import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src="../public/images/logo.webp"
            alt="SafePath Logo"
            className="h-16 mb-4 rounded-lg"
          />
          <span className="self-center ">
            <h2 className="text-2xl font-bold">Create an account</h2>
          </span>
        </div>
        <form className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700">Name*</label>
            <input
              type="username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Surname*</label>
            <input
              type="username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your surname"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email*</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password*</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4"></div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <Link to="/sign-in" className="text-pink-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
