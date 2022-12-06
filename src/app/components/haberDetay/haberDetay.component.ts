import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/models/News';
import { Sonuc } from 'src/app/models/Sonuc';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-haberDetay',
  templateUrl: './haberDetay.component.html',
  styleUrls: ['./haberDetay.component.scss']
})
export class HaberDetayComponent implements OnInit {
  haberler!: News[];
  haberId: number = 0;
  secHaber: News = new News();
  constructor(
    public servis : DataService,
    public route: ActivatedRoute,
    public router:Router
  ) { }

  ngOnInit() {
    this.NewsListelee();
    this.route.params.subscribe((p: any) => {
      console.log(p);

      if (p) {
        this.haberId = p.id;
        this.NewsListele();
      } 
    });


  }
  NewsListele() {
    this.servis.NewsById(this.haberId).subscribe(d => {
      this.secHaber = d;
    });
  }
  NewsListelee() {
    this.servis.NewsListele().subscribe(d => {
      this.haberler = d;
    });
  }
}