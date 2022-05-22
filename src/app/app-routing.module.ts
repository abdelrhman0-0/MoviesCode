import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvShowsComponent } from './TvShows/TvShows.component';
import { AuthGuard } from './auth.guard';
import { PeopleComponent } from './people/people.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { MoviesComponent } from './movies/movies.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home", canActivate:[AuthGuard],component:HomeComponent},
  {path:"tv",canActivate:[AuthGuard], component:TvShowsComponent},
  {path:"people",canActivate:[AuthGuard], component:PeopleComponent},
  {path:"movies",canActivate:[AuthGuard], component:MoviesComponent},
  {path:"moviedetails/:id/:alt",canActivate:[AuthGuard], component:MoviedetailsComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"**", component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
