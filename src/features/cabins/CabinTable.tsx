import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  const filteredValue = searchParams.get("discount") || "all";

  if (isLoading || !cabins) return <Spinner />;

  let filteredCabins: Cabin[] = [];

  if (filteredValue === "all") filteredCabins = cabins;
  else if (filteredValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => !cabin.discount);
  else if (filteredValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount);

  const sortBy = searchParams.get("sort-by") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => {
    if (field === "name" && a[field] && b[field]) {
      return a[field]?.localeCompare(b[field]) * modifier;
    }
    return (
      ((a[field as keyof Cabin] as number) -
        (b[field as keyof Cabin] as number)) *
      modifier
    );
  });

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body>
        {sortedCabins.map((cabin) => (
          <CabinRow key={cabin.id} cabin={cabin} />
        )) || []}
      </Table.Body>
    </Table>
  );
};

export default CabinTable;
