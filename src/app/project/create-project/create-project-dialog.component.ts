import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MatCheckboxChange } from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  ProjectServiceProxy,
  Modalities,
  CreateProjectDto,
  Sex,
  SexOptions
} from '@shared/service-proxies/projectservice-proxy';

import {
  TaskServiceProxy,
  TaskDto,
} from '@shared/service-proxies/taskservice-proxy';

@Component({
  templateUrl: 'create-project-dialog.component.html',
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
export class CreateProjectDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  project: CreateProjectDto = new CreateProjectDto();
  task: TaskDto = new TaskDto();
  createTasks: TaskDto[]=[];
  modalities: string[] = Modalities;
  sexOptions:Sex[]=SexOptions;
  constructor(
    injector: Injector,
    private _projectService: ProjectServiceProxy,
    private _taskService: TaskServiceProxy,
    private _dialogRef: MatDialogRef<CreateProjectDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.project.createTasks=[];
  }


  save(): void {
    this.saving = true;

    this._projectService
      .create(this.project)
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

  addtask():void{
    var newtask=new TaskDto();
    this.project.createTasks.push(newtask);
  }


  close(result: any): void {
    this._dialogRef.close(result);
  }
}
