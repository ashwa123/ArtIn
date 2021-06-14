import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ArtinService } from 'src/app/shared/service/artin.service';
import { StateserviceService } from 'src/app/shared/stateservice/stateservice.service';
import { StateservicechapterService } from 'src/app/shared/stateservice/stateservicechapter.service';
import { CreateEpisodeComponent } from './create-episode/create-episode.component';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {

  comicstate: any;
  chapterState: any;
  episodeState: any;
  episodeFormValue: any;
  errorMessage: any;
  episodename: any;
  episodes: any;
  isedittable: boolean = false;
  isSaveicon: boolean = false;
  selectedvariable: any;
  newEpisodename: any;

  constructor(
    private chapterstateservice : StateservicechapterService,
    private service : ArtinService,
    private router : Router,
    private _comicStateservice: StateserviceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTitle();
    this.getChapter();
    this.setEpisode();
    this.getEpisode();
  }

  getTitle() {
    this._comicStateservice.getComicState().subscribe((data) => {
      this.comicstate = data;
    });
  }

  getChapter() {
    this.chapterstateservice.getComicChapterState().subscribe((data) => {
      this.chapterState = data;
    });
  }

  setEpisode() {
    this.chapterstateservice.getComicEpisodeState().subscribe((data) => {
      this.episodeState = data;      
    });
  }

  createEpisode() {
    const dialogRef = this.dialog.open(CreateEpisodeComponent, {
      width: '250px'
    })

    dialogRef.afterClosed().subscribe(result => {
      this.episodeFormValue = result
      if(result.episode) {
        this.service.submitEpisode(this.episodeFormValue, this.comicstate.title, this.chapterState.chaptername)
        .subscribe(response =>{
          this.getEpisode();
        },
        err =>{
          this.errorMessage = err.error.message;
        })
      }
    });
  }

  getEpisode() {
    this.service.getepisodes(this.comicstate.title, this.chapterState.chaptername)
    .subscribe(response =>{  
      this.episodename = response.resp.episode
      this.episodes = this.episodename.split(',')
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

  saveIcon(newEpisodename: any, oldepisodename, i) {
    this.isSaveicon = false;
    this.service.updateEpisodeTitle(newEpisodename, this.comicstate.title, this.chapterState.chaptername, oldepisodename).subscribe(response => {
        alert('Episode updated');
        this.getEpisode();
        this.isedittable = false;
    });
  }

  delete(episode) {
    this.service.deleteEpisode(this.comicstate.title, episode).subscribe(response => {
      alert('Episode Deleted')
      this.getEpisode();
    })
  }

  navigate(episode){
    this.episodeState.episodename = episode;
    this.chapterstateservice.setComicEpisodeState(this.episodeState);    
    this.router.navigate(['scenes']);
  }

}
