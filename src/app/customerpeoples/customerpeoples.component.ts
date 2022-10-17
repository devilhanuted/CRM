import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
    CustomerPeopleServiceProxy,
    CustomerPeopleDto,
    PagedResultDtoOfCustomerPeopleDto
} from '@shared/service-proxies/customerpeopleservice-proxy.service';
import { CreateCustomerPeopleDialogComponent } from './create-customerpeople/create-customerpeople-dialog.component';
import { EditCustomerPeopleDialogComponent } from './edit-customerpeople/edit-customerpeople-dialog.component';

class PagedCustomerPeoplesRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './customerpeoples.component.html',
    animations: [appModuleAnimation()],
    styles: [
        `
          mat-form-field {
            padding: 10px;
          }
        `
      ]
})
export class CustomerPeoplesComponent extends PagedListingComponentBase<CustomerPeopleDto> {
    customerpeoples: CustomerPeopleDto[] = [];
    keyword = '';
    isActive: boolean | null;

    constructor(
        injector: Injector,
        private _customerPeopleService: CustomerPeopleServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    list(
        request: PagedCustomerPeoplesRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._customerPeopleService
            .getAll(request.keyword, request.isActive, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfCustomerPeopleDto) => {
                this.customerpeoples = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    delete(customerpeople: CustomerPeopleDto): void {
        abp.message.confirm(
            this.l('CustomerPeopleDeleteWarningMessage', customerpeople.id),
            (result: boolean) => {
                if (result) {
                    this._customerPeopleService
                        .delete(customerpeople.id)
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

    createCustomerPeople(): void {
        this.showCreateOrEditCustomerPeopleDialog();
    }

    editCustomerPeople(customerpeople: CustomerPeopleDto): void {
        this.showCreateOrEditCustomerPeopleDialog(customerpeople.id);
    }

    showCreateOrEditCustomerPeopleDialog(id?: number): void {
        let createOrEditCustomerPeopleDialog;
        if (id === undefined || id <= 0) {
            createOrEditCustomerPeopleDialog = this._dialog.open(CreateCustomerPeopleDialogComponent);
        } else {
          
            createOrEditCustomerPeopleDialog = this._dialog.open(EditCustomerPeopleDialogComponent, {
                data: id
            });

        createOrEditCustomerPeopleDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }
  }
}

