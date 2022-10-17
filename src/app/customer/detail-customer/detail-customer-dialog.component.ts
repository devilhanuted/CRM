import { Component, Injector, Inject, OnInit, Optional } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatCheckboxChange
} from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CustomerServiceProxy,
  CustomerDto,
} from '@shared/service-proxies/customerservice-proxy';

import * as ApiServiceProxies from '../../../shared/service-proxies/service-proxies';
@Component({
  templateUrl: 'detail-customer-dialog.component.html',
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
export class DetailCustomerDialogComponent extends AppComponentBase
  implements OnInit {
  private baseUrl: string;
  saving = false;
  customer: CustomerDto = new CustomerDto();
  isDetail: boolean;


  constructor(
    injector: Injector,
    private _customerService:CustomerServiceProxy,
    private _dialogRef: MatDialogRef<DetailCustomerDialogComponent>,

    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number,
    @Inject(ApiServiceProxies.API_BASE_URL) baseUrl?: string
  ) {
    super(injector);
    this.baseUrl = baseUrl ? baseUrl : "";
  }

  ngOnInit(): void {
    this._customerService.get(this._id)
      .subscribe((result: CustomerDto) => {
        this.customer.init(result);
      });
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }
}
