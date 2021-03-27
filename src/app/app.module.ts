import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { BrandComponent } from './components/brands/brand/brand.component';
import { ColorComponent } from './components/colors/color/color.component';
import { CarComponent } from './components/cars/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/cars/car-detail/car-detail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterColorPipePipe } from './pipes/filter-color-pipe.pipe';
import { FilterBrandPipePipe } from './pipes/filter-brand-pipe.pipe';
import { PaymentComponent } from './components/payment/payment.component';

import { ToastrModule } from 'ngx-toastr';
import { BrandAddComponent } from './components/brands/brand-add/brand-add.component';
import { ColorAddComponent } from './components/colors/color-add/color-add.component';
import { CarAddComponent } from './components/cars/car-add/car-add.component';
import { CarFilterComponent } from './components/cars/car-filter/car-filter.component';
import { BrandUpdateComponent } from './components/brands/brand-update/brand-update.component';
import { ListComponent } from './components/list/list.component';
import { CarUpdateComponent } from './components/cars/car-update/car-update.component';
import { ColorUpdateComponent } from './components/colors/color-update/color-update.component';

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
    CarFilterComponent,
    BrandUpdateComponent,
    ListComponent,
    CarUpdateComponent,
    ColorUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
