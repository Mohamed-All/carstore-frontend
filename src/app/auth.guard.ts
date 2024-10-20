import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userEmail = localStorage.getItem('userEmail'); // الحصول على البريد الإلكتروني من localStorage
  return userEmail === 'mohamedali@gmail.com'; // تحقق إذا كان البريد الإلكتروني يساوي بريدك
};
