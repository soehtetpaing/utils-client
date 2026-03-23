import { Component, inject } from '@angular/core';
import { DarkmodeService } from '../../utils/darkmode-service';
import { ToastService } from '../../utils/toast-service';
import { AuthService } from '../../service/auth-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DataroomService } from '../../utils/dataroom-service';
import { finalize } from 'rxjs';
import { AesService } from '../../utils/aes-service';

@Component({
  selector: 'app-auth-component',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.css',
})
export class AuthComponent {
  darkModeService: DarkmodeService = inject(DarkmodeService);
  authService: AuthService = inject(AuthService);

  uniqueId: string = "";
  plainText: string = "";
  secretKey: string = "";
  encryptedText: string = "";
  de_encryptedText: string = "";
  de_secretKey: string = "";
  decryptedText: string = "";
  x_access_secretKey: string = "";
  x_access_domain: string = "";
  x_access_tokenData: any = {};
  v_x_access_token: string = "";
  v_x_access_secretKey: string = "";
  v_x_access_domain: string = "";
  v_x_access_status: number = 0;
  v_x_access_message:string = "";

  constructor(private aes: AesService, private toast: ToastService, private room: DataroomService) {}

  ngOnInit(): void {
    this.darkModeService.updateDarkModeExtra();
  }

  getUniqueId() {
    this.uniqueId = this.authService.getUniqueId();
  }

  encrypt(plainText: string, secretKey: string) {
    this.encryptedText = secretKey 
                      ? this.aes.encrypt(plainText, secretKey) 
                      : this.aes.encrypt(plainText);

    // this.room.setLoading(true);
    // this.authService.encrypt(plainText, secretKey).pipe(
    //   finalize(() => {
    //     setTimeout(() => {
    //       this.room.setLoading(false);
    //     }, 1000);
    //   })
    // ).subscribe({
    //   next: resp => {
    //     if (resp.status == 200) {
    //       this.encryptedText = resp.data.encryptedText;
    //     } else {
    //       this.toast.error(resp.message);
    //     }
    //     // this.room.setLoading(false);
    //   },
    //   error: err => {
    //     this.encryptedText = "";
    //     this.toast.error(err.message);
    //     // this.room.setLoading(false);
    //   }
    // });
  }

  decrypt(encryptedText: string, secretKey: string) {
    if (encryptedText) {
      this.decryptedText = secretKey 
                        ? this.aes.decrypt(encryptedText, secretKey) 
                        : this.aes.decrypt(encryptedText);
      // this.room.setLoading(true);
      // this.authService.decrypt(encryptedText, secretKey).pipe(
      //   finalize(() => {
      //     setTimeout(() => {
      //       this.room.setLoading(false);
      //     }, 1000);
      //   })
      // ).subscribe({
      //   next: resp => {
      //     if (resp.status == 200) {
      //       this.decryptedText = resp.data.decryptedText;
      //     } else {
      //       this.toast.error(resp.message);
      //     }

      //     // this.room.setLoading(false);
      //   },
      //   error: err => {
      //     this.decryptedText = "";
      //     this.toast.error(err.message);
      //     // this.room.setLoading(false);
      //   }
      // });
    } else {
      this.toast.warn("Enter encrypted text!")
    }
  }

  generateApiToken(secretKey: string, domain: string) {
    if (secretKey) {
      this.room.setLoading(true);
      this.authService.generateApiToken(secretKey, domain).pipe(
        finalize(() => {
            setTimeout(() => {
              this.room.setLoading(false);
            }, 1000);
        })
      ).subscribe({
        next: resp => {
          if (resp.status == 200) {
            this.x_access_tokenData = resp.data.tokenData;
          } else {
            this.toast.error(resp.message);
          }
        },
        error: err => {
          this.x_access_tokenData = {};
          this.toast.error(err.message);
        }
      });
    } else {
      this.toast.warn("Enter secret key!")
    }
  }

  verifyApiToken(token: string, secretKey: string, domain: string) {
    if (token) {
      this.room.setLoading(true);
      this.authService.verifyApiToken(token, secretKey, domain).pipe(
        finalize(() => {
          setTimeout(() => {
            this.room.setLoading(false);
          }, 1000);
        })
      ).subscribe({
        next: resp => {
          this.v_x_access_status = resp.status;
          this.v_x_access_message = resp.message;
        },
        error: err => {
          this.v_x_access_status = 0;
          this.v_x_access_message = "";
          this.toast.error(err.message);
        }
      });
    } else {
      this.toast.warn("Enter token!")
    }
  }

  copyToClipboard(text: string) {  
    navigator.clipboard.writeText(text);
    this.toast.info("Ready to paste — " + text);
  }
}
