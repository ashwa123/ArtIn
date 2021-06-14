import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ArtinService } from 'src/app/shared/service/artin.service';
import { StateserviceService } from 'src/app/shared/stateservice/stateservice.service';

@Component({
  selector: 'app-story-outline',
  templateUrl: './story-outline.component.html',
  styleUrls: ['./story-outline.component.scss']
})
export class StoryOutlineComponent implements OnInit {

  comicstate: any;
  storyForm: FormGroup;
  errorMessage: any;
  story: any;

  constructor(
    private service: ArtinService,
    private _comicStateservice: StateserviceService,
    private router: Router,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getTitle();
    this.validateStoryForm();
    this.getstory();
  }

  validateStoryForm() {
    this.storyForm = this.formbuilder.group({
      storyoutline: ['', [Validators.required]]
    })
  }

  getTitle() {
    this._comicStateservice.getComicState().subscribe((data) => {
      this.comicstate = data;
    });
  }

  submitstory() {
    this.service.submitstory(this.storyForm.value, this.comicstate.title)
    .subscribe(response => {
      this.storyForm.get('storyoutline').setValue('');
      this.getstory();
    },
    err => {
      this.errorMessage = err.error.message;
    });
  }

  getstory() {
    this.service.getstory(this.comicstate.title)
    .subscribe(response => {
      this.story = response.resp[0].storyoutline;
      this.storyForm.get('storyoutline').setValue(this.story);
    },
    err => {
      this.errorMessage = err.error.message;
    });
  }

}
