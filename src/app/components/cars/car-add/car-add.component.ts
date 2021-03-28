import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm : FormGroup;

  brands:Brand[];
  brandId:number;

  colors:Color[];
  colorId:number;

  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({  
      brandName:["",Validators.required],
      colorName:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
       this.colors = response.data;
    })
  }

  add(){
    if(this.carAddForm.valid){
      this.carAddForm.addControl("brandId",new FormControl(this.carAddForm.get("brandName")?.value.id,Validators.required))
      this.carAddForm.addControl("colorId",new FormControl(this.carAddForm.get("colorName")?.value.id,Validators.required))
      let carModel = Object.assign({},this.carAddForm.value)
      this.carService.add(carModel).subscribe(response=>{
        console.log(carModel);
        this.toastr.success("Add OK")
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length ; i++) {
            this.toastr.error(responseError.error.ValidationErrors[i].ErrorMessage);
          }
        }
      })

    }
    else{
      this.toastr.error("Add Error")
    }
    
  }
}
