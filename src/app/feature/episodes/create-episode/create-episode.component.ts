import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-episode',
  templateUrl: './create-episode.component.html',
  styleUrls: ['./create-episode.component.scss']
})
export class CreateEpisodeComponent implements OnInit {

  episodeForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.valiadateEpisodeForm();
  }

  valiadateEpisodeForm() {
    this.episodeForm = this.fb.group ({
      episode: ['',[Validators.required]],
    });
  }

}
