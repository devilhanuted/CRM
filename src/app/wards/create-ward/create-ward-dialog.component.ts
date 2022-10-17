import { Component, Injector, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange, MatSelectChange, MatAutocompleteSelectedEvent } from '@angular/material';
import { finalize, map } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CreateWardDto,
  WardServiceProxy
} from '@shared/service-proxies/wardservice-proxy';

import { DistrictDto, DistrictServiceProxy, ListResultDtoOfDistrictDto } from '@shared/service-proxies/districtservice-proxy';
import { ProvinceDto, ProvinceServiceProxy, ListResultDtoOfProvinceDto } from '@shared/service-proxies/provinceservice-proxy';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';




@Component({
  templateUrl: 'create-ward-dialog.component.html',
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
export class CreateWardDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  ward: CreateWardDto = new CreateWardDto();
  districts: DistrictDto[];
  provinces: ProvinceDto[];
  provinceControl: FormControl = new FormControl();
  districtControl: FormControl = new FormControl();
  

  constructor(
    injector: Injector,
    public _wardService: WardServiceProxy,
    private _districtService: DistrictServiceProxy,
    private _provinceService: ProvinceServiceProxy,
    private _dialogRef: MatDialogRef<CreateWardDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private parameters: any

  ) {
    super(injector);
  }

  ngOnInit(): void {

    this.getDistricts('');
    this.getProvinces('');
  }

  getDistricts(keyword: string): void {
    this._districtService.findAllDistricts(keyword)
      .subscribe((d: ListResultDtoOfDistrictDto) => {
        this.districts = d.items;
      });
  }
  onSelectDistrict($event: MatAutocompleteSelectedEvent): void {
    
    this.ward.districtId = $event.option.value;
    alert($event.option.value);
  }

  onSelectProvince($event: MatAutocompleteSelectedEvent): void {
    this.ward.provinceId = $event.option.value;
    alert($event.option.value);
  }
  getProvinces(keyword: string): void {
    this._provinceService.findAllProvinces(keyword).subscribe((result: ListResultDtoOfProvinceDto) => {
      this.provinces = result.items;
    });
  }
    
  save(): void {
    this.saving = true;

    this._wardService
      .create(this.ward)
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
}
