import axios from "axios";
import NewActivityType from "../types/NewActivityType";

const createActivityGroup = (newActivity: NewActivityType) => {
  return axios.post("/activity-groups", newActivity);
};

export default createActivityGroup;
