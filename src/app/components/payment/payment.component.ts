import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import { Rental } from 'src/app/models/rental';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rental:Rental;
  car:Car;
  amountOfPayment:number=0;

  constructor(private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private router:Router,
    private toastr: ToastrService, 
    private paymentService:PaymentService

    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        this.rental = JSON.parse(params['rental']);
        this.getCar();
      }
    })
  }

  getCar(){
    this.carService.getCarDetail(this.rental.carID).subscribe(response => {
     this.car= response.data;
     this.totalPayment(); 
    })
  }

  totalPayment(){

    if(this.rental.returnDate != null )
    {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();

      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      
      this.amountOfPayment = numberOfDays * (this.car.dailyPrice + ( this.car.dailyPrice * 8 / 100));
      
      if(this.amountOfPayment <= 0)
      {
         this.router.navigate(['/cars']);
         this.toastr.error("You are being redirected to the car list", "Incorrect process");
      }

    }
  }

  payment(){
    this.paymentService.payment(this.rental,this.amountOfPayment).subscribe(response => {
      this.router.navigate(['/cars']);
      this.toastr.success(response.message.toString(), "Successfully Process");
    })
  }

}
