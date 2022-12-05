import cl from "classnames";
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import s from "./ModalWindow.module.scss";
import { useAppDispatch } from "./../../hooks/reduxHooks";
import { IData } from "./../../models/models";
import { v4 as uuidv4 } from "uuid";
import { setToggleModal } from "../../store/modalSlice/modalSlice";
import { createTodo } from "./../../store/todoSlice/todoAction";
import { addTodo } from "../../store/todoSlice/todoSlice";

const ModalWindow = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal.modal);
  const { data } = useAppSelector((state) => state.todos);

  const [inpTitle, setInpTitle] = useState("");
  const [inpContent, setInputContent] = useState("");
  const [inpTag, setInpTag] = useState("");
  const [dataTags, setDataTags] = useState<string[]>([]);
  const [inpError, setInpError] = useState(false);

  const newData: IData = {
    id: uuidv4().toString(),
    title: inpTitle,
    content: inpContent,
    tag: dataTags,
  };

  console.log(data.length + 1);

  const setTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setInpTitle(e.target.value);
    setInpError(false);
  };
  const setContent = (e: ChangeEvent<HTMLInputElement>) => {
    setInputContent(e.target.value);
    setInpError(false);
  };
  const setTag = (e: ChangeEvent<HTMLInputElement>) => {
    setInpTag(e.target.value);
  };
  const addNewTag = () => {
    setDataTags([...dataTags, inpTag]);
    setInpTag("");
  };

  const sendData = () => {
    if (!inpTitle.trim().length || !inpContent.trim().length) {
      setInpError(true);
    } else {
      setInpError(false);
      setInpTitle("");
      setInputContent("");
      setDataTags([]);
      dispatch(setToggleModal(!modal));
      dispatch(addTodo(newData));
      dispatch(createTodo(newData));
    }
  };

  return (
    <div
      className={cl({
        [s.modal_window]: modal,
        [s.modal_window_disable]: !modal,
      })}
    >
      <div className={s.modal_window_wrapper}>
        <input
          type='text'
          name='title'
          id='title'
          className={s.modal_input}
          value={inpTitle}
          onChange={(e) => setTitle(e)}
        />
        <input
          type='text'
          name='content'
          id='content'
          className={s.modal_input}
          value={inpContent}
          onChange={(e) => setContent(e)}
        />
        <div className={s.tag_wrapper}>
          <input
            type='text'
            name='content'
            id='content'
            className={s.modal_input}
            value={inpTag}
            onChange={(e) => setTag(e)}
          />
          <button className={s.tag_btn} onClick={addNewTag}>
            &#10003;
          </button>
        </div>

        <button
          className={cl(s.modal_btn_submit, { [s.modal_btn_err]: inpError })}
          onClick={sendData}
          disabled={inpError}
        >
          {!inpError ? "Submit" : "Fields can`t be empty"}
        </button>
      </div>
    </div>
  );
};

export default ModalWindow;
