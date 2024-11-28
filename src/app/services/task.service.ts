import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Task } from '../models/task.model';
import { TaskStatus } from '../models/task-status.enum';
import { Priority } from '../models/priority.enum';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8090/tasks';


  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener las tareas:', error);
        return throwError(error);
      })
    );
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Task>(url, task);
  }

  deleteTask(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  //---------------------------------------------------metodos personalizados-----------------------------------------------------

  getTasksByUserId(userId: number): Observable<Task[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<Task[]>(url);
  }

  getTasksByStatus(status: TaskStatus): Observable<Task[]> {
    const url = `${this.apiUrl}/status/${status}`;
    return this.http.get<Task[]>(url);
  }

  getTasksByPriority(priority: Priority): Observable<Task[]> {
    const url = `${this.apiUrl}/priority/${priority}`;
    return this.http.get<Task[]>(url);
  }

  getTasksDueBetween(startDate: string, endDate: string): Observable<Task[]> {
    const url = `${this.apiUrl}/due-between`;
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<Task[]>(url, { params });
  }


  getOverdueTasks(): Observable<Task[]> {
    const url = `${this.apiUrl}/overdue`;
    return this.http.get<Task[]>(url);
  }

  countTasksByStatus(status: TaskStatus): Observable<number> {
    const url = `${this.apiUrl}/count/status/${status}`;
    return this.http.get<number>(url);
  }

  searchTasksByKeyword(keyword: string): Observable<Task[]> {
    const url = `${this.apiUrl}/search`;
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Task[]>(url, { params });
  }





}
