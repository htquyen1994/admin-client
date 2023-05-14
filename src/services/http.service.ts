import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  private headersForFetchExcel: HttpHeaders = new HttpHeaders({
    'Content-Type':
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Access-Control-Allow-Origin': '*',
  });
  private headersForFetchPdfFile: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/pdf',
    'Access-Control-Allow-Origin': '*',
  });
  private headersForFetchImages: HttpHeaders = new HttpHeaders({
    'Content-Type': 'image/jpeg',
    'Access-Control-Allow-Origin': '*',
  });
  private headersForFileUpload: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  private baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  get<T>(apiUrl: string, obj: any = ''): Observable<T> {
    const opts = { headers: this.headers };
    if (obj) {
      Object.assign(opts, { params: new HttpParams({ fromObject: obj }) });
    }

    return this.http.get<T>(this.baseUrl + apiUrl, opts).pipe(
      catchError((err) => {
        console.log('error from service', err);
        return throwError(err);
      })
    );
  }

  postExcel(apiUrl: string, obj: any = '') {
    const opts = { headers: this.headersForFetchExcel, responseType: 'blob' };
    if (obj) {
      Object.assign(opts, { params: new HttpParams({ fromObject: obj }) });
    }

    return this.http
      .post(this.baseUrl + apiUrl, {}, { responseType: 'blob' })
      .pipe(
        catchError((err) => {
          console.log('error from service', err);
          return throwError(err);
        })
      );
  }

  getExcel(apiUrl: string, obj: any = '') {
    const opts = { headers: this.headersForFetchExcel, responseType: 'blob' };
    if (obj) {
      Object.assign(opts, { params: new HttpParams({ fromObject: obj }) });
    }

    return this.http.get(this.baseUrl + apiUrl, { responseType: 'blob' }).pipe(
      catchError((err) => {
        console.log('error from service', err);
        return throwError(err);
      })
    );
  }

  getPdf(apiUrl: string, obj: any = '') {
    const opts = { headers: this.headersForFetchPdfFile, responseType: 'blob' };
    if (obj) {
      Object.assign(opts, { params: new HttpParams({ fromObject: obj }) });
    }

    return this.http.get(this.baseUrl + apiUrl, { responseType: 'blob' }).pipe(
      catchError((err) => {
        console.log('error from service', err);
        return throwError(err);
      })
    );
  }

  getImage(apiUrl: string, obj: any = '') {
    const opts = { headers: this.headersForFetchImages, responseType: 'blob' };
    if (obj) {
      Object.assign(opts, { params: new HttpParams({ fromObject: obj }) });
    }

    return this.http.get(this.baseUrl + apiUrl, { responseType: 'blob' }).pipe(
      catchError((err) => {
        console.log('error from service', err);
        return throwError(err);
      })
    );
  }

  post<T>(apiUrl: string, model: any): Observable<T> {
    const opts = { headers: this.headers };
    return this.http.post<T>(this.baseUrl + apiUrl, model, opts).pipe(
      catchError((err) => {
        console.log('error from service', err);
        return throwError(err);
      })
    );
  }

  postWithFile<T>(apiUrl: string, model: any): Observable<T> {
    const opts = { headers: this.headersForFileUpload };
    return this.http.post<T>(this.baseUrl + apiUrl, model, opts).pipe(
      catchError((err) => {
        console.log('error from service', err);
        return throwError(err);
      })
    );
  }

  getWithFile(apiUrl: string): Observable<any> {
    return this.http.get(this.baseUrl + apiUrl, {
      observe: 'response',
      responseType: 'blob',
    });
  }

  postWithOptions<T>(apiUrl: string, model: T, options: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + apiUrl, model, ...options).pipe(
      catchError((err) => {
        console.log('error from service', err);
        return throwError(err);
      })
    );
  }

  delete<T>(apiUrl: string): Observable<T> {
    const opts = { headers: this.headers };
    return this.http.delete<T>(this.baseUrl + apiUrl, opts).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  deleteWithBody<T>(apiUrl: string, rq: any): Observable<T> {
    const opts = { headers: this.headers, body: rq };
    return this.http.delete<T>(this.baseUrl + apiUrl, opts).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  put<T>(apiUrl: string, model: any): Observable<T> {
    const opts = { headers: this.headers };
    return this.http.put<T>(this.baseUrl + apiUrl, model, opts).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  postFile<T>(apiUrl: string, model: any): Observable<T> {
    const opts = { headers: this.headers, responseType: 'blob' as 'json' };
    return this.http.post<T>(this.baseUrl + apiUrl, model, opts).pipe(
      catchError((err) => {
        console.log('error from service', err);
        return throwError(err);
      })
    );
  }
}
