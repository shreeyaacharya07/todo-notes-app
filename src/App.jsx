import TodoApp from "./components/Todo/TodoApp";
import NotesApp from "./components/Notes/NotesApp";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>To-Do App + Notes App</h1>

        <p className="subtitle">
          Manage your tasks and notes
        </p>

        <TodoApp />

        <hr />

        <NotesApp />
      </div>
    </div>
  );
}

export default App;