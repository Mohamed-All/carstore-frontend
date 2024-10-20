import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '../../../../models/car';
import { CartService } from '../../services/cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pagethree',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './pagethree.component.html',
  styleUrls: ['./pagethree.component.css']
})
export class PagethreeComponent {
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
        this.allCars = data.slice(18,27);
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
