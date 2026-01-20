import { inject, Injectable } from '@angular/core';
import { DatetimeService } from './datetime-service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  // by Genius iQ @20251227
  private datetimeService: DatetimeService = inject(DatetimeService);

  getSyskey() {
    return this.datetimeService.getMyanmarTimestamp().substring(2, 17);
  }
  
}
