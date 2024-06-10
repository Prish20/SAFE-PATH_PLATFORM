import TeamMember from "./TeamMember";
import ContactForm from "./ContactForm";
import Header from "../components/Header";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="p-4 mt-20 max-w-screen-lg mx-auto min-h-screen">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 text-center">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300">
              At SafePath, our mission is to enhance road safety through
              innovative technology and community engagement. We are committed
              to providing the best tools and resources to keep you safe on the
              road.
            </p>
          </section>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mt-3 text-center">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our vision is to become the leading platform for road safety,
              leveraging data and technology to prevent accidents and save
              lives.
            </p>
          </section>
        </div>

        <section className="mb-8 mt-6">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TeamMember
              name="John Doe"
              position="CEO"
              image="https://via.placeholder.com/150"
              description="John leads the company with over 20 years of experience in the tech industry."
            />
            <TeamMember
              name="Jane Smith"
              position="CTO"
              image="https://via.placeholder.com/150"
              description="Jane is the brain behind our technology, ensuring our platform is always ahead of the curve."
            />
            <TeamMember
              name="Mike Johnson"
              position="COO"
              image="https://via.placeholder.com/150"
              description="Mike oversees our operations, making sure everything runs smoothly."
            />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold text-center">Contact Us</h2>
          <ContactForm />
        </section>
      </div>
    </>
  );
};

export default AboutUs;
