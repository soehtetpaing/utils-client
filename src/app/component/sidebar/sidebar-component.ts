import { Component, inject } from '@angular/core';
import { DarkmodeService } from '../../utils/darkmode-service';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
})
export class SidebarComponent {
  darkModeService: DarkmodeService = inject(DarkmodeService);
}
