import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from './socket.service';
import {GridOptions} from "ag-grid/main";
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sample: 'Looks like we are not connected to the socket';
  socket: any;
  private sampleRestData;
  private gridApi;
  private gridColumnApi;
  public columnDefs;
  public rowData;
  private layout;
  private defaultLayout;
  public gridOptions: GridOptions;
  private latestLayout;

  constructor(private socketService: SocketService, private layoutService: LayoutService) { 
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

    this.layoutService.getSampleData()
      .subscribe(data => {
        this.sampleRestData = data;
      })
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
  }

  setLatestLayout() {
    this.layoutService.getCurrentState()
      .subscribe(data => {
        let parsed = JSON.parse(data);
        this.latestLayout = parsed[parsed.length - 1]['positionsTab'];
        this.gridColumnApi.setColumnState(this.latestLayout);
      })
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.defaultLayout = this.gridColumnApi.getColumnState();
    
    let that = this;
    this.socketService.getUpdatedColumn()
      .subscribe(data => {
        let rowNode = this.gridApi.getRowNode(data.rowId);
        rowNode.setDataValue(data.colId, data.newValue);
      });

      this.gridApi.addGlobalListener(function(type, event) {
        if(type === 'dragStopped') {
          that.layoutService.saveChangedState(params.columnApi.getColumnState())
            .subscribe(data => {
              console.log(data);
            })
          params.columnApi.setColumnState(params.columnApi.getColumnState());
        }
      })

  }

}
