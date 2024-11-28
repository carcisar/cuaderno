import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../models/board.model';
import { BoardWithTasks } from '../models/board-with-tasks.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private apiUrl = 'http://localhost:8090/boards';

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los tableros
   */
  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.apiUrl);
  }

  /**
   * Obtener un tablero por su ID
   */
  getBoardById(boardId: number): Observable<Board> {
    return this.http.get<Board>(`${this.apiUrl}/${boardId}`);
  }

  /**
   * Obtener un tablero junto con sus tareas
   */
  getBoardWithTasks(boardId: number): Observable<BoardWithTasks> {
    return this.http.get<BoardWithTasks>(`${this.apiUrl}/${boardId}/tasks`);
  }

  /**
   * Crear un nuevo tablero
   */
  createBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(this.apiUrl, board);
  }

  /**
   * Actualizar un tablero existente
   */
  updateBoard(boardId: number, board: Board): Observable<Board> {
    return this.http.put<Board>(`${this.apiUrl}/${boardId}`, board);
  }

  /**
   * Eliminar un tablero por su ID
   */
  deleteBoard(boardId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${boardId}`);
  }
}
