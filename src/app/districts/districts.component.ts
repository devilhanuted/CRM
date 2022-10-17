import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
    DistrictServiceProxy,
    DistrictDto,
    PagedResultDtoOfDistrictDto
} from '@shared/service-proxies/districtservice-proxy';
import { CreateDistrictDialogComponent } from './create-district/create-district-dialog.component';
import { EditDistrictDialogComponent } from './edit-district/edit-district-dialog.component';

class PagedDistrictsRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './districts.component.html',
    animations: [appModuleAnimation()],
    styles: [
        `
          mat-form-field {
            padding: 10px;
          }
        `
    ]
})
export class DistrictsComponent extends PagedListingComponentBase<DistrictDto> {
    districts: DistrictDto[] = [];
    keyword = '';
    isActive: boolean | null;

    constructor(
        injector: Injector,
        private _districtService: DistrictServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    list(
        request: PagedDistrictsRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._districtService
            .getAll(request.keyword, request.isActive, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfDistrictDto) => {
                this.districts = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    delete(district: DistrictDto): void {
        abp.message.confirm(
            this.l('CustomerPeopleDeleteWarningMessage', district.id),
            (result: boolean) => {
                if (result) {
                    this._districtService
                        .delete(district.id)
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

    createDistrict(): void {
        this.showCreateOrEditDistrictDialog();
    }

    editDistrict(district: DistrictDto): void {
        this.showCreateOrEditDistrictDialog(district.id);
    }

    showCreateOrEditDistrictDialog(id?: number): void {
        let createOrEditDistrictDialog;
        if (id === undefined || id <= 0) {
            createOrEditDistrictDialog = this._dialog.open(CreateDistrictDialogComponent);
        } else {

            createOrEditDistrictDialog = this._dialog.open(EditDistrictDialogComponent, {
                data: id
            });
        }
        createOrEditDistrictDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }
}

