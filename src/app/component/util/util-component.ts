import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-util-component',
  imports: [RouterOutlet ,SidebarComponent],
  templateUrl: './util-component.html',
  styleUrl: './util-component.css',
})
export class UtilComponent {
  
}
