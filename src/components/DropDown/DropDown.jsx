import "./DropDown.css";
import { motion } from "framer-motion";
import { useState } from "react";
const DropDown = ({ changeCategory, all, status }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleChange = (e) => {
    changeCategory(e);
    handleOpen();
  };
  const renderLabel = () => {
    if (all) {
      return "All Task";
    } else {
      return status ? "Done Task" : "Pending";
    }
  };
  return (
    <motion.div whileTap={{ scale: 0.9 }} className="drop-down">
      <button onClick={handleOpen} className="drop-down__change">
        {renderLabel()} <span>▼</span>
      </button>
      <div className={`item-container ${isOpen === true && "show"}`}>
        <div onClick={(e) => handleChange(e)} data-category="all" className="drop-down__item">
          All Task
        </div>
        <div onClick={(e) => handleChange(e)} data-category="done" className="drop-down__item">
          ِDone Task
        </div>
        <div onClick={(e) => handleChange(e)} data-category="pending" className="drop-down__item">
          Pending
        </div>
      </div>
    </motion.div>
  );
};
export default DropDown;
