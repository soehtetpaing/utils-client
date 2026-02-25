import { Component } from '@angular/core';

@Component({
  selector: 'app-font-component',
  imports: [],
  templateUrl: './font-component.html',
  styleUrl: './font-component.css',
})
export class FontComponent {
  updateFontSize(fontSize: string) {
    const el = document.querySelectorAll('.toggle-font-size');
    el.forEach((element: any) => {
      element.classList.remove('fs-px-12', 'fs-px-14', 'fs-px-16', 'fs-px-18', 'fs-px-20');
      element.classList.add(fontSize);
    })
  }

}
