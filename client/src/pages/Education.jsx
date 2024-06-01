import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEducationalContent, addEducationalContent, deleteEducationalContent } from '../redux/education/educationalContentSlice.js';
// import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {  Button, Modal, TextInput, Textarea, Select, FileInput } from 'flowbite-react';

const EducationalContent = () => {
  const dispatch = useDispatch();
  const educationalContent = useSelector((state) => state.educationalContent);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    type: 'article',
    category: 'road safety tips',
    file: null,
  });

  useEffect(() => {
    dispatch(fetchEducationalContent());
  }, [dispatch]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setNewContent((prevState) => ({
      ...prevState,
      [id]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEducationalContent(newContent));
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Educational Content</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add New Content</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {educationalContent.items.map((content) => (
          <motion.div
            key={content.id}
            className="bg-white shadow-md rounded-lg p-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold">{content.title}</h2>
            <p>{content.description}</p>
            <p className="text-sm text-gray-600">{content.category}</p>
            <p className="text-sm text-gray-600">{content.type}</p>
            <div className="flex justify-end mt-4">
              <Button size="xs" color="failure" onClick={() => dispatch(deleteEducationalContent(content.id))}>Delete</Button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Add New Educational Content</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <TextInput id="title" placeholder="Title" required onChange={handleChange} />
            </div>
            <div className="mb-4">
              <Textarea id="description" placeholder="Description" required onChange={handleChange} />
            </div>
            <div className="mb-4">
              <Select id="type" required onChange={handleChange}>
                <option value="article">Article</option>
                <option value="video">Video</option>
              </Select>
            </div>
            <div className="mb-4">
              <Select id="category" required onChange={handleChange}>
                <option value="road safety tips">Road Safety Tips</option>
                <option value="incident management">Incident Management</option>
              </Select>
            </div>
            <div className="mb-4">
              <FileInput id="file" required onChange={handleChange} />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EducationalContent;
