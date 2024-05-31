import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
          <div className="text-2xl font-bold">
            <Link to="/">SafePath</Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to="/sign-in"
                className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
              >
                Sign In
              </Link>
            </motion.div>
          </nav>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-blue-600 text-white px-4 pt-2 pb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    to="/"
                    className="block py-2 text-center hover:underline"
                  >
                    Home
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    to="/about"
                    className="block py-2 text-center hover:underline"
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    to="/features"
                    className="block py-2 text-center hover:underline"
                  >
                    Features
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    to="/contact"
                    className="block py-2 text-center hover:underline"
                  >
                    Contact
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    to="/sign-in"
                    className="block py-2 text-center bg-green-500 rounded hover:bg-green-600"
                  >
                    Sign In
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <motion.section
        className="bg-gray-100 py-16 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            Welcome to SafePath
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            The SafePath Platform is designed to unify road safety and incident
            management through a comprehensive web-based platform.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <Link
              to="/signup"
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <div className="container mx-auto text-center px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold">Features</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="bg-white shadow-md rounded-lg p-4"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <i className="fas fa-bell text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-bold">
                Real-time Incident Reporting
              </h3>
              <p className="mt-2">
                Report and receive updates on incidents in real-time.
              </p>
            </motion.div>
            <motion.div
              className="bg-white shadow-md rounded-lg p-4"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <i className="fas fa-tachometer-alt text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-bold">User-Friendly Dashboard</h3>
              <p className="mt-2">
                Manage your reports and view statistics with ease.
              </p>
            </motion.div>
            <motion.div
              className="bg-white shadow-md rounded-lg p-4"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <i className="fas fa-book text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-bold">Educational Resources</h3>
              <p className="mt-2">
                Access a wealth of road safety educational materials.
              </p>
            </motion.div>
            <motion.div
              className="bg-white shadow-md rounded-lg p-4"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <i className="fas fa-chart-line text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-bold">Advanced Analytics</h3>
              <p className="mt-2">
                View and analyze incident trends and statistics.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="bg-gray-100 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <div className="container mx-auto text-center px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold">How It Works</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold">1. Sign Up</h3>
              <p className="mt-2">
                Create your account and join the community.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold">2. Report an Incident</h3>
              <p className="mt-2">Easily report incidents you encounter.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold">3. Stay Informed</h3>
              <p className="mt-2">
                Receive updates and notifications about incidents.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold">4. Access Resources</h3>
              <p className="mt-2">
                Learn from our comprehensive educational materials.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <div className="container mx-auto text-center px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold">
            What Our Users Say
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white shadow-md rounded-lg p-4"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <p>
                &quot;SafePath has transformed how I stay informed about road
                safety. Highly recommended!&quot;
              </p>
              <p className="mt-4 font-bold">- John Doe</p>
            </motion.div>
            <motion.div
              className="bg-white shadow-md rounded-lg p-4"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <p>
                &quot;The educational resources on SafePath are top-notch and
                very informative.&quot;
              </p>
              <p className="mt-4 font-bold">- Jane Smith</p>
            </motion.div>
            <motion.div
              className="bg-white shadow-md rounded-lg p-4"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <p>
                &quot;I love the real-time incident reporting feature. It&apos;s
                a game-changer.&quot;
              </p>
              <p className="mt-4 font-bold">- Bob Johnson</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="bg-blue-600 text-white py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Join the SafePath Community
          </h2>
          <p className="mt-4">
            Sign up now and help make our roads safer for everyone.
          </p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <Link
              to="/signup"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-200"
            >
              Sign Up Now
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center px-4 md:px-8">
          <div className="mb-4">
            <Link to="/privacy" className="hover:underline mr-4">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </div>
          <div className="mb-4">
            <a href="#" className="hover:underline mr-4">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:underline mr-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:underline">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <p>&copy; 2024 SafePath. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
