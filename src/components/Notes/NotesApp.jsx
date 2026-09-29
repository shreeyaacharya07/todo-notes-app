import { useEffect, useState } from "react";

function NotesApp() {
  const [notes, setNotes] = useState(function () {
    const savedNotes = localStorage.getItem("notesData");

    if (savedNotes) {
      return JSON.parse(savedNotes);
    }

    return [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("College");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(function () {
    localStorage.setItem("notesData", JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    if (title.trim() === "" && content.trim() === "") {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
      category: category,
      createdAt: new Date().toLocaleString()
    };

    setNotes(function (previousNotes) {
      return [...previousNotes, newNote];
    });

    setTitle("");
    setContent("");
    setCategory("College");
  }

  function editNote(note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category || "College");
  }

  function updateNote() {
    if (title.trim() === "" && content.trim() === "") {
      return;
    }

    const updatedNotes = notes.map(function (note) {
      if (note.id === editingId) {
        return {
          ...note,
          title: title,
          content: content,
          category: category
        };
      }

      return note;
    });

    setNotes(updatedNotes);
    setEditingId(null);
    setTitle("");
    setContent("");
    setCategory("College");
  }

  function deleteNote(id) {
    const updatedNotes = notes.filter(function (note) {
      return note.id !== id;
    });

    setNotes(updatedNotes);
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setContent("");
    setCategory("College");
  }

  const filteredNotes = notes.filter(function (note) {
    const searchText = search.toLowerCase();

    return (
      note.title.toLowerCase().includes(searchText) ||
      note.content.toLowerCase().includes(searchText) ||
      (note.category || "").toLowerCase().includes(searchText)
    );
  });

  return (
    <div>
      <h2>My Notes</h2>

      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={function (e) {
          setSearch(e.target.value);
        }}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={function (e) {
          setTitle(e.target.value);
        }}
      />

      <br />
      <br />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={function (e) {
          setContent(e.target.value);
        }}
      />

      <br />
      <br />

      <select
        value={category}
        onChange={function (e) {
          setCategory(e.target.value);
        }}
      >
        <option value="College">College</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Other">Other</option>
      </select>

      <br />
      <br />

      {editingId === null ? (
        <button onClick={addNote}>
          Add Note
        </button>
      ) : (
        <div>
          <button onClick={updateNote}>
            Update Note
          </button>

          <button onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      )}

      <hr />

      <div>
        {filteredNotes.map(function (note) {
          return (
            <div key={note.id}>
              <h3>{note.title}</h3>

              <p>{note.content}</p>

              <p>
                <strong>Category:</strong>{" "}
                {note.category || "Other"}
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {note.createdAt || "Previously created"}
              </p>

              <button
                onClick={function () {
                  editNote(note);
                }}
              >
                Edit
              </button>

              <button
                onClick={function () {
                  deleteNote(note.id);
                }}
              >
                Delete
              </button>

              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NotesApp;