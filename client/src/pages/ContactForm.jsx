import { useState } from "react";
import { TextInput, Textarea, Button } from "flowbite-react";
import Header from "../components/Header";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form data:", formData);
  };

  return (
    <>
      <Header />
      <form className="flex flex-col gap-4 mt-20" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          name="name"
          required
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="p-4 text-center placeholder-center m-5"
        />
        <TextInput
          type="email"
          name="email"
          required
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-4 text-center placeholder-center m-5"
        />
        <Textarea
          name="message"
          required
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="p-4 text-center placeholder-center m-5 w-108 h-40"
        />
        <Button type="submit" className="mx-auto font-bold bg-black">
          Send Message
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
