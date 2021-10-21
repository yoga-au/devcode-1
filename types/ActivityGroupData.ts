import type BaseApiResponse from "./BaseApiResponse";

type Data = {
  id: number;
  title: string;
  created_at: string;
};

interface ActivityGroupData extends BaseApiResponse {
  data: Data[];
}

export default ActivityGroupData;
