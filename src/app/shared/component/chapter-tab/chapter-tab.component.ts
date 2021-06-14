import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArtinService } from '../../service/artin.service';
import { StateserviceService } from '../../stateservice/stateservice.service';

@Component({
  selector: 'app-chapter-tab',
  templateUrl: './chapter-tab.component.html',
  styleUrls: ['./chapter-tab.component.scss']
})
export class ChapterTabComponent implements OnInit {

  comicstate: any;

  constructor(
    private router : Router,
    private service: ArtinService,
    private _comicStateservice: StateserviceService,
  ) { }

  ngOnInit(): void {
    this.getTitle()
  }

  getTitle() {
    this._comicStateservice.getComicState().subscribe((data) => {
      this.comicstate = data;
    });
  }

}
