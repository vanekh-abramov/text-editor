import s from "./Header.module.scss";
import { memo } from "react";

type Props = {
  header_title: string;
};

const Header = memo(({ header_title }: Props) => {
  return (
    <header className={s.header}>
      <h1 className={s.header_title}>{header_title}</h1>
    </header>
  );
});

export default Header;
