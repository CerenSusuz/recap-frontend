import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user:User;
  imageURL=environment.baseURL;

  constructor(private authService:AuthService,
    private toastr:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register() {
    if(this.registerForm.valid){
      let registerModel:RegisterModel = Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>{
        console.log(response);
        localStorage.setItem("token",response.data.token);
        this.getUserByEmail(registerModel.email);
        this.toastr.info(response.message)
        this.router.navigate(['/login'])
      }, responseError=>{
        console.error(responseError)
        this.toastr.error(responseError.error);
      });
    }
    else{
      this.toastr.warning('ERROR');
    }
  }

  getUserByEmail(email: string) {
    this.userService.getByEmail(email).subscribe(response => {
       this.user = response.data;
    });
 }


}
