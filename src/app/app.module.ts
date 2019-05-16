import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MaterialAppModule} from './material/material-app.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppUiModule} from './app-ui/app-ui.module';
import {Action, INITIAL_STATE, StoreModule} from '@ngrx/store';
import {ApplicationState, INITIAL_APPLICATION_STATE} from './app-core/store/application-state';
import {autocompleteReducer} from './app-core/reducers/autocomplete.reducer';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialAppModule,
    AppUiModule,
    StoreModule.forRoot({autocompleteReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
