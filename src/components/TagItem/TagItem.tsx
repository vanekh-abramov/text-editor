import cl from "classnames";
import s from "./TagItem.module.scss";
import { memo } from "react";

type Props = {
  id: number;
  tag: string;
  activeTag: number;
  ToggleFunc: React.MouseEventHandler<HTMLSpanElement> | undefined;
};

const TagItem = memo(({ id, ToggleFunc, activeTag, tag }: Props) => {
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
});

export default TagItem;
