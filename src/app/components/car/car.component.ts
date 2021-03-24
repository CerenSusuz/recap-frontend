import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {
cars : Car[];
brands: Brand[] = [];
currentCar:Car;
dataLoaded = false;
basePath= environment.baseURL;

  constructor(
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }else if(params["brandId"] && params["colorId"]){
        this.getCarsByBrandandColor(params["brandId"],params["colorId"]);
      }else{
        this.getCars();
      }
    })
  }
  
  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data,
      this.dataLoaded = true
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data,
      this.dataLoaded = true
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data,
      this.dataLoaded = true
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
      this.cars = response.data,
      this.dataLoaded=true;
    })
    
  }

}

