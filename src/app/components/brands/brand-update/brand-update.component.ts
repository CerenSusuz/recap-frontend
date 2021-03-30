import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';


@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm:FormGroup;
  brand:Brand;

  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastr:ToastrService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.activatedRoute.params.subscribe((parameter) => {
      if (parameter['brandId']) {
        this.getBrandById(parameter['brandId']);
      }
    });
  }

  getBrandById(id: number) {
    this.brandService.getBrandById(id).subscribe((response) => {
        this.brand = response.data;
        this.brandUpdateForm.setValue({
          name:this.brand.name
        })
      }
    );
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  update() {
    if (this.brandUpdateForm.valid) {
      let brand: Brand = this.brandUpdateForm.value;
      brand.brandId = this.brand.brandId;
      this.brandService.update(brand).subscribe((response) => {
          this.toastr.success("UPDATE OK");
          this.router.navigate(['/list']);
        },responseError=>{
          if(responseError.error.ValidationErrors.length>0){
            for (let i = 0; i < responseError.error.ValidationErrors.length ; i++) {
              this.toastr.error(responseError.error.ValidationErrors[i].ErrorMessage);
            }
          }
        });
    }else{
      this.toastr.warning('UPDATE ERROR');
    }
  }
}