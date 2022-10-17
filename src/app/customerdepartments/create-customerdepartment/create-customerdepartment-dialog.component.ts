import { Component, Injector, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CreateCustomerDepartmentDto,
  CustomerDepartmentServiceProxy
} from '@shared/service-proxies/customerdepartmentservice-proxy.service';
import {
  CustomerDto,
  CustomerServiceProxy
} from '@shared/service-proxies/customerservice-proxy';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  templateUrl: 'create-customerdepartment-dialog.component.html',
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
export class CreateCustomerDepartmentDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  customerdepartment: CreateCustomerDepartmentDto = new CreateCustomerDepartmentDto();
  customer: CustomerDto = new CustomerDto();
  
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';

  constructor(
    injector: Injector,
    private _customerDepartmentService: CustomerDepartmentServiceProxy,
    private _customerService: CustomerServiceProxy,
    private _dialogRef: MatDialogRef<CreateCustomerDepartmentDialogComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) private request: any
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.request._customerId != undefined || this.request._customerId > 0) {
      this._customerService.get(this.request._customerId).subscribe((result: CustomerDto) => {
        this.customer.init(result);
        this.customerdepartment.customerId = this.request._customerId;
        this.customerdepartment.customerName = result.name;
      });
    }
    this.createForm();
  }

  save(): void {
    this.saving = true;

    this._customerDepartmentService
      .create(this.customerdepartment)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close(true);
      });
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'description': [null, Validators.required],
      'customerName': [null, Validators.required],
      'validate': ''
    });
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }
  get description() {
    return this.formGroup.get('description') as FormControl
  }
  get customerName() {
    return this.formGroup.get('customerName') as FormControl
  }
}
