import React, { FC, useState, ChangeEvent } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<Array<ITask>>([]);
  const [inputError, setInputError] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    setInputError("");
    let spanError = document.getElementById("inputError");
    spanError?.classList.remove("animateError");
    let breakFunction = false;
    todoList.forEach((todoTask) => {
      if (todoTask.taskName === task) {
        setInputError("Nelze vložit stejné hodnoty");
        if (spanError) {
          spanError.classList.add("animateError");
        }
        breakFunction = true;
        return;
      }
    });
    if (breakFunction) return;
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputs">
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Úkol..."
              value={task}
              name="task"
              onChange={handleChange}
            />
            <input
              type="number"
              min = "0"
              step = "1"
              placeholder="Splnit za dnů..."
              value={deadline}
              name="deadline"
              onChange={handleChange}
            />
          </div>
          <button onClick={addTask}>Vytvoř úkol</button>
        </div>
        <div className="errors">
          <span className="inputError" id="inputError">{inputError}</span>
        </div>
      </div>

      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
