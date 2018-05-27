import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {  }

    getGridData() {
        return this.http.get('http://localhost:3000/api/getSymbols');
    }
}
