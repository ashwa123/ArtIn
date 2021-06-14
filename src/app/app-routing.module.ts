import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './core/auth-guard.guard';
import { EpisodesComponent } from './feature/episodes/episodes.component';
import { HomeComponent } from './feature/home/home.component';
import { LoginComponent } from './feature/login/login.component';
import { ScenesComponent } from './feature/scenes/scenes.component';
import { SignUpComponent } from './feature/sign-up/sign-up.component';
import { ChapterTabComponent } from './shared/component/chapter-tab/chapter-tab.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuardGuard ] },
  { path: 'signup', component: SignUpComponent },
  { path: 'chapters', component: ChapterTabComponent },
  { path: 'episodes', component: EpisodesComponent },
  { path: 'scenes', component: ScenesComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
