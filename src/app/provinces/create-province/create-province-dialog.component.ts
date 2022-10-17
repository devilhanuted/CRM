import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
  ProvinceDto,
  ProvinceServiceProxy,
  CreateProvinceDto
} from '@shared/service-proxies/provinceservice-proxy';

@Component({
  templateUrl: 'create-province-dialog.component.html',
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
export class CreateProvinceDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  province: CreateProvinceDto = new CreateProvinceDto();

  constructor(
    injector: Injector,
    public _provinceService: ProvinceServiceProxy,
    private _dialogRef: MatDialogRef<CreateProvinceDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
  }

  save(): void {
    this.saving = true;

    this._provinceService
      .create(this.province)
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
