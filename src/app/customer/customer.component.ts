import { Component, Injector, ViewChild, NgModule,ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
    CustomerServiceProxy,
    CustomerDto,
    PagedResultDtoOfCustomerDto
} from '@shared/service-proxies/customerservice-proxy';
import { CreateCustomerDialogComponent } from './create-customer/create-customer-dialog.component';
import { DetailCustomerDialogComponent } from './detail-customer/detail-customer-dialog.component';
import { EditCustomerDialogComponent } from './edit-customer/edit-customer-dialog.component';
//import { FileUploaderComponent } from './importfile-customer/importfile-customer-dialog.component';

//import { ExcelService } from '@shared/service-proxies/excelservice-proxy';

declare var $ :any; 

class PagedCustomersRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './customer.component.html',
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
        div#detailWorklist {}
        .mat-expansion-panel-header-title {
            font-weight: bold;
            color: #b8c7ce;
        }
        .mat-expansion-indicator::after {
            color: white !important;
        }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class CustomersComponent extends PagedListingComponentBase<CustomerDto> {

    customers: CustomerDto[] = [];
    keyword = '';
    isActive: boolean | null;

    constructor(
        //private excelService:ExcelService,

        injector: Injector,
        private _customerService: CustomerServiceProxy,
        private _dialog: MatDialog,
        private http: HttpClient,
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
        request: PagedCustomersRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {

        this._customerService
            .getAll(request.keyword, request.isActive, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PagedResultDtoOfCustomerDto) => {
                this.customers = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    delete(customer: CustomerDto): void {
        abp.message.confirm(
            this.l('CustomerDeleteWarningMessage', customer.name),
            (result: boolean) => {
                if (result) {
                    this._customerService
                        .delete(customer.id)
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

    createCustomer(): void {
        this.showCreateOrEditCustomerDialog();
    }

    editCustomer(customer: CustomerDto): void {
        this.showCreateOrEditCustomerDialog(customer.id);
    }

    showCreateOrEditCustomerDialog(id?: number): void {
        let createOrEditCustomerDialog;
        if (id === undefined || id <= 0) {
            createOrEditCustomerDialog = this._dialog.open(CreateCustomerDialogComponent);
        } else {
            createOrEditCustomerDialog = this._dialog.open(EditCustomerDialogComponent, {
                data: id
            });
        }

        createOrEditCustomerDialog.afterClosed().subscribe(result => {
            if (result) {
                this.refresh();
            }
        });
    }

    // exportAsXLSX():void {
    //     this.excelService.exportAsExcelFile(this.customers, 'sample');
    //   }

    // importfile():void {
    //     this.FileUploaderComponent();
    // }

    // FileUploaderComponent(id?: number): void {
    //     let UploaderComponent;
    //     if (id === undefined || id <= 0) {
    //         UploaderComponent = this._dialog.open(FileUploaderComponent);
    //     } else {
    //         UploaderComponent = this._dialog.open(FileUploaderComponent, {
    //             data: id
    //         });
    //     }

        // UploaderComponent.afterClosed().subscribe(result => {
        //     if (result) {
        //         this.refresh();
        //     }
        // });
    }
    



