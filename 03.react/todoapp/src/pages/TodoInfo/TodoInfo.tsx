import { useState, useEffect } from "react";
import axios from "axios";
import TodoDelete from "../../utils/TodoDelete";

interface TodoInfoProps {
  id: number;
}

const TodoInfo = (props: TodoInfoProps) => {
  const id = props.id;
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [updateTime, setUpdateTime] = useState("");

  let item: TodoItem;
  

  const getTodoDetail = async () => {
    try {
      const response: TodoResponse = await axios.get(
        `http://localhost:33088/api/todolist/${id}`
      );
      
      if (response.data.ok === 1) {
        item = response.data.item;
        setTitle(item.title);
        setContent(item.content);
        setIsDone(item.done);
        setUpdateTime(item.updatedAt);
      }
    } catch (e) {
      // console.log(e);
    }
  };



  useEffect(() => {
    getTodoDetail();
  }, [id]);

  

  const handleUpdateButton = async () => {
    setIsUpdate(!isUpdate);
    if (isUpdate === true) {
      const response: TodoResponse = await axios.patch(
        `http://localhost:33088/api/todolist/${id}`,
        {
          title: title,
          content: content,
          done: isDone,
        }
      );
      if (response.data.ok === 1) {
        item = response.data.item;
      }
    }
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      setTitle(event.target.value);
    }
  };
  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target instanceof HTMLTextAreaElement)
      setContent(event.target.value);
  };

  return (
    <section>
      <div className="info-container">
        <input
          type="text"
          placeholder="TODO 제목을 입력하세요"
          className="title-input"
          disabled={isUpdate === true ? false : true}
          maxLength={25}
          value={title}
          onChange={onChangeTitle}
        />
        <div className="time">{updateTime}</div>
        <textarea
          className="content-textarea"
          placeholder="TODO 상세 내용을 입력하세요"
          disabled={isUpdate === true ? false : true}
          value={content}
          onChange={onChangeContent}
        ></textarea>
        <div className="button-container">
          <button onClick={handleUpdateButton} className="info-button edit">
            {isUpdate === false ? "수정" : "완료"}
          </button>
          <button
            onClick={() => {
              TodoDelete(id);
            }}
            className="info-button delete"
          >
            삭제
          </button>
        </div>
      </div>
      
    </section>
  );
};

export default TodoInfo;
