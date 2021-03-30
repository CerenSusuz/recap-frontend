import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDelete } from 'src/app/models/carDelete';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  cars:Car[];
  currentCar:Car;

  brands:Brand[];
  currentBrand:Brand;

  colors:Color[];
  currentColor:Color;

  constructor(private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.getCars();
    this.getBrands();
    this.getColors();
    
  }

  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data
    })
  }

  getCarClass(car:Car){

    if(car == this.currentCar){
      return "table-info cursorPointer"
    }else{
      return "cursorPointer"
    }
  }

  setCurrentCar(car:Car){
    this.currentCar=car;
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  getBrandClass(brand:Brand){
    if(brand == this.currentBrand){
      return "list-group-item cursorPointer active"
    }else{
      return "list-group-item cursorPointer "
    }
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  getColorClass(color:Color){
    if(color == this.currentColor){
      return "list-group-item cursorPointer active"
    }else{
      return "list-group-item cursorPointer "
    }
  }

  setCurrentColor(color:Color){
    this.currentColor=color;
  }

  deleteCar(car:Car){
    let carModel:CarDelete={
      id:car.id,
      brandId:car.brandId,
      colorId:car.colorId,
      modelYear:car.modelYear,
      dailyPrice:car.dailyPrice,
      description:car.description,
      minFindexScore:car.minFindexScore
    }
    this.carService.delete(carModel).subscribe(response=>{
      this.toastr.success("DELETE OK")
      window.location.reload()
    },responseError=>{
      this.toastr.error("ERRROR")
    })
  }

  deleteBrand(brand:Brand){
    this.brandService.delete(brand).subscribe(response=>{
      this.toastr.success("DELETE OK")
      window.location.reload()
    },responseError=>{
      this.toastr.error("ERRROR")
    })
  }

  deleteColor(color:Color){
    this.colorService.delete(color).subscribe(response=>{
      this.toastr.success("DELETE OK")
      window.location.reload()
    },responseError=>{
      this.toastr.error("ERRROR")
    })
  }
  
}
