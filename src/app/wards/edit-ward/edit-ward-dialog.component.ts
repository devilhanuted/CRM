import { Component, Injector, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
WardServiceProxy,
  WardDto
} from '@shared/service-proxies/wardservice-proxy';

@Component({
  templateUrl: 'edit-ward-dialog.component.html',
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
export class EditWardDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  ward: WardDto = new WardDto();

  constructor(
    injector: Injector,
    public _wardService: WardServiceProxy,
    private _dialogRef: MatDialogRef<EditWardDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._wardService.get(this._id).subscribe((result: WardDto) => {
      this.ward = result;
    });
  }

  save(): void {
    this.saving = true;

    this._wardService
      .update(this.ward)
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
