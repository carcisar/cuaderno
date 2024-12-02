import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Priority } from '../../models/priority.enum';
import { TaskStatus } from '../../models/task-status.enum';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasksByStatus: { [key in TaskStatus]: Task[] } = {
    PENDING: [],
    IN_PROGRESS: [],
    COMPLETED: [],
    ON_HOLD: [],
  };

  taskStatuses = Object.values(TaskStatus);
  connectedTo: string[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.connectedTo = this.taskStatuses.map((status) => status.toString());
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks) => {
      // Agrupar las tareas por estado
      this.tasksByStatus = {
        PENDING: tasks.filter((task) => task.status === TaskStatus.PENDING),
        IN_PROGRESS: tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS),
        COMPLETED: tasks.filter((task) => task.status === TaskStatus.COMPLETED),
        ON_HOLD: tasks.filter((task) => task.status === TaskStatus.ON_HOLD),
      };
    });
  }

  onTaskDropped(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      // Reordenamiento dentro de la misma columna
      return;
    } else {
      // Mover entre columnas
      const task = event.previousContainer.data[event.previousIndex];
      const newStatus = event.container.id as TaskStatus;

      // Actualizar el estado localmente
      task.status = newStatus as TaskStatus;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Actualizar en el backend
      this.taskService.updateTask(task.id, task).subscribe(() => {
        console.log(`Tarea ${task.id} movida a ${newStatus}`);
      });
    }
  }

  getPriorityClass(priority: Priority): string {
    switch (priority) {
      case Priority.LOW:
        return 'bg-green-200 text-green-800'; // Prioridad baja (verde)
      case Priority.MEDIUM:
        return 'bg-yellow-200 text-yellow-800'; // Prioridad media (amarillo)
      case Priority.HIGH:
        return 'bg-red-200 text-red-800'; // Prioridad alta (rojo)
      default:
        return 'bg-gray-200 text-gray-800'; // Prioridad desconocida
    }
  }

}
