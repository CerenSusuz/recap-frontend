import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService:AuthService,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    
  }

  isLogOK(){
    if(sessionStorage.getItem("token")){
      return true;
    } else {
      return false;
    }
  }

  getUser(){
    return sessionStorage.getItem('fullName');
    }

  logout(){
    this.authService.logOut();
    this.toastr.info("Log OUT OK");
    this.router.navigate(['/homepage']);
  }

}

