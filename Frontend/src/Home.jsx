import React, { useEffect, useState, useCallback } from "react";
import Todo from "./Todo";
import axios from "axios";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
const Home = () => {
  const [chck, setChck] = useState(false);
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(() => {
    axios
      .get("https://todobackend-k0td.onrender.com/get")
      .then((result) => {
        setTodos(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handlecheck = useCallback((id) => {
    setChck((prevChck) => !prevChck);
    axios
      .put(`https://todobackend-k0td.onrender.com/update/${id}`)
      .then((result) => {
        console.log(result);
        fetchTodos(); // Refresh the todo list after update
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchTodos]);

  const handledelete = useCallback((id) => {
    setChck((prevChck) => !prevChck);
    console.log("delete");
    axios
      .delete(`https://todobackend-k0td.onrender.com/delete/${id}`)
      .then((result) => {
        console.log(result);
        fetchTodos(); // Refresh the todo list after delete
      })
      .catch((err) => console.log(err));
  }, [fetchTodos]);

  return (
    <div className="m1">
    <a href="https://github.com/Moh-an123">
    <FaGithub  className="github"/></a>
  
    <div className="main">
      <h1 >Todo List</h1>
      <Todo />
      <div className="lb">
      {todos.length > 0 ? (
        todos.map((item) => {
          return (
            <div className="list" onClick={() => handlecheck(item._id)}>
              {item.finish ? (
                <FaRegCheckCircle className="circle" />
              ) : (
                <FaRegCircle className="circle" />
              )}
              <h2 id={item} className={item.finish?"todo underline":"todo"}>{item.task}</h2>
              <MdDeleteOutline
                className="delete"
                onClick={() => handledelete(item._id)}
              />
            </div>
          );
        })
      ) : (
        <h2>No Items</h2>
      )
     
      }
       </div>
      </div>
    </div>
  );
};

export default Home;
