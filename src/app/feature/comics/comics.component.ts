import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ArtinService } from 'src/app/shared/service/artin.service';
import { StateserviceService } from 'src/app/shared/stateservice/stateservice.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {

  comicForm: FormGroup;

  constructor(
    private service: ArtinService,
    private formbuilder: FormBuilder,
    private _comicStateservice: StateserviceService,
    private router: Router,
    public dialogRef: MatDialogRef<ComicsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.validateComicForm();
  }

  validateComicForm() {
    this.comicForm = this.formbuilder.group({
      title: ['',[Validators.required]],
      genre: [''],
      about: []
    })
  }

}
