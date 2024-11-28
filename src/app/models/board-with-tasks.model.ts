import { Board } from './board.model';
import { Task } from './task.model';

export interface BoardWithTasks {
  board: Board;
  tasks: Task[];
}
