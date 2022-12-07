import s from "./LoaderUI.module.scss";
import cl from "classnames";
import { memo } from "react";

type Props = {
  status: boolean;
};

const LoaderUI = memo(({ status }: Props) => {
  return (
    <div
      className={cl({
        [s.loader]: !status,
        [s.loader_active]: status,
      })}
    ></div>
  );
});

export default LoaderUI;
