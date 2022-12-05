import s from "./LoaderUI.module.scss";
import cl from "classnames";

type Props = {
  status: boolean;
};

const LoaderUI = ({ status }: Props) => {
  return (
    <div
      className={cl({
        [s.loader]: !status,
        [s.loader_active]: status,
      })}
    ></div>
  );
};

export default LoaderUI;
