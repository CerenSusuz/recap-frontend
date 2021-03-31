import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup;
  car:Car;
  brands:Brand[];
  colors:Color[];

  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private colorService:ColorService,
    private carService:CarService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.createCarUpdateForm()
    this.getBrands()
    this.getColors()
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getCarDetail(params["id"])
      }
    })
  }
  
 createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      minFindexScore:["",Validators.required]
    })
  }

  getCarDetail(carId:number) {
    this.carService.getCarDetail(carId).subscribe((response) => {
      this.car = response.data;
      this.carUpdateForm.setValue({
        colorId: this.car.colorId,
        brandId: this.car.brandId,
        modelYear: this.car.modelYear,
        dailyPrice: this.car.dailyPrice,
        description: this.car.description,
        minFindexScore:this.car.minFindexScore
      })
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data
    })
  }

  update(){
    if(this.carUpdateForm.valid){      
      let carModel = Object.assign({},this.carUpdateForm.value)
      carModel.id = this.car.id;
      this.carService.update(carModel).subscribe(response=>{
        this.toastr.success("UPDATE OK")
        this.router.navigate(['/list']);
      },responseError=>{
        this.toastr.error(responseError.error)
      })
    }else{
      this.toastr.error("UPDATE ERROR")
    }    

  }

}