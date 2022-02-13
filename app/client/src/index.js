import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './components/app/App';
import Users from './components/user/Users';
import TodoListsWrapper from './components/todolist/TodoListsWrapper';
import TasksWrapper from './components/task/TasksWrapper';
import reportWebVitals from './reportWebVitals';

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="users" element={<Users />} />
      <Route path="users/:userId/todolists" element={<TodoListsWrapper />} />
      <Route path="users/:userId/todolists/:todolistId/tasks" element={<TasksWrapper />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
