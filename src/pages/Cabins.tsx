import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import { CabinTableOperations } from "../features/cabins/CabinTableOperations";

const Cabins = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading>All Cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row type="vertical">
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
};
export default Cabins;
