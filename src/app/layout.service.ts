import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LayoutService {
    constructor(private http: HttpClient) {}
    
    getSampleData() {
        return this.http.get('http://localhost:3000', {responseType: 'text'});
    }

    getDefaultState() {

    }

    saveChangedState(state) {
        return this.http.post('http://localhost:3000/api/saveLayout', state, {responseType: 'text'});
    }

    getCurrentState() {
        return this.http.get('http://localhost:3000/api/currentState', { responseType: 'text' });
    }
}