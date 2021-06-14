import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss']
})
export class CreateChapterComponent implements OnInit {

  chapterForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
  ) { }

  ngOnInit(): void {
    this.validateChapterForm()
  }

  validateChapterForm() {
    this.chapterForm = this.fb.group({
      chaptername:['', [Validators.required]],
    })
  }

}
