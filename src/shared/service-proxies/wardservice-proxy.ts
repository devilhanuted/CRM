import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import * as moment from 'moment';

import * as ApiServiceProxies from './service-proxies';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
    providedIn: 'root'
  })
export class WardServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(ApiServiceProxies.API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @param input (optional) 
     * @return Success
     */
    create(input: CreateWardDto | null | undefined): Observable<WardDto> {
        let url_ = this.baseUrl + "/api/services/app/Ward/Create";
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
                    return <Observable<WardDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<WardDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<WardDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? WardDto.fromJS(resultData200) : new WardDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<WardDto>(<any>null);
    }
    /**
     * @param id (optional) 
     * @return Success
     */
    delete(id: number | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Ward/Delete?";
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
    get(id: number | null | undefined): Observable<WardDto> {
        let url_ = this.baseUrl + "/api/services/app/Ward/Get?";
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
                    return <Observable<WardDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<WardDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<WardDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? WardDto.fromJS(resultData200) : new WardDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<WardDto>(<any>null);
    }
    
    getAll(keyword: string | null | undefined, hasConclusion: boolean | null | undefined, skipCount: number | null | undefined, maxResultCount: number | null | undefined): Observable<PagedResultDtoOfWardDto> {
        let url_ = this.baseUrl + "/api/services/app/Ward/GetAll?";
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
                    return <Observable<PagedResultDtoOfWardDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfWardDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfWardDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? PagedResultDtoOfWardDto.fromJS(resultData200) : new PagedResultDtoOfWardDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfWardDto>(<any>null);
    }
    
    /**
     * @param input (optional) 
     * @return Success
     */
    update(input: WardDto | null | undefined): Observable<WardDto> {
        let url_ = this.baseUrl + "/api/services/app/Ward/Update";
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
                    return <Observable<WardDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<WardDto>><any>_observableThrow(response_);
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<WardDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? WardDto.fromJS(resultData200) : new WardDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<WardDto>(<any>null);
    }
}

export class CreateWardDto implements ICreateWardDto {
    id: number;
    name: string;
    englishName: string;
    wardType: string;
    districtId: string;
    districtName: string;
    provinceId: string;
    provinceName: string;

    constructor(data?: ICreateWardDto) {
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
            this.englishName = data["englishName"];
            this.wardType = data["wardType"];
            this.districtId = data["districtId"];
            this.districtName = data["districtName"];
            this.provinceId = data["provinceId"];
            this.provinceName = data["provinceName"];
            
        }
    }

    static fromJS(data: any): CreateWardDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateWardDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["englishName"] = this.englishName;
        data["wardType"] = this.wardType;
        data["districtId"] = this.districtId;
        data["districtName"] = this.districtName;
        data["provinceId"] = this.provinceId;
        data["provinceName"] = this.provinceName;
        
        return data;
    }

    clone(): CreateWardDto {
        const json = this.toJSON();
        let result = new CreateWardDto();
        result.init(json);
        return result;
    }
}

export interface ICreateWardDto {
    id: number;
    name: string;
    englishName: string;
    wardType: string;
    districtId: string;
    districtName: string;
    provinceId: string;
    provinceName: string;
}

export class WardDto implements IWardDto {
    id: number;
    name: string;
    englishName: string;
    wardType: string;
    districtId: string;
    districtName: string;
    provinceId: string;
    provinceName: string;

    constructor(data?: IWardDto) {
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
            this.englishName = data["englishName"];
            this.wardType = data["wardType"];
            this.districtId = data["districtId"];
            this.districtName = data["districtName"];
            this.provinceId = data["provinceId"];
            this.provinceName = data["provinceName"];
            
        }
    }

    static fromJS(data: any): WardDto {
        data = typeof data === 'object' ? data : {};
        let result = new WardDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["englishName"] = this.englishName;
        data["wardType"] = this.wardType;
        data["districtId"] = this.districtId;
        data["districtName"] = this.districtName;
        data["provinceId"] = this.provinceId;
        data["provinceName"] = this.provinceName;
        return data;
    }

    clone(): WardDto {
        const json = this.toJSON();
        let result = new WardDto();
        result.init(json);
        return result;
    }
}

export interface IWardDto {
    id: number;
    name: string;
    englishName: string;
    wardType: string;
    districtId: string;
    districtName: string;
    provinceId: string;
    provinceName: string;
    
}
export class PagedResultDtoOfWardDto implements IPagedResultDtoOfWardDto {
    totalCount: number | undefined;
    items: WardDto[] | undefined;

    constructor(data?: IPagedResultDtoOfWardDto) {
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
                    this.items.push(WardDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfWardDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfWardDto();
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

    clone(): PagedResultDtoOfWardDto {
        const json = this.toJSON();
        let result = new PagedResultDtoOfWardDto();
        result.init(json);
        return result;
    }
}
export enum WardDtoStatus {
    Completed = 1,
    Started = 2,
    Waiting = 3
}

export interface IPagedResultDtoOfWardDto {
    totalCount: number | undefined;
    items: WardDto[] | undefined;
}

export const Modalities:string[]=[
    "CT",
    "CR",
    "DR",
    "US",
    "MR"
]

export const SexOptions:Sex[]=[
    {name:'Male',value:"M"},
    {name:'Female',value:"F"},
    {name:'Other',value:"O"},
]

export class Sex{
    name:string;
    value:string;
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
        return _observableThrow(new ApiServiceProxies.SwaggerException(message, status, response, headers, null));
}