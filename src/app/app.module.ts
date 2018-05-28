import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { SocketService } from './socket.service';
import { HttpClientModule } from '@angular/common/http';
import { LayoutService } from './layout.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DataService } from './data.service';
import { AllCompaniesComponent } from './all-companies/all-companies.component';
import { SearchCompaniesComponent } from './search-companies/search-companies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    AllCompaniesComponent,
    SearchCompaniesComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule
  ],
  providers: [SocketService, LayoutService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
