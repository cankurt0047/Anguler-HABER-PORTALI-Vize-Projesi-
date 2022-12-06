import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { MembersComponent } from './components/members/members.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
import { HaberDetayComponent } from './components/haberDetay/haberDetay.component';


const routes: Routes = [
  
  {
    path : "",
    component : HomeComponent,

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [AuthGuard]
  },
  {
    path : "categories",
    component : CategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path : "news",
    component : NewsComponent,
    canActivate: [AuthGuard]

  },
  {
    path : "haberdetay/:id",
    component : HaberDetayComponent,
  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
