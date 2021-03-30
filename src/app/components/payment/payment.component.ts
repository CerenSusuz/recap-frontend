import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import { Rental } from 'src/app/models/rental';
import { Car } from 'src/app/models/car';
import { Payment } from 'src/app/models/payment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rental:Rental;
  car:Car;
  amount:number;

  imageURL=environment.baseURL;

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
      let dateRent = new Date(this.rental.returnDate.toString());
      let dateReturn = new Date(this.rental.rentDate.toString());
      let difference = (dateRent.getTime() - dateReturn.getTime());
      let differenceOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      if(differenceOfDays==0){
        differenceOfDays=1;
      }
      this.amount = differenceOfDays * (this.car.dailyPrice + ( this.car.dailyPrice * 8 / 100)); //calculate with VAT
    }
  }

  payment(){
    if(this.amount>100){
      let paymentModel:Payment ={
        amount:this.amount
      }
      console.log(paymentModel.amount)
        this.paymentService.payment(paymentModel).subscribe(response => {
        this.toastr.success("Payment OK");
      })
    }
  }

}
