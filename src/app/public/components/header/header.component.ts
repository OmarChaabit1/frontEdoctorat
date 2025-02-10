import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public language!:string;

  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['fr', 'ar','eng','ce']);
    translate.setDefaultLang('fr');
  }

  ngOnInit(): void {
   
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }


}
