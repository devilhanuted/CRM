import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import * as moment from 'moment';
import * as ServiceAPI from './service-proxies';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
    providedIn: 'root'
})

export class CustomerServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(ServiceAPI.API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @param input (optional) 
     * @return Success
     */
    create(input: CreateCustomerDto | null | undefined): Observable<CustomerDto> {
        let url_ = this.baseUrl + "/api/services/app/Customer/Create";
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

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processCreate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<CustomerDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<CustomerDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<CustomerDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? CustomerDto.fromJS(resultData200) : new CustomerDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CustomerDto>(<any>null);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    delete(id: number | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Customer/Delete?";
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
    get(id: number | null | undefined): Observable<CustomerDto> {
        let url_ = this.baseUrl + "/api/services/app/Customer/Get?";
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
                    return <Observable<CustomerDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<CustomerDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<CustomerDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? CustomerDto.fromJS(resultData200) : new CustomerDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CustomerDto>(<any>null);
    }

    /**
     * @param keyword (optional) 
     * @param isActive (optional) 
     * @param skipCount (optional) 
     * @param maxResultCount (optional) 
     * @return Success
     */
    getAll(keyword: string | null | undefined, isActive: boolean | null | undefined, skipCount: number | null | undefined, maxResultCount: number | null | undefined): Observable<PagedResultDtoOfCustomerDto> {
        let url_ = this.baseUrl + "/api/services/app/Customer/GetAll?";
        if (keyword !== undefined)
            url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
        if (isActive !== undefined)
            url_ += "IsActive=" + encodeURIComponent("" + isActive) + "&";
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
                    return <Observable<PagedResultDtoOfCustomerDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfCustomerDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfCustomerDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? PagedResultDtoOfCustomerDto.fromJS(resultData200) : new PagedResultDtoOfCustomerDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfCustomerDto>(<any>null);
    }

    /**
     * @param input (optional) 
     * @return Success
     */
    update(input: CustomerDto | null | undefined): Observable<CustomerDto> {
        let url_ = this.baseUrl + "/api/services/app/Customer/Update";
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
                    return <Observable<CustomerDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<CustomerDto>><any>_observableThrow(response_);
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<CustomerDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? CustomerDto.fromJS(resultData200) : new CustomerDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CustomerDto>(<any>null);
    }
}

export class CreateCustomerDto implements ICreateCustomerDto {
    id: number;
    name: string;
    tel: string;
    fax: string;
    address: string;
    taxNumber: string;
    email: string;
    wardId: number;
    districtId: number;
    provinceId: number;

    constructor(data?: ICustomerDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.tel = data["tel"];
            this.fax = data["fax"];
            this.address = data["address"];
            this.taxNumber = data["taxNumber"];
            this.email = data["email"];
            this.wardId = data["wardId"];
            this.districtId = data["districtId"];
            this.provinceId = data["provinceId"];
        }
    }

    static fromJS(data: any): CustomerDto {
        data = typeof data === 'object' ? data : {};
        let result = new CustomerDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["tel"] = this.tel;
        data["fax"] = this.fax;
        data["address"] = this.address;
        data["taxNumber"] = this.taxNumber;
        data["email"] = this.email;
        data["wardId"] = this.wardId;
        data["districtId"] = this.districtId;
        data["provinceId"] = this.provinceId;
        return data;
    }

    clone(): CustomerDto {
        const json = this.toJSON();
        let result = new CustomerDto();
        result.init(json);
        return result;
    }

}

export interface ICreateCustomerDto {
    id: number;
    name: string;
    tel: string;
    fax: string;
    address: string;
    taxNumber: string;
    email: string;
    wardId: number;
    districtId: number;
    provinceId: number;

}

export class CustomerDto implements ICustomerDto {
    id: number;
    name: string;
    tel: string;
    fax: string;
    address: string;
    taxNumber: string;
    email: string;
    wardId: number;
    wardName: string | undefined;
    districtId: number;
    districtName: string | undefined;
    provinceId: number;
    provinceName: string | undefined;

    constructor(data?: ICustomerDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.tel = data["tel"];
            this.fax = data["fax"];
            this.address = data["address"];
            this.taxNumber = data["taxNumber"];
            this.email = data["email"];
            this.wardId = data["wardId"];
            this.wardName = data["wardName"];
            this.districtId = data["wardId"];
            this.districtName = data["districtName"];
            this.provinceId = data["wardId"];
            this.provinceName = data["provinceName"];
        }
    }

    static fromJS(data: any): CustomerDto {
        data = typeof data === 'object' ? data : {};
        let result = new CustomerDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["tel"] = this.tel;
        data["fax"] = this.fax;
        data["address"] = this.address;
        data["taxNumber"] = this.taxNumber;
        data["email"] = this.email;
        data["wardId"] = this.wardId;
        data["wardName"] = this.wardName;
        data["districtId"] = this.districtId;
        data["districtName"] = this.districtName;
        data["provinceId"] = this.provinceId;
        data["provinceName"] = this.provinceName;
        return data;
    }

    clone(): CustomerDto {
        const json = this.toJSON();
        let result = new CustomerDto();
        result.init(json);
        return result;
    }
}

export interface ICustomerDto {
    id: number;
    name: string;
    tel: string;
    fax: string;
    address: string;
    taxNumber: string;
    email: string;
    wardId: number;
    wardName: string | undefined;
    districtId: number;
    districtName: string | undefined;
    provinceId: number;
    provinceName: string | undefined;
}

export class PagedResultDtoOfCustomerDto implements IPagedResultDtoOfCustomerDto {
    totalCount: number | undefined;
    items: CustomerDto[] | undefined;

    constructor(data?: IPagedResultDtoOfCustomerDto) {
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
                    this.items.push(CustomerDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfCustomerDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfCustomerDto();
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

    clone(): PagedResultDtoOfCustomerDto {
        const json = this.toJSON();
        let result = new PagedResultDtoOfCustomerDto();
        result.init(json);
        return result;
    }
}

export interface IPagedResultDtoOfCustomerDto {
    totalCount: number | undefined;
    items: CustomerDto[] | undefined;
}

export enum IsCustomerAvailableOutputState {
    _1 = 1,
    _2 = 2,
    _3 = 3,
}

export class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
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