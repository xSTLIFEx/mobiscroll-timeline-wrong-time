import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MaterialBaseModule} from "./material-base.module";


const imports = [
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  MaterialBaseModule,
];

@NgModule({
  imports: [CommonModule, ...imports, RouterModule],
  declarations: [],
  exports: [...imports],
  providers: [],
})
export class SharedModule {}
