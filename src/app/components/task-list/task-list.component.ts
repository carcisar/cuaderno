import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  tasks: Task[] = [];
  constructor(private taskService: TaskService) { }
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
      }
    );
  }


  deleteTask(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe(
        () => {
          this.tasks = this.tasks.filter(task => task.id !== id);
        },
        (error) => {
          console.error('Error al eliminar la tarea:', error);
        }
      );
    }
  }


  editTask(task: Task): void {
    // Implementaremos la lógica de edición en el siguiente paso
    console.log('Editar tarea:', task);
  }




}
