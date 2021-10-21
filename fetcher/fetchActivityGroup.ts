import axios from "axios";
import encodeEmailParam from "../helpers/encodeEmailParam";

const fetchActivityGroup = async () => {
  // const response = await axios.get(
  //   `/activity-groups?email=${encodeEmailParam()}`
  // );
  const response = await axios.get(`/activity-groups`);
  const result = await response.data;
  return result;
};

export default fetchActivityGroup;
