export enum IsActive {
  DEACTIVE,
  ACTIVE,
}

type Priority = "very-high" | "high" | "normal" | "low" | "very-low";

export interface TodoItem {
  id: number;
  title: string;
  activity_group_id: number;
  is_active: IsActive;
  priority: string;
}

interface ActivityGroupDetails {
  id: number;
  title: string;
  created_at: string;
  todo_items: TodoItem[];
}

export default ActivityGroupDetails;
