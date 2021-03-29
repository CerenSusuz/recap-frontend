import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brands/brand-add/brand-add.component';
import { BrandListComponent } from './components/brands/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brands/brand-update/brand-update.component';
import { BrandComponent } from './components/brands/brand/brand.component';
import { CarAddComponent } from './components/cars/car-add/car-add.component';
import { CarDetailComponent } from './components/cars/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/cars/car-update/car-update.component';
import { CarComponent } from './components/cars/car/car.component';
import { ColorAddComponent } from './components/colors/color-add/color-add.component';
import { ColorListComponent } from './components/colors/color-list/color-list.component';
import { ColorUpdateComponent } from './components/colors/color-update/color-update.component';
import { ColorComponent } from './components/colors/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ListComponent } from './components/list/list.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalListComponent } from './components/rentals/rental-list/rental-list.component';
import { RentalComponent } from './components/rentals/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"homepage",pathMatch:"full",component:CarComponent},
  {path:"customers",pathMatch:"full",component:CustomerComponent},
  {path:"colors",pathMatch:"full",component:ColorListComponent},
  {path:"brands",pathMatch:"full",component:BrandListComponent},
  {path:"rentals",pathMatch:"full",component:RentalListComponent},


  {path:"cars",component:CarComponent},
  
  {path:"cars/details/:carId",component:CarDetailComponent},
  
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},

  {path:"brands",component:BrandComponent},
  {path:"colors",component:ColorComponent},
  {path:"customers",component:CustomerComponent},
  {path:"rentals",component:RentalComponent},
  {path:"payment/:rental",component:PaymentComponent},
  
  {path:"cars/filter/brand/:selectedBrandId/color/:selectedColorId",component:CarComponent},
  
  {path:"car/add",component:CarAddComponent},
  {path:"color/add",component:ColorAddComponent},
  {path:"brand/add",component:BrandAddComponent},

  {path:"list",component:ListComponent},
  {path:"brand/update/:brandId",component:BrandUpdateComponent},
  {path:"color/update/:colorId",component:ColorUpdateComponent},
  {path:"car/update/:id",component:CarUpdateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
