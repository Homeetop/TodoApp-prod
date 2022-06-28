import DropDown from "../DropDown/DropDown";
import { motion, AnimatePresence } from "framer-motion";
import TaskContext from "../context/TaskContext";
import { useContext, useState, useEffect } from "react";
import Task from "../Task/Task";
import "./Tasks.css";

const Tasks = () => {
  const [all, setAll] = useState(true);
  const [taskStatus, setStatus] = useState(true);
  const { tasks, doneTaskList, deleteAll, pendingTaskList } = useContext(TaskContext);

  console.log(pendingTaskList, tasks, doneTaskList);
  //for change in tasks
  const handlechange = (e) => {
    if (e.target.dataset.category === "all") {
      setAll(true);
    } else if (e.target.dataset.category === "done") {
      setAll(false);
      setStatus(true);
    } else if (e.target.dataset.category === "pending") {
      setAll(false);
      setStatus(false);
    }
  };

  const renderTasks = () => {
    if (tasks.length !== 0) {
      if (all) {
        return tasks.map((task) => <Task key={task.id} id={task.id} isDone={task.isDone} topic={task.topic} content={task.content} />);
      } else {
        if (taskStatus) {
          return doneTaskList.map((task) => <Task key={task.id} id={task.id} isDone={task.isDone} topic={task.topic} content={task.content} />);
        } else {
          return pendingTaskList.map((task) => <Task key={task.id} id={task.id} isDone={task.isDone} topic={task.topic} content={task.content} />);
        }
      }
    } else {
      return <h4 className="nothing">You dont have any task to do</h4>;
    }
  };

  return (
    <div className="tasks">
      <div className="tasks__title">
        <img className="tasks__title__icon" src="./svg/all-task.svg" alt="" />
        <h2 className="tasks__title__text">All Tasks</h2>
      </div>

      <div className="tasks__sort">
        <DropDown changeCategory={handlechange} all={all} status={taskStatus} />
        <motion.button onClick={deleteAll} whileTap={{ scale: 0.9 }} className="clear-all">
          Clear All
        </motion.button>
      </div>
      <div className="tasks__container">
        <AnimatePresence>{renderTasks()}</AnimatePresence>
      </div>
    </div>
  );
};
export default Tasks;
