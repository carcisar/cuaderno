import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = 'USER'; // Por defecto

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.username, this.password, this.role)
      .subscribe({
        next: () => {
          alert('Registro exitoso. Por favor, inicia sesión.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert(`Error en el registro: ${err.error.message || err.error}`);
        }
      });
  }
}
