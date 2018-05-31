import { Component } from '@angular/core';

@Component({
  selector: 'app-view-config',
  templateUrl: './view-config.component.html',
  styleUrls: ['./view-config.component.css']
})
export class ViewConfigComponent {

  constructor() { }

  foods = [
    {value: 'Save as...', viewValue: 'Save as..'},
  ];
}
