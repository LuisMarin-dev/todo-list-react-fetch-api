import React, { useState, useEffect } from "react";

// ### API Fetching start ->
// ### This request syncronizes our tasks with the server every time there is a change on the list
// ### API Fetching end <-
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState({"label":"", "done": false});
  

  useEffect(() => { // async comented
    // await createUser();
    getData();
  }
  , [])

  const getData = async() => {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/luism', {
        "method": 'GET',
        "headers": {
        "Content-Type": "application/json"
      }
      });
      const data = await response.json();
      console.log(data)
      if(response.status == 404){
        createUser();
      } else {
        setTasks(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createUser = async() => { //adedd async 9/3/2023
    try {
    const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/luism', {
      "method": 'POST',
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify([]) // added 9/3/2023
    });
    console.log(response);
      if (response.ok){
        getData()
      } else {
        console.log("No se creo el usuario")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const postData = async(body) => {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/luism', {
        "method": 'PUT',
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(body) 
      })
      const data = await response.json();
      console.log(data);
      return response.ok;
    } catch (error) {
      console,log(error)
    }
  };
  
  const handleKey = async(event) => {
    console.log(event.key);
    if (event.key == "Enter") {
      const newTask = [...tasks, text];
      const isPosted = await postData(newTask);
      
      if(isPosted == true){
        await getData();
      }
    };
  };
  
  // al ser presionado esta funcion debe 1: Crear en la linea 45 y el nuevo task creado sera pasado a postdata. Del 46 
  // const deleteTask = async(id) => {
  //   console.log(id)
  //   if(tasks.lenght > 1) {
  //     let newTask = tasks.filter((tasks, index) => index !== id);
  //     console.log(newTask)
  //     const isPosted = await postData(newTask);
  //     if(isPosted == true){
  //       await getData();
  //       console.log(id)
  //     }
  //   } else {
  //       const isPosted = await deleteUser();
  //       if(isPosted == true){
  //         await getData();
  //       }
  //       createUser() // added 9/3/2023
  //     }
  //   };
    
// ######################## deteleTask de ejemplo
// const deleteTask = (id) => {
//   let newTask = tasks.filter((task, index) => index !== id);
//   setTasks(newTask);
// };




  const deleteTask = (index) => {
		const delTask = tasks.filter(text => text.label != tasks[index].label)
		 setTasks(delTask)
     postData(delTask);
	}

  const deleteUser = async() => { //adedd async 9/3/2023
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/luism', {
        "method": 'DELETE',
        "headers": {
          "Content-Type": "application/json"
        }
    });
      if (response.ok){
        getData();
      } else{
        console.log("no se borro el usuario")
      }
    } catch(error) {
        console.log(error)
    }
  }


    return (
      <div className="main-container">
      <h1 className="text-center mt-5 header">todos</h1>
      <div className="taskbox-container">
        <input placeholder="Add todo" value={text.label} onChange={(e) => setText({"label":e.target.value, "done": false})} onKeyDown={handleKey}/>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task.label}</span>
               <span onClick={() => deleteTask(index)} className="x-button hide">x</span> {/* */}
            </li>
          ))}
        </ul>
        <p className="taskbox-footer">{tasks.length} items left</p>
      </div>
      <button className="btn btn-warning" onClick={() => deleteUser()}>Delete all tasks</button>
    </div>
  );
};

export default Home;
