import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatetimeService {
  // by Genius iQ @20251226

  constructor() {}

  // get yyyyMMddHHmmSSS
  getMyanmarTimestamp(): string {
    const now = this.getMyanmarZonedDateTime(false);
    return `${now.year}${now.month}${now.day}${now.hour}${now.minute}${now.second}${now.millisecond
        .toString()
        .padStart(3, "0")}`;
  }

  // get yyyyMMdd
  getMyanmarDate(): string {
    const now = this.getMyanmarZonedDateTime();
    return `${now.year}${now.month}${now.day}`;
  }

  // get hh:mm:ss a
  getMyanmarHour(): string {
    const now = this.getMyanmarZonedDateTime();
    return `${now.hour}:${now.minute}:${now.second} ${now.ampm.toUpperCase()}`;
  }

  // get SSSSS
  getMyanmarMillisecond(): string {
    const now = this.getMyanmarZonedDateTime();
    return now.millisecond.toString().padStart(5, "0") + " MS";
  }

  // get Myanmar Zoned Date Time [yyyy-MM-dd hh:mm:ss a]
  getMyanmarDateTime(): string {
    const now = this.getMyanmarZonedDateTime();
    return `${now.year}-${now.month}-${now.day} ${now.hour}:${now.minute}:${now.second} ${now.ampm.toUpperCase()}`;
  }

  // get target Zoned Date Time
  getDateTimeByZone(dateStr: string, targetZone: string): string {
    const [datePart, timePart, meridian] = dateStr.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);
    let [hour, minute, second] = timePart.split(":").map(Number);

    if (meridian.toUpperCase() === "PM" && hour < 12) hour += 12;
    if (meridian.toUpperCase() === "AM" && hour === 12) hour = 0;

    const yangonOffsetMinutes = 6 * 60 + 30; // +6:30
    const utcDate = new Date(
        Date.UTC(year, month - 1, day, hour, minute - yangonOffsetMinutes, second)
    );

    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: targetZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    const parts = formatter.formatToParts(utcDate);

    type DateTimeParts = {
        year: string;
        month: string;
        day: string;
        hour: string;
        minute: string;
        second: string;
        dayPeriod: string;
    };

    const values = parts.reduce((acc, part) => {
        if (part.type !== "literal") {
            acc[part.type as keyof DateTimeParts] = part.value;
        }
        return acc;
    }, {} as DateTimeParts);

    return `${values.year}-${values.month}-${values.day} ${values.hour}:${values.minute}:${values.second} ${values.dayPeriod}`;
  }

  // format api execute time
  formatApiExecuteTime(ms: number): string {
    if (ms < 1000) {
        return `${ms} ms`;
    }

    let sec = ms / 1000;
    if (sec < 60) {
        return `${sec.toFixed(2)} sec`;
    }

    const min = Math.floor(sec / 60);
    sec = Number((sec % 60).toFixed(2));
    return `${min} min ${sec} sec`;
  }

  // format token expire time
  formatTokenExpireTime(expireTime: number): string {
    const date = new Date(expireTime);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${year}-${month}-${day} ${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;
  }

  // get Yangon Time
  getMyanmarZonedDateTime(hour12 = true): any {
    const now = new Date();

    const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Yangon",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12
    });

    const parts = formatter.formatToParts(now);

    const get = (type: Intl.DateTimeFormatPartTypes): string =>
        parts.find((p) => p.type === type)?.value ?? "00";

    return {
        year: get("year"),
        month: get("month"),
        day: get("day"),
        hour: get("hour"),
        minute: get("minute"),
        second: get("second"),
        ampm: get("dayPeriod"),
        millisecond: now.getMilliseconds(),
    };
  }
  
}
