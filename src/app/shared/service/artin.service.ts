import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/core/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ArtinService {

  url = 'http://localhost:3000';
  public userDetails = JSON.parse(localStorage.getItem('access_token'));
  token = this.authService.getAccessToken();

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) { }

  register(data:any) : Observable<any> {
    const signinurl = this.url + '/register' + '/' + this.token;
    return <Observable<any>> this.http.post(signinurl,data);
  }

  submit(data: any): Observable<any> {
    const comicurl= this.url + '/' + this.userDetails.username + '/submit';
    return <Observable<any>> this.http.put(comicurl, data);
  }

  getcomics() {
    let getcomicurl = this.url + '/getcomics/' + this.userDetails.username;
    return <Observable<any>> this.http.get(getcomicurl);
  }

  updatecomics(title: any, oldtitle: string) {
    let updateComicurl = this.url + '/updatetitle/' + this.userDetails.username + '/' + oldtitle + '/' + title;
    return <Observable<any>> this.http.put(updateComicurl,title);
  }

  updateChapterTitle(chapterName, title, oldname) {
    let url = this.url + '/updatechapterTitle/' + this.userDetails.username + '/' + title + '/' + chapterName + '/' + oldname;
    return <Observable<any>> this.http.put(url,chapterName);
  }

  updateEpisodeTitle(episodeName, title, chapter, oldname) {
    let url = this.url + '/updateepisodeTitle/' + oldname + '/' + title + '/' + episodeName + '/' +chapter;
    return <Observable<any>> this.http.put(url,episodeName);
  }

  submitstory(data,title) : Observable<any> {
    let url = this.url + '/storyoutline/' + this.userDetails.username + '/'+ title;
    return <Observable<any>> this.http.put(url,data);
  }

  getstory(title){
    let url = this.url + '/getstory/' + this.userDetails.username + '/' + title;
    return <Observable<any>> this.http.get(url);
  }

  submitChapter(data,title) : Observable<any> {
    let url = this.url + '/createchapter/' + this.userDetails.username +'/' + title;
    return <Observable<any>> this.http.put(url,data);
  }

  getchapters(title){
    let url = this.url + '/getchapter/' + this.userDetails.username + '/' + title;
    return <Observable<any>> this.http.get(url);
  } 

  submitCharacter(characterfeature,title){
    let url = this.url + '/characterdesign/' + this.userDetails.username + '/' + title;
    return <Observable<any>> this.http.put(url,characterfeature);
  }

  submitimage(fd,title,charactername){
    let url = this.url + '/characterimage/'+ this.userDetails.username + '/' + title + '/' + charactername;
    return <Observable<any>> this.http.put(url,fd);
  }

  getProfileimage(title,charactername){
    let url = this.url + '/getprofileimage/' + title + '/' + charactername;
    return<Observable<any>>this.http.get(url,{responseType:'blob'})
  }

  getcharacterdetails(title) {
    let url = this.url + '/characternames/' + title;
    return<Observable<any>>this.http.get(url);
  }

  getprofile(title, charactername) {
    let url = this.url + '/getprofile/' + title + '/' + charactername;
    return <Observable<any>>this.http.get(url, {responseType:'blob'})
  }

  submitEpisode(episode, title, chapter) {
    let url = this.url + '/createepisode/' + chapter + '/' + title;
    return <Observable<any>> this.http.put(url, episode);
  }

  getepisodes(title, chapter) {
    let url = this.url + '/getepisode/' + chapter + '/' + title;
    return <Observable<any>> this.http.get(url);
  }

  submitScenes(scenes, title, episode, chapter) {
    let url = this.url + '/createscenes/' + episode + '/' + title + '/' + chapter;
    return <Observable<any>> this.http.post(url, scenes);
  }
  
  submitoverview(title, episode, chapter, overview) {
    let url = this.url + '/submitoverview/' + episode + '/' + title + '/' + chapter;
    return <Observable<any>> this.http.put(url, overview);
  }

  getscene(title, episode, chapter) {
    let url = this.url + '/getscenestory/' + episode + '/' + title + '/' + chapter;
    return <Observable<any>> this.http.get(url);
  }

  getepisodeoverview(title, episode, chapter) {
    let url = this.url + '/getepisodeview/' + episode + '/' + title + '/' + chapter;
    return <Observable<any>> this.http.get(url);
  }

  deleteTitle(title) {
    let url = this.url + '/deletetitle/' + this.userDetails.username + '/' + title;
    return <Observable<any>> this.http.delete(url) 
  }

  deleteChapter(title, chapter) {
    let url = this.url + '/deletechapter/' + title + '/' + chapter;
    return <Observable<any>> this.http.delete(url)
  }

  deleteEpisode(title, episode) {
    let url = this.url + '/deleteepisode/' + title + '/' + episode;
    return <Observable<any>> this.http.delete(url)
  }
  
  getcharacter (title,charactername) {
    let url = this.url + '/getcharacterdisplaydetails/' +this.userDetails.username + '/' + title + '/'+ charactername;
    return <Observable<any>> this.http.get(url)
  }
}
