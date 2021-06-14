import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateserviceService {

  private comicState: BehaviorSubject<any>;
  private characterName: BehaviorSubject<any>;
  charcterdisplayname: BehaviorSubject<any>;

  constructor() {

    this.comicState = new BehaviorSubject<any>({ title: '' });

    this.characterName = new BehaviorSubject<any>({ name: '' });

    this.charcterdisplayname = new BehaviorSubject<any>({ characterviewname: '' });
  }


  public getComicCurrentState(): any {

    return this.comicState.getValue();
  }

  public getComicState(): Observable<any> {

    return this.comicState.asObservable();
  }

  public setComicState(state: any): void {

    return this.comicState.next(Object.assign({}, state));
  }

  public getCharacterNameCurrentState(): any {

    return this.characterName.getValue();
  }

  public getCharacterNameState(): Observable<any> {

    return this.characterName.asObservable();
  }

  public setCharacterNameState(state: any): void {

    return this.characterName.next(Object.assign({}, state));
  }

  public getCharacterdisplayNameCurrentState(): any {

    return this.charcterdisplayname.getValue();
  }

  public getCharacterdisplayNameState(): Observable<any> {

    return this.charcterdisplayname.asObservable();
  }

  public setCharacterdisplayNameState(state: any): void {

    return this.charcterdisplayname.next(Object.assign({}, state));
  }

}
