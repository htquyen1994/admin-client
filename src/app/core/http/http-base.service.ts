import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
  private _baseURL: string;
  constructor(private _httpClient: HttpClient) {
    this._baseURL = environment.apiBaseUrl;
  }

  get<T>(url: string, params = {}): Observable<T> {
    return this._httpClient.get<T>(this._buildURL(url), params)
  }

  post<T>(url: string, data: T, header?: HttpHeaders): Observable<T> {
    return this._httpClient.post<T>(this._buildURL(url), data, {headers: this._buildHeader(header)})
  }

  delete<E, T>(url: string, id: E): Observable<T> {
    const urlQuery = `${this._buildURL(url)}${id}`;
    return this._httpClient.delete<T>(urlQuery);
  }

  put<T>(url: string, data: T, header?: HttpHeaders): Observable<T> {
    return this._httpClient.put<T>(this._buildURL(url), data, {headers: this._buildHeader(header)})
  }

  private _buildURL(url: string) {
    return `${this._baseURL}/${url}`
  }

  private _buildHeader(headers?: HttpHeaders): HttpHeaders {
    if (!headers) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      });
    }
    return headers;
  }
}
