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
  TaskServiceProxy,
  TaskDto,
  Modalities,
  Sex,
  SexOptions
} from '@shared/service-proxies/taskservice-proxy';

@Component({
  templateUrl: 'edit-task-dialog.component.html',
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
export class EditTaskDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  task: TaskDto = new TaskDto();
  isDetail: boolean;
  modalities: string[] = Modalities;
  sexOptions:Sex[]=SexOptions;
  constructor(
    injector: Injector,
    private _taskService:TaskServiceProxy,
    private _dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
  ) {
    super(injector);
    console.log(MAT_DIALOG_DATA);
  }

  ngOnInit(): void {
    // this.isDetail=this._isdetail;
    this._taskService.get(this._id)
      .subscribe((result: TaskDto) => {
        this.task.init(result);
      });
  }

  save(): void {
    this.saving = true;

    this._taskService
      .update(this.task)
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
