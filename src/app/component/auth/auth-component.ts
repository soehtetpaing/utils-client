import { Component, inject } from '@angular/core';
import { DarkmodeService } from '../../service/darkmode-service';
import { ToastService } from '../../service/toast-service';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-auth-component',
  imports: [],
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.css',
})
export class AuthComponent {
  darkModeService: DarkmodeService = inject(DarkmodeService);
  authService: AuthService = inject(AuthService);

  uniqueId: string = '';

  constructor(private toast: ToastService) {}

  getUniqueId() {
    this.uniqueId = this.authService.getUniqueId();
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    this.toast.info("Ready to paste — " + text);
  }
}
