import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AddEmployeePageComponent } from './pages/add-employee-page/add-employee-page.component';
import {EmployeeDetailsPageComponent} from './pages/employee-details-page/employee-details-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'add-employee',
    component: AddEmployeePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'details/:id',
    component: EmployeeDetailsPageComponent,
    pathMatch: 'full',
  }
];
