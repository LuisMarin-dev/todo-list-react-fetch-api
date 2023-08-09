import React, { useState } from "react";

//gotta make this fetch the api
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const handleKey = (event) => {
    console.log(event.key);
    if (event.key == "Enter") {
      setTasks([...tasks, text]);
      setText("");
    }
  };

  const deleteTask = (id) => {
    let newTask = tasks.filter((task, index) => index !== id);
    setTasks(newTask);
  };

  return (
    <div className="main-container">
      <h1 className="text-center mt-5 header">todos</h1>
      <div className="taskbox-container">
        <input placeholder="Add todo" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKey}/>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task}</span>
              <span onClick={() => deleteTask(index)} className="x-button hide">x</span>
            </li>
          ))}
        </ul>
        <p className="taskbox-footer">{tasks.length} items left</p>
      </div>
    </div>
  );
};

export default Home;
