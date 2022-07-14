import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatChipsModule} from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgToastModule } from 'ng-angular-popup';
import { FormsModule } from '@angular/forms';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';




const mod=[
  CommonModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatChipsModule,
  MatListModule,
  MatCardModule,
  MatGridListModule ,
  NgToastModule,
  FormsModule,
LoadingBarRouterModule,
LoadingBarHttpClientModule

  


]

@NgModule({
  declarations: [],
  imports: [
   mod
  ],
  exports:[
    mod
  ]
})
export class MatModule { }
