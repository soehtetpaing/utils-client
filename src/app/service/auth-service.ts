import { inject, Injectable } from '@angular/core';
import { DatetimeService } from './datetime-service';
import { nanoid } from 'nanoid';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // by Genius iQ @20251227
  datetimeService: DatetimeService = inject(DatetimeService);

  // get uuid
  getUniqueId(): string {
    return nanoid(11);
  }
  
}
