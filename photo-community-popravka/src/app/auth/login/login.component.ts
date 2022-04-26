import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { UserService } from 'src/app/core/user.service';
import { emailValidator } from '../util';

const myRequired = (control: AbstractControl) => {
  // console.log('validator called');
  return Validators.required(control);
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';

  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', { validators: [myRequired, emailValidator], updateOn: 'submit' }),
    password: new FormControl(null, [Validators.required, Validators.minLength(5)])
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private messageBus: MessageBusService,
    private router: Router) { }

  ngOnInit(): void {

  }


  handleLogin(): void {
    
    this.errorMessage = '';
    this.authService.login$(this.loginFormGroup.value).subscribe({
      next: () => {
        if (this.activatedRoute.snapshot.queryParams['redirect-to']) {
          this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['redirect-to'])
          //ako ima neshto setnato s redirect-to izpylni gornoto
        } else {
          this.router.navigate(['/home']);
        }

        this.messageBus.notifyForMessage({ text: 'Logged in sucesfully!', type: MessageType.Success })
      },
      complete: () => {
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });
  }
}
