import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
    ProvinceServiceProxy,
    ProvinceDto,
    PagedResultDtoOfProvinceDto
} from '@shared/service-proxies/provinceservice-proxy';
import { CreateProvinceDialogComponent } from './create-province/create-province-dialog.component';
import { EditProvinceDialogComponent } from './edit-province/edit-province-dialog.component';

class PagedProvincesRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './provinces.component.html',
    animations: [appModuleAnimation()],
    styles: [
        `
          mat-form-field {
            padding: 10px;
          }
        `
    ]
})
export class ProvincesComponent extends PagedListingComponentBase<ProvinceDto> {
    provinces: ProvinceDto[] = [];
    keyword = '';
    isActive: boolean | null;

    constructor(
        injector: Injector,
        private _provinceService: ProvinceServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    list(
        request: PagedProvincesRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._provinceService
            .getAll(request.keyword, request.isActive, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfProvinceDto) => {
                this.provinces = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    delete(province: ProvinceDto): void {
        abp.message.confirm(
            this.l('CustomerPeopleDeleteWarningMessage', province.id),
            (result: boolean) => {
                if (result) {
                    this._provinceService
                        .delete(province.id)
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

    createProvince(): void {
        this.showCreateOrEditProvinceDialog();
    }

    editProvince(province: ProvinceDto): void {
        this.showCreateOrEditProvinceDialog(province.id);
    }

    showCreateOrEditProvinceDialog(id?: number): void {
        let createOrEditProvinceDialog;
        if (id === undefined || id <= 0) {
            createOrEditProvinceDialog = this._dialog.open(CreateProvinceDialogComponent);
        } else {

            createOrEditProvinceDialog = this._dialog.open(EditProvinceDialogComponent, {
                data: id
            });
        }
        createOrEditProvinceDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }
}

