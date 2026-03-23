import { Component } from '@angular/core';
import { RouterModule, RouterLink } from "@angular/router";
import { ToastService } from '../../utils/toast-service';

@Component({
  selector: 'app-color-component',
  imports: [RouterModule, RouterLink],
  templateUrl: './color-component.html',
  styleUrl: './color-component.css',
})
export class ColorComponent {
  redColors: any = ['#000', '#500', '#505', '#525', '#755', '#f00', '#f25', '#f50', '#f75', '#fcc', '#fce', '#fec', '#fee', '#0cc', '#5cc', '#0ce', '#5ce', '#0ec', '#5ec', '#0ee', '#5ee', '#0ff', '#5ff'];
  greenColors: any = ['#050', '#075', '#255', '#550', '#575', '#0f0', '#2f5', '#5f0', '#7f5', '#cfc', '#cfe', '#efc', '#efe', '#c0c', '#c5c', '#c0e', '#c5e', '#e0c', '#e5c', '#e0e', '#e5e', '#f0f', '#f5f'];
  blueColors: any = ['#005', '#025', '#00f', '#25f', '#50f', '#75f', '#ccf', '#ccc', '#cef', '#ecf', '#eef', '#eee', '#fff', '#cc0', '#cc5', '#ce0', '#ce5', '#ec0', '#ec5', '#ee0', '#ee5', '#ff0', '#ff5'];

  constructor(private toast: ToastService) {}

  copyToClipboard(text: string) {  
    navigator.clipboard.writeText(text);
    this.toast.info("Ready to paste — " + text);
  }

}
