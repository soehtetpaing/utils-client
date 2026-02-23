import { inject, Injectable } from '@angular/core';
import { DatetimeService } from './datetime-service';
import { nanoid } from 'nanoid';
import { DataroomService } from '../utils/dataroom-service';
import { environment } from '../../environments/environment';
import { HttpService } from '../utils/http-service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // by Genius iQ @20251227
  private datetimeService: DatetimeService = inject(DatetimeService);
  private room: DataroomService = inject(DataroomService);
  private http: HttpService = inject(HttpService);

  // get uuid
  getUniqueId(): string {
    return nanoid(11);
  }

  // encrypt text
  encrypt(plainText: string, secretKey: string) {
    const apiUrl = this.room.getApiUrl();
    const baseUrl = apiUrl == "" ? environment.apiUrl : apiUrl;
    const path = "/utils/auth/encrypt"

    const url = baseUrl + path;
    const body = {
      plainText,
      secretKey
    };
    
    return this.http.post(url, body);
  }

  // decrypt text by Genius iQ @20260201
  decrypt(encryptedText: string, secretKey: string) {
    const apiUrl = this.room.getApiUrl();
    const baseUrl = apiUrl == "" ? environment.apiUrl : apiUrl;
    const path = "/utils/auth/decrypt";

    const url = baseUrl + path;
    const body = {
      encryptedText,
      secretKey
    };

    return this.http.post(url, body);
  }

  // generate API token by Genius iQ @20260201
  generateApiToken(secretKey: string, domain: string) {
    const apiUrl = this.room.getApiUrl();
    const baseUrl = apiUrl == "" ? environment.apiUrl : apiUrl;
    const path = "/utils/auth/generateApiToken";

    const url = baseUrl + path;
    const body = {
      secretKey,
      domain
    };

    return this.http.post(url, body);
  }

  // verify API token by Genius iQ @20260202
  verifyApiToken(token: string, secretKey: string, domain: string) {
    const apiUrl = this.room.getApiUrl();
    const baseUrl = apiUrl == "" ? environment.apiUrl : apiUrl;
    const path = "/utils/auth/verifyApiToken";

    const url = baseUrl + path;
    const body = {
      token,
      secretKey,
      domain
    };

    return this.http.post(url, body);
  }
  
}
