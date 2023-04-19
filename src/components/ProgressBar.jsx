import { useState, useEffect } from "react";
import "./ProgressBar.css";

const FETCH_TASKS = "https://jsonplaceholder.typicode.com/todos";

function ProgressBar() {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState(0);

  const fetchTodos = async () => {
    const res = await fetch(FETCH_TASKS);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    let count = 0;
    for (let todo of todos) {
      if (todo.completed) count++;
    }
    setCompleted(count);
  }, [todos]);

  const handleChange = (event) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === Number(event.target.id)
          ? { ...todo, completed: !todo.completed }
          : todo;
      })
    );
  };

  return (
    <div className="conatiner">
      <div className="progress-container">
        <h1>Progress</h1>
        <h2>
          {completed} tasks completed out of {todos.length}
        </h2>
        <div className="progress-bar">
          <div
            style={{
              borderRadius: "5px",
              width: `${(completed / todos.length) * 100}%`,
              height: "100%",
              background: "lightblue",
              fontWeight: 600
            }}
          >
            {Math.floor((completed / todos.length) * 100)}%
          </div>
        </div>
      </div>
      <div className="question-container">
        {todos.map((todo) => {
          return (
            <div
              key={todo.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleChange}
                id={todo.id}
              />
              <label>{todo.title}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;
