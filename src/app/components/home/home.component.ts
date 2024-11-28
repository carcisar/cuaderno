import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/board.model';
import { Router } from '@angular/router';
import { BoardService } from '../../services/board.service';
import { BoardWithTasks } from '../../models/board-with-tasks.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  boards: Board[] = [];
  filteredBoards: Board[] = [];
  searchQuery: string = '';
  filterStatus: string = '';
  boardsWithTasks: BoardWithTasks[] = [];

  constructor(private boardService: BoardService, private router: Router) {}

  ngOnInit(): void {
    this.loadBoards();
    this.loadBoardsWithTasks();
  }

  loadBoards(): void {
    this.boardService.getBoards().subscribe(
      (boards) => {
        console.log('Tableros cargados:', boards);
        this.boards = boards;
        this.applyFilters();
      },
      (error) => {
        console.error('Error al cargar los tableros:', error);
      }
    );
  }



  applyFilters(): void {
    this.filteredBoards = this.boards.filter((board) => {
      const matchesSearch =
        board.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus =
        !this.filterStatus || board.status === this.filterStatus;
      return matchesSearch && matchesStatus;
    });
  }

  navigateToBoard(boardId: number): void {
    this.router.navigate([`/tasks/${boardId}`]); // Cambia la ruta a la lista de tareas
  }


  openCreateBoardModal(): void {
    console.log('Abrir modal para crear un tablero');
  }

  loadBoardsWithTasks(): void {
    // Aquí puedes usar un método del servicio para cargar tableros y sus tareas
    this.boardService.getBoards().subscribe((boards) => {
      this.boardsWithTasks = boards.map((board) => ({
        board,
        tasks: [], // Si deseas cargar las tareas individualmente, puedes hacerlo aquí
      }));
    });
  }
}
