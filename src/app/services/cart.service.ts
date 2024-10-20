import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car } from '../../../models/car';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Car[] = [];
  private cartItemsSubject = new BehaviorSubject<Car[]>(this.cartItems);
  
  // Observable للسماح للمكونات بالاشتراك في التغييرات
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(car: Car): void {
    const existingCar = this.cartItems.find(item => item._id === car._id);
    if (existingCar) {
      existingCar.quantity! += 1; // زيادة الكمية إذا كانت السيارة موجودة
    } else {
      this.cartItems.push({ ...car, quantity: 1 }); // تعيين الكمية إلى 1 عند إضافتها لأول مرة
    }
    this.cartItemsSubject.next(this.cartItems); // تحديث Subject بعد تعديل السلة
  }

  getItems(): Car[] {
    return this.cartItems;
  }

  removeFromCart(car: Car): void {
    this.cartItems = this.cartItems.filter(item => item._id !== car._id);
    this.cartItemsSubject.next(this.cartItems); 
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems); 
  }

  
}
