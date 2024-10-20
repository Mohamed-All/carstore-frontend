import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private http: HttpClient, private router: Router) {}

  
  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:3000/api/auth/login', loginData).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        
        // تخزين البريد الإلكتروني
        localStorage.setItem('userEmail', this.email); // تأكد من تخزين البريد الإلكتروني
        localStorage.setItem('fullName', response.full_name); // تخزين الاسم الكامل

        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    );
  }
  }

