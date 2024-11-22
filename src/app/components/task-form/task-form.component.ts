import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskStatus } from '../../models/task-status.enum';
import { Priority } from '../../models/priority.enum';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'] // Corrección aplicada
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup; // Uso de '!'
  isEditMode: boolean = false;
  taskId!: number; // Uso de '!'
  statuses = Object.values(TaskStatus);
  priorities = Object.values(Priority);

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.taskId;

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: [TaskStatus.PENDING, Validators.required],
      dueDate: ['', Validators.required],
      priority: [Priority.MEDIUM, Validators.required],
      userId: [1, Validators.required] // Asignamos un userId por defecto
    });

    if (this.isEditMode) {
      this.loadTask();
    }
  }

  loadTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe(
      (task) => {
        this.taskForm.patchValue(task);
      },
      (error) => {
        console.error('Error al cargar la tarea:', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }


  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const task: Task = this.taskForm.value;

    if (this.isEditMode) {
      this.taskService.updateTask(this.taskId, task).subscribe(
        () => {
          this.router.navigate(['/tasks']);
        },
        (error) => {
          console.error('Error al actualizar la tarea:', error);
        }
      );
    } else {
      this.taskService.createTask(task).subscribe(
        () => {
          this.router.navigate(['/tasks']);
        },
        (error) => {
          console.error('Error al crear la tarea:', error);
        }
      );
    }
  }
}
