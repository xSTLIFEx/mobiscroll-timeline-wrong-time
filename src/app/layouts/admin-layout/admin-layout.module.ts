import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { AdminLayoutComponent } from './components/admin-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    MatButtonModule,
    MatMenuModule,
    NgOptimizedImage
  ],
  declarations: [AdminLayoutComponent, NavbarComponent, SidebarComponent],
  providers: [
  ],
})
export class AdminLayoutModule {}
