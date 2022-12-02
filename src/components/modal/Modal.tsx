import cl from "classnames";
import { useAppSelector } from "../../hooks/reduxHooks";
import s from "./Modal.module.scss";

type Props = {
  btn_text: string;
};

const Modal = ({ btn_text }: Props) => {
  const modal = useAppSelector((state) => state.modal.modal);

  return (
    <div
      className={cl({
        [s.modal_window]: modal === true,
        [s.modal_window_disable]: modal === false,
      })}
    >
      <div className={s.modal_window_wrapper}>
        <input
          type='text'
          name='title'
          id='title'
          className={cl(s.modal_input, s.modal_input_title)}
        />
        <input
          type='text'
          name='content'
          id='content'
          className={cl(s.modal_input, s.modal_input_content)}
        />
        <button className={s.modal_btn_submit}>{btn_text}</button>
      </div>
    </div>
  );
};

export default Modal;
