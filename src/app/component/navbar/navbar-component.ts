import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DarkmodeService } from '../../utils/darkmode-service';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { DataroomService } from '../../utils/dataroom-service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  darkModeService: DarkmodeService = inject(DarkmodeService);
  version: string = "1.0.0";

  constructor(private room: DataroomService) {}

  ngOnInit(): void {
    this.version = this.room.getVersion();
  }
  
  toggleDarkMode() {
    this.darkModeService.updateDarkMode();
  }

}
