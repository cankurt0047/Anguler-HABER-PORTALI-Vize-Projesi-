import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { MytoastService } from './services/mytoast.service';
import { DataService } from 'src/app/services/data.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { MembersComponent } from './components/members/members.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
import { HaberDetayComponent } from './components/haberDetay/haberDetay.component';


@NgModule({
  declarations: [
    MembersComponent,
    AppComponent,
    LoginComponent,
    CategoriesComponent,
    NewsComponent,
    HomeComponent,
    HaberDetayComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    HotToastModule.forRoot(),
  ],
  providers: [DataService, MytoastService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
