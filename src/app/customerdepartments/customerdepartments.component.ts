import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
    CustomerDepartmentServiceProxy,
    CustomerDepartmentDto,
    PagedResultDtoOfCustomerDepartmentDto
} from '@shared/service-proxies/customerdepartmentservice-proxy.service';
import { CreateCustomerDepartmentDialogComponent } from './create-customerdepartment/create-customerdepartment-dialog.component';
import { EditCustomerDepartmentDialogComponent } from './edit-customerdepartment/edit-customerdepartment-dialog.component';

declare var $ :any; 

class PagedCustomerDepartmentsRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './customerdepartments.component.html',
    animations: [appModuleAnimation()],
    styles: [
        `
          mat-form-field {
            padding: 10px;
          }
        `
    ]
})
export class CustomerDepartmentsComponent extends PagedListingComponentBase<CustomerDepartmentDto> {
    customerdepartments: CustomerDepartmentDto[] = [];
    keyword = '';
    isActive: boolean | null;

    constructor(
        injector: Injector,
        private _customerDepartmentService: CustomerDepartmentServiceProxy,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

    ngOnInit() {
        var tables = document.getElementsByTagName('table');
        for (var i=0; i<tables.length;i++){
            resizableGrid(tables[i]);
    this.refresh();
    }

        function resizableGrid(table) {
            var row = table.getElementsByTagName('tr')[0],
            cols = row ? row.children : undefined;
            if (!cols) return;
 
            table.style.overflow = 'hidden';
 
            var tableHeight = table.offsetHeight;
 
            for (var i=0;i<cols.length;i++){
                var div = createDiv(tableHeight);
                cols[i].appendChild(div);
                cols[i].style.position = 'relative';
                setListeners(div);
            }

        function setListeners(div){
            var pageX,curCol,nxtCol,curColWidth,nxtColWidth;

            div.addEventListener('mousedown', function (e) {
                curCol = e.target.parentElement;
                nxtCol = curCol.nextElementSibling;
                pageX = e.pageX; 
 
                var padding = paddingDiff(curCol);
 
                curColWidth = curCol.offsetWidth - padding;
                if (nxtCol)
                    nxtColWidth = nxtCol.offsetWidth - padding;
            });

            div.addEventListener('mouseover', function (e) {
                e.target.style.borderRight = '2px solid';
            })

            div.addEventListener('mouseout', function (e) {
                e.target.style.borderRight = '';
            })

            document.addEventListener('mousemove', function (e) {
                if (curCol) {
                    var diffX = e.pageX - pageX;
 
                    if (nxtCol)
                        nxtCol.style.width = (nxtColWidth - (diffX))+'px';

                    curCol.style.width = (curColWidth + diffX)+'px';
                }
            });

            document.addEventListener('mouseup', function (e) { 
                curCol = undefined;
                nxtCol = undefined;
                pageX = undefined;
                nxtColWidth = undefined;
                curColWidth = undefined
            });
        }
 
        function createDiv(height){
            var div = document.createElement('div');
            div.style.top = '0px';
            div.style.right = '0px';
            div.style.width = '5px';
            div.style.position = 'absolute';
            div.style.cursor = 'col-resize';
            div.style.userSelect = 'none';
            div.style.height = '100%';
            return div;
        }
 
        function paddingDiff(col){
 
            if (getStyleVal(col,'box-sizing') == 'border-box'){
            return 0;
            }
 
            var padLeft = getStyleVal(col,'padding-left');
            var padRight = getStyleVal(col,'padding-right');
            return (parseInt(padLeft) + parseInt(padRight));

        }

        function getStyleVal(elm,css){
            return (window.getComputedStyle(elm, null).getPropertyValue(css))
        }
        };
    }

    list(
        request: PagedCustomerDepartmentsRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._customerDepartmentService
            .getAll(request.keyword, request.isActive, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfCustomerDepartmentDto) => {
                this.customerdepartments = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    delete(customerdepartment: CustomerDepartmentDto): void {
        abp.message.confirm(
            this.l('CustomerPeopleDeleteWarningMessage', customerdepartment.id),
            (result: boolean) => {
                if (result) {
                    this._customerDepartmentService
                        .delete(customerdepartment.id)
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

    createCustomerDepartment(): void {
        this.showCreateOrEditCustomerDepartmentDialog();
    }

    editCustomerDepartment(customerdepartment: CustomerDepartmentDto): void {
        this.showCreateOrEditCustomerDepartmentDialog(customerdepartment.id);
    }

    showCreateOrEditCustomerDepartmentDialog(id?: number): void {
        let createOrEditCustomerDepartmentDialog;
        if (id === undefined || id <= 0) {
            createOrEditCustomerDepartmentDialog = this._dialog.open(CreateCustomerDepartmentDialogComponent);
        } else {

            createOrEditCustomerDepartmentDialog = this._dialog.open(EditCustomerDepartmentDialogComponent, {
                data: id
            });

            createOrEditCustomerDepartmentDialog.afterClosed().subscribe(result => {
                if (result) {
                    this.refresh();
                }
            });
        }
    }
    
}

