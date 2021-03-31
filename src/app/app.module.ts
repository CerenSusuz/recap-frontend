import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { BrandComponent } from './components/brands/brand/brand.component';
import { ColorComponent } from './components/colors/color/color.component';
import { CarComponent } from './components/cars/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rentals/rental/rental.component';
import { CarDetailComponent } from './components/cars/car-detail/car-detail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterColorPipePipe } from './pipes/filter-color-pipe.pipe';
import { FilterBrandPipePipe } from './pipes/filter-brand-pipe.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandAddComponent } from './components/brands/brand-add/brand-add.component';
import { ColorAddComponent } from './components/colors/color-add/color-add.component';
import { CarAddComponent } from './components/cars/car-add/car-add.component';
import { BrandUpdateComponent } from './components/brands/brand-update/brand-update.component';
import { ListComponent } from './components/list/list.component';
import { ColorUpdateComponent } from './components/colors/color-update/color-update.component';
import { BrandListComponent } from './components/brands/brand-list/brand-list.component';
import { ColorListComponent } from './components/colors/color-list/color-list.component';
import { RentalListComponent } from './components/rentals/rental-list/rental-list.component';

import { ToastrModule } from 'ngx-toastr';
import { CarUpdateComponent } from './components/cars/car-update/car-update.component';
import { CarImageAddComponent } from './components/cars/car-image-add/car-image-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    BrandComponent,
    ColorComponent,
    CarComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent,
    VatAddedPipe,
    FilterColorPipePipe,
    FilterBrandPipePipe,
    PaymentComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    BrandUpdateComponent,
    ListComponent,
    ColorUpdateComponent,
    BrandListComponent,
    ColorListComponent,
    RentalListComponent,
    CarUpdateComponent,
    CarImageAddComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    FontAwesomeModule

  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
