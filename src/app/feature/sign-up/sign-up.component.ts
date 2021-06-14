import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ArtinService } from 'src/app/shared/service/artin.service';
import { MyErrorStateMatcher } from 'src/app/shared/error matcher/error-matcher'
import { passwordMatchValidator } from 'src/app/shared/error matcher/password-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  errorMessage: any;
  hide = true;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private artinService: ArtinService
  ) { }

  ngOnInit(): void {
    this.validateSignupForm();
  }

  validateSignupForm() {
    this.signupForm = this.formbuilder.group({
      firstname: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      username: ['',[Validators.required]],
      password: ['',[Validators.required, validatePassword]],
      confirmpassword: ['',[Validators.required]],
      emailid: ['',[Validators.required, validateEmail]],
      DOB: [''],
      phoneno: ['',[Validators.maxLength(10)]],
    }, { validators: passwordMatchValidator })
  }

  get password() { 
    return this.signupForm.get('password'); 
  }
  get confirmpassword() { 
    return this.signupForm.get('confirmpassword'); 
  }

  onPasswordInput() {
    if (this.signupForm.hasError('passwordMismatch'))
      this.confirmpassword.setErrors([{'passwordMismatch': true}]);
    else
      this.confirmpassword.setErrors(null);
  }

  register() {
    this.errorMessage=null;
    this.artinService.register(this.signupForm.value)
      .subscribe(response => {
        this.router.navigate(['login'])
      },
        err =>
          this.errorMessage = err.error.message);
  }

}

function validateEmail (data:FormControl){
  let pattern = /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  return pattern.test(data.value) ? null : {
      emailError: {
          message: "Please enter a valid email address"
      }
  }
}

function validatePassword (data:FormControl){
  let pattern = /(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}))/;
  return pattern.test(data.value) ? null : {
      passwordError: {
          message: "Password is invalid"
      }
  }

}

