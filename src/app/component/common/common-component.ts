import { Component, inject } from '@angular/core';
import { DarkmodeService } from '../../utils/darkmode-service';
import { CommonService } from '../../service/common-service';
import { ToastService } from '../../utils/toast-service';

@Component({
  selector: 'app-common-component',
  imports: [],
  templateUrl: './common-component.html',
  styleUrl: './common-component.css',
})
export class CommonComponent {
  darkModeService: DarkmodeService = inject(DarkmodeService);
  commonService: CommonService = inject(CommonService);

  syskey: any;

  constructor(private toast: ToastService) {}

  ngOnInit(): void {
    this.darkModeService.updateDarkModeExtra();
  }

  getSyskey() {
    this.syskey = this.commonService.getSyskey();
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    this.toast.info("Ready to paste — " + text);
  }

}
