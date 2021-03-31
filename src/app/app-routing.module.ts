import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brands/brand-add/brand-add.component';
import { BrandListComponent } from './components/brands/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brands/brand-update/brand-update.component';
import { BrandComponent } from './components/brands/brand/brand.component';
import { CarAddComponent } from './components/cars/car-add/car-add.component';
import { CarDetailComponent } from './components/cars/car-detail/car-detail.component';
import { CarImageAddComponent } from './components/cars/car-image-add/car-image-add.component';
import { CarUpdateComponent } from './components/cars/car-update/car-update.component';
import { CarComponent } from './components/cars/car/car.component';
import { ColorAddComponent } from './components/colors/color-add/color-add.component';
import { ColorListComponent } from './components/colors/color-list/color-list.component';
import { ColorUpdateComponent } from './components/colors/color-update/color-update.component';
import { ColorComponent } from './components/colors/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalListComponent } from './components/rentals/rental-list/rental-list.component';
import { RentalComponent } from './components/rentals/rental/rental.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomepageComponent},
  {path:"homepage/:loginModel",pathMatch:"full",component:HomepageComponent},
  {path:"homepage",pathMatch:"full",component:HomepageComponent},

  {path:"colors",component:ColorListComponent,canActivate:[LoginGuard]},
  {path:"brands",component:BrandListComponent,canActivate:[LoginGuard]},
  {path:"rentals",component:RentalListComponent,canActivate:[LoginGuard]},
  {path:"customers",component:CustomerComponent,canActivate:[LoginGuard]},

  {path:"cars",component:CarComponent},
  {path:"cars/details/:carId",component:CarDetailComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},

  {path:"payment/:rental",component:PaymentComponent},
  
  {path:"cars/filter/brand/:selectedBrandId/color/:selectedColorId",component:CarComponent},
  
  {path:"car/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"color/add",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"brand/add",component:BrandAddComponent,canActivate:[LoginGuard]},

  {path:"list",component:ListComponent,canActivate:[LoginGuard]},
  {path:"brand/update/:brandId",component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"color/update/:colorId",component:ColorUpdateComponent,canActivate:[LoginGuard]},
  {path:"car/update/:id",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"car/addImage/:id",component:CarImageAddComponent,canActivate:[LoginGuard]},

  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},

  {path:"user/edit/:id",component:UserEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
