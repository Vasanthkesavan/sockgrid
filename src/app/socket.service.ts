import { Injectable } from '@angular/core';

import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000/';  
  private socket: SocketIOClient.Socket;

  constructor() {
      this.socket = io.connect(this.url);
  }

  sendSampleMessage(message){
    this.socket.emit('sample_message', message);    
  };
  
  getSampleMessages() {
    return Observable.create(observer => {
        this.socket.on('new_sample_message', message => {
            observer.next(message);
        });
    });
  };
  
  updateAColumn(data) {
      this.socket.emit('cell_value_changed', data);
      this.socket.disconnect();
  };

  getUpdatedColumn() {
      return Observable.create(observer => {
          this.socket.on('new_cell_value', value => {
              observer.next(value);
          });
      });
  }
}