import { FormControl, FormGroup} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { News } from 'src/app/models/News';
import { Sonuc } from 'src/app/models/Sonuc';
import { DataService } from 'src/app/services/data.service';
import { MytoastService } from 'src/app/services/mytoast.service';
import { Categories } from 'src/app/models/Categories';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  haberler!: News[];
  modal!: Modal;
  modalBaslik: string = "";
  filtrelenkayitlar!: News[];
  secKat!: News;
  kategoriler!: Categories[];
  katId: number = 0;
  sonuc: Sonuc = new Sonuc();

  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    haberYazan: new FormControl(),
    haberBasligi: new FormControl(),
    categoryId: new FormControl(),
    haberManseti: new FormControl(),
    haberYazisi: new FormControl(),
    haberKayitTarihi: new FormControl(),
    haberDuzenlemeTarihi: new FormControl(),
    haberResim: new FormControl()
  });
  constructor(
    public servis: DataService,
    public toast: MytoastService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.NewsListele();
    this.KategoriListele();
    
  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Haber Ekle";
    this.modal.show();
  }
  Duzenle(kat: News, el: HTMLElement) {
    this.frm.patchValue(kat);
    this.modalBaslik = "Haber Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(kat: News, el: HTMLElement) {
    this.secKat = kat;
    this.modalBaslik = "Haber Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  NewsListele() {
    this.servis.NewsListele().subscribe(d => {
      this.haberler = d;
    });
  }
  NewsEkleDuzenle() {
    console.log("butona basıldı");
    var kat: News = this.frm.value
    var tarih = new Date();
    if (!kat.id) {
      var filtre = this.haberler.filter(s => s.haberBasligi == kat.haberBasligi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Haber Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        kat.haberYazan = this.servis.aktifUye.adiSoyadi;
        kat.haberDuzenlemeTarihi = tarih.getTime().toString();
        kat.haberKayitTarihi = tarih.getTime().toString();
        this.servis.NewsEkle(kat).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Haber Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.NewsListele();
          this.modal.toggle();
        });
      }
    } else {
      kat.haberDuzenlemeTarihi = tarih.getTime().toString();
      this.servis.NewsDuzenle(kat).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Haber Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.NewsListele();
        this.modal.toggle();
      });
    }

  }
  NewsSil() {
    this.servis.NewsSil(this.secKat.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Haber Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.NewsListele();
      this.modal.toggle();
    });
  }

  KategoriListele() {
    this.servis.CategoriesListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
}
