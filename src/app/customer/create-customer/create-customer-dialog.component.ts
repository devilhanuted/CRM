import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerServiceProxy, CreateCustomerDto } from '@shared/service-proxies/customerservice-proxy';
import { ProvinceServiceProxy, ProvinceDto, ListResultDtoOfProvinceDto } from '@shared/service-proxies/provinceservice-proxy';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';



@Component({
  templateUrl: 'create-customer-dialog.component.html',
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

export class CreateCustomerDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  customer: CreateCustomerDto = new CreateCustomerDto();
  provinces: ProvinceDto[] = [];
  provinceControl:FormControl=new FormControl();

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';

  constructor(
    injector: Injector,
    public _customerService: CustomerServiceProxy,
    private _provinceService: ProvinceServiceProxy,
    private _dialogRef: MatDialogRef<CreateCustomerDialogComponent>,

    private formBuilder: FormBuilder

  ) {
    super(injector);
  }

  ngOnInit(): void { 
    this.getProvinceOptions('');
    console.log(this.provinces);
    this.createForm();
  }

  save(): void {
    this.saving = true;
 
    this._customerService
      .create(this.customer)
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

  getProvinceOptions(keyword: string): void {
    this._provinceService.findAllProvinces(keyword).subscribe((result: ListResultDtoOfProvinceDto) => {
      this.provinces = result.items;
    })
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'name': [null, Validators.required],
      'address': [null, Validators.required],
      'province': [null, Validators.required],
      'district': [null, Validators.required],
      'tel': [null, [Validators.required, Validators.minLength(10), Validators.pattern]],
      'fax': [null, [Validators.required, Validators.pattern]],
      'taxNumber': [null, [Validators.required, Validators.pattern]],
      'validate': ''
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
  
  get name() {
    return this.formGroup.get('name') as FormControl
  }
  get address() {
    return this.formGroup.get('address') as FormControl
  }
  get province() {
    return this.formGroup.get('province') as FormControl
  }
  get district() {
    return this.formGroup.get('district') as FormControl
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorTel() {
    return this.formGroup.get('tel').hasError('required') ? 'Field is required, must be at least 10 numbers' :
      this.formGroup.get('tel').hasError('pattern') ? 'Only use numbers, must be at least 10 numbers'  : '';
  }
  getErrorFax() {
    return this.formGroup.get('fax').hasError('required') ? 'Field is required' :
      this.formGroup.get('fax').hasError('pattern') ? 'Only use numbers'  : '';
  }
  getErrorTaxNumber() {
    return this.formGroup.get('taxNumber').hasError('required') ? 'Field is required' :
      this.formGroup.get('taxNumber').hasError('pattern') ? 'Only use numbers'  : '';
  }
  
}




