import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataroomService } from './dataroom-service';
import { environment } from '../../environments/environment';
import { catchError, firstValueFrom, throwError } from 'rxjs';

export interface HttpOptions {
  headers?: HttpHeaders | {[header: string]: string | string[]};
  params?: HttpParams | {[param: string]: string | string[] | number | boolean};
  body?: any;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private room: DataroomService) {
    const domain = room.getDefaultDomain();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  get<T = any>(url: string, options?: HttpOptions) {
    const httpOptions = this.prepareHttpOptions(options);

    return this.http.get<T>(url, httpOptions).pipe(
      catchError(err => this.errorHandle(err))
    );
  }

  async asyncGet<T = any>(url: string, options?: HttpOptions) {
    try {
      return await firstValueFrom(this.get<T>(url, options));
    } catch (err) {
      throw this.errorTransform(err);
    }
  }

  post<T = any>(url: string, body: any, options?: HttpOptions) {
    const httpOptions = this.prepareHttpOptions(options);

    return this.http.post<T>(url, body, httpOptions).pipe(
      catchError(err => this.errorHandle(err))
    );
  }

  async asyncPost<T = any>(url: string, body: any, options?: HttpOptions) {
    try {
      return await firstValueFrom(this.post<T>(url, body, options));
    } catch (err) {
      throw this.errorTransform(err);
    }
  }

  // fields update
  put<T = any>(url: string, body: any, options?: HttpOptions) {
    const httpOptions = this.prepareHttpOptions(options);

    return this.http.put<T>(url, body, httpOptions).pipe(
      catchError(err => this.errorHandle(err))
    );
  }

  async asyncPut<T = any>(url: string, body: any, options?: HttpOptions) {
    try {
      return await firstValueFrom(this.put<T>(url, body, options));
    } catch (err) {
      throw this.errorTransform(err);
    }
  }

  // field update
  patch<T = any>(url: string, body: any, options?: HttpOptions) {
    const httpOptions = this.prepareHttpOptions(options);

    return this.http.patch<T>(url, body, httpOptions).pipe(
      catchError(err => this.errorHandle(err))
    );
  }

  async asyncPatch<T = any>(url: string, body: any, options?: HttpOptions) {
    try {
      return await firstValueFrom(this.patch<T>(url, body, options));
    } catch (err) {
      throw this.errorTransform(err);
    }
  }

  delete<T = any>(url: string, options?: HttpOptions) {
    const httpOptions = this.prepareHttpOptions(options);

    return this.http.delete<T>(url, httpOptions).pipe(
      catchError(err => this.errorHandle(err))
    );
  }

  async asyncDelete<T = any>(url: string, options?: HttpOptions) {
    try {
      return await firstValueFrom(this.delete<T>(url, options));
    } catch (err) {
      throw this.errorTransform(err);
    }
  }

  // blob storage
  downloadMedia(url: string, options?: HttpOptions) {
    const httpOptions = {
      ...this.prepareHttpOptions(options),
      responseType: 'blob' as const
    };

    return this.http.get(url, httpOptions).pipe(
      catchError(err => this.errorHandle(err))
    );
  }

  async asyncDownloadMedia(url: string, options?: HttpOptions) {
    try {
      return await firstValueFrom(this.downloadMedia(url, options));
    } catch (err) {
      throw this.errorTransform(err);
    }
  }

  // form data upload
  uploadMedia<T = any>(url: string, formData: FormData, options?: HttpOptions) {
    const headers = this.headers.delete('Content-Type');
    const httpOptions = {
      ...this.prepareHttpOptions(options),
      headers
    };

    return this.http.post<T>(url, formData, httpOptions).pipe(
      catchError(err => this.errorHandle(err))
    );
  }

  async asyncUploadMedia<T = any>(url: string, formData: FormData, options?: HttpOptions) {
    try {
      return await firstValueFrom(this.uploadMedia(url, formData, options));
    } catch (err) {
      throw this.errorTransform(err);
    }
  }

  setAuthToken(token: string) {
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
  }

  removeAuthToken() {
    this.headers = this.headers.delete('Authorization');
  }

  setHeader(key: string, value: string) {
    this.headers = this.headers.set(key, value);
  }

  removeHeader(key: string) {
    this.headers = this.headers.delete(key);
  }

  private errorHandle(err: HttpErrorResponse) {
    const error = {
      status: err.status,
      message: err.error?.message || this.getErrorMessage(err)
    }

    console.log("HTTP Error: ", {
      ...error,
      url: err.url
    });

    return throwError(() => error);
  }

  private errorTransform(err: any) {
    if (err.status) {
      return err;
    }

    return {
      status: 0,
      message: err.message || 'Unknown error!'
    }
  }

  private getErrorMessage(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      return `Client error: ${err.error.message}`;
    } else {
      switch (err.status) {
        case 0:
          return `Please check your API network!`;
        case 400:
          return `Bad request. Please check your input!`;
        case 401:
          return `Unauthorized. Please login again!`;
        case 403:
          return `Not access right!`;
        case 404:
          return `Path not found!`;
        case 500:
          return `Internal server error!`;
        case 503:
          return `Service down. Please try later!`;
        default:
          return err.message || `Unexpected error: ${err.status}`;
      }
    }
  }

  private prepareHttpOptions(options?: HttpOptions) {
    const httpOptions: HttpOptions = {
      headers: this.headers,
      ...options
    };

    if (options?.headers) {
      if (options.headers instanceof HttpHeaders) {
        httpOptions.headers = this.mergeHeaders(this.headers, options.headers);
      } else {
        httpOptions.headers = this.mergeHeaders(this.headers, new HttpHeaders(options.headers as any));
      }
    }

    return httpOptions;
  }

  private mergeHeaders(defaultHeaders: HttpHeaders, customHeaders: HttpHeaders) {
    let mergedHeaders = defaultHeaders;

    customHeaders.keys().forEach(key => {
      const values = customHeaders.getAll(key);
      if(values)  mergedHeaders = mergedHeaders.set(key, values.join(', '));
    });

    return mergedHeaders;
  }
  
}
