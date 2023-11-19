import { useState, useEffect } from "react";
import { TodoInfo, TodoRegist } from "../_index";
import axios from "axios";

const TodoList = ({ todoItem, setTodoItem }) => {
  const [pageView, setPageView] = useState({});
  

  useEffect(() => {
    initializeTodoList();
  }, []);

  // TodoItem UI에 필요한 데이터 패칭
  const initializeTodoList = async () => {
    try {
      const response = await axios("http://localhost:33088/api/todolist");
      const { items } = response.data;
      setTodoItem(items);
      
    } catch (err) {
      console.error(err);
    }
  };

  // 체크박스 업데이트 시 PATCH 통신
  const updateCheckBox = async (e, id) => {
    const target = e.target;

    try {
      await axios.patch(`http://localhost:33088/api/todolist/${id}`, {
        done: target!.checked,
      });
      initializeTodoList();
    } catch (err) {
      console.error(err);
    }
  };

  const openTodoRegist = () => {
    setPageView({ view: "todoRegist" });
  };

  // 
  const openTodoInfo = (id) => {
    setPageView({ view: "todoInfo", id: id });
  };

  const [searchInput, setSearchInput] = useState("")

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  
    const searchResult = todoItem.filter((item) => {
      return item.title.includes(searchInput);
    });
  
    
    console.log(searchResult);
    
    
    // return setTodoItem(searchResult)
  };

  


  return (
    <div>
      <div className="contents-container">
        <div className="search-bar">
          <input type="text" placeholder="검색어를 입력하세요" className="search" value={searchInput} onChange={handleSearch}  />
          <button className="search-button" onClick={handleSearch}>검색</button>
        </div>
        <div className="list-container">
          <button className="regist-button" onClick={openTodoRegist}>
            할 일 추가하기
          </button>
          <ul className="todolist">
            {todoItem.map((item) => (
              <li
                key={item._id}
                id={item._id}
                className="todo-item"
                onClick={() => openTodoInfo(item._id)}
              >
                <input
                  className="checkbox-item"
                  type="checkbox"
                  checked={item.done}
                  onChange={(e) => updateCheckBox(e, item._id)}
                />
                <span
                  className={item.done ? "checked title-item" : "title-item"}
                >
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {pageView.view === "todoRegist" && <TodoRegist />}
        {pageView.view === "todoInfo" && <TodoInfo id={pageView.id} />}
      </div>
    </div>
  );
};

export default TodoList;
