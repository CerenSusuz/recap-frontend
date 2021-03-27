import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  colorId:number;

  constructor(private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastr:ToastrService,
    private activatedRoute:ActivatedRoute)
     {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"]){
        this.colorId=params["id"];
      }
    })
  }

  getColorById(colorId:number){
    this.colorService.getColorById(colorId).subscribe(response=>{
      this.color=response.data;
    })
  }

  createUpdateForm(colorId:number){
    this.colorUpdateForm = this.formBuilder.group({
      name:["",Validators.required]
    })
  }


  update(){
    if(this.colorUpdateForm.valid){
      let color = Object.assign({},this.colorUpdateForm.value)
      color.colorId = this.colorId;
      console.log(color);
      this.colorService.update(color).subscribe(response=>{
        this.toastr.success("UPDATE OK");
      })
    }else{
      this.toastr.error("UPDATE ERROR")
    }
  }


}
