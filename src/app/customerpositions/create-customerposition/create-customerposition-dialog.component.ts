import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CreateCustomerPositionDto,
  CustomerPositionServiceProxy
} from '@shared/service-proxies/customerpositionservice-proxy.service';

@Component({
  templateUrl: 'create-customerposition-dialog.component.html',
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
export class CreateCustomerPositionDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  customerposition: CreateCustomerPositionDto = new CreateCustomerPositionDto();

  constructor(
    injector: Injector,
    public _customerPositionService: CustomerPositionServiceProxy,
    private _dialogRef: MatDialogRef<CreateCustomerPositionDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  save(): void {
    this.saving = true;

    this._customerPositionService
      .create(this.customerposition)
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
