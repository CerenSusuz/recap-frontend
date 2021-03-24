import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Car } from 'src/app/models/car';
import { RentalService } from 'src/app/services/rental.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})

export class RentalComponent implements OnInit {

  rentalAddForm : FormGroup;
  rentals:Rental[] = [];
  customers:Customer[];
  customerId:number;
  rentDate:Date;
  returnDate:Date;
  @Input() car:Car;
  
  
  constructor(
    private rentalService:RentalService,
    private router:Router,
    private customerService:CustomerService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    //this.getRental();
    this.getCustomer();
  }

  // getRental(){
  //   this.rentalService.getRental().subscribe(response => {
  //     this.rentals = response.data;
  //     this.dataLoaded = true;
  //     console.log(this.rentals);
  //   })
  // }

  getCustomer(){
    this.customerService.getCustomer().subscribe(response => {
      this.customers = response.data;
    })
  }

  getRentMinDate(){
    var today  = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0,10)
  }

  getReturnMinDate(){
    var today  = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0,10)
  }

  add(){   
    let rental:Rental = 
      {
        carID: this.car.id,
        customerID: parseInt(this.customerId.toString()),
        rentDate: this.rentDate,
        returnDate: this.returnDate
      }
        this.rentalService.add(rental).subscribe(data=>{
        this.toastr.success("Successfully!");
        })
        
        this.router.navigate(['/payment', JSON.stringify(rental)]);
    }
}
