import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { LoginModel } from 'src/app/models/loginModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  user:User;
  imageURL=environment.baseURL;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastr:ToastrService,
    private router:Router,
    private userService:UserService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",[Validators.required,Validators.email]],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){

      let loginModel:LoginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        console.log(response);
        localStorage.setItem("token",response.data.token);
        this.toastr.info(response.message)
        this.router.navigate(['/homepage'])
        this.getUser(loginModel.email);
      },responseError=>{
        console.log(responseError)
        this.toastr.error(responseError.error)
      })
    }else{
      this.toastr.warning("ERROR");
    }
  }

  getUser(email:string){
      this.userService.getByEmail(email).subscribe((response) => {
        this.user = response.data;
        console.info(this.user)
        localStorage.setItem("fullName", this.user.firstName + " " + this.user.lastName);
        localStorage.setItem("email",this.user.email)
      });
  }



}
