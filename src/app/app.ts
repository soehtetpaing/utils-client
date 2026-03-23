import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar-component';
import { DarkmodeService } from './utils/darkmode-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadingComponent } from './component/loading/loading-component';
import { DataroomService } from './utils/dataroom-service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , NavbarComponent, MatSnackBarModule, LoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('genius-utils');
  darkModeService: DarkmodeService = inject(DarkmodeService);

  constructor(private room: DataroomService) {}

  ngOnInit(): void {
    this.room.setApp("Genius Utility");
    this.room.setVersion(environment.version);
  }
}
