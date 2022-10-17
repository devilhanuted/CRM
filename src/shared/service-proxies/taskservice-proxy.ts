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
export class TaskServiceProxy {
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
    create(input: CreateTaskDto | null | undefined): Observable<TaskDto> {
        let url_ = this.baseUrl + "/api/services/app/Task/Create";
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
                    return <Observable<TaskDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<TaskDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<TaskDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? TaskDto.fromJS(resultData200) : new TaskDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TaskDto>(<any>null);
    }
    /**
     * @param id (optional) 
     * @return Success
     */
    delete(id: number | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Task/Delete?";
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
    get(id: number | null | undefined): Observable<TaskDto> {
        let url_ = this.baseUrl + "/api/services/app/Task/Get?";
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
                    return <Observable<TaskDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<TaskDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<TaskDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? TaskDto.fromJS(resultData200) : new TaskDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TaskDto>(<any>null);
    }
    getAll(keyword: string | null | undefined, fromDate: string | null | undefined, toDate: string | null | undefined,
        skipCount: number | null | undefined, maxResultCount: number | null | undefined): Observable<PagedResultDtoOfTaskDto> {
        let url_ = this.baseUrl + "/api/services/app/Task/GetAll?";
        if (keyword !== undefined)
            url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
        if (fromDate !== undefined)
            url_ += "FromDate=" + encodeURIComponent("" + fromDate) + "&";
        if (toDate !== undefined)
            url_ += "ToDate=" + encodeURIComponent("" + toDate) + "&";
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
                    return <Observable<PagedResultDtoOfTaskDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<PagedResultDtoOfTaskDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfTaskDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? PagedResultDtoOfTaskDto.fromJS(resultData200) : new PagedResultDtoOfTaskDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PagedResultDtoOfTaskDto>(<any>null);
    }

    /**
     * @param input (optional) 
     * @return Success
     */
    update(input: TaskDto | null | undefined): Observable<TaskDto> {
        let url_ = this.baseUrl + "/api/services/app/Task/Update";
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
                    return <Observable<TaskDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<TaskDto>><any>_observableThrow(response_);
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<TaskDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? TaskDto.fromJS(resultData200) : new TaskDto();
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TaskDto>(<any>null);
    }
}

export class CreateTaskDto implements ICreateTaskDto {
    id: number;
    name: string;
    startDate: Date;
    scheduledEndDate: Date;
    endDate: Date;
    note: string | undefined;
    taskID: string;
    userID: string;
    customerPeopleID: string;
    customerPeopleName: string;


    constructor(data?: ICreateTaskDto) {
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
            this.startDate = data["startDate"];
            this.scheduledEndDate = data["scheduledEndDate"];
            this.endDate = data["endDate"];
            this.note = data["note"];
            this.taskID = data["taskID"];
            this.userID = data["userID"];
            this.customerPeopleID = data["customerPeopleID"];
            this.customerPeopleName = data["customerPeopleName"];
        }
    }

    static fromJS(data: any): CreateTaskDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateTaskDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["startDate"] = this.startDate;
        data["scheduledEndDate"] = this.scheduledEndDate;
        data["endDate"] = this.endDate;
        data["note"] = this.note;
        data["taskID"] = this.taskID;
        data["userID"] = this.userID;
        data["customerPeopleID"] = this.customerPeopleID;
        data["customerPeopleName"] = this.customerPeopleName;
        data["taskID"] = this.taskID;
        return data;
    }

    clone(): CreateTaskDto {
        const json = this.toJSON();
        let result = new CreateTaskDto();
        result.init(json);
        return result;
    }
}

export interface ICreateTaskDto {
    id: number;
    name: string;
    startDate: Date;
    scheduledEndDate: Date;
    endDate: Date;
    note: string | undefined;
    taskID: string;
    userID: string;
    customerPeopleID: string;
    customerPeopleName: string;
}

export class TaskDto implements ITaskDto {
    id: number;
    name: string;
    startDate: Date;
    scheduledEndDate: Date;
    endDate: Date;
    note: string | undefined;
    taskID: string;
    userID: string;
    customerPeopleID: string;
    customerPeopleName: string;

    constructor(data?: ITaskDto) {
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
            this.startDate = data["startDate"];
            this.scheduledEndDate = data["scheduledEndDate"];
            this.endDate = data["endDate"];
            this.note = data["note"];
            this.taskID = data["taskID"];
            this.userID = data["userID"];
            this.customerPeopleID = data["customerPeopleID"];
            this.customerPeopleName = data["customerPeopleName"];
        }
    }

    static fromJS(data: any): TaskDto {
        data = typeof data === 'object' ? data : {};
        let result = new TaskDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["startDate"] = this.startDate;
        data["scheduledEndDate"] = this.scheduledEndDate;
        data["endDate"] = this.endDate;
        data["note"] = this.note;
        data["taskID"] = this.taskID;
        data["userID"] = this.userID;
        data["customerPeopleID"] = this.customerPeopleID;
        data["customerPeopleName"] = this.customerPeopleName;
        data["taskID"] = this.taskID;
        return data;
    }

    clone(): TaskDto {
        const json = this.toJSON();
        let result = new TaskDto();
        result.init(json);
        return result;
    }
}

export interface ITaskDto {
    id: number;
    name: string;
    startDate: Date;
    scheduledEndDate: Date;
    endDate: Date;
    note: string | undefined;
    taskID: string;
    userID: string;
    customerPeopleID: string;
    customerPeopleName: string;
}
export class PagedResultDtoOfTaskDto implements IPagedResultDtoOfTaskDto {
    totalCount: number | undefined;
    items: TaskDto[] | undefined;

    constructor(data?: IPagedResultDtoOfTaskDto) {
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
                    this.items.push(TaskDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfTaskDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfTaskDto();
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

    clone(): PagedResultDtoOfTaskDto {
        const json = this.toJSON();
        let result = new PagedResultDtoOfTaskDto();
        result.init(json);
        return result;
    }
}
export enum TaskDtoStatus {
    Completed = 1,
    Started = 2,
    Waiting = 3
}

export interface IPagedResultDtoOfTaskDto {
    totalCount: number | undefined;
    items: TaskDto[] | undefined;
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