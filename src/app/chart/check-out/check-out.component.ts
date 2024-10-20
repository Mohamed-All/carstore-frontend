import { Component } from '@angular/core';
import { Car } from '../../../../models/car';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [NgFor,CurrencyPipe],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {
  cartItems: Car[] = [];
  grandTotal: number = 0; // خاصية جديدة للمجموع الكلي

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // الاشتراك في cartItems$ للحصول على تحديثات السلة
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateGrandTotal(); // تحديث المجموع الكلي عند تغير العناصر في السلة
    });
  }

  // دالة لحساب المجموع الكلي
  // دالة لحساب المجموع الكلي
  calculateGrandTotal(): number {
    return this.cartItems.reduce((total, item) => {
        const quantity = item.quantity || 0; // تعيين الكمية على 0 إذا كانت غير معرفة
        return total + (item.price * quantity);
    }, 0);
}


  onSubmit() {
    console.log('Submitting order with items:', this.cartItems);
    // يمكن إضافة منطق لإرسال الطلب إلى الخادم هنا
  }
}
