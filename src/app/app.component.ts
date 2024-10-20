import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected from styleUrl to styleUrls
})
export class AppComponent {
  title = 'Cars-Store';

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return localStorage.getItem('fullName') !== null;
  }

  getFullName(): string {
    return localStorage.getItem('fullName') || '';
  }

  logout() {
    localStorage.removeItem('userEmail'); // إزالة البريد الإلكتروني
    localStorage.removeItem('fullName'); // إزالة الاسم الكامل
    this.router.navigate(['/login']); // إعادة توجيه إلى صفحة تسجيل الدخول
  }
}
