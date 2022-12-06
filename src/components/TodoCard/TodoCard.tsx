import s from "./TodoCard.module.scss";

type Props = {
  id: string;
  title: string;
  content: string;
  tag: string[];
  DeleteFunc: React.MouseEventHandler<HTMLButtonElement> | undefined;
  EditFunc: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const TodoCard = ({ id, title, content, tag, DeleteFunc, EditFunc }: Props) => {
  return (
    <div className={s.todo_card}>
      <div className={s.card_head}>
        <h3 className={s.card_title}>{title}</h3>
        <button className={s.edit_btn} id={id} onClick={EditFunc}>
          EDIT
        </button>
        <button className={s.delete_btn} onClick={DeleteFunc}>
          &#x274C;
        </button>
      </div>
      <p className={s.todo_content}>{content}</p>
      <div className={s.todo_tag_wrapper}>
        {tag?.map((tag, id) => (
          <p key={id} className={s.todo_tag}>
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TodoCard;
