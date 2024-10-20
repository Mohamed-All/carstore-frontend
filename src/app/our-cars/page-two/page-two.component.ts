import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '../../../../models/car';
import { NgFor } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-page-two',
  standalone: true,
  imports: [RouterLink,NgFor],
  templateUrl: './page-two.component.html',
  styleUrl: './page-two.component.css'
})
export class PageTwoComponent {
  httpClient = inject(HttpClient); // حقن خدمة HttpClient
  allCars: Car[] = []; // مصفوفة لتخزين السيارات

  constructor(private cartService: CartService) {}
 private carsSubject = new BehaviorSubject<Car[]>([]);
 cars$ = this.carsSubject.asObservable();



  // دالة لجلب جميع السيارات
  getAllCars() {
    return this.httpClient.get<Car[]>('http://localhost:3000/cars/all');
  }

  ngOnInit() {


    this.getAllCars().subscribe(
      (data) => {
        this.allCars = data.slice(9,18);
      },
      error => {
        console.error('Error fetching cars', error); // معالجة الأخطاء
      }
    );
    
  }

  addToCart(car: Car) {
    this.cartService.addToCart(car);
  }
}
