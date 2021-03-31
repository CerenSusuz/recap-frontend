import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editProfileForm:FormGroup
  password:FormControl
  email:string;
  user:User;

  constructor(private userService:UserService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.createProfileAddForm();
    this.user = this.localStorageService.getItem("user");
    this.email=this.localStorageService.getItem("email");
    console.log(this.user)
    this.getUser();
  }

  createProfileAddForm(){
    this.editProfileForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  getUser(){
      if(this.user){
        this.userService.getUserById(this.user.id).subscribe(response=>{
            this.user = response.data;
            this.editProfileForm.setValue({
              firstName:this.user.firstName,
              lastName:this.user.lastName,
              email:this.user.email,
              password:""
            })
        },responseError=>{
          this.toastrService.error(responseError.error);
        })
      }
  }

  editProfile(){
    if(this.editProfileForm.valid){
      let profileModel = Object.assign({},this.editProfileForm.value)
      console.log(this.user)
      profileModel.id=this.user.id;
      console.log(profileModel)
      this.userService.update(profileModel).subscribe(response=>{
        this.toastrService.success("Update OK");
        this.router.navigate(['/homepage']);
      },responseError=>{
       this.toastrService.error(responseError.error);
      });
    }else{
      this.toastrService.error("ERROR")
    }
  }

}
