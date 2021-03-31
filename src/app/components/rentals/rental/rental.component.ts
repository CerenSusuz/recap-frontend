import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Car } from 'src/app/models/car';
import { RentalService } from 'src/app/services/rental.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})

export class RentalComponent implements OnInit {

  rentals: Rental[] = [];
  customers: Customer[];

  customerId: number;
  rentDate: Date;
  returnDate: Date;
  rentBeginDate: Date;
  rentEndDate: Date;

  @Input() car: Car;


  constructor(
    private rentalService: RentalService,
    private authService:AuthService,
    private router: Router,
    private customerService: CustomerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  isLogOK(){
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      this.toastr.error("Must be Login or Register")
      this.router.navigate(['/homepage'])
      return false;
    }
  }

  getCustomer() {
    this.customerService.getCustomer().subscribe(response => {
      this.customers = response.data;
    })
  }

  getDate(day: number) {
    var today = new Date();
    today.setDate(today.getDate() + day);
    return today.toISOString().slice(0, 10)
  }

  create() {
    let rental: Rental =
    {
      carID: this.car.id,
      customerID: parseInt(this.customerId.toString()),
      rentDate: this.rentDate,
      returnDate: this.returnDate
    }
    this.rentalService.add(rental).subscribe(repsonse=>{
      this.toastr.info("Navigate to  Payment Page");
      this.toastr.success("RENT OK");
      this.router.navigate(['/payment', JSON.stringify(rental)]);
    },error=>{
      console.info(error)
      this.toastr.error(error.error)
      this.toastr.error(error.error.Message)
    })
  }
}
