import { ReactComponent as IconFilter } from "../assets/img/filter.svg";
interface Props {
  name?: string;
  color?: string;
  size?: string;
  onClick?: () => void;
}

export const FilterButton = ({ onClick, name, color, size }: Props) => {
  return (
    <div className=".filter-button" onClick={onClick}>
      <IconFilter width={size} />
    </div>
  );
};
