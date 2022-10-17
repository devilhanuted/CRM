import { Component, Injector, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
CustomerPositionServiceProxy,
  CustomerPositionDto
} from '@shared/service-proxies/customerpositionservice-proxy.service';

@Component({
  templateUrl: 'edit-customerposition-dialog.component.html',
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
export class EditCustomerPositionDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  customerposition: CustomerPositionDto = new CustomerPositionDto();

  constructor(
    injector: Injector,
    public _customerPositionService: CustomerPositionServiceProxy,
    private _dialogRef: MatDialogRef<EditCustomerPositionDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._customerPositionService.get(this._id).subscribe((result: CustomerPositionDto) => {
      this.customerposition = result;
    });
  }

  save(): void {
    this.saving = true;

    this._customerPositionService
      .update(this.customerposition)
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
