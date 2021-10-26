import axios from "axios";
import ActivityTitleUpdateType from "../types/ActivityTitleUpdateType";

const editActivityTitle = async (
  id: string,
  patchTitle: ActivityTitleUpdateType
) => {
  return axios.patch(`/activity-groups/${id}`, patchTitle);
};

export default editActivityTitle;
