import { Component, OnInit } from '@angular/core';
import {delay, Observable, of} from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  userAndTranslations$: Observable<boolean> | undefined;

  constructor() {}

  ngOnInit() {
    this.userAndTranslations$ = of(true).pipe(delay(1000));
  }
}
