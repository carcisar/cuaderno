import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Priority } from '../../models/priority.enum';
import { TaskStatus } from '../../models/task-status.enum';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskStatuses = Object.values(TaskStatus); // ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD']

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  getPriorityClass(priority: Priority): string {
    switch (priority) {
      case Priority.LOW:
        return 'bg-green-200 text-green-800';
      case Priority.MEDIUM:
        return 'bg-yellow-200 text-yellow-800';
      case Priority.HIGH:
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  }

  navigateToCreateTask(): void {
    console.log('Navegar al formulario de creación de tareas');
  }
}
