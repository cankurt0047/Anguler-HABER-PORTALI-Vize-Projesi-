import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Categories } from 'src/app/models/Categories';
import { Members } from 'src/app/models/Members';
import { News } from 'src/app/models/News';
import { Modal } from 'bootstrap';
import { Sonuc } from 'src/app/models/Sonuc';
import { DataService } from 'src/app/services/data.service';
import { MytoastService } from 'src/app/services/mytoast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  haberler!: News[];
  seciliHaber!: News[];
  kategoriler!: Categories[];
  modalBaslik: string = "";
  secDers!: News;
  katId: number = 0;
  modal!: Modal;
  secKat: Categories = new Categories();
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
    public route: ActivatedRoute,
    public toast: MytoastService,
  ) { }

  ngOnInit() {
    this.Newlistele();
    
    this.route.params.subscribe((p: any) => {
      if (p.katId) {
        this.katId = p.katId;
        this.KategoriGetir();
     

      }
    });
    this.KategoriListele();
    
  }
  KatSec(katId: number) {
    this.katId = katId;
    this.KategoriGetir();

  }
  CategoriListele() {
    this.servis.CategoriesByKatId(this.katId).subscribe((d: any)  => {
      console.log(d + "CategoriesByKatId");
      this.seciliHaber = d;
    });
  }
  KategoriListele() {
    this.servis.CategoriesListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
  KategoriGetir() {
    this.servis.CategoriesById(this.katId).subscribe(d => {
      this.secKat = d;
      this.CategoriListele();
    });
  }
  Newlistele() {
    this.servis.NewsListele().subscribe(d => {
      this.haberler = d;
      console.log(this.haberler.length );
    });
  }
  Duzenle(kat: News, el: HTMLElement) {
    this.frm.patchValue(kat);
    this.modalBaslik = "Haber Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
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
        console.log(this.sonuc.mesaj);
        this.toast.ToastUygula(this.sonuc);
      } else {
        kat.haberYazan = this.servis.aktifUye.adiSoyadi;
        kat.haberDuzenlemeTarihi = tarih.getTime().toString();
        kat.haberKayitTarihi = tarih.getTime().toString();
        this.servis.NewsEkle(kat).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Haber Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.Newlistele();
          this.modal.toggle();
        });
      }
    } else {
      kat.haberDuzenlemeTarihi = tarih.getTime().toString();
      this.servis.NewsDuzenle(kat).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Haber Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.Newlistele();
        this.modal.toggle();
      });
    }

  }


}
