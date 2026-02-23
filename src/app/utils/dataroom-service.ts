import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataroomService {
  /** component usage example:
   * 
   * version = "";
   * apiUrl = "";
   * loading$!: Observable<boolean>;
   * 
   * constructor(private room: DataroomService) {}
   * 
   * ngOnInit(): void {
   *  this.version = this.room.getVersion(); // get stored data
   *  this.room._apiUrl$.subscribe(apiUrl => { // get live data = [(ngModel)]
   *   this.apiUrl = apiUrl;
   *  });
   *  this.loading$ = this.room._loading$;
   * }
   * 
   * 
   ** ui usage example for loading
   *
   * {{loading$ | async}}
   * 
   */

  private _app = ""; // store data
  private _version = "";
  private _apiUrl = new BehaviorSubject<string>("");
  public _apiUrl$ = this._apiUrl.asObservable();
  private _defaultDomain = "";
  private _secretKey = "";

  private _loading = new BehaviorSubject<boolean>(false);
  public _loading$ = this._loading.asObservable();

  private _isLoggedIn = new BehaviorSubject<boolean>(false); // live data
  public _isLoggedIn$ = this._isLoggedIn.asObservable();
  private _profile = new BehaviorSubject<any>(null); // live data
  public _profile$ = this._profile.asObservable();

  getApp(): string {
    return this._app;
  }

  setApp(app: string): void {
    this._app = app;
  }

  getVersion(): string {
    return this._version;
  }

  setVersion(version: string): void {
    this._version = version;
  }

  getApiUrl(): string {
    return this._apiUrl.getValue();
  }

  setApiUrl(apiUrl: string): void {
    this._apiUrl.next(apiUrl);
  }

  getDefaultDomain(): string {
    return this._defaultDomain;
  }

  setDefaultDomain(defaultDomain: string): void {
    this._defaultDomain = defaultDomain;
  }

  getSecretKey(): string {
    return this._secretKey;
  }

  setSecretKey(secretKey: string): void {
    this._secretKey = secretKey;
  }

  getLoading(): boolean {
    return this._loading.getValue();
  }

  setLoading(loading: boolean): void {
    this._loading.next(loading);
  }

  getIsLoggedIn(): boolean {
    return this._isLoggedIn.getValue();
  }

  setIsLoggedIn(isLoggedIn: boolean): void {
    this._isLoggedIn.next(isLoggedIn);
  }

  getProfile(): any {
    return this._profile.getValue();
  }

  setProfile(profile: any): void {
    this._profile.next(profile);
  }
}