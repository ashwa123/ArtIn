import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertBoxComponent } from 'src/app/shared/component/alert-box/alert-box.component';

import { ArtinService } from 'src/app/shared/service/artin.service';
import { StateserviceService } from 'src/app/shared/stateservice/stateservice.service';
import { StateservicechapterService } from 'src/app/shared/stateservice/stateservicechapter.service';

@Component({
  selector: 'app-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.scss']
})
export class ScenesComponent implements OnInit {

  comicstate: any;
  chapterState: any;
  episodeState: any;
  storydata: any;
  sceneForm: FormGroup;
  StoryForm: FormGroup;
  episodeoverForm: FormGroup;
  episodedataForm: FormGroup;
  errorMessage: any;
  episodeheader: any;
  episodeheaderview: any

  constructor(
    private chapterstateservice: StateservicechapterService,
    private service: ArtinService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _comicStateservice: StateserviceService
  ) {
    this.geTitle()
    this.getChapter();
    this.getEpisodeName();
    this.getScene();
   }

  ngOnInit(): void {
    this.getepisodeoverview();
    this.episodeform();
    this.sceneform();
    this.storydataform();
    this.episodedataform();
  }

  geTitle() {
    this._comicStateservice.getComicState().subscribe((data) => {
      this.comicstate = data;
    });
  }

  getChapter() {
    this.chapterstateservice.getComicChapterState().subscribe((data) => {
    this.chapterState = data;
    });
  }

  getEpisodeName() {
    this.chapterstateservice.getComicEpisodeState().subscribe((data) => {
      this.episodeState = data;
    });
  }

  getScene() {
    this.service.getscene(this.comicstate.title, this.episodeState.episodename, this.chapterState.chaptername)
    .subscribe(response => {
      this.storydata = response.resp.scenes;
    });
  }

  createscene() {  
    return this.fb.group({
      location : [],
      scene : [],
      conversation : [],
    });
  }

  sceneform() {
    this.sceneForm = this.fb.group({
      Scenes : this.fb.array([this.createscene()]),
   });
  }

  storydataform() {
    this.StoryForm = this.fb.group({
      scene: [''],
      location: [''],
      conversation: ['']
    })
  }

  episodeform() {
    this.episodeoverForm = this.fb.group({
      episodeoverview: [],
    });
  }

  episodedataform() {
    this.episodedataForm = this.fb.group({
      episodedataoverview: []
    })
  }

  get scenestoryArray() {
    return <FormArray>this.sceneForm.get('Scenes');
  }

  addscene() {
    this.scenestoryArray.push(this.createscene());
  }

  save() {
    this.service.submitScenes(this.sceneForm.value, this.comicstate.title, this.episodeState.episodename, this.chapterState.chaptername)
    .subscribe(response => {
      this.submitoverview();
    },
    err => {
      this.errorMessage = err.error.message;
    });
  }

  getepisodeoverview() {
    this.service.getepisodeoverview(this.comicstate.title, this.episodeState.episodename, this.chapterState.chaptername)
    .subscribe(response => {
      this.episodeheader = response.resp
      this.episodeheaderview = this.episodeheader[0].episodeoverview;
    });
  }

  submitoverview() {
    this.service.submitoverview(this.comicstate.title, this.episodeState.episodename,
      this.chapterState.chaptername, this.episodeoverForm.value)
    .subscribe(response => {
      const dialogRef = this.dialog.open(AlertBoxComponent, {
        width: '250px',
        data: 'Scenes saved successfully'
      })
    });
  }

}
