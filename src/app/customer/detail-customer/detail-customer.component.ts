import { Component, Injector, Inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CustomerServiceProxy,
  CustomerDto,
} from '@shared/service-proxies/customerservice-proxy';

import {
  CustomerDepartmentDto,
  ListResultDtoOfCustomerDepartmentDto,
  CustomerDepartmentServiceProxy,
} from '@shared/service-proxies/customerdepartmentservice-proxy.service';
import { CreateCustomerDepartmentDialogComponent } from '../../customerdepartments/create-customerdepartment/create-customerdepartment-dialog.component';
import { EditCustomerDepartmentDialogComponent } from '../../customerdepartments/edit-customerdepartment/edit-customerdepartment-dialog.component';


import * as ApiServiceProxies from '../../../shared/service-proxies/service-proxies';
@Component({
  templateUrl: 'detail-customer.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
      mat-checkbox {
        padding-bottom: 5px;
      }
    `
  ]
})
export class DetailCustomerComponent extends AppComponentBase
  implements OnInit {
  private baseUrl: string;
  saving = false;
  customer: CustomerDto = new CustomerDto();
  departments: CustomerDepartmentDto[] = [];
  isDetail: boolean;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private _customerService: CustomerServiceProxy,
    private _customerDepartmentService: CustomerDepartmentServiceProxy,
    private location: Location,
    private _dialog: MatDialog,
    @Inject(ApiServiceProxies.API_BASE_URL) baseUrl?: string
  ) {
    super(injector);
    this.baseUrl = baseUrl ? baseUrl : "";
  }

  ngOnInit() {
    var tables = document.getElementsByTagName('table');
    for (var i=0; i<tables.length;i++){
        resizableGrid(tables[i]);
    this.getData();
    }

    function resizableGrid(table) {
        var row = table.getElementsByTagName('tr')[0],
        cols = row ? row.children : undefined;
        if (!cols) return;

        table.style.overflow = 'hidden';

        var tableHeight = table.offsetHeight;

        for (var i=0;i<cols.length;i++){
            var div = createDiv(tableHeight);
            cols[i].appendChild(div);
            cols[i].style.position = 'relative';
            setListeners(div);
        }

    function setListeners(div){
        var pageX,curCol,nxtCol,curColWidth,nxtColWidth;

        div.addEventListener('mousedown', function (e) {
            curCol = e.target.parentElement;
            nxtCol = curCol.nextElementSibling;
            pageX = e.pageX; 

            var padding = paddingDiff(curCol);

            curColWidth = curCol.offsetWidth - padding;
            if (nxtCol)
                nxtColWidth = nxtCol.offsetWidth - padding;
        });

        div.addEventListener('mouseover', function (e) {
            e.target.style.borderRight = '2px solid';
        })

        div.addEventListener('mouseout', function (e) {
            e.target.style.borderRight = '';
        })

        document.addEventListener('mousemove', function (e) {
            if (curCol) {
                var diffX = e.pageX - pageX;

                if (nxtCol)
                    nxtCol.style.width = (nxtColWidth - (diffX))+'px';

                curCol.style.width = (curColWidth + diffX)+'px';
            }
        });

        document.addEventListener('mouseup', function (e) { 
            curCol = undefined;
            nxtCol = undefined;
            pageX = undefined;
            nxtColWidth = undefined;
            curColWidth = undefined
        });
    }

    function createDiv(height){
        var div = document.createElement('div');
        div.style.top = '0px';
        div.style.right = '0px';
        div.style.width = '5px';
        div.style.position = 'absolute';
        div.style.cursor = 'col-resize';
        div.style.userSelect = 'none';
        div.style.height = '100%';
        return div;
    }

    function paddingDiff(col){

        if (getStyleVal(col,'box-sizing') == 'border-box'){
        return 0;
        }

        var padLeft = getStyleVal(col,'padding-left');
        var padRight = getStyleVal(col,'padding-right');
        return (parseInt(padLeft) + parseInt(padRight));

    }

    function getStyleVal(elm,css){
        return (window.getComputedStyle(elm, null).getPropertyValue(css))
    }
    };
}
  
  goBack(): void {
    this.location.back();
  }

  createCustomerDepartment(): void {
    this.showCreateOrEditCustomerDepartmentDialog(0, this.customer.id);
  }

  editCustomerDepartment(customerdepartment: CustomerDepartmentDto): void {
    this.showCreateOrEditCustomerDepartmentDialog(customerdepartment.id);
  }

  showCreateOrEditCustomerDepartmentDialog(id?: number, customerId?: number): void {
    let createOrEditCustomerDepartmentDialog;
    if (id === undefined || id <= 0) {
      createOrEditCustomerDepartmentDialog = this._dialog.open(CreateCustomerDepartmentDialogComponent, {
        data: { _customerId: customerId }
      });
    } else {

      createOrEditCustomerDepartmentDialog = this._dialog.open(EditCustomerDepartmentDialogComponent, {
        data: id
      });
    }
    createOrEditCustomerDepartmentDialog.afterClosed().subscribe(result => {
      if (result) {
        this.refresh();
      }
    });
  }

  addCustomerDepartmentChild(department: CustomerDepartmentDto): void {
    let createOrEditCustomerDepartmentDialog;
    createOrEditCustomerDepartmentDialog = this._dialog.open(CreateCustomerDepartmentDialogComponent, {
      data: { _departmentParentId: department.id, _customerId: this.customer.id }
    });
    createOrEditCustomerDepartmentDialog.afterClosed().subscribe(result => {
      if (result) {
        this.refresh();
      }
    });
  }
  refresh(): void {
    this.getData();
  }
  getData(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this._customerService.get(id)
      .subscribe((result: CustomerDto) => {
        this.customer.init(result);
      });
    this._customerDepartmentService.getByCustomerId(id)
      .subscribe((result: ListResultDtoOfCustomerDepartmentDto) => {
        this.departments = result.items;
      });
  }
}