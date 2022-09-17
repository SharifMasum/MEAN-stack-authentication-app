import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'flash-messages-angular/module/flash-messages.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [FlashMessagesService]
})
export class RegisterComponent implements OnInit {
  name!: String;
  username!: String;
  email!: String;
  password!: String;

  constructor(
    private validateService: ValidateService, 
    private flashMessages: FlashMessagesService
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
    if(!this.validateService.validateEmail(this.email)){
      this.flashMessages.show('Please use a valid email', 
      {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
  }

}
