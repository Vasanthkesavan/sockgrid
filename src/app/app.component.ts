import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sample: 'Looks like we are not connected to the socket';
  socket: any;
  private gridApi;
  private gridColumnApi;

  constructor(private socketService: SocketService) { 
  }
  
  ngOnInit() {
    this.socketService.sendSampleMessage('Hey from socket service!');
    this.socketService.getSampleMessages()
      .subscribe(sampleMessage => {
        this.sample = sampleMessage;
    });
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

  onCellValueChanged(params) {
    let rowId = params.node.id;
    let colId = params.column.colId;
    let oldValue = params.oldValue;
    let newValue = params.newValue;
    this.socketService.updateAColumn({ rowId: rowId, colId: colId, newValue: newValue, oldValue: oldValue });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.socketService.getUpdatedColumn()
      .subscribe(data => {
        let rowNode = this.gridApi.getRowNode(data.rowId);
        rowNode.setDataValue(data.colId, data.newValue);
      })
  }
}
