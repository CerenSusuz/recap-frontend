import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import { Rental } from 'src/app/models/rental';
import { Car } from 'src/app/models/car';
import { Payment } from 'src/app/models/payment';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rental:Rental;
  car:Car;
  amount:number;

  creditCardForm:FormGroup;
  creditCard:CreditCard = {
  customerId: 0,
  nameOnTheCard:"",
  cardNumber: "",
  expirationDate: "",
  cvv: 0
  }
  cards:CreditCard[]=[];
  saveCard:boolean;


  imageURL=environment.baseURL;

  constructor(private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private carService:CarService,
    private router:Router,
    private toastr: ToastrService, 
    private paymentService:PaymentService,
    private creditCardService:CreditCardService

    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        this.rental = JSON.parse(params['rental']);
        this.getCar();
        this.createCreditCardAddForm();
        this.getCards(this.rental.customerID);
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

  createCreditCardAddForm(){
    this.creditCardForm = this.formBuilder.group({
      nameOnTheCard:['',Validators.required],
      cardNumber:['',Validators.required],
      expirationDate:['',Validators.required],
      cvv:['',Validators.required]
    })
  }

  getCards(customerId:number){
    this.creditCardService.getByCustomerId(customerId).subscribe(response=>{
      this.cards=response.data;
    })
  }
  
  saveCreditCard(){
    let cardModel:CreditCard={
      customerId:this.cards[0].customerId,
      cardNumber:this.creditCard.cardNumber,
      nameOnTheCard:this.creditCard.nameOnTheCard,
      expirationDate:this.creditCard.expirationDate,
      cvv:this.creditCard.cvv
    }
    this.creditCardService.add(cardModel).subscribe(response=>{
      this.toastr.success("Card Add ok");
    },responseError=>{
      this.toastr.error(responseError.error);
    })
  }

  cardSelectChangeHandler(event: any) {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].id == event.target.value) {
        this.creditCard = this.cards[i];
      }
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
        this.router.navigate(['/cars'])
      },error=>{
        console.log(error)
        this.toastr.error(error.error);
      }
      )
    }
  }
}
