import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  userEditForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private localStorageService:LocalStorageService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.createUserEditForm();
    this.getUser();
  }

  createUserEditForm() {
    this.userEditForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required]
    })
  }

  getUser() {
    this.userService.getByEmail(this.localStorageService.getItem('email')).subscribe(response => {
        this.user = response.data;
        this.userEditForm.setValue({
          firstName:this.user.firstName,
          lastName:this.user.lastName,
          email:this.user.email
        })
      });
  }

  edit() {
    if (this.userEditForm.valid) {
      let userModel = Object.assign({}, this.userEditForm.value);
      console.log(userModel)
      this.userService.update(userModel).subscribe(response => {
        this.toastr.success("EDIT OK");
        this.router.navigate(['/homepage'])
      }, responseError => {
        this.toastr.error(responseError.error);
      })
    } else {
      this.toastr.error("EDIT ERROR")
    }

  }



}
