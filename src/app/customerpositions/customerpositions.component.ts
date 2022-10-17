import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
    CustomerPositionServiceProxy,
    CustomerPositionDto,
    PagedResultDtoOfCustomerPositionDto
} from '@shared/service-proxies/customerpositionservice-proxy.service';
import { CreateCustomerPositionDialogComponent } from './create-customerposition/create-customerposition-dialog.component';
import { EditCustomerPositionDialogComponent } from './edit-customerposition/edit-customerposition-dialog.component';

class PagedCustomerPositonsRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './customerpositions.component.html',
    animations: [appModuleAnimation()],
    styles: [
        `
          mat-form-field {
            padding: 10px;
          }
        `
    ]
})
export class CustomerPositionsComponent extends PagedListingComponentBase<CustomerPositionDto> {
    customerpositions: CustomerPositionDto[] = [];
    keyword = '';
    isActive: boolean | null;

    constructor(
        injector: Injector,
        private _customerPositionService: CustomerPositionServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    list(
        request: PagedCustomerPositonsRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._customerPositionService
            .getAll(request.keyword, request.isActive, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfCustomerPositionDto) => {
                this.customerpositions = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    delete(customerposition: CustomerPositionDto): void {
        abp.message.confirm(
            this.l('CustomerPeopleDeleteWarningMessage', customerposition.id),
            (result: boolean) => {
                if (result) {
                    this._customerPositionService
                        .delete(customerposition.id)
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

    createCustomerPosition(): void {
        this.showCreateOrEditCustomerPositionDialog();
    }

    editCustomerPosition(customerposition: CustomerPositionDto): void {
        this.showCreateOrEditCustomerPositionDialog(customerposition.id);
    }

    showCreateOrEditCustomerPositionDialog(id?: number): void {
        let createOrEditCustomerPositionDialog;
        if (id === undefined || id <= 0) {
            createOrEditCustomerPositionDialog = this._dialog.open(CreateCustomerPositionDialogComponent);
        } else {

            createOrEditCustomerPositionDialog = this._dialog.open(EditCustomerPositionDialogComponent, {
                data: id
            });
        }
        createOrEditCustomerPositionDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }
}

