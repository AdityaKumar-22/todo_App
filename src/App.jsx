import { useState, useEffect } from "react";
// import './App.css'
import Navbar from "./components/Navbar";
import Task from "./components/Task";
import { v4 as uuidv4 } from "uuid";
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  //1. Create state variables todo , taskList and showFinish and load tasks from local storage using useEffect
  // task= {id:uuidv4(), todo: 'Task 1', isCompleted: false, isEditing: false}
  const [todo, setTodo] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [showFinish, setShowFinish] = useState(true);
  useEffect(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      setTaskList(JSON.parse(tasks));
    }
  }, []);
  // filter tasks based on showFinish
  const filteredTaskList = showFinish
    ? taskList
    : taskList.filter((task) => {
        return !task.isCompleted;
      });

  const saveTasks = (taskList) => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  };
  const handleAdd = () => {
    if (!todo.trim()) return; // Avoid empty tasks
    const newTaskList = [
      ...taskList,
      { id: uuidv4(), todo, isCompleted: false, isEditing: false },
    ];
    saveTasks(newTaskList);
    setTaskList(newTaskList);
    setTodo("");
    // saveTasks();
  };
  const handleEdit = (id) => {
    const newTaskList = taskList.map((task) =>
      task.id === id ? { ...task, isEditing: !task.isEditing } : task
    );
    setTaskList(newTaskList);
    saveTasks(newTaskList);
  };
  const handleSave = (id, newTodo) => {
    const newTaskList = taskList.map((task) =>
      task.id === id ? { ...task, todo: newTodo, isEditing: false } : task
    );
    setTaskList(newTaskList);
    saveTasks(newTaskList);
    // setTaskList((prevTasks)=>
    //   prevTasks.map((task)=>
    //     task.id===id?{...task,todo:newTodo,isEditing: false}:task))
    // saveTasks(taskList);
  };
  const handleDelete = (id) => {
    const newTaskList = taskList.filter((task) => {
      return task.id !== id;
    });
    saveTasks(newTaskList);
    setTaskList(newTaskList);
    // saveTasks();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = taskList.findIndex((task) => {
      return task.id === id;
    });
    let newTaskList = [...taskList];
    newTaskList[index].isCompleted = !newTaskList[index].isCompleted;
    saveTasks(newTaskList);
    setTaskList(newTaskList);
    // saveTasks(taskList);
  };
  const handlers = {
      handleCheckbox,
      handleDelete,
      handleEdit,
      handleSave,
  };
  return (
    <>
      <Navbar />
      <div className="main flex-1 py-[70px] bg-[#c7b2d8] ">
        <div className="container mx-auto bg-violet-200 md:h-[70vh] w-[90vw] lg:w-[50vw] p-4 border rounded-xl">
          <div className="title text-center text-2xl md:text-3xl font-bold">
            <h1>iTask - Manage your work at one place</h1>
          </div>
          <div className="content text-xl font-semibold mb-2">
            <p className="mb-2">Add your todo</p>
            <div className="input flex flex-col gap-2 md:flex-row md:justify-around">
              <input
                type="text"
                onChange={handleChange}
                value={todo}
                placeholder="Enter your task"
                className="p-2 md:w-[75%] border rounded-xl"
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleAdd();
                }}
              />
              <button onClick={handleAdd}
              className="bg-violet-800 hover:bg-violet-950 text-white text-base px-4 py-2 border rounded-xl">
              Add
              </button>
            </div>
          </div>
          <input
            type="checkbox"
            checked={showFinish}
            id="showFinish"
            onChange={() => {
              setShowFinish(!showFinish);
            }}
          />
          <label htmlFor="showFinish">Show Finished Tasks</label>
          <div className="separator w-[75%] h-1 bg-gray-400 mx-auto my-2 border rounded-xl"></div>
          <h2 className="text-2xl">Your tasks</h2>
          <div className="task-list h-[45vh] overflow-y-auto">
            {filteredTaskList.length === 0 && (
              <p className="m-2">No tasks available</p>
            )}
            {filteredTaskList.map((task) => {
              return <Task task={task} key={task.id} handlers={handlers} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
