import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/auth-interceptor';
import { MaterialModule } from './shared/material/material.module';
import { LoginComponent } from './feature/login/login.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { HomeComponent } from './feature/home/home.component';
import { SignUpComponent } from './feature/sign-up/sign-up.component';
import { AlertBoxComponent } from './shared/component/alert-box/alert-box.component';
import { ComicsComponent } from './feature/comics/comics.component';
import { StoryOutlineComponent } from './feature/story-outline/story-outline.component';
import { ChapterComponent } from './feature/chapter/chapter.component';
import { CharacterComponent } from './feature/character/character.component';
import { ChapterTabComponent } from './shared/component/chapter-tab/chapter-tab.component';
import { CreateChapterComponent } from './feature/chapter/create-chapter/create-chapter.component';
import { EpisodesComponent } from './feature/episodes/episodes.component';
import { CreateEpisodeComponent } from './feature/episodes/create-episode/create-episode.component';
import { ScenesComponent } from './feature/scenes/scenes.component';
import { CharacterDetailComponent } from './feature/character-detail/character-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    SignUpComponent,
    AlertBoxComponent,
    ComicsComponent,
    StoryOutlineComponent,
    ChapterComponent,
    CharacterComponent,
    ChapterTabComponent,
    CreateChapterComponent,
    EpisodesComponent,
    CreateEpisodeComponent,
    ScenesComponent,
    CharacterDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
