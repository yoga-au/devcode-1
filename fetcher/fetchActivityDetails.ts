import axios from "axios";
import type { AxiosResponse } from "axios";
import ActivityGroupDetails from "../types/ActivityGroupDetails";

const fetchActivityDetails = async (id: string) => {
  const response: AxiosResponse<ActivityGroupDetails> = await axios.get(
    `/activity-groups/${id}`
  );

  if (response.status >= 400) {
    throw new Error("Fetching failed");
  }

  const result = response.data;
  return result;
};

export default fetchActivityDetails;
