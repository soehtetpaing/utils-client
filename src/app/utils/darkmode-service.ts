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

    this.updateDarkModeExtra();
  }

  updateDarkModeExtra() {
    const mode = this.darkModeSignal();

    // for card tile
    document.querySelectorAll('.card-title-light-mode, .card-title-dark-mode')
    .forEach(el => {
      el.classList.remove('card-title-light-mode', 'card-title-dark-mode');
      el.classList.add(mode === 'dark' ? 'card-title-dark-mode' : 'card-title-light-mode');
    });

    // for terminal output
    document.querySelectorAll('.terminal-output-light-mode, .terminal-output-dark-mode')
    .forEach(el => {
      el.classList.remove('terminal-output-light-mode', 'terminal-output-dark-mode');
      el.classList.add(mode === 'dark' ? 'terminal-output-dark-mode' : 'terminal-output-light-mode');
    });
  }
}
