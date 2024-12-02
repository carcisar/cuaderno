import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/']); // Redirigir al home o dashboard
        },
        error: (err) => {
          alert(`Error en el login: ${err.error.message || err.error}`);
        }
      });
  }
}
