import React, { useState, useEffect } from 'react';
import './App.css';
//Importing Components
import Form from "./components/Form"
import TodoList from "./components/TodoList"

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Save to local 
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  useEffect(() => {
    //console.log('useEffect called.');
    getLocalTodos();
  }, []);
  useEffect(() => {
    //console.log('useEffect called.');
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'Incompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Akash's Todo List</h1>
      </header>
      <Form setInputText={setInputText} inputText={inputText} todos={todos} setTodos={setTodos} status={status} setStatus={setStatus} />
      <TodoList todos={filteredTodos} setTodos={setTodos} />
    </div>
  );
}

export default App;
