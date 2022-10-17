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
    ProjectServiceProxy,
    ProjectDto,
    PagedResultDtoOfProjectDto
} from '@shared/service-proxies/projectservice-proxy';

import {
    TaskServiceProxy,
    TaskDto,
} from '@shared/service-proxies/taskservice-proxy';

import { CreateProjectDialogComponent } from './create-project/create-project-dialog.component';
import { EditProjectDialogComponent } from './edit-project/edit-project-dialog.component';

import * as ApiServiceProxies from '../../shared/service-proxies/service-proxies';

class PagedProjectRequestDto extends PagedRequestDto {
    keyword: string;
    fromDate: string;
    toDate: string;
}

@Component({
    templateUrl: './project.component.html',
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
        div#detailProject {}
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
export class ProjectComponent extends PagedListingComponentBase<ProjectDto> {
    projects: ProjectDto[] = [];
    private baseUrl: string;
    selectedProject: ProjectDto = new ProjectDto();
    task: TaskDto = new TaskDto();
    createTasks: TaskDto[]=[];
    keyword = '';
    fromDate = new Date();
    toDate = new Date();

    constructor(
        injector: Injector,
        private _projectService: ProjectServiceProxy,
        private _taskService: TaskServiceProxy,
        private _dialog: MatDialog,
        private bottomSheet: MatBottomSheet,
        @Inject(ApiServiceProxies.API_BASE_URL) baseUrl?: string
    ) {
        super(injector);
        this.baseUrl = baseUrl;
    }

    
    list(
        request: PagedProjectRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {
        request.keyword = this.keyword;
        request.fromDate = this.fromDate !=null ? this.fromDate.toISOString():'';
        request.toDate = this.toDate !=null ?   this.toDate.toISOString():'';
        this._projectService
            .getAll(request.keyword, request.fromDate, request.toDate, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfProjectDto) => {
                this.projects = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    delete(project: ProjectDto): void {
        abp.message.confirm(
            this.l('ProjectDeleteWarningMessage', project.id),
            (result: boolean) => {
                if (result) {
                    this._projectService
                        .delete(project.id)
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

    createProject(): void {
        this.showCreateOrEditProjectDialog();
    }

    editeProject(project: ProjectDto): void {
        this.showCreateOrEditProjectDialog(project.id);
    }

    detail(project: ProjectDto): void {
        this._projectService.get(project.id).subscribe((result) => {
            this.selectedProject.init(result);
        });
    }

    viewDetail(project: ProjectDto): void {
        this.showCreateOrEditProjectDialog(project.id, true);
    }

    showCreateOrEditProjectDialog(id?: number, detail?: boolean): void {
        let createOrEditProjectDialog;
        if (id === undefined || id <= 0) {
            createOrEditProjectDialog = this._dialog.open(CreateProjectDialogComponent);
        } else {
            if (detail != undefined || detail == true) {
                createOrEditProjectDialog = this._dialog.open(EditProjectDialogComponent, {
                    data: id
                });
            }
            else {
                createOrEditProjectDialog = this._dialog.open(EditProjectDialogComponent, {
                    data: id
                });
            }
        }

        createOrEditProjectDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }
}
