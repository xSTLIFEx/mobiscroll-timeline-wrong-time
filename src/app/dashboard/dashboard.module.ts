import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import {DashboardRouting} from "./dashboard.routing";
import {SharedModule} from "../shared.module";
import {CardComponent} from "./card/card.component";
import {MbscModule} from "@mobiscroll/angular";
import {MatButtonToggleModule} from "@angular/material/button-toggle";



@NgModule({
  declarations: [
    CardComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRouting),
    SharedModule,
    MbscModule,
    MatButtonToggleModule
  ]
})
export class DashboardModule { }
