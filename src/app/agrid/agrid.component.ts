import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agrid',
  templateUrl: './agrid.component.html',
  styleUrls: ['./agrid.component.scss'],
})
export class AgridComponent implements OnInit {
  title = 'app';

  columnDefs = [
    {headerName: 'make', field: 'make', sortable: true, filter: true, checkboxSelection: true },
    {headerName: 'model', field: 'model', sortable: true, filter: true },
    {headerName: 'price', field: 'price', sortable: true, filter: true }
  ];

    rowData : any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
}

}
