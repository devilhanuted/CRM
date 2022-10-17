import { Component, Injector, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatCheckboxChange } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
CustomerPeopleServiceProxy,
  CustomerPeopleDto
} from '@shared/service-proxies/customerpeopleservice-proxy.service';
import {
  CustomerPositionDto,
    CustomerPositionServiceProxy
  } from '@shared/service-proxies/customerpositionservice-proxy.service';
  
@Component({
  templateUrl: 'edit-customerpeople-dialog.component.html',
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
export class EditCustomerPeopleDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  customerpeople: CustomerPeopleDto = new CustomerPeopleDto();
  customerpositions: CustomerPositionDto[];


  constructor(
    injector: Injector,
    private _customerPeopleService: CustomerPeopleServiceProxy,
    private _customerPositionService: CustomerPositionServiceProxy,
    private _dialogRef: MatDialogRef<EditCustomerPeopleDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
  ) {
    super(injector);
  }

  getCustomerPositions(): void {
    this._customerPositionService.getCustomerPositions()
      .subscribe(c => {
        this.customerpositions = c.result.items;
      });
  }

  ngOnInit(): void {
    this.getData();
    this.getCustomerPositions();
  }
  onCanDecideByChange($event: MatCheckboxChange): void {
    this.customerpeople.canDecideBuy = $event.checked;
  }
  getData():void{
    this._customerPeopleService.get(this._id).subscribe((result: CustomerPeopleDto) => {
      this.customerpeople = result;
    });
  }

  save(): void {
    this.saving = true;

    this._customerPeopleService
      .update(this.customerpeople)
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
