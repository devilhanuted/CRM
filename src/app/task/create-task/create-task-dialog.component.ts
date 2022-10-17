import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MatCheckboxChange } from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  TaskServiceProxy,
  Modalities,
  CreateTaskDto,
  Sex,
  SexOptions
} from '@shared/service-proxies/taskservice-proxy';

@Component({
  templateUrl: 'create-task-dialog.component.html',
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
export class CreateTaskDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  task: CreateTaskDto = new CreateTaskDto();
  modalities: string[] = Modalities;
  sexOptions:Sex[]=SexOptions;
  constructor(
    injector: Injector,
    private _taskService: TaskServiceProxy,
    private _dialogRef: MatDialogRef<CreateTaskDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {}


  save(): void {
    this.saving = true;

    this._taskService
      .create(this.task)
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
