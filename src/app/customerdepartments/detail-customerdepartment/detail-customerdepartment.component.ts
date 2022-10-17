import { Component, Injector, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CustomerDepartmentServiceProxy,
  CustomerDepartmentDto
} from '@shared/service-proxies/customerdepartmentservice-proxy.service';

import {
  CustomerPeopleServiceProxy,
  ListResultDtoOfCustomerPeopleDto,
  CustomerPeopleDto
} from '@shared/service-proxies/customerpeopleservice-proxy.service';

import { CreateCustomerPeopleDialogComponent } from '../../customerpeoples/create-customerpeople/create-customerpeople-dialog.component';
import { EditCustomerPeopleDialogComponent } from '../../customerpeoples/edit-customerpeople/edit-customerpeople-dialog.component';
import { CustomerServiceProxy, CustomerDto } from '@shared/service-proxies/customerservice-proxy';

@Component({
  templateUrl: 'detail-customerdepartment.component.html',
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
export class DetailCustomerDepartmentComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  customerdepartment: CustomerDepartmentDto = new CustomerDepartmentDto();
  customerPeople: CustomerPeopleDto[] = [];
  customer: CustomerDto = new CustomerDto();
  customerId: number;
  departmentId: number;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private location: Location,
    private _customerDepartmentService: CustomerDepartmentServiceProxy,
    private _customerService: CustomerServiceProxy,
    private _customerPeopleService: CustomerPeopleServiceProxy,
    private _dialog: MatDialog
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.customerId = +this.route.snapshot.paramMap.get('id');
    this.departmentId = +this.route.snapshot.paramMap.get('departmentId');
    this.getData();
  }

  goBack(): void {
    this.location.back();
  }

  getData(): void {
    var departmentid: number = this.departmentId;
    this._customerPeopleService.getByDepartment(departmentid)
      .subscribe((result: ListResultDtoOfCustomerPeopleDto) => {
        this.customerPeople = result.items;
      });
    this._customerService.get(this.customerId).subscribe((result: CustomerDto) => {
      this.customer.init(result);
    });
    this._customerDepartmentService.get(departmentid)
      .subscribe((result: CustomerDepartmentDto) => {
        this.customerdepartment.init(result);
      });
  }

  createCustomerPeople(): void {
    this.showCreateOrEditCustomerPeopleDialog();
  }
  editCustomerPeople(customerpeople: CustomerPeopleDto): void {
    this.showCreateOrEditCustomerPeopleDialog(customerpeople.id);
  }
  showCreateOrEditCustomerPeopleDialog(id?: number): void {
    let createOrEditCustomerPeopleDialog;
    if (id === undefined || id <= 0) {
      createOrEditCustomerPeopleDialog = this._dialog.open(CreateCustomerPeopleDialogComponent, {
        data: { _departmentId: this.departmentId, _customerId: this.customerId }
      });
    } else {

      createOrEditCustomerPeopleDialog = this._dialog.open(EditCustomerPeopleDialogComponent, {
        data: id
      });

    }
    createOrEditCustomerPeopleDialog.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }
}
