import React, { MouseEventHandler } from "react";
import s from "./AnimateBtn.module.scss";
import cl from "classnames";

type Props = {
  onClickFunc: MouseEventHandler<HTMLButtonElement>;
  dependence: boolean;
};

const AnimateBtn = ({ onClickFunc, dependence }: Props) => {
  return (
    <button
      className={cl(s.modal_btn, { [s.modal_btn_active]: dependence === true })}
      onClick={onClickFunc}
    >
      <div className={s.stick1}></div>
      <div className={s.stick2}></div>
    </button>
  );
};

export default AnimateBtn;
