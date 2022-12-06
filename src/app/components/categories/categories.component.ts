import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Categories } from 'src/app/models/Categories';
import { Members } from 'src/app/models/Members';
import { Sonuc } from 'src/app/models/Sonuc';
import { DataService } from 'src/app/services/data.service';
import { MytoastService } from 'src/app/services/mytoast.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  kategoriler!: Categories[];
  modal!: Modal;
  modalBaslik: string = "";
  filtrelenkayitlar!: Categories[];
  secKat!: Categories;
  katId: number = 0;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    kategoriYazanId: new FormControl(),
    kategoriAdi: new FormControl(),
    kategoriKayitTarihi: new FormControl(),
    kategoriDuzenlemeTarihi: new FormControl(),
  });
  constructor(
    public servis: DataService,
    public toast: MytoastService
  ) { }

  ngOnInit() {
    this.CategoriesListele();
  }

  KayitAra(d: string) {
    this.filtrelenkayitlar = this.kategoriler.filter(s => s.kategoriAdi.includes(d));
  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Kategori Ekle";
    this.modal.show();
  }
  Duzenle(kat: Categories, el: HTMLElement) {
    this.frm.patchValue(kat);
    this.modalBaslik = "Kategori Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(kat: Categories, el: HTMLElement) {
    this.secKat = kat;
    this.modalBaslik = "Kategori Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  CategoriesListele() {
    this.servis.CategoriesListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
  CategoriesEkleDuzenle() {
    var kat: Categories = this.frm.value
    var tarih = new Date();
    if (!kat.id) {
      var filtre = this.kategoriler.filter(s => s.kategoriAdi == kat.kategoriAdi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Kategori Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        kat.kategoriDuzenlemeTarihi = tarih.getTime().toString();
        kat.kategoriKayitTarihi = tarih.getTime().toString();
        this.servis.CategoriesEkle(kat).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Kategori Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.CategoriesListele();
          this.modal.toggle();
        });
      }
    } else {
      kat.kategoriDuzenlemeTarihi = tarih.getTime().toString();
      this.servis.CategoriesDuzenle(kat).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kategori Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.CategoriesListele();
        this.modal.toggle();
      });
    }

  }
  CategoriesSil() {
    this.servis.CategoriesSil(this.secKat.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kategori Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.CategoriesListele();
      this.modal.toggle();
    });
  }
}
