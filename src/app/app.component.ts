import { Component } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket: any;

  constructor() {
    this.socket = io('http://localhost:3000/');
    this.socket.on('connect', () => console.log('Frontend connection open'));
    this.socket.on('sample_emit_value', function(val) {
      console.log(val);
    })
  }

  columnDefs = [
    {headerName: 'Make', field: 'make', editable: true },
    {headerName: 'Model', field: 'model' },
    {headerName: 'Price', field: 'price'}
  ];

  rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  emitSocket() {
    this.socket.emit('sample_emit_value', 'HELLO SERVER!');
  }
}
