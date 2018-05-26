import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from './socket.service';
import {GridOptions} from "ag-grid/main";

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
  public columnDefs;
  public rowData;
  private layout;
  private defaultLayout;
  public gridOptions: GridOptions;

  constructor(private socketService: SocketService) { 
    this.columnDefs = [
      {headerName: 'Make', field: 'make', editable: true },
      {headerName: 'Model', field: 'model' },
      {headerName: 'Price', field: 'price'}
    ];
  
    this.rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
    this.gridOptions = <GridOptions>{};
  }
  
  ngOnInit() {
    this.socketService.sendSampleMessage('Hey from socket service!');
    this.socketService.getSampleMessages()
      .subscribe(sampleMessage => {
        this.sample = sampleMessage;
    });
  }

  onCellValueChanged(params) {
    let rowId = params.node.id;
    let colId = params.column.colId;
    let oldValue = params.oldValue;
    let newValue = params.newValue;
    this.socketService.updateAColumn({ rowId: rowId, colId: colId, newValue: newValue, oldValue: oldValue });
  }

  changeColumnState(){
    this.gridColumnApi.setColumnState(this.defaultLayout)
    // console.log(this.defaultLayout)
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.defaultLayout = this.gridColumnApi.getColumnState();

    this.socketService.getUpdatedColumn()
      .subscribe(data => {
        let rowNode = this.gridApi.getRowNode(data.rowId);
        rowNode.setDataValue(data.colId, data.newValue);
      });

      this.gridApi.addGlobalListener(function(type, event) {
        if(type === 'dragStopped') {
          params.columnApi.setColumnState(params.columnApi.getColumnState());
          console.log(params.columnApi.getColumnState())
        }
      })

  }

}
