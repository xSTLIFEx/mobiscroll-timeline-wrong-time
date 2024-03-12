import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  showText = true;

  constructor(
  ) {}

  ngOnInit() {
    this.checkWidthSize();
    window.addEventListener('resize', event => {
      this.checkWidthSize();
    });
  }

  toggleText() {
    this.showText = !this.showText;
  }

  private checkWidthSize() {
    if (document.body.clientWidth <= 900) {
      this.showText = false;
    }
  }
}
