// chart.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '../../../models/car';
import { CartService } from '../services/cart.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [RouterLink, NgFor, FormsModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  cartItems: Car[] = []; // مصفوفة لتخزين العناصر في السلة

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItems(); // جلب العناصر من السلة
  }

  removeFromCart(car: Car) {
    this.cartItems = this.cartItems.filter(item => item._id !== car._id);
    this.cartService.removeFromCart(car); // إزالة العنصر من الخدمة أيضًا
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + 10.00 + 5.00; // إضافة رسوم الشحن
  }

 
}
