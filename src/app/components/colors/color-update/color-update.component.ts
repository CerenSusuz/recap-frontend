import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup;
  color:Color;

  constructor(private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastr:ToastrService,
    private activatedRoute:ActivatedRoute,
    private router:Router)
     {}

  ngOnInit(): void {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe(parameter=>{
      if(parameter["colorId"]){
        this.getColorById(parameter["colorId"]);
      }
    })
  }

  getColorById(colorId:number){
    this.colorService.getColorById(colorId).subscribe(response=>{
      this.color=response.data;
    })
  }

  createUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      name:["",Validators.required]
    })
  }


  update(){
    if(this.colorUpdateForm.valid){
      let color = Object.assign({},this.colorUpdateForm.value)
      console.log(color);
      color.colorId=this.color.colorId;
      this.colorService.update(color).subscribe(response=>{
        this.toastr.success("UPDATE OK");
        this.router.navigate(['/list']);
      });
    }else{
      this.toastr.error("UPDATE ERROR")
    }
  }


}
