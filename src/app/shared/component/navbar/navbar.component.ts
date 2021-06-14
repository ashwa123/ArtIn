import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/core/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any;
  isDisplayNavbar: boolean;

  constructor(
    private authService: AuthServiceService,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('access_token'));
  }

  logout() {
    this.authService.logout()
  }

}
