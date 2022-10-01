import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
//import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router
    //public jwtHelper: JwtHelperService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      (err: any) => {
      console.log(err);
      return false;
    }
    });
    //console.log(this.jwtHelper.isTokenExpired());
  }

}
