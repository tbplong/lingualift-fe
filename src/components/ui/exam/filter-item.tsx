type FilterItemProps = {
  onClick: () => void;
  text: string;
  isChecked: boolean;
};

const FilterItem = ({ onClick, text, isChecked }: FilterItemProps) => {
  return (
    <div
      className="flex cursor-pointer items-center"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <input
        checked={isChecked}
        type="checkbox"
        className="me-1 cursor-pointer"
      />
      <label className="cursor-pointer text-nowrap text-sm">{text}</label>
    </div>
  );
};

export default FilterItem;
