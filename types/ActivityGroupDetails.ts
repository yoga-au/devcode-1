enum IsActive {
  DEACTIVE,
  ACTIVE,
}

type Priority = "very-high" | "high" | "normal" | "low" | "very-low";

interface TodoItem {
  id: number;
  title: string;
  activity_group_id: number;
  is_active: IsActive;
  priority: Priority;
}

interface ActivityGroupDetails {
  id: number;
  title: string;
  created_at: string;
  todo_items: TodoItem[];
}

export default ActivityGroupDetails;
