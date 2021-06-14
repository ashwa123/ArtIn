import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { AuthServiceService } from 'src/app/core/auth-service.service';
import { AlertBoxComponent } from 'src/app/shared/component/alert-box/alert-box.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  errorMessage: any;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private authService: AuthServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.validateLoginForm()
  }

  validateLoginForm() {
    this.loginForm = this.formbuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {   
    this.authService.login(this.loginForm.value)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', JSON.stringify(res.resp))
         this.router.navigate(['home']);
      },
        err =>{
          const dialogRef = this.dialog.open(AlertBoxComponent, {
            width: '250px',
            data: 'Invalid Credentials'
          })
      })
  }

}
