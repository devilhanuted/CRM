import { mergeMap as _observableMergeMap, catchError as _observableCatch, tap } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import * as moment from 'moment';
import * as ServiceAPI from './service-proxies';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})

export class DistrictServiceProxy {
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
  create(input: CreateDistrictDto | null | undefined): Observable<DistrictDto> {
      let url_ = this.baseUrl + "/api/services/app/District/Create";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(input);

      let options_ : any = {
          body: content_,
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Content-Type": "application/json", 
              "Accept": "application/json"
          })
      };

      return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processCreate(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processCreate(<any>response_);
              } catch (e) {
                  return <Observable<DistrictDto>><any>_observableThrow(e);
              }
          } else
              return <Observable<DistrictDto>><any>_observableThrow(response_);
      }));
  }

  protected processCreate(response: HttpResponseBase): Observable<DistrictDto> {
      const status = response.status;
      const responseBlob = 
          response instanceof HttpResponse ? response.body : 
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 ? DistrictDto.fromJS(resultData200) : new DistrictDto();
          return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<DistrictDto>(<any>null);
  }
  findAllDistricts(keyword: string | null | undefined): Observable<ListResultDtoOfDistrictDto> {
    let url_ = this.baseUrl + "/api/services/app/District/FindAllDistricts";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(keyword);

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
        return this.processfindAllDistricts(response_);
    })).pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
            try {
                return this.processfindAllDistricts(<any>response_);
            } catch (e) {
                return <Observable<ListResultDtoOfDistrictDto>><any>_observableThrow(e);
            }
        } else
            return <Observable<ListResultDtoOfDistrictDto>><any>_observableThrow(response_);
    }));
}

protected processfindAllDistricts(response: HttpResponseBase): Observable<ListResultDtoOfDistrictDto> {
    const status = response.status;
    const responseBlob =
        response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
    if (status === 200) {
        return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? ListResultDtoOfDistrictDto.fromJS(resultData200) : new ListResultDtoOfDistrictDto();
            return _observableOf(result200);
        }));
    } else if (status !== 200 && status !== 204) {
        return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf<ListResultDtoOfDistrictDto>(<any>null);
}
  /**
   * @param id (optional) 
   * @return Success
   */
  delete(id: number | null | undefined): Observable<void> {
      let url_ = this.baseUrl + "/api/services/app/District/Delete?";
      if (id !== undefined)
          url_ += "Id=" + encodeURIComponent("" + id) + "&"; 
      url_ = url_.replace(/[?&]$/, "");

      let options_ : any = {
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
          })
      };

      return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
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

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
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
  get(id: number | null | undefined): Observable<DistrictDto> {
      let url_ = this.baseUrl + "/api/services/app/District/Get?";
      if (id !== undefined)
          url_ += "Id=" + encodeURIComponent("" + id) + "&"; 
      url_ = url_.replace(/[?&]$/, "");

      let options_ : any = {
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Accept": "application/json"
          })
      };

      return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processGet(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processGet(<any>response_);
              } catch (e) {
                  return <Observable<DistrictDto>><any>_observableThrow(e);
              }
          } else
              return <Observable<DistrictDto>><any>_observableThrow(response_);
      }));
  }

  protected processGet(response: HttpResponseBase): Observable<DistrictDto> {
      const status = response.status;
      const responseBlob = 
          response instanceof HttpResponse ? response.body : 
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 ? DistrictDto.fromJS(resultData200) : new DistrictDto();
          return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<DistrictDto>(<any>null);
  }
  

  /**
   * @param keyword (optional) 
   * @param isActive (optional) 
   * @param skipCount (optional) 
   * @param maxResultCount (optional) 
   * @return Success
   */
  getAll(keyword: string | null | undefined, isActive: boolean | null | undefined, skipCount: number | null | undefined, maxResultCount: number | null | undefined): Observable<PagedResultDtoOfDistrictDto> {
      let url_ = this.baseUrl + "/api/services/app/District/GetAll?";
      if (keyword !== undefined)
          url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&"; 
      if (isActive !== undefined)
          url_ += "IsActive=" + encodeURIComponent("" + isActive) + "&"; 
      if (skipCount !== undefined)
          url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&"; 
      if (maxResultCount !== undefined)
          url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&"; 
      url_ = url_.replace(/[?&]$/, "");

      let options_ : any = {
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Accept": "application/json"
          })
      };

      return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processGetAll(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processGetAll(<any>response_);
              } catch (e) {
                  return <Observable<PagedResultDtoOfDistrictDto>><any>_observableThrow(e);
              }
          } else
              return <Observable<PagedResultDtoOfDistrictDto>><any>_observableThrow(response_);
      }));
  }

  protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfDistrictDto> {
      const status = response.status;
      const responseBlob = 
          response instanceof HttpResponse ? response.body : 
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 ? PagedResultDtoOfDistrictDto.fromJS(resultData200) : new PagedResultDtoOfDistrictDto();
          return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<PagedResultDtoOfDistrictDto>(<any>null);
  }

  /**
   * @param input (optional) 
   * @return Success
   */
  update(input: DistrictDto | null | undefined): Observable<DistrictDto> {
      let url_ = this.baseUrl + "/api/services/app/District/Update";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(input);

      let options_ : any = {
          body: content_,
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Content-Type": "application/json", 
              "Accept": "application/json"
          })
      };

      return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processUpdate(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processUpdate(<any>response_);
              } catch (e) {
                  return <Observable<DistrictDto>><any>_observableThrow(e);
              }
          } else
              return <Observable<DistrictDto>><any>_observableThrow(response_);
      }));
  }

  protected processUpdate(response: HttpResponseBase): Observable<DistrictDto> {
      const status = response.status;
      const responseBlob = 
          response instanceof HttpResponse ? response.body : 
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 ? DistrictDto.fromJS(resultData200) : new DistrictDto();
          return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<DistrictDto>(<any>null);
  }
}

export class CreateDistrictDto implements ICreateDistrictDto{
    id: number;
    name: string;
    englishName: string;
    districtType: string;
    provinceId: string;
    provinceName: string;

    constructor(data?: IDistrictDto) {
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
            this.districtType = data["districtType"];
            this.provinceId = data["provinceId"];
            this.provinceName = data["provinceName"];
            
        }
    }

    static fromJS(data: any): DistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new DistrictDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["englishName"] = this.englishName;
        data["districtType"] = this.districtType;
        data["provinceId"] = this.provinceId;
        data["provinceName"] = this.provinceName;
        
        return data; 
    }

    clone(): DistrictDto {
        const json = this.toJSON();
        let result = new DistrictDto();
        result.init(json);
        return result;
    }
    
}

export interface ICreateDistrictDto {
    id: number;
    name: string;
    englishName: string;
    districtType: string;
    provinceId: string;
    provinceName: string;
}

export class DistrictDto implements IDistrictDto {
    id: number;
    name: string;
    englishName: string;
    districtType: string;
    provinceId: string;
    provinceName: string;

    constructor(data?: IDistrictDto) {
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
            this.districtType = data["districtType"];
            this.provinceId = data["provinceId"];
            this.provinceName = data["provinceName"];
            
        }
    }

    static fromJS(data: any): DistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new DistrictDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
            data["id"] = this.id;
            data["name"] = this.name;
            data["englishName"] = this.englishName;
            data["districtType"] = this.districtType;
            data["provinceId"] = this.provinceId;
            data["provinceName"] = this.provinceName;
            
        return data; 
    }

    clone(): DistrictDto {
        const json = this.toJSON();
        let result = new DistrictDto();
        result.init(json);
        return result;
    }
}

export interface IDistrictDto {
    id: number;
    name: string;
    englishName: string;
    districtType: string;
    provinceId: string;
    provinceName: string;
}


export class PagedResultDtoOfDistrictDto implements IPagedResultDtoOfDistrictDto {
    totalCount: number | undefined;
    items: DistrictDto[] | undefined;

    constructor(data?: IPagedResultDtoOfDistrictDto) {
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
                    this.items.push(DistrictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultDtoOfDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfDistrictDto();
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

    clone(): PagedResultDtoOfDistrictDto {
        const json = this.toJSON();
        let result = new PagedResultDtoOfDistrictDto();
        result.init(json);
        return result;
    }
}
export class ListResultDtoOfDistrictDto implements IListResultDtoOfDistrictDto {
    items: DistrictDto[] | undefined;

    constructor(data?: IPagedResultDtoOfDistrictDto) {
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
                    this.items.push(DistrictDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ListResultDtoOfDistrictDto {
        data = typeof data === 'object' ? data : {};
        let result = new ListResultDtoOfDistrictDto();
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

    clone(): ListResultDtoOfDistrictDto {
        const json = this.toJSON();
        let result = new ListResultDtoOfDistrictDto();
        result.init(json);
        return result;
    }
}

export interface IListResultDtoOfDistrictDto {
    items: DistrictDto[] | undefined;
}

export interface IPagedResultDtoOfDistrictDto {
    totalCount: number | undefined;
    items: DistrictDto[] | undefined;
}

export enum IsDistrictAvailableOutputState {
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
    if(result !== null && result !== undefined)
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