import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Sonuc } from 'src/app/models/Sonuc';
import { Members } from 'src/app/models/Members';
import { DataService } from 'src/app/services/data.service';
import { MytoastService } from 'src/app/services/mytoast.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
 
  members!: Members[];

  modal!: Modal;
  modalBaslik: string = ""; 
  secUye!: Members;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    adiSoyadi: new FormControl(),
    gmail: new FormControl(),
    parola: new FormControl(),
    telefon: new FormControl(),
    admin: new FormControl(),
    uyeKayitTarihi: new FormControl(),
    uyeDuzenlemeTarihi: new FormControl(),
  });


  constructor(

    public servis : DataService,
    public toast : MytoastService

  ) { }
  ngOnInit() {
    this.MembersListele();
  

  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Üye Ekle";
    this.modal.show();
  }
  Duzenle(uye: Members, el: HTMLElement) {
    this.frm.patchValue(uye);
    this.modalBaslik = "Üye Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(uye: Members, el: HTMLElement) {
    this.secUye = uye;
    this.modalBaslik = "Üye Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  MembersListele() {
    this.servis.MembersListele().subscribe(d => {
      this.members = d;
    });
  }
  MembersEkleDuzenle() {
    var uye: Members = this.frm.value
    var tarih = new Date();
    if (!uye.id) {
      var filtre = this.members.filter(s => s.gmail == uye.gmail);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen E-Posta Adresi Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        uye.uyeKayitTarihi = tarih.getTime().toString();
        uye.uyeDuzenlemeTarihi = tarih.getTime().toString();
        this.servis.MembersEkle(uye).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Uye Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.MembersListele();
          this.modal.toggle();
        });
      }
    } else {
      uye.uyeDuzenlemeTarihi = tarih.getTime().toString();
      this.servis.MembersDuzenle(uye).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Üye Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.MembersListele();
        this.modal.toggle();
      });
    }

  }
  MembersSil() {
    console.log(this.secUye);
      this.servis.MembersSil(this.secUye.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Üye Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.MembersListele();
      this.modal.toggle();
    });
  }
}
