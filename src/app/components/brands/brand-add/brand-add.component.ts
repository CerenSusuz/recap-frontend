import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';


@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm : FormGroup;

  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      name:["",Validators.required]
    })
  }

  add(){
    if(this.brandAddForm.valid)
    {
      let brandModel:Brand = Object.assign({}, this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(response=>{
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
