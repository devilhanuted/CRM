import { mergeMap as _observableMergeMap, catchError as _observableCatch, tap } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import * as ApiServiceProxies from './service-proxies';

@Injectable({
  providedIn: 'root'
})
export class CustomerPositionServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  private jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(ApiServiceProxies.API_BASE_URL) baseUrl?: string) {
      this.http = http;
      this.baseUrl = baseUrl ? baseUrl : '';
  }

  /**
   * @param input (optional)
   * @return Success
   */
  create(input: CreateCustomerPositionDto | null | undefined): Observable<CustomerPositionDto> {
      var url_ = this.baseUrl + '/api/services/app/CustomerPosition/Create';
      url_ = url_.replace(/[?&]$/, '');

      var content_ = JSON.stringify(input);

      // tslint:disable-next-line:no-shadowed-variable
      var options_: any = {
          body: content_,
          observe: 'response',
          responseType: 'blob',
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          })
      };

      return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => {
          return this.processCreate(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processCreate(<any>response_);
              } catch (e) {
                  return <Observable<CustomerPositionDto>><any>_observableThrow(e);
              }
          } else {
            return <Observable<CustomerPositionDto>><any>_observableThrow(response_);
          }
      }));
  }

  protected processCreate(response: HttpResponseBase): Observable<CustomerPositionDto> {
      var status = response.status;
      var responseBlob =
          response instanceof HttpResponse ? response.body :
              (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      const _headers: any = {}; if (response.headers) { for (const key of response.headers.keys())
        {
           _headers[key] = response.headers.get(key);
        } }
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
              let result200: any = null;
              const resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
              result200 = resultData200 ? CustomerPositionDto.fromJS(resultData200) : new CustomerPositionDto();
              return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
              return throwException('An unexpected server error occurred.', status, _responseText, _headers);
          }));
      }
      return _observableOf<CustomerPositionDto>(<any>null);
  }

      
  /**
   * @param id (optional) 
   * @return Success
   */
  delete(id: number | null | undefined): Observable<void> {
      let url_ = this.baseUrl + "/api/services/app/CustomerPosition/Delete?";
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
  get(id: number | null | undefined): Observable<CustomerPositionDto> {
      let url_ = this.baseUrl + "/api/services/app/CustomerPosition/Get?";
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
                  return <Observable<CustomerPositionDto>><any>_observableThrow(e);
              }
          } else
              return <Observable<CustomerPositionDto>><any>_observableThrow(response_);
      }));
  }

  protected processGet(response: HttpResponseBase): Observable<CustomerPositionDto> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
              (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
              let result200: any = null;
              let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
              result200 = resultData200 ? CustomerPositionDto.fromJS(resultData200) : new CustomerPositionDto();
              return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
              return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<CustomerPositionDto>(<any>null);
  }
  getCustomerPositions(): Observable<any> {
    var url_ = this.baseUrl + "/api/services/app/CustomerPosition/GetAll?";
    return this.http.get<any>(url_).pipe(
      tap(_ => console.log('fetched CustomerPositions')),
    );
  }

  getAll(keyword: string | null | undefined, hasConclusion: boolean | null | undefined, skipCount: number | null | undefined, maxResultCount: number | null | undefined): Observable<PagedResultDtoOfCustomerPositionDto> {
      let url_ = this.baseUrl + "/api/services/app/CustomerPosition/GetAll?";
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
                  return <Observable<PagedResultDtoOfCustomerPositionDto>><any>_observableThrow(e);
              }
          } else
              return <Observable<PagedResultDtoOfCustomerPositionDto>><any>_observableThrow(response_);
      }));
  }

  protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfCustomerPositionDto> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
              (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
              let result200: any = null;
              let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
              result200 = resultData200 ? PagedResultDtoOfCustomerPositionDto.fromJS(resultData200) : new PagedResultDtoOfCustomerPositionDto();
              return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
              return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<PagedResultDtoOfCustomerPositionDto>(<any>null);
  }

  /**
   * @param input (optional) 
   * @return Success
   */
  update(input: CustomerPositionDto | null | undefined): Observable<CustomerPositionDto> {
      let url_ = this.baseUrl + "/api/services/app/CustomerPosition/Update";
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
                  return <Observable<CustomerPositionDto>><any>_observableThrow(e);
              }
          } else
              return <Observable<CustomerPositionDto>><any>_observableThrow(response_);
      }));
  }

  protected processUpdate(response: HttpResponseBase): Observable<CustomerPositionDto> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
              (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
              let result200: any = null;
              let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
              result200 = resultData200 ? CustomerPositionDto.fromJS(resultData200) : new CustomerPositionDto();
              return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
              return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<CustomerPositionDto>(<any>null);
  }
}

export class CreateCustomerPositionDto implements ICreateCustomerPositionDto {
  name: string;
  description: string;
  constructor(data?: ICreateCustomerPositionDto) {
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
          this.description = data['description'];
      }
  }

  static fromJS(data: any): CreateCustomerPositionDto {
      data = typeof data === 'object' ? data : {};
      let result = new CreateCustomerPositionDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data['name'] = this.name;
      data['description'] = this.description;
      return data;
  }

  clone(): CreateCustomerPositionDto {
      const json = this.toJSON();
      const result = new CreateCustomerPositionDto();
      result.init(json);
      return result;
  }
}

export interface ICreateCustomerPositionDto {
  name: string;
  description: string | undefined;
}

export class CustomerPositionDto implements ICustomerPositionDto {
  id: number | undefined;
  name: string;
  description: string | undefined;

  constructor(data?: ICustomerPositionDto) {
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
        this.description = data['description'];
          this.id = data["id"];
      }
  }

  static fromJS(data: any): CustomerPositionDto {
      data = typeof data === 'object' ? data : {};
      let result = new CustomerPositionDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data = typeof data === 'object' ? data : {};
      data['name'] = this.name;
      data['description'] = this.description;
      data["id"] = this.id;
      return data;
  }

  clone(): CustomerPositionDto {
      const json = this.toJSON();
      let result = new CustomerPositionDto();
      result.init(json);
      return result;
  }
}

export interface ICustomerPositionDto {
  id: number | undefined;
  name: string;
  description: string | undefined;
}
export class PagedResultDtoOfCustomerPositionDto implements IPagedResultDtoOfCustomerPositionDto {
  totalCount: number | undefined;
  items: CustomerPositionDto[] | undefined;

  constructor(data?: IPagedResultDtoOfCustomerPositionDto) {
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
                  this.items.push(CustomerPositionDto.fromJS(item));
          }
      }
  }

  static fromJS(data: any): PagedResultDtoOfCustomerPositionDto {
      data = typeof data === 'object' ? data : {};
      let result = new PagedResultDtoOfCustomerPositionDto();
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

  clone(): PagedResultDtoOfCustomerPositionDto {
      const json = this.toJSON();
      let result = new PagedResultDtoOfCustomerPositionDto();
      result.init(json);
      return result;
  }
}


export interface IPagedResultDtoOfCustomerPositionDto {
  totalCount: number | undefined;
  items: CustomerPositionDto[] | undefined;
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

