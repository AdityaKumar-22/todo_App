import { useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import PropTypes from "prop-types";

const Task = ({ task, handlers }) => {
  const { handleCheckbox, handleDelete, handleEdit, handleSave } = handlers;
  const [editValue, setEditValue] = useState(task.todo);

  return (
    <div className="task flex justify-between px-2 py-1 transition ease-in-out delay-250">
      <div className="task-name transition ease-in-out delay-250">
        {task.isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave(task.id, editValue);
            }}
            className="border rounded p-1"
          />
        ) : (
          <>
            <input
              type="checkbox"
              checked={task.isCompleted}
              name={task.id}
              id={task.id}
              onChange={handleCheckbox}
              className="w-5 h-5 text-violet-500 border-2 border-gray-300 rounded focus:ring-violet-500 focus:ring-offset-2"
            />
            <label
              htmlFor={task.id}
              className={`${task.isCompleted ? "line-through" : ""}`}
            >
              {task.todo}
            </label>
          </>
        )}
      </div>
      <div className="task-action flex gap-2">
        {task.isEditing ? (
          <button
            onClick={() => handleSave(task.id, editValue)}
            className="bg-violet-800 hover:bg-violet-950 text-white p-2 rounded-md"
          >
            Save
          </button>
        ) : (
          <>
            <button
              onClick={() => handleEdit(task.id)}
              className="bg-violet-500 text-white p-2 rounded-md"
            >
              <AiTwotoneEdit />
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-violet-500 text-white p-2 rounded-md"
            >
              <TiDeleteOutline />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

//Prop Validation
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    todo: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
  }).isRequired,
  handlers: PropTypes.shape({
    handleCheckbox: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
  }).isRequired,
};

export default Task;
