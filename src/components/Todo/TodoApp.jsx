import { useEffect, useState } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedTasks = localStorage.getItem("todoTasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
      dueDate: dueDate
    };

    setTasks([...tasks, newTask]);
    setInput("");
    setDueDate("");
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  const editTask = (id) => {
    const task = tasks.find(
      (task) => task.id === id
    );

    const newText = prompt(
      "Edit your task:",
      task.text
    );

    if (
      newText === null ||
      newText.trim() === ""
    ) {
      return;
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          text: newText
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "pending") {
      return !task.completed;
    }

    return true;
  });

  return (
    <div>
      <h2>My Tasks</h2>

      <input
        type="text"
        placeholder="Enter a task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button onClick={addTask}>
        Add Task
      </button>

      <p>Total tasks: {tasks.length}</p>

      <div>
        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed
                  ? "line-through"
                  : "none"
              }}
            >
              {task.text}
            </span>

            {task.dueDate && (
              <span>
                {" | Due: "}
                {task.dueDate}
              </span>
            )}

            <button
              onClick={() => toggleTask(task.id)}
            >
              {task.completed
                ? "Undo"
                : "Complete"}
            </button>

            <button
              onClick={() => editTask(task.id)}
            >
              Edit
            </button>

            <button
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>

            <strong>
              {task.completed
                ? " Completed"
                : " Pending"}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;