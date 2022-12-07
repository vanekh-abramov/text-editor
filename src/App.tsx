import s from "./App.module.scss";

import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { setToggleModal } from "./store/modalSlice/modalSlice";
import { memo, MouseEvent, useCallback, useEffect, useState } from "react";
import { delTodo, getTodo } from "./store/todoSlice/todoAction";
import { removeTodo } from "./store/todoSlice/todoSlice";
import { IData } from "./models/models";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import AnimateBtn from "./components/AnimateBtn/AnimateBtn";
import TodoCard from "./components/TodoCard/TodoCard";
import LoaderUI from "./components/LoaderUI/LoaderUI";
import TagItem from "./components/TagItem/TagItem";
import Header from "./components/Header/Header";

const App = memo(() => {
  const { modal } = useAppSelector((state) => state.modal);
  const { data, status } = useAppSelector((state) => state.todos);

  const [newData, setNewData] = useState<IData[] | undefined>();

  const [activeTag, setActiveTag] = useState(NaN);
  const [sortedTag, setSortedTag] = useState<string>("");

  const dispatch = useAppDispatch();

  const modalToggle = () => {
    dispatch(setToggleModal(!modal));
  };

  useEffect(() => {
    dispatch(getTodo(sortedTag));
  }, [dispatch, sortedTag]);

  const removing = (id: string) => {
    dispatch(removeTodo(id));
    dispatch(delTodo(id));
  };

  const editing = (id: string) => {
    modalToggle();
    let updData = data.filter((item: IData) => item.id === id);
    setNewData(updData as IData[]);
  };

  const toggleTag = useCallback(
    (tagName: MouseEvent<HTMLSpanElement>, idx: number) => {
      setActiveTag(idx);
      setSortedTag((tagName.target as Element).innerHTML.replace("#", ""));
    },
    []
  );

  const restartTags = () => {
    dispatch(getTodo());
    setActiveTag(NaN);
  };

  return (
    <div className={s.container}>
      <Header header_title={"LoGo"} />
      <section className={s.todo_wrapper}>
        <LoaderUI status={status} />
        <div className={s.tag_wrapper}>
          <button className={s.tag_restart} onClick={restartTags}>
            Reset
          </button>
          {data
            ?.map((item) => item.tag)
            .flat()
            .map((tag, id) => (
              <TagItem
                id={id}
                tag={tag}
                ToggleFunc={(tagName) => toggleTag(tagName, id)}
                activeTag={activeTag}
                key={id}
              />
            ))}
        </div>
        {data?.map(({ id, title, content, tag }) => (
          <TodoCard
            key={id}
            id={id}
            title={title}
            content={content}
            tag={tag}
            EditFunc={() => editing(id)}
            DeleteFunc={() => removing(id)}
          />
        ))}
      </section>
      <ModalWindow data={newData} setNewData={setNewData} />
      <AnimateBtn dependence={modal} onClickFunc={modalToggle} />
    </div>
  );
});

export default App;
