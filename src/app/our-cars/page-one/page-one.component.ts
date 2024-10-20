import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import { Car } from '../../../../models/car';
import { CurrencyPipe, NgFor } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-page-one',
  standalone: true,
  imports: [RouterLink , CurrencyPipe,NgFor],
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css']
})
export class PageOneComponent implements OnInit {
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

    AOS.init({
      duration: 1000,
      once: true,
    });

    this.getAllCars().subscribe(
      (data) => {
        this.allCars = data.slice(0, 9);
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
