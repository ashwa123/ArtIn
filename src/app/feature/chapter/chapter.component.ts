import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ArtinService } from 'src/app/shared/service/artin.service';
import { StateserviceService } from 'src/app/shared/stateservice/stateservice.service';
import { StateservicechapterService } from 'src/app/shared/stateservice/stateservicechapter.service';
import { CreateChapterComponent } from './create-chapter/create-chapter.component';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {

  chapterFormValue: any;
  comicstate: any;
  chapterState: any;
  chaptername: any;
  newChaptername: any;
  chapters: any;
  errorMessage: any;
  isdisplayed: boolean = false;
  isedittable: boolean = false;
  isSaveicon: boolean = false;
  selectedvariable: any;

  constructor(
    private _comicStateservice: StateserviceService,
    private service: ArtinService,
    private router : Router,
    private chapterstateservice : StateservicechapterService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTitle();
    this.getChaptertitle();
    this.getChapter();
  }


  getTitle() {
    this._comicStateservice.getComicState().subscribe((data) => {
      this.comicstate = data;
    });
  }

  getChaptertitle() {
    this.chapterstateservice.getComicChapterState().subscribe((data) => {
      this.chapterState = data      
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateChapterComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.chapterFormValue =result
      if(result.chaptername) {
        this.service.submitChapter(this.chapterFormValue,this.comicstate.title)
        .subscribe(response =>{
          this.isdisplayed = false;
          this.getChapter();
        },
        err =>{
          this.errorMessage = err.error.message;
        })
      }
    });
  }


  getChapter(){
    this.service.getchapters(this.comicstate.title)
    .subscribe(response =>{
      this.chaptername = response.resp.chaptername
      this.chapters = this.chaptername.split(',')
    },
    err =>{
      this.errorMessage = err.error.message;
    })
  }

  edit(i) {
    this.selectedvariable = i;
    this.isedittable = true;
    this.isSaveicon = true;
  }

  saveIcon(newChaptername: any, oldname, i) {
    this.isSaveicon = false;
    this.service.updateChapterTitle(newChaptername, this.comicstate.title, oldname).subscribe(response => {
        alert('Chapter updated');
        this.getChapter();
        this.isedittable = false;
    });
  }

  delete(chapter) {
    this.service.deleteChapter(this.comicstate.title, chapter).subscribe(response => {
      alert('Chapter Deleted');
      this.getChapter();
    })
  }

  navigate(chapter){
    this.chapterState.chaptername = chapter;
    this.chapterstateservice.setComicChapterState(this.chapterState);    
    this.router.navigate(['episodes'])
  }

}
