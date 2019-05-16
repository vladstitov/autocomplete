/**
 * Created by Vlad on 7/3/2017.
 */
import {NgModule} from '@angular/core';
import {
  MatSelectModule,
 MatAutocompleteModule

} from '@angular/material';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  exports: [
    MatSelectModule,
    MatAutocompleteModule

  ],
  declarations: [ ],
  entryComponents: []
})

export class MaterialAppModule {
}
