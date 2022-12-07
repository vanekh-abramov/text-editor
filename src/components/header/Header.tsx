import s from "./Header.module.scss";

type Props = {
  header_title: string;
};

const Header = ({ header_title }: Props) => {
  return (
    <header className={s.header}>
      <h1 className={s.header_title}>{header_title}</h1>
    </header>
  );
};

export default Header;
