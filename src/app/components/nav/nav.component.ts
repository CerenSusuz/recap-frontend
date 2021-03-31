import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user:User={
    id:0,
    firstName:"",
    lastName:"",
    email:"",
    password:""
  }

  constructor(private authService:AuthService,
    private localStorageService:LocalStorageService,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
  }

  isLogOK(){
    return this.authService.isAuthenticated()
  }

  getUser(){
    return this.localStorageService.getItem('user');
    }

  logout(){
    this.authService.logOut();
    this.toastr.info("Log OUT OK");
    this.router.navigate(['/homepage']);
  }

}

