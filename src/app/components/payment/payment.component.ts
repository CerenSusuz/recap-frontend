import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import { Rental } from 'src/app/models/rental';
import { Car } from 'src/app/models/car';
import { Payment } from 'src/app/models/payment';
import { environment } from 'src/environments/environment';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CreditCard } from 'src/app/models/creditCard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rental: Rental;
  car: Car;
  amount: number;

  imageURL = environment.baseURL;

  cardNumber: string;
  nameOnTheCard: string;
  expirationDate: string;
  cvv: number;
  cardId: number;

  creditCards: CreditCard[] = [];
  cardAddForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private router: Router,
    private toastr: ToastrService,
    private paymentService: PaymentService,
    private creditCardService: CreditCardService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.getCar();
        this.getCardByCustomer();
        this.createCreditCardForm();
      }
    })
  }

  createCreditCardForm() {
    this.cardAddForm = this.formBuilder.group({
      customerCard: ['', Validators.required],
      nameOnTheCard: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvv: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }

  save() {
    let cardModel: CreditCard = {
      cardNumber: this.cardNumber,
      nameOnTheCard: this.nameOnTheCard,
      expirationDate: this.expirationDate,
      cvv: this.cvv,
      customerId: this.rental.customerID,
    };
    this.creditCardService.add(cardModel).subscribe((response) => {
      this.toastr.success('SAVE OK');
      this.payment();
    }, responseCardError => {
      this.toastr.error('ERRORR');
    }
    );
  }

  notSave() {
    this.payment();
  }

  getCardByCustomer() {
    this.creditCardService.getByCustomerId(this.rental.customerID).subscribe(response => {
      this.creditCards = response.data;
      console.info(this.creditCards);
      this.setCard();
    });
  }

  setCard() {
    this.creditCards.forEach(response => {
      this.cardNumber = response.cardNumber;
      this.nameOnTheCard = response.nameOnTheCard;
      this.expirationDate = response.expirationDate;
      this.cvv = response.cvv;
    });
  }

  setCardInfos() {
    this.cardAddForm.patchValue({
      cardNumber: this.cardNumber,
      nameOnTheCard: this.nameOnTheCard,
      expirationDate: this.expirationDate,
      cvv: this.cvv,
    });
  }

  getCar() {
    this.carService.getCarDetail(this.rental.carID).subscribe(response => {
      this.car = response.data;
      this.totalPayment();
    })
  }

  totalPayment() {
    if (this.rental.returnDate != null) {
      let dateRent = new Date(this.rental.returnDate.toString());
      let dateReturn = new Date(this.rental.rentDate.toString());
      let difference = (dateRent.getTime() - dateReturn.getTime());
      let differenceOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      if (differenceOfDays == 0) {
        differenceOfDays = 1;
      }
      this.amount = differenceOfDays * (this.car.dailyPrice + (this.car.dailyPrice * 8 / 100)); //calculate with VAT
    }
  }

  payment() {
    if (this.amount > 100) {
      let paymentModel: Payment = {
        amount: this.amount
      }
      console.log(paymentModel.amount)
      this.paymentService.payment(paymentModel).subscribe(response => {
        this.toastr.success("Payment OK");
      }, error => {
        console.log(error)
        this.toastr.error(error.error);
      }
      )
    }
  }


}
