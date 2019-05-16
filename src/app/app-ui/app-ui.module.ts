import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialAppModule} from '../material/material-app.module';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';

@NgModule({
  exports: [
    SearchInputComponent
  ],
  declarations: [SearchInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialAppModule,
    StoreModule
  ]
})
export class AppUiModule { }
