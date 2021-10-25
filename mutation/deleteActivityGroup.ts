import axios from "axios";

const deleteActivityGroup = (id: number) => {
  return axios.delete(`/activity-groups/${id}`);
};

export default deleteActivityGroup;
