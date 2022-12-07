import s from "./ModalWindow.module.scss";
import { ChangeEvent, memo, useCallback, useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useAppDispatch } from "./../../hooks/reduxHooks";
import { IData } from "./../../models/models";
import { setToggleModal } from "../../store/modalSlice/modalSlice";
import { createTodo, putTodo } from "./../../store/todoSlice/todoAction";
import { addTodo } from "../../store/todoSlice/todoSlice";
import { v4 as uuidv4 } from "uuid";
import cl from "classnames";

type Props = {
  data: IData[] | undefined;
  setNewData: React.Dispatch<React.SetStateAction<IData[] | undefined>>;
};

const ModalWindow = memo(({ data, setNewData }: Props) => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal.modal);

  const [inpTitle, setInpTitle] = useState("");
  const [inpContent, setInputContent] = useState("");
  const [inpTag, setInpTag] = useState("");

  const [dataTags, setDataTags] = useState<string[]>([]);

  const [titleTags, setTitleTags] = useState<string[]>([]);
  const [contentTags, setContentTags] = useState<string[]>([]);
  const [tagTags, setTagTags] = useState<string[]>([]);

  const [inpError, setInpError] = useState(false);
  const [tagWarning, setTagWarning] = useState(false);

  const newData: IData = {
    id: uuidv4().toString(),
    title: inpTitle,
    content: inpContent,
    tag: dataTags,
  };

  const newTitleTags = (e: string) => {
    const tag = e.split(" ").filter((item) => item.split("")[0] === "#");
    setTitleTags(tag);
  };
  const newContentTags = (e: string) => {
    const tag = e.split(" ").filter((item) => item.split("")[0] === "#");
    setContentTags(tag);
  };
  const newTagTags = (e: string) => {
    const tag = e.split(" ").filter((item) => item.split("")[0] === "#");
    setTagTags(tag);
  };

  const setTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInpTitle(e.target.value);
    newTitleTags(e.target.value);
    setInpError(false);
  }, []);
  const setContent = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputContent(e.target.value);
    newContentTags(e.target.value);
    setInpError(false);
  }, []);
  const setTag = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const rightTag = e.target.value.replace(" ", "");
    if (rightTag.includes("#", 0)) {
      setInpTag(rightTag);
      newTagTags(rightTag);
      setTagWarning(false);
    } else {
      setTagWarning(true);
    }
  }, []);

  const addNewTag = useCallback(() => {
    const newSet = new Set([
      ...dataTags,
      ...titleTags,
      ...contentTags,
      ...tagTags,
    ]);
    const uniqTags = Array.from(newSet);
    setDataTags(uniqTags);
    setInpTag("");
  }, [contentTags, dataTags, tagTags, titleTags]);

  const sendData = () => {
    if (!inpTitle.trim().length || !inpContent.trim().length) {
      setInpError(true);
    } else if (data) {
      const params = { id: data[0].id, todos: newData };
      setInpError(false);
      setInputContent("");
      setDataTags([]);
      setInpTitle("");
      dispatch(putTodo(params)); //////disp
      dispatch(setToggleModal(!modal)); //////disp
      setNewData(undefined);
    } else {
      setInpError(false);
      setDataTags([]);
      setInputContent("");
      setInpTitle("");
      dispatch(addTodo(newData)); //////disp
      dispatch(createTodo(newData)); //////disp
      dispatch(setToggleModal(!modal)); //////disp
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
          name='atitle'
          id='atitle'
          placeholder='Title'
          className={s.modal_input}
          value={inpTitle}
          onChange={(e) => setTitle(e)}
        />
        <input
          type='text'
          name='content'
          id='content'
          placeholder='Content'
          className={s.modal_input}
          value={inpContent}
          onChange={(e) => setContent(e)}
        />
        <div className={s.tag_wrapper}>
          <input
            type='text'
            name='content'
            id='content'
            placeholder={!tagWarning ? "#tag" : "Tag must start with # !!!"}
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
});

export default ModalWindow;
