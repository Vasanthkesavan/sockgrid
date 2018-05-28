import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search-companies',
  templateUrl: './search-companies.component.html',
  styleUrls: ['./search-companies.component.css']
})
export class SearchCompaniesComponent implements OnInit {
  isLoaded = false;
  companyData;
  myControl: FormControl = new FormControl();
  companyIds;
  options;

   filteredOptions: Observable<string[]>;

   constructor(private dataService: DataService) {
   }

  ngOnInit() {
    this.dataService.getCompanyList()
      .subscribe(
        response => {
          this.options = response['companyNames'];
          this.companyIds = response['companyIds'];
          console.log(response);
          this.filteredOptions = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map((val) => val.length >= 3 ? this.filter(val) : [])
            );
        }
      );
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  getCompanyInfo(company) {
    // tslint:disable-next-line:prefer-const
    let companyId;
    for (let i = 0; i < this.companyIds.length; i++) {
      if (this.companyIds[i]['companyTitle'] === company) {
        companyId = this.companyIds[i]['companySymbol'];
      }
    }

    this.dataService.getCompanyInfo(companyId)
      .subscribe(
        response => {
          this.companyData = response;
          this.isLoaded = true;
        }
      );
  }
}
