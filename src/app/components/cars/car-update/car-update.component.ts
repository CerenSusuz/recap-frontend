import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup;
  car:Car;
  id:number;

  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.id=params["id"];
        this.createCarUpdateForm(params["id"]);
        this.getCarDetails(params["id"]);
        
      }
    })
  }

  getCarDetails(id:number)
  {
    this.carService.getCarDetail(id).subscribe(response => {
      this.car = response.data;
      console.log(response);
    })
  }

  createCarUpdateForm(carId:number){
    this.carUpdateForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:[""]
    })
  }


  update(){
    if(this.carUpdateForm.valid){
      let car = Object.assign({},this.carUpdateForm.value);
      car.id=this.id;
      console.log(car);
      this.carService.update(car).subscribe(response=>{
        this.toastr.success("UPDATE OK")
      },responseError=>{
        if(responseError.error.Errors>0){
          for (let i = 0; i < responseError.error.Errors ; i++) {
            this.toastr.error(responseError.error.Errors[i].ErrorMessage);
          }
        }
      })
    
    }else{
      this.toastr.error("Update Error")
    }
  }
}
