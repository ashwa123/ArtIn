import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateservicechapterService {

  private chapterState: BehaviorSubject<any>;
  private episodeState: BehaviorSubject<any>;

  constructor() {

    this.chapterState = new BehaviorSubject<any>({ chaptername: '' });
    this.episodeState = new BehaviorSubject<any>({ episodename: '' });
  }


  public getComicChapterCurrentState(): any {

    return this.chapterState.getValue();
  }

  public getComicChapterState(): Observable<any> {

    return this.chapterState.asObservable();
  }

  public setComicChapterState(state: any): void {

    return this.chapterState.next(Object.assign({}, state));
  }

  public getComicEpisodeCurrentState(): any {

    return this.episodeState.getValue();
  }

  public getComicEpisodeState(): Observable<any> {

    return this.episodeState.asObservable();
  }

  public setComicEpisodeState(state: any): void {

    return this.episodeState.next(Object.assign({}, state));
  }
}

