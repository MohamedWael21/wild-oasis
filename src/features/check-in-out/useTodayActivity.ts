import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/booking.service";

const useTodayActivity = () => {
  const { data: todayActivities, isLoading } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  return { todayActivities, isLoading };
};
export default useTodayActivity;
