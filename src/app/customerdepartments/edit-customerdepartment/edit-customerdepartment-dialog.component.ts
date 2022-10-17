import { Component, Injector, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
CustomerDepartmentServiceProxy,
  CustomerDepartmentDto
} from '@shared/service-proxies/customerdepartmentservice-proxy.service';

@Component({
  templateUrl: 'edit-customerdepartment-dialog.component.html',
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
export class EditCustomerDepartmentDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  customerdepartment: CustomerDepartmentDto = new CustomerDepartmentDto();

  constructor(
    injector: Injector,
    public _customerDepartmentService: CustomerDepartmentServiceProxy,
    private _dialogRef: MatDialogRef<EditCustomerDepartmentDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._customerDepartmentService.get(this._id).subscribe((result: CustomerDepartmentDto) => {
      this.customerdepartment = result;
    });
  }

  save(): void {
    this.saving = true;

    this._customerDepartmentService
      .update(this.customerdepartment)
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
}
