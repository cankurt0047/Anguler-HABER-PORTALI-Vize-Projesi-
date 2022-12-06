import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Members } from '../models/Members';
import {Categories} from '../models/Categories';
import { News } from '../models/News';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiUrl = "http://localhost:3000/";
  public aktifUye: Members = new Members();

  constructor(
    public http: HttpClient
    
  ) { }
  /* kategori servis başla*/

  OturumAc(mail: string, parola: string) {
    return this.http.get<Members[]>(this.apiUrl + "members?gmail=" + mail + "&parola=" + parola);
   
  }
  OturumKontrol() {
    if (localStorage.getItem("adiSoyadi")) {
      this.AktifUyeBilgi()
      return true;
    } else {
      return false;
    }
  }
  AktifUyeBilgi() {
    if (localStorage.getItem("adiSoyadi")) {
      this.aktifUye.adiSoyadi = localStorage.getItem("adiSoyadi") || "";
      var admin = localStorage.getItem("admin") || "0";
      this.aktifUye.admin = parseInt(admin);
    }
  }
  
  
  /* Members Başlangıc servis başlangıc*/
  MembersListele() {
    return this.http.get<Members[]>(this.apiUrl + "members");
  }
  MembersById(id: number) {
    return this.http.get<Members>(this.apiUrl + "members/" + id);
  }
  MembersEkle(uye: Members) {
    return this.http.post(this.apiUrl + "members/", uye);
  }
  MembersDuzenle(uye: Members) {
    return this.http.put(this.apiUrl + "members/" + uye.id, uye);
  }
  MembersSil(id: number) {
    return this.http.delete(this.apiUrl + "members/" + id);
  }
  /* Members  bitiş*/
  
 /* Categories  başlangıç*/
  CategoriesListele() {
    return this.http.get<Categories[]>(this.apiUrl + "categories");
  }
  CategoriesByKatId(katId: number) {
    return this.http.get<Categories[]>(this.apiUrl + "categories/" + katId + "/news");
  }
  CategoriesById(id: number) {
    return this.http.get<Categories>(this.apiUrl +"categories/" + id );
  }
  CategoriesEkle(kat: Categories) {
    return this.http.post(this.apiUrl + "categories/", kat);
  }
  CategoriesDuzenle(kat: Categories) {
    return this.http.put(this.apiUrl + "categories/" + kat.id, kat);
  }
  CategoriesSil(id: number) {
    return this.http.delete(this.apiUrl + "categories/" + id);
  }

   /* Categories   başlangıç*/
  NewsListele() {
    return this.http.get<News[]>(this.apiUrl + "news");
  }
  NewsById(idNews: number) {
    return this.http.get<News>(this.apiUrl + "news/" + idNews);
  }
  NewsEkle(kat: News) {
    return this.http.post(this.apiUrl + "news/", kat);
  }
  NewsDuzenle(kat: News) {
    return this.http.put(this.apiUrl + "news/" + kat.id, kat);
  }
  NewsSil(id: number) {
    return this.http.delete(this.apiUrl + "news/" + id);
  }



}

