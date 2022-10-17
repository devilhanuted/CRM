import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import * as ServiceAPI from './service-proxies';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
    providedIn: 'root'
})
export class CustomerPeopleServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    private jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(ServiceAPI.API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : '';
    }

    /**
     * @param input (optional)
     * @return Success
     */
    create(input: CreateCustomerPeopleDto | null | undefined): Observable<CustomerPeopleDto> {
        var url_ = this.baseUrl + '/api/services/app/CustomerPeople/Create';
        url_ = url_.replace(/[?&]$/, '');

        var content_ = JSON.stringify(input);

        // tslint:disable-next-line:no-shadowed-variable
        var options_: any = {
            body: content_,
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<CustomerPeopleDto>><any>_observableThrow(e);
                }
            } else {
                return <Observable<CustomerPeopleDto>><any>_observableThrow(response_);
            }
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<CustomerPeopleDto> {
        var status = response.status;
        var responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        const _headers: any = {}; if (response.headers) {
            for (const key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                const resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? CustomerPeopleDto.fromJS(resultData200) : new CustomerPeopleDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf<CustomerPeopleDto>(<any>null);
    }


    /**
     * @param id (optional) 
     * @return Success
     */
    delete(id: number | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/CustomerPeople/Delete?";
        if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return _observableOf<void>(<any>null);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(<any>null);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    get(id: number | null | undefined): Observable<CustomerPeopleDto> {
        let url_ = this.baseUrl + "/api/services/app/CustomerPeople/Get?";
        if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<CustomerPeopleDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<CustomerPeopleDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<CustomerPeopleDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? CustomerPeopleDto.fromJS(resultData200) : new CustomerPeopleDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CustomerPeopleDto>(<any>null);
    }
    getAll(keyword: string | null | undefined, hasConclusion: boolean | null | undefined, skipCount: number | null | undefined, maxResultCount: number | null | undefined): Observable<PagedResultDtoOfCustomerPeopleDto> {
        let url_ = this.baseUrl + "/api/services/app/CustomerPeople/GetAll?";
        if (keyword !== undefined)
            url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
        if (hasConclusion !== undefined)
            url_ += "HasConclusion=" + encodeURIComponent("" + hasConclusion) + "&";
        if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultDtoOfCustomerPeopleDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfCustomerPeopleDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfCustomerPeopleDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? PagedResultDtoOfCustomerPeopleDto.fromJS(resultData200) : new PagedResultDtoOfCustomerPeopleDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfCustomerPeopleDto>(<any>null);
    }

    getByDepartment(departmentId: number | null | undefined): Observable<ListResultDtoOfCustomerPeopleDto> {
        let url_ = this.baseUrl + "/api/services/app/CustomerPeople/GetPeopleByDepartment?";
        url_ += "departmentId=" + encodeURIComponent("" + departmentId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGetByDepartment(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetByDepartment(<any>response_);
                } catch (e) {
                    return <Observable<ListResultDtoOfCustomerPeopleDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ListResultDtoOfCustomerPeopleDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetByDepartment(response: HttpResponseBase): Observable<ListResultDtoOfCustomerPeopleDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? ListResultDtoOfCustomerPeopleDto.fromJS(resultData200) : new ListResultDtoOfCustomerPeopleDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ListResultDtoOfCustomerPeopleDto>(<any>null);
    }

    /**
     * @param input (optional) 
     * @return Success
     */
    update(input: CustomerPeopleDto | null | undefined): Observable<CustomerPeopleDto> {
        let url_ = this.baseUrl + "/api/services/app/CustomerPeople/Update";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(input);

        let options_: any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processUpdate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdate(<any>response_);
                } catch (e) {
                    return <Observable<CustomerPeopleDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<CustomerPeopleDto>><any>_observableThrow(response_);
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<CustomerPeopleDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? CustomerPeopleDto.fromJS(resultData200) : new CustomerPeopleDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CustomerPeopleDto>(<any>null);
    }
}

export class CreateCustomerPeopleDto implements ICreateCustomerPeopleDto {
    name: string;
    departmentId: number;
    departmentName: string | undefined;
    tel: string | undefined;
    email: string;
    positionId: number;
    positionName: string | undefined;
    note: String;
    canDecideBuy: boolean | undefined;
    customerId: number;

    constructor(data?: ICreateCustomerPeopleDto) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data['name'];
            this.departmentId = data['departmentId'];
            this.departmentName = data['departmentName'];
            this.tel = data['tel'];
            this.email = data['email'];
            this.positionId = data['positionId'];
            this.positionName = data['positionName'];
            this.note = data['note'];
            this.canDecideBuy = data['canDecideBuy'];
            this.customerId = data['customerId'];
        }
    }

    static fromJS(data: any): CreateCustomerPeopleDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateCustomerPeopleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['name'] = this.name;
        data['departmentId'] = this.departmentId;
        data['departmentName'] = this.departmentName;
        data['tel'] = this.tel;
        data['email'] = this.email;
        data['positionId'] = this.positionId;
        data['positionName'] = this.positionName;
        data['note'] = this.note;
        data['canDecideBuy'] = this.canDecideBuy;
        data['customerId'] = this.customerId;
        return data;
    }

    clone(): CreateCustomerPeopleDto {
        const json = this.toJSON();
        const result = new CreateCustomerPeopleDto();
        result.init(json);
        return result;
    }
}

export interface ICreateCustomerPeopleDto {
    name: string;
    departmentId: number;
    departmentName: string | undefined;
    tel: string | undefined;
    email: string;
    positionId: number;
    positionName: string | undefined;
    note: String;
    canDecideBuy: boolean | undefined;
    customerId: number;
}

export class CustomerPeopleDto implements ICustomerPeopleDto {
    id: number | undefined;
    name: string;
    departmentId: number;
    departmentName: string | undefined;
    tel: string | undefined;
    email: string;
    positionId: number;
    positionName: string | undefined;
    note: String;
    canDecideBuy: boolean | undefined;
    customerId: number;

    constructor(data?: ICustomerPeopleDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data['name'];
            this.departmentId = data['departmentId'];
            this.departmentName = data['departmentName'];
            this.tel = data['tel'];
            this.email = data['email'];
            this.positionId = data['positionId'];
            this.positionName = data['positionName'];
            this.note = data['note'];
            this.canDecideBuy = data['canDecideBuy'];
            this.customerId = data['customerId'];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): CustomerPeopleDto {
        data = typeof data === 'object' ? data : {};
        let result = new CustomerPeopleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['name'] = this.name;
        data['departmentId'] = this.departmentId;
        data['departmentName'] = this.departmentName;
        data['tel'] = this.tel;
        data['email'] = this.email;
        data['positionId'] = this.positionId;
        data['positionName'] = this.positionName;
        data['note'] = this.note;
        data['canDecideBuy'] = this.canDecideBuy;
        data['customerId'] = this.customerId;
        data["id"] = this.id;
        return data;
    }

    clone(): CustomerPeopleDto {
        const json = this.toJSON();
        let result = new CustomerPeopleDto();
        result.init(json);
        return result;
    }
}

export interface ICustomerPeopleDto {
    id: number | undefined;
    name: string;
    departmentId: number;
    departmentName: string | undefined;
    tel: string | undefined;
    email: string;
    positionId: number;
    positionName: string | undefined;
    note: String;
    canDecideBuy: boolean | undefined;
    customerId: number;

}
export class ListResultDtoOfCustomerPeopleDto implements IListResultDtoOfCustomerPeopleDto {
    items: CustomerPeopleDto[] | undefined;

    constructor(data?: IListResultDtoOfCustomerPeopleDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            if (data["items"] && data["items"].constructor === Array) {
                this.items = [];
                for (let item of data["items"])
                    this.items.push(CustomerPeopleDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ListResultDtoOfCustomerPeopleDto {
        data = typeof data === 'object' ? data : {};
        let result = new ListResultDtoOfCustomerPeopleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.items && this.items.constructor === Array) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data;
    }

    clone(): ListResultDtoOfCustomerPeopleDto {
        const json = this.toJSON();
        let result = new ListResultDtoOfCustomerPeopleDto();
        result.init(json);
        return result;
    }
}

export class PagedResultDtoOfCustomerPeopleDto implements IPagedResultDtoOfCustomerPeopleDto {
    totalCount: number | undefined;
    items: CustomerPeopleDto[] | undefined;

    constructor(data?: IPagedResultDtoOfCustomerPeopleDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.totalCount = data["totalCount"];
            if (data["items"] && data["items"].constructor === Array) {
                this.items = [];
                for (let item of data["items"])
                    this.items.push(CustomerPeopleDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfCustomerPeopleDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfCustomerPeopleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["totalCount"] = this.totalCount;
        if (this.items && this.items.constructor === Array) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data;
    }

    clone(): PagedResultDtoOfCustomerPeopleDto {
        const json = this.toJSON();
        let result = new PagedResultDtoOfCustomerPeopleDto();
        result.init(json);
        return result;
    }
}

export interface IListResultDtoOfCustomerPeopleDto {
    items: CustomerPeopleDto[] | undefined;
}

export interface IPagedResultDtoOfCustomerPeopleDto {
    totalCount: number | undefined;
    items: CustomerPeopleDto[] | undefined;
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ServiceAPI.SwaggerException(message, status, response, headers, null));
}

