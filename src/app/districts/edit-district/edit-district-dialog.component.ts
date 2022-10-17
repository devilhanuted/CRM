import { Component, Injector, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
DistrictServiceProxy,
  DistrictDto
} from '@shared/service-proxies/districtservice-proxy';

@Component({
  templateUrl: 'edit-district-dialog.component.html',
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
export class EditDistrictDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  district: DistrictDto = new DistrictDto();

  constructor(
    injector: Injector,
    public _districtService: DistrictServiceProxy,
    private _dialogRef: MatDialogRef<EditDistrictDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._districtService.get(this._id).subscribe((result: DistrictDto) => {
      this.district = result;
    });
  }

  save(): void {
    this.saving = true;

    this._districtService
      .update(this.district)
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
