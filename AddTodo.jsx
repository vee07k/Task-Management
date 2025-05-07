import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './AddTodo.css';

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const newTodo = {
        title: title.trim(),
        description: description.trim(),
        completed: false
      };

      const response = await axios.post('http://localhost:8000/api/todos/', newTodo);
      onAdd(response.data);
      
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="add-todo-form"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="todo-description"
          rows="2"
        />
      </div>
      <motion.button 
        type="submit" 
        className="add-btn"
        disabled={isSubmitting || !title.trim()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </motion.button>
    </motion.form>
  );
};

export default AddTodo;