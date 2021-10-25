import axios from "axios";
import encodeEmailParam from "../helpers/encodeEmailParam";
import type { AxiosResponse } from "axios";
import type ActivityGroupData from "../types/ActivityGroupData";

const fetchActivityGroup = async () => {
  const response: AxiosResponse<ActivityGroupData> = await axios.get(
    `/activity-groups?email=${encodeEmailParam()}`
  );
  // const response: AxiosResponse<ActivityGroupData> = await axios.get(
  //   `/activity-groups`
  // );
  const result = response.data;
  return result;
};

export default fetchActivityGroup;
