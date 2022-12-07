import cl from "classnames";
import s from "./TagItem.module.scss";

type Props = {
  id: number;
  tag: string;
  activeTag: number;
  ToggleFunc: React.MouseEventHandler<HTMLSpanElement> | undefined;
};

const TagItem = ({ id, ToggleFunc, activeTag, tag }: Props) => {
  return (
    <span
      key={id}
      onClick={ToggleFunc}
      className={cl(s.tag_item, {
        [s.tag_item_active]: activeTag === id,
      })}
    >
      {tag}
    </span>
  );
};

export default TagItem;
