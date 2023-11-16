import axios from "axios";
import { useState, useEffect, MouseEvent } from "react";

const Header = ({ setTodoItem }) => {
  const [activeButton, setActiveButton] = useState("All");
  const [allItems, setAllItems] = useState([]);
  const [toggle, setToggle] = useState(true)

  useEffect(() => {
    UpdateTodoList();
  }, [activeButton]);

  const filter = (e: MouseEvent<HTMLButtonElement>) => {
    setActiveButton(e.target.textContent);
  };

  // 필터기능
  const UpdateTodoList = async () => {
    try {
      const response = await axios("http://localhost:33088/api/todolist");
      const { items } = response.data;
      setAllItems(items);
      
      if (activeButton === "All") {
        setTodoItem(items);
      } else if (activeButton === "Active") {
        setTodoItem(items.filter((item) => !item.done));
      } else if (activeButton === "Completed") {
        setTodoItem(items.filter((item) => item.done));
      } 
    } catch (err) {
      console.error(err);
    }
  };

  function handleToggle() {
    if(toggle === true){
      setTodoItem(allItems.slice().sort((a,b) => new Date(a.updatedAt) - new Date(b.updatedAt)))
      setToggle(!toggle)
      
    } else if(toggle === false) {
      setTodoItem(allItems.slice().sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt)))
      setToggle(!toggle)
      
    }
  }


  return (
    <header>
      <h1>TODO</h1>
      <div>
        {["All", "Active", "Completed"].map((item, index) => {
          return (
            <button
              key={index}
              onClick={filter}
              className={item === activeButton ? "active" : ""}
            >
              {item}
            </button>
          );
        })}
        <button onClick={handleToggle}>{toggle ===true ? "Sort↑" : "Sort↓"}</button>
      </div>
    </header>
  );
};

export default Header;
