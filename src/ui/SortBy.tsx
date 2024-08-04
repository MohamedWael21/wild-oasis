import { useSearchParams } from "react-router-dom";
import Select from "./Select";

interface SortByProps {
  options: {
    value: string;
    label: string;
  }[];
}
const SortBy = ({ options }: SortByProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sort-by", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <div>
      <Select
        options={options}
        value={searchParams.get("sort-by") || "name-asc"}
        type="white"
        onChange={handleClick}
      />
    </div>
  );
};
export default SortBy;
