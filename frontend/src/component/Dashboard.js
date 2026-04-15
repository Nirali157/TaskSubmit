import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

    const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  
  const token = localStorage.getItem("token");

const fetchTasks = useCallback(async () => {
    const res = await axios.get("http://localhost:5000/tasks", {
      headers: { Authorization: token }
    });
    setTasks(res.data);
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async () => {
    if (!title) return;

    await axios.post(
      "http://localhost:5000/tasks",
      { title },
      { headers: { Authorization: token } }
    );

    setTitle("");
    fetchTasks();
  };

  const updateTask = async (id) => {
  await axios.put(
    `http://localhost:5000/tasks/${id}`,
    { title: editText },
    { headers: { Authorization: token } }
  );

  setEditId(null);
  setEditText("");
  fetchTasks();
};

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`, {
      headers: { Authorization: token }
    });
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(
      `http://localhost:5000/tasks/${task._id}`,
      { completed: !task.completed },
      { headers: { Authorization: token } }
    );
    fetchTasks();
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Task Dashboard</h2>

      <div className="input-group mb-3">
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>
      </div>

      <select
        className="form-select mb-3"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>

      {filteredTasks.map((task) => (
  <div
    key={task._id}
    className="card p-3 mb-2 d-flex flex-row justify-content-between align-items-center shadow-sm"
  >
    {editId === task._id ? (
      <>
        <input
          className="form-control me-2"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />

        <button
          className="btn btn-success btn-sm me-2"
          onClick={() => updateTask(task._id)}
        >
          Save
        </button>
      </>
    ) : (
      <>
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none"
          }}
        >
          {task.title}
        </span>

        <div>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => {
              setEditId(task._id);
              setEditText(task.title);
            }}
          >
            Edit
          </button>

          <button
            className="btn btn-success btn-sm me-2"
            onClick={() => toggleTask(task)}
          >
            ✓
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteTask(task._id)}
          >
            Delete
          </button>
        </div>
      </>
    )}
  </div>
))}
    </div>
  );
}

export default Dashboard;