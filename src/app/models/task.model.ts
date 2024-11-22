import { TaskStatus } from './task-status.enum';
import { Priority } from './priority.enum';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: string;
  priority: Priority;
  userId: number;
}
