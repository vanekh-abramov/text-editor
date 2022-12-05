import s from "./App.module.scss";
import Header from "./components/header/Header";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { setToggleModal } from "./store/modalSlice/modalSlice";
import { useEffect } from "react";
import { delTodo, getTodo } from "./store/todoSlice/todoAction";
import Modal from "./components/modal/Modal";
import AnimateBtn from "./components/AnimateBtn/AnimateBtn";
import { removeTodo } from "./store/todoSlice/todoSlice";
// import { removeTodo } from "./store/todoSlice/todoSlice";
// import { v4 as uuidv4 } from "uuid";
// import cl from "classnames";

function App() {
  const { modal } = useAppSelector((state) => state.modal);
  const { data } = useAppSelector((state) => state.todos);
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

  return (
    <div className={s.container}>
      <Header header_title={"LoGo"} />
      <section className={s.todo_wrapper}>
        {data &&
          data.map(({ id, title, content, tag }) => (
            <div key={id} className={s.todo_card}>
              <div className={s.card_head}>
                <h3 className={s.card_title}>{title}</h3>
                <button className={s.delete_btn} onClick={() => removing(id)}>
                  &#x274C;
                </button>
              </div>
              <p className={s.todo_content}>{content}</p>
              <div className={s.todo_tag_wrapper}>
                {tag &&
                  tag.map((tag, id) => (
                    <p key={id} className={s.todo_tag}>
                      {tag}
                    </p>
                  ))}
              </div>
            </div>
          ))}
      </section>
      <Modal btn_text='submit' />
      <AnimateBtn dependence={modal} onClickFunc={modalToggle} />
    </div>
  );
}

export default App;
