import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkmodeService {
  darkModeSignal = signal<String>('null');

  updateDarkMode() {
    // for custom style
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');

    // for bootstrap
    this.darkModeSignal.update((value) => {
      return value === 'dark' ? 'light' : 'dark';
    });
  }

  updateDarkModeExtra() {
    const mode = this.darkModeSignal();
    console.log(mode);

    // for card tile
    document.querySelectorAll('.card-title-light-mode, .card-title-dark-mode')
    .forEach(el => {
      el.classList.remove('card-title-light-mode', 'card-title-dark-mode');
      el.classList.add(mode === 'dark' ? 'card-title-dark-mode' : 'card-title-light-mode');
    });
  }
}
