import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './Auth/register/register.component';
import { OurCarsComponent } from './our-cars/our-cars.component';
import { PageOneComponent } from './our-cars/page-one/page-one.component';
import { PageTwoComponent } from './our-cars/page-two/page-two.component';
import { CarDetailsComponent } from './our-cars/car-details/car-details.component';
import { ChartComponent } from './chart/chart.component';
import { CheckOutComponent } from './chart/check-out/check-out.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { PagethreeComponent } from './our-cars/pagethree/pagethree.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { 
        path: 'ourcars', 
        component: OurCarsComponent, 
        children: [
            { path: 'pageone', component: PageOneComponent },
            {path:'pagetwo', component:PageTwoComponent},
            {path:'pagethree',component:PagethreeComponent},
            {path:'car-details/:id', component:CarDetailsComponent}  
        ] 
    },
    {
        path:'chart', component:ChartComponent, //
    },
    {path:'chart/check-out', component:CheckOutComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }, 
    { path: '**', component:PagenotfoundComponent } 
];
