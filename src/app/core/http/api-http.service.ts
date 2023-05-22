import { HttpBase } from './base-http.service';
import { Injectable } from '@angular/core';
import { BaseErrorResponse } from './error-response';
import { CodeService } from './code-response.interface';

export interface ResponseCallback<T> {
  onCompleted(code: CodeService, message: string, data: T): void
}


@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<T> {

  constructor(private _httpBase: HttpBase) { }


  get<T>(url: string,  params = {}, retryCount = HttpBase.RETRY_COUNT, options = {}, callback: ResponseCallback<T>){
    return this._httpBase.get<T>(url, params, retryCount, options).subscribe(
      {
        next: (response: T) => { this._onSuccessResponse(response, callback) },
        error: (err: BaseErrorResponse) => { this._onErrorResponse(err, callback)}
      }
    )
  }


  post<T>(url: string, data: T,  params = {},retryCount = HttpBase.RETRY_COUNT, options = {}, callback: ResponseCallback<T>) {
    return this._httpBase.post<T>(url, data, params, retryCount, options).subscribe(
      {
        next: (response: T) => { this._onSuccessResponse(response, callback) },
        error: (err: BaseErrorResponse) => { this._onErrorResponse(err, callback)}
      }
    )
  }

  delete<E, T>(url: string, id: E,  params = {}, retryCount = HttpBase.RETRY_COUNT, options: {}, callback: ResponseCallback<T>) {
    return this._httpBase.delete<E, T>(url, id, params, retryCount, options).subscribe(
      {
        next: (response: T) => { this._onSuccessResponse(response, callback) },
        error: (err: BaseErrorResponse) => { this._onErrorResponse(err, callback)}
      }
    )
  }

  put<T>(url: string, data: T, params = {}, retryCount = HttpBase.RETRY_COUNT, options: {}, callback: ResponseCallback<T>) {
    this._httpBase.put<T>(url, data, params, retryCount, options).subscribe(
      {
        next: (response: T) => { this._onSuccessResponse(response, callback) },
        error: (err: BaseErrorResponse) => { this._onErrorResponse(err, callback)}
      }
    )
  }


  private _onErrorResponse = (err: BaseErrorResponse, callback: ResponseCallback<any>) => {
    let code = err.code;
    if (err.code !== CodeService.ValidateError) code = CodeService.SystemError;
    callback.onCompleted(code, err.message, err);
  }


  private _onSuccessResponse = <T>(data: T, callback: ResponseCallback<T>) => {
    callback.onCompleted(CodeService.Success, 'Success', data);
  }

}
