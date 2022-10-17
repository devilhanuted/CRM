import { Component, Injector, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CreateCustomerPeopleDto,
  CustomerPeopleServiceProxy

} from '@shared/service-proxies/customerpeopleservice-proxy.service';
import { CustomerDepartmentDto, CustomerDepartmentServiceProxy } from '@shared/service-proxies/customerdepartmentservice-proxy.service';
import { CustomerPositionDto, CustomerPositionServiceProxy } from '@shared/service-proxies/customerpositionservice-proxy.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  templateUrl: 'create-customerpeople-dialog.component.html',
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
export class CreateCustomerPeopleDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  customerpeople: CreateCustomerPeopleDto = new CreateCustomerPeopleDto();
  customerdepartments: CustomerDepartmentDto[];
  customerpositions: CustomerPositionDto[];
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  constructor(
    injector: Injector,
    private _customerPositionService: CustomerPositionServiceProxy,
    private _customerDepartmentService: CustomerDepartmentServiceProxy,
    public _customerPeopleService: CustomerPeopleServiceProxy,
    private _dialogRef: MatDialogRef<CreateCustomerPeopleDialogComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) private parameters: any
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.customerpeople.departmentId = this.parameters._departmentId;
    this.customerpeople.customerId = this.parameters._customerId;
    this.customerpeople.positionId = 0;
    this.getCustomerPositions();
    this.createForm();
  }
  
  getCustomerPositions(): void {
    this._customerPositionService.getCustomerPositions()
      .subscribe(c => {
        this.customerpositions = c.result.items;
      });
  }
  onCanDecideByChange($event: MatCheckboxChange): void {
    this.customerpeople.canDecideBuy = $event.checked;
  }
  save(): void {
    this.saving = true;

    this._customerPeopleService
      .create(this.customerpeople)
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

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'tel': [null, [Validators.required, Validators.minLength(10), Validators.pattern]],
      'name': [null, Validators.required],
      'validate': '',
      'positionId': '',
      'canDecideBuy': '',
      'note': ''
    });
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }
  
  getErrorTel() {
    return this.formGroup.get('tel').hasError('required') ? 'Field is required, must be at least 10 numbers' :
      this.formGroup.get('tel').hasError('pattern') ? 'Only use numbers, must be at least 10 numbers'  : '';
  }

}
