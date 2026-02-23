import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar-component';
import { RouterOutlet } from '@angular/router';
import { DarkmodeService } from '../../utils/darkmode-service';
import { DataroomService } from '../../utils/dataroom-service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../utils/toast-service';

@Component({
  selector: 'app-util-component',
  imports: [RouterOutlet ,SidebarComponent, FormsModule],
  templateUrl: './util-component.html',
  styleUrl: './util-component.css',
})
export class UtilComponent {
  darkModeService: DarkmodeService = inject(DarkmodeService);
  toast: ToastService = inject(ToastService);

  apiUrl = "";

  constructor(private room: DataroomService) {}

  ngOnInit(): void {
    this.room._apiUrl$.subscribe(apiUrl => {
      this.apiUrl = apiUrl;
    });
  }

  saveApiUrl() {
    if (this.apiUrl) {
      this.room.setApiUrl(this.apiUrl);
      this.toast.success("API URL saved.");
    } else {
      this.toast.error("API URL must not empty!");
    }
  }
  
}
