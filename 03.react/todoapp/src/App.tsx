import { useState } from "react";
import { TodoList } from "@/pages/_index";
import { Header, Footer } from "@/layout/_index";

function App() {
  const [todoItem, setTodoItem] = useState([]);

  return (
    <div id="app">
      <Header setTodoItem={setTodoItem} />
      <TodoList todoItem={todoItem} setTodoItem={setTodoItem} />
      <Footer />
    </div>
  );
}

export default App;