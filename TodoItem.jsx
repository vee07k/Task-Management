import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <h3>{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
        <small>{new Date(todo.created_at).toLocaleString()}</small>
      </div>
      <div className="todo-actions">
        <button 
          onClick={() => onToggle(todo.id)}
          className={`toggle-btn ${todo.completed ? 'completed' : ''}`}
        >
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button 
          onClick={() => onDelete(todo.id)}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;