import s from "./App.module.scss";
import Header from "./components/Header/Header";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import AnimateBtn from "./components/AnimateBtn/AnimateBtn";
import TodoCard from "./components/TodoCard/TodoCard";
import LoaderUI from "./components/LoaderUI/LoaderUI";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { setToggleModal } from "./store/modalSlice/modalSlice";
import { useEffect } from "react";
import { delTodo, getTodo } from "./store/todoSlice/todoAction";
import { removeTodo } from "./store/todoSlice/todoSlice";

function App() {
  const { modal } = useAppSelector((state) => state.modal);
  const { data, status } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const modalToggle = () => {
    dispatch(setToggleModal(!modal));
  };

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const removing = (id: string) => {
    dispatch(removeTodo(id));
    dispatch(delTodo(id));
  };

  console.log(data);
  console.log(status);
  return (
    <div className={s.container}>
      <Header header_title={"LoGo"} />
      <section className={s.todo_wrapper}>
        <LoaderUI status={status} />
        {data?.map(({ id, title, content, tag }) => (
          <TodoCard
            key={id}
            id={id}
            title={title}
            content={content}
            tag={tag}
            DeleteFunc={() => removing(id)}
          />
        ))}
      </section>
      <ModalWindow />
      <AnimateBtn dependence={modal} onClickFunc={modalToggle} />
    </div>
  );
}

export default App;
