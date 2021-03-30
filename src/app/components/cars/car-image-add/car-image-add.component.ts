import { Component, OnInit } from '@angular/core';
import { CarImageService } from 'src/app/services/car-image.service';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { CarImage } from 'src/app/models/carImage';
import { environment } from 'src/environments/environment';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})
export class CarImageAddComponent implements OnInit {

  car:Car;
  images:CarImage[];
  imageUrl = environment.baseURL;
  selectedFile: ImageSnippet;

  constructor( private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private imageService: CarImageService,
    private toastr: ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["id"]){
        this.getCarDetails(params["id"]);
        this.getCarImagesByCarId(params["id"]);
      }
    })
  }

  getCarDetails(carId:number)
  {
    this.carService.getCarDetail(carId).subscribe(response => {
      this.car = response.data;
      console.log(response);
    })
  }

  getCarImagesByCarId(carId:number){
    this.imageService.getCarImagesByCarId(carId).subscribe(response=>{
     this.images=response.data;
     console.log(response);
    })
     
  }

  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
      const file: File = imageInput.files[0];
      const reader = new FileReader();
      console.log(this.car.id)
  
      reader.addEventListener('load', (event: any) => {
  
        this.selectedFile = new ImageSnippet(event.target.result, file);
        this.selectedFile.pending = true;
        this.imageService.uploadImage(this.selectedFile.file,this.car.id).subscribe((response) => {
            this.onSuccess();
          },error => {
            this.onError();
            console.log(error)
            this.toastr.error(error.error.message)
            setTimeout(function(){
              alert("You are redirected back to the operations page");
             }, 200);
             this.router.navigate(['/list']);
            
          })
      });
      reader.readAsDataURL(file);
    }

}
