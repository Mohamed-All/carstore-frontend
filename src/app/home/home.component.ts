import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var $: any; // استدعاء jQuery

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink , CommonModule,],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isScrolled = false; // حالة التمرير

  ngOnInit() {
    this.initializeSlickSlider();
    this.initializeCounters();
  }

  initializeSlickSlider() {
    $('.slick-carousel').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });

    // تغيير لون الأزرار بعد تحميل الـ Slick
    this.styleSlickArrows();
  }

  styleSlickArrows() {
    const prevButton = $('.slick-prev');
    const nextButton = $('.slick-next');

    prevButton.css({
      'background-color': 'black',
      'color': 'white',
      'border': 'none',
      'padding': '10px',
      'border-radius': '50%'
    });

    nextButton.css({
      'background-color': 'black',
      'color': 'white',
      'border': 'none',
      'padding': '10px',
      'border-radius': '50%'
    });

    // تغيير لون الأزرار عند المرور بالفأرة
    prevButton.hover(
      () => prevButton.css('background-color', '#333'),
      () => prevButton.css('background-color', 'black')
    );

    nextButton.hover(
      () => nextButton.css('background-color', '#333'),
      () => nextButton.css('background-color', 'black')
    );
  }

  initializeCounters() {
    const counters = document.querySelectorAll<HTMLElement>('.counter');
    const speed: number = 200; // سرعة العداد

    counters.forEach(counter => {
      const target: number = +counter.getAttribute('data-target')!;
      const increment: number = target / speed;

      const updateCount = () => {
        const count: number = +counter.innerText;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment).toString();
          requestAnimationFrame(updateCount); // استخدم requestAnimationFrame لتحسين الأداء
        } else {
          counter.innerText = target.toString();
        }
      };

      updateCount();
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // تغيير الحالة عند التمرير أكثر من 50 بيكسل
  }



  
}
