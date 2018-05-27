import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from './socket.service';
import {GridOptions} from 'ag-grid/main';
import { LayoutService } from './layout.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DataService } from './data.service';

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

  constructor(private socketService: SocketService, private layoutService: LayoutService, private dataService: DataService) {
    this.dataService.getGridData()
      .subscribe(
        (response) => {
          this.columnDefs = [{ headerName: 'COMPANY DETAILS', children: response['columnDefs']}];
          this.gridApi.setRowData(response['rowData']);
        }
      );
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
      });
  }

  onCellValueChanged(params) {
    const rowId = params.node.id;
    const colId = params.column.colId;
    const oldValue = params.oldValue;
    const newValue = params.newValue;
    this.socketService.updateAColumn({ rowId: rowId, colId: colId, newValue: newValue, oldValue: oldValue });
  }

  setLatestLayout() {
    this.layoutService.getCurrentState()
      .subscribe(data => {
        const parsed = JSON.parse(data);
        this.latestLayout = parsed[parsed.length - 1]['positionsTab'];
        this.gridColumnApi.setColumnState(this.latestLayout);
      });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.autoSizeColumns();
    // this.defaultLayout = this.gridColumnApi.getColumnState();
    const that = this;
    this.socketService.getUpdatedColumn()
      .subscribe(data => {
        const rowNode = this.gridApi.getRowNode(data.rowId);
        rowNode.setDataValue(data.colId, data.newValue);
      });

      this.gridApi.addGlobalListener(function(type, event) {
        if (type === 'dragStopped') {
          that.layoutService.saveChangedState(params.columnApi.getColumnState())
            .subscribe(data => {
              console.log(data);
            });
          params.columnApi.setColumnState(params.columnApi.getColumnState());
        }
      });

  }

}
