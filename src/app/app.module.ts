import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { SocketService } from './socket.service';
import { HttpClientModule } from '@angular/common/http';
import { LayoutService } from './layout.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    HttpClientModule
  ],
  providers: [SocketService, LayoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
