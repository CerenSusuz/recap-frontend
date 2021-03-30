import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  carAddForm:FormGroup;

  brands:Brand[];
  colors:Color[];


  constructor(
    private formBuilder:FormBuilder,
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastr: ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createCarAddForm()
    this.getBrands();
    this.getColors();
  }


  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      minFindexScore:["",Validators.required]
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
      let carModel = Object.assign({},this.carAddForm.value)
      console.log(carModel)
      this.carService.add(carModel).subscribe(response=>{
        this.toastr.success("Add OK")
        this.router.navigate(['/list']);
      },responseError=>{
        this.toastr.error("ADD ERROR")
      })
    }
  }
    
  }
  

