import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ComicsComponent } from '../comics/comics.component';
import { ArtinService } from 'src/app/shared/service/artin.service';
import { StateserviceService } from 'src/app/shared/stateservice/stateservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  comicList: any;
  errorMessage: any;
  comicstate: any;
  user: any
  isedittable: boolean = false;
  isSaveicon: boolean = false;
  selectedvariable: any;
  ComicFormValue: any;
  titlename: any;

  constructor(
    public dialog: MatDialog,
    private service: ArtinService,
    private _comicStateservice: StateserviceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getcomics();
    this.getTitle();
  }

  getcomics() {
    this.service.getcomics()
    .subscribe(response => {
      this.comicList = response; 
    },
    err => {
      this.errorMessage = err.error.message;
    });
  }

  getTitle() {
    this._comicStateservice.getComicState().subscribe((data) => {
      this.comicstate = data;
    });
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('access_token'));
  }


  navigate(title ) {
    this.comicstate.title = title.title;
    this._comicStateservice.setComicState(this.comicstate);
    this.router.navigate(['chapters']);
  }

  edit(i) {
    this.selectedvariable = i;
    this.isedittable = true;
    this.isSaveicon = true;
  }

  saveIcon(titlename: any, oldtitle: any, i) {
    this.isSaveicon = false;
    this.service.updatecomics(titlename, oldtitle).subscribe(response => {
        alert('title updated');
        this.getcomics();
        this.isedittable = false;
    });
  }

  delete(title) {
    this.service.deleteTitle(title).subscribe(response => {
      alert('Comic Deleted');
      this.getcomics();
    })
  }

  openCreatedialog() {
    const dialogRef = this.dialog.open(ComicsComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ComicFormValue = result
      if(result.title) {
        this.service.submit(this.ComicFormValue)
        .subscribe(response => {
          this.getcomics();
        },
        err => {
          this.errorMessage = err.error.message;
        });
      }
    });
  }
}

