import { Component, OnInit } from '@angular/core';
import {delay, Observable, of} from "rxjs";
import de from "@mobiscroll/angular/dist/js/i18n/de";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  user: boolean = false;

  activeLanguage = 'en';

  constructor(
  ) {}

  ngOnInit() {
    const language = localStorage.getItem('activeLanguage');

    if (language) {
      this.activeLanguage = language;
    }

    const theme = localStorage.getItem('activeTheme');

    if (theme === 'dark') {
      this.addRemoveThemeClass(theme);
    }

    of(true).pipe(
      delay(1000)
    ).subscribe(res => {
      this.user = true;
    });
  }

  logout() {

  }

  changeLanguage(lang: string) {
    if (lang !== this.activeLanguage) {
      localStorage.setItem('activeLanguage', lang);
      this.activeLanguage = lang;
      window.location.reload();
    }
  }

  private addRemoveThemeClass(theme: 'light' | 'dark') {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    }

    if (theme === 'light') {
      document.body.classList.remove('dark-theme');
    }
  }
}
