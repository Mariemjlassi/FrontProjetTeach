import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevoirRoutingModule } from './devoir-routing.module';
import { AddDevoirComponent } from './add-devoir/add-devoir.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListDevoirComponent } from './list-devoir/list-devoir.component';
import { UpdateDevoirComponent } from './update-devoir/update-devoir.component';


@NgModule({
  declarations: [
    AddDevoirComponent,
    ListDevoirComponent,
    UpdateDevoirComponent
  ],
  imports: [
    CommonModule,
    DevoirRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DevoirModule { }
