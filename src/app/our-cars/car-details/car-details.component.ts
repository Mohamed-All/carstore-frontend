import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Car } from '../../../../models/car';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent {

  carId: any;
  car: Car = new Car();

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {}

  getCar() {
    this.carId = this.activatedRoute.snapshot.params['id'];
    return this.httpClient.get<Car>(`http://localhost:3000/cars/one/${this.carId}`); // تأكد من صحة الرابط
  }

  ngOnInit() {
    this.getCar().subscribe((data) => { this.car = data; });
  }
}
