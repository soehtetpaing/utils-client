import { Component, inject } from '@angular/core';
import { DarkmodeService } from '../../utils/darkmode-service';
import { DatetimeService } from '../../service/datetime-service';
import { ToastService } from '../../utils/toast-service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-datetime-component',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './datetime-component.html',
  styleUrl: './datetime-component.css',
})
export class DatetimeComponent {
  darkModeService: DarkmodeService = inject(DarkmodeService);
  datetimeService: DatetimeService = inject(DatetimeService);

  mmTimestamp: string = '';
  mmDate: string = '';
  mmHour: string = '';
  mmMillisec: string = '';
  mmDatetime: string = '';
  tgzDatetime: string = '';
  datetime: any = '';
  targetZone: any = '';
  apiExecuteTime: string = '';
  ms: any = '';
  tokenExpireTime: string = '';
  expireTime: any = '';

  constructor(private toast: ToastService) {}

  ngOnInit(): void {
    this.darkModeService.updateDarkModeExtra();
  }

  getMyanmarTimestamp() {
    this.mmTimestamp = this.datetimeService.getMyanmarTimestamp();
  }

  getMyanmarDate() {
    this.mmDate = this.datetimeService.getMyanmarDate();
  }

  getMyanmarHour() {
    this.mmHour = this.datetimeService.getMyanmarHour();
  }

  getMyanmarMillisecond() {
    this.mmMillisec = this.datetimeService.getMyanmarMillisecond();
  }

  getMyanmarDatetime() {
    this.mmDatetime = this.datetimeService.getMyanmarDateTime();
  }

  getDatetimeByZone(datetime: string, targetZone: string) {
    if (datetime == '') {
      this.toast.error("Enter datetime!")
    } else if (targetZone == '') {
      this.toast.error("Enter target zone!")
    } else {
      this.tgzDatetime = this.datetimeService.getDateTimeByZone(datetime, targetZone);
    }
  }

  getApiExecuteTime(ms: any) {
    if (ms == '') {
      this.toast.error("Enter execute time!")
    } else {
      this.apiExecuteTime = this.datetimeService.formatApiExecuteTime(Number(ms));
    }
  }

  getTokenExpireTime(ms: any) {
    if (ms == '') {
      this.toast.error("Enter expire time!")
    } else {
      this.tokenExpireTime = this.datetimeService.formatTokenExpireTime(Number(ms));
    }
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    this.toast.info("Ready to paste — " + text);
  }

}
