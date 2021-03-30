import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { LoginModel } from 'src/app/models/loginModel';

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
    private localStorageService:LocalStorageService,
    private router:Router,
    private userService:UserService) { }

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

        this.localStorageService.setItem("token",response.data.token);
        this.getUserByEmail(loginModel.email);

        this.toastr.info(response.message)
        this.router.navigate(['/homepage'])
         
      },responseError=>{
        console.log(responseError)
        this.toastr.error(responseError.error)
      })
    }else{
      this.toastr.warning("ERROR");
    }
  }

  getUserByEmail(email: string) {
    this.userService.getByEmail(email).subscribe(response => {
       this.user = response.data;
       this.localStorageService.setItem("user",this.user);
    });
 }



}
