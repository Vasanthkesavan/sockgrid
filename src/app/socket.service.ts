import { Injectable } from '@angular/core';

import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000/';
  private socket: SocketIOClient.Socket;
  private socketIEX: SocketIOClient.Socket;

  constructor() {
      this.socket = io.connect(this.url);
      // this.socketIEX = io.connect('https://ws-api.iextrading.com/1.0');
  }

  sendSampleMessage(message) {
    this.socket.emit('sample_message', message);
  }

  getAppleData() {
    //   return Observable.create(observer => {
    //       return this.socket.on('connect', () => {
    //           observer.n
    //       })
    //   })
  }

  getSampleMessages() {
    return Observable.create(observer => {
        this.socket.on('new_sample_message', message => {
            observer.next(message);
        });
    });
  }

  updateAColumn(data) {
      this.socket.emit('cell_value_changed', data);
      this.socket.disconnect();
  }

  getUpdatedColumn() {
      return Observable.create(observer => {
          this.socket.on('new_cell_value', value => {
              observer.next(value);
          });
      });
  }
}
