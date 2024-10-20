import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, NgFor,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // تأكد من كتابة 'styleUrls' وليس 'styleUrl'
})
export class DashboardComponent {
  cars: any[] = [];
  car: any = {
    name: '',
    brand: '',
    model: '',
    km: '',
    price: '',
    location: '',
    description: '',
    type: '',
  };
  selectedCarId: string | null = null;
  selectedFile: File | null = null; // ملف الصورة المحدد

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const loggedInEmail = localStorage.getItem('userEmail'); 
    if (loggedInEmail !== 'mohamedali@gmail.com') {
      alert('Access denied. You do not have permission to view this page.');
      this.router.navigate(['/']); // توجيه المستخدم إلى الصفحة الرئيسية
    } else {
      this.fetchCars(); // جلب السيارات إذا كان المستخدم هو المصرح له
    }
  }

  fetchCars() {
    this.http.get('http://localhost:3000/cars/all').subscribe(
      (response: any) => {
        this.cars = response;
      },
      error => {
        console.error('Error fetching cars', error);
      }
    );
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0]; // حفظ الملف المحدد
    }
  }

  addCar() {
    const formData = new FormData();
    formData.append('name', this.car.name);
    formData.append('brand', this.car.brand);
    formData.append('model', this.car.model);
    formData.append('km', this.car.km);
    formData.append('price', this.car.price);
    formData.append('location', this.car.location);
    formData.append('description', this.car.description);
    formData.append('type', this.car.type);
    if (this.selectedFile) {
      formData.append('img', this.selectedFile); // إضافة الصورة إلى FormData
    }

    this.http.post('http://localhost:3000/cars/add', formData).subscribe(
      (response: any) => {
        this.fetchCars(); // جلب السيارات بعد الإضافة
        this.resetForm(); // إعادة تعيين النموذج
        alert('Car has been added successfully!');
      },
      error => {
       alert('Error adding car');
      }
    );
  }

  updateCar() {
    if (this.selectedCarId) {
      const formData = new FormData();
      formData.append('name', this.car.name);
      formData.append('brand', this.car.brand);
      formData.append('model', this.car.model); 
      formData.append('km', this.car.km);
      formData.append('price', this.car.price);
      formData.append('location', this.car.location);
      formData.append('description', this.car.description);
      formData.append('type', this.car.type);
      if (this.selectedFile) {
        formData.append('img', this.selectedFile); // إضافة الصورة إلى FormData
      }

      this.http.put(`http://localhost:3000/api/cars/${this.selectedCarId}`, formData).subscribe(
        (response: any) => {
          this.fetchCars(); // جلب السيارات بعد التحديث
          this.resetForm(); // إعادة تعيين النموذج
        },
        error => {
          console.error('Error updating car', error);
        }
      );
    }
  }

  deleteCar(id: string) {
    this.http.delete(`http://localhost:3000/api/cars/${id}`).subscribe(
      (response: any) => {
        this.fetchCars(); // جلب السيارات بعد الحذف
      },
      error => {
        console.error('Error deleting car', error);
      }
    );
  }

  selectCar(car: any) {
    this.selectedCarId = car._id; // حفظ ID السيارة المحددة
    this.car = { ...car }; // ملء النموذج بالمعلومات الخاصة بالسيارة المحددة
  }

  resetForm() {
    this.car = {
      name: '',
      brand: '',
      model: '',
      km: '',
      price: '',
      location: '',
      description: '',
      type: '',
    };
    this.selectedFile = null; // إعادة تعيين ملف الصورة
    this.selectedCarId = null; // إعادة تعيين ID السيارة المحددة
  }
}
