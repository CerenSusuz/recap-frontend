import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {

cars : Car[];
brands: Brand[] = [];
colors : Color[] = [];
currentCar:Car;

brandFilter: number;
colorFilter: number;

basePath= environment.baseURL;

  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }else if(params["colorId"]){
         this.getCarsByColor(params["colorId"]);
      }else if(params["selectedBrandId"] && params["selectedColorId"]){
        this.getCarsByBrandandColor(params["selectedBrandId"],params["selectedColorId"]);
      }else{
        this.getCars();
      }
    })
  }


  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getSelectedBrand(brandId: number) {
    if (this.brandFilter == brandId)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  
  getSelectedColor(colorId: number) {
    if (this.colorFilter == colorId)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response => {
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
  
  getCarsByBrandandColor(brandId:number, colorId: number) {
      this.carService.getCarsByBrandAndColor(brandId,colorId).subscribe(response => {
      this.cars = response.data
    })
    
  }

  deneme(brandId:number,colorId:number){
    this.brandFilter=brandId;
    this.colorFilter=colorId;
  }






}

