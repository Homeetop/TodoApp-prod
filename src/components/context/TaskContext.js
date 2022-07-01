import { createContext, useState, useEffect } from "react";
import { save, lookUP, erase, saveChanges } from "../../model/crud";

//create task context
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [doneTaskList, setDoneTask] = useState([]);
  const [pendingTaskList, setPendingTask] = useState([]);
  const [PopUp, setPopUp] = useState({ in: false, item: null });

  //function to add tasks
  const addTasks = (topic, content) => {
    const newTask = {
      isDone: false,
      topic,
      content,
    };
    save(`'${newTask.topic}', '${newTask.content}', ${newTask.isDone}`).then(() => fetchTasks());
  };
  const fetchTasks = () => {
    lookUP().then((res) => {
      const arr = [];
      res.map((item) =>
        arr.push({
          id: item.id,
          topic: item.topic,
          content: item.content,
          isDone: item.isDone,
        })
      );
      setTasks([...arr]);
    });
  };

  useEffect(() => fetchTasks(), []);

  useEffect(() => {
    console.log(tasks);
    const alldoneTask = tasks.filter((task) => task.isDone == "true");
    const pendingTask = tasks.filter((task) => task.isDone == "0");
    setDoneTask(alldoneTask);
    setPendingTask(pendingTask);
  }, [tasks]);

  const deleteTask = (id) => {
    erase(id);
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
  };
  const deleteAll = () => {
    erase();
    setTasks([]);
  };
  const doneTask = (id) => {
    saveChanges("isDone = 'true'", id);
    const newTask = [...tasks];
    const index = newTask.findIndex((task) => task.id === id);
    newTask[index].isDone = "true";
    setTasks(newTask);
  };
  const setId = (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    setPopUp({ in: !PopUp.in, item: tasks[index] });
  };
  const editTask = (text) => {
    saveChanges(`topic = '${text.topic}',content = '${text.content}'`, PopUp.item.id);
    const newTask = [...tasks];
    const index = newTask.findIndex((task) => task.id === PopUp.item.id);
    newTask[index].topic = text.topic;
    newTask[index].content = text.content;
    setTasks(newTask);
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTasks,
        deleteTask,
        doneTask,
        PopUp,
        setPopUp,
        setId,
        deleteAll,
        editTask,
        doneTaskList,
        pendingTaskList,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
export default TaskContext;
