import { Component, Injector, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import {
    PagedListingComponentBase,
    PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
    TaskServiceProxy,
    TaskDto,
    PagedResultDtoOfTaskDto
} from '@shared/service-proxies/taskservice-proxy';

import { CreateTaskDialogComponent } from './create-task/create-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task/edit-task-dialog.component';


import * as ApiServiceProxies from '../../shared/service-proxies/service-proxies';

class PagedTaskRequestDto extends PagedRequestDto {
    keyword: string;
    fromDate: string;
    toDate: string;
}

@Component({
    templateUrl: './task.component.html',
    animations: [appModuleAnimation()],
    styles: [
        `
          mat-form-field {
            padding: 10px;
          }
          mat-expansion-panel-header{
            background-color: rgb(34, 45, 50);
            height: 48px;
          }
          .mat-expansion-panel {
            background: #222d32;
            color: white;
            border-radius: unset;
        }
        .mat-expansion-panel:hover {
            background: rgb(34, 45, 50);
        }
        tr.ng-star-inserted.selected {
            background-color: #f43636cf;
        }
        div#detailTask {}
        .mat-expansion-panel-header-title {
            font-weight: bold;
            color: #b8c7ce;
        }
        .mat-expansion-indicator::after {
            color: white !important;
        }
        `
    ]
})
export class TaskComponent extends PagedListingComponentBase<TaskDto> {
    tasks: TaskDto[] = [];
    
    private baseUrl: string;
    selectedTask: TaskDto = new TaskDto();
    keyword = '';
    fromDate = new Date();
    toDate = new Date();

    constructor(
        injector: Injector,
        private _taskService: TaskServiceProxy,
        private _dialog: MatDialog,
        private bottomSheet: MatBottomSheet,
        @Inject(ApiServiceProxies.API_BASE_URL) baseUrl?: string
    ) {
        super(injector);
        this.baseUrl = baseUrl;
    }

    list(
        request: PagedTaskRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {
        request.keyword = this.keyword;
        request.fromDate = this.fromDate !=null ? this.fromDate.toISOString():'';
        request.toDate = this.toDate !=null ?   this.toDate.toISOString():'';
        this._taskService
            .getAll(request.keyword, request.fromDate, request.toDate, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfTaskDto) => {
                this.tasks = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    delete(task: TaskDto): void {
        abp.message.confirm(
            this.l('TaskDeleteWarningMessage', task.id),
            (result: boolean) => {
                if (result) {
                    this._taskService
                        .delete(task.id)
                        .pipe(
                            finalize(() => {
                                abp.notify.success(this.l('SuccessfullyDeleted'));
                                this.refresh();
                            })
                        )
                        .subscribe(() => { });
                }
            }
        );
    }

    createTask(): void {
        this.showCreateOrEditTaskDialog();
    }

    editeTask(task: TaskDto): void {
        this.showCreateOrEditTaskDialog(task.id);
    }

    detail(task: TaskDto): void {
        this._taskService.get(task.id).subscribe((result) => {
            this.selectedTask.init(result);
        });
    }

    viewDetail(task: TaskDto): void {
        this.showCreateOrEditTaskDialog(task.id, true);
    }

    showCreateOrEditTaskDialog(id?: number, detail?: boolean): void {
        let createOrEditTaskDialog;
        if (id === undefined || id <= 0) {
            createOrEditTaskDialog = this._dialog.open(CreateTaskDialogComponent);
        } else {
            if (detail != undefined || detail == true) {
                createOrEditTaskDialog = this._dialog.open(EditTaskDialogComponent, {
                    data: id
                });
            }
            else {
                createOrEditTaskDialog = this._dialog.open(EditTaskDialogComponent, {
                    data: id
                });
            }
        }

        createOrEditTaskDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }
}
