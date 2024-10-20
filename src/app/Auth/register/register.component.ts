import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const registerData = {
      full_name: this.fullName, // تأكد من استخدام الاسم الصحيح
      email: this.email,
      password: this.password,
      confirm_password: this.confirmPassword // تأكد من الاسم هنا أيضًا
    };

    this.http.post('http://localhost:3000/api/auth/register', registerData)
    .subscribe({
      next: (res: any) => {
        console.log('Registration successful!', res);
        alert(res.message);  // أو أي شيء تريد القيام به
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        alert('Registration failed: ' + error.error.message);  // عرض الرسالة من الخادم
      }
    });
  
  }
}
