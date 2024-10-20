  import { HttpClient } from '@angular/common/http';
  import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Car,  } from '../../../models/car';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

  @Component({
    selector: 'app-our-cars',
    standalone: true,
    imports: [FormsModule,CommonModule,RouterLink,RouterOutlet],
    templateUrl: './our-cars.component.html',
    styleUrl: './our-cars.component.css'
  })
  export class OurCarsComponent {

    // httpClient= inject(HttpClient)
    constructor(private httpClient:HttpClient){}
    allcars: Car[]=[]

    getAllCars(){
      return this.httpClient.get<Car[]>('http://localhost:3000/cars/all');
    }
 
    ngOnInit() {
      this.getAllCars().subscribe((data) => {
        this.allcars = data;

      });
 
    
  }
}
