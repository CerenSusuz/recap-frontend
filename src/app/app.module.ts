import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterColorPipePipe } from './pipes/filter-color-pipe.pipe';
import { FilterBrandPipePipe } from './pipes/filter-brand-pipe.pipe';
import { CarFilterComponent } from './components/car/car-filter/car-filter.component';
import { PaymentComponent } from './components/payment/payment.component';


import { ToastrModule } from 'ngx-toastr';


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
    CarFilterComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
