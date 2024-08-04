import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/cabin.service";

const useCabins = () => {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading };
};

export default useCabins;
