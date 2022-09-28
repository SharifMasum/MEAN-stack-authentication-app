import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  //providers: [FlashMessagesService]
})
export class RegisterComponent implements OnInit {
  name!: String;
  username!: String;
  email!: String;
  password!: String;
  dataRegister: any;

  constructor(
    private validateService: ValidateService, 
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name!,
      email: this.email!,
      username: this.username!,
      password: this.password!
    }

    //var flashMessages = this.flashMessages

    // Required fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessages.show(
        'Please fill all fields', 
        {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    // Validate email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessages.show('Please use a valid email', 
      {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      this.dataRegister = data;
      if(this.dataRegister.success){
        this.flashMessages.show('You are now registered and can login', 
      {cssClass: 'alert-success', timeout:3000});
      this.router.navigate(['/login']);
      } else {
        this.flashMessages.show('Something went wrong', 
      {cssClass: 'alert-danger', timeout:3000});
      this.router.navigate(['/register']);
      }
    })
  }

}
