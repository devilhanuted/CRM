import { Component, Injector, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
ProvinceServiceProxy,
  ProvinceDto
} from '@shared/service-proxies/provinceservice-proxy';

@Component({
  templateUrl: 'edit-province-dialog.component.html',
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
export class EditProvinceDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  province: ProvinceDto = new ProvinceDto();

  constructor(
    injector: Injector,
    public _provinceService: ProvinceServiceProxy,
    private _dialogRef: MatDialogRef<EditProvinceDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._provinceService.get(this._id).subscribe((result: ProvinceDto) => {
      this.province = result;
    });
  }

  save(): void {
    this.saving = true;

    this._provinceService
      .update(this.province)
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
