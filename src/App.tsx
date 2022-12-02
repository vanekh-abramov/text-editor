import s from "./App.module.scss";
import Header from "./components/header/Header";
import Modal from "./components/modal/Modal";
import AnimateBtn from "./components/AnimateBtn/AnimateBtn";
// import { IData } from "./models/models";
// import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { setToggleModal } from "./store/modalSlice/modalSlice";
// import cl from "classnames";
// const newData: IData[] = JSON.parse(JSON.stringify(data));

function App() {
  const modal = useAppSelector((state) => state.modal.modal);
  const dispatch = useAppDispatch();

  // const [todo, setTodo] = useState<IData[]>(data);

  const modalToggle = () => {
    dispatch(setToggleModal(!modal));
  };

  return (
    <div className={s.container}>
      <Header header_title={"LoGo"} />
      <section className={s.todo_wrapper}>
        {/* {todo &&
          todo.map(({ id, title, content, tag }) => (
            <div key={id} className={s.todo_card}>
              <div className={s.card_head}>
                <h3 className={s.card_title}>{title}</h3>
                <button className={s.delete_btn}>&#x274C;</button>
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
          ))} */}
      </section>
      <Modal btn_text='submit' />
      <AnimateBtn dependence={modal} onClickFunc={modalToggle} />
    </div>
  );
}

export default App;
