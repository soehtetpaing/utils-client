import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-subtle-component',
  imports: [],
  templateUrl: './subtle-component.html',
  styleUrl: './subtle-component.css',
})
export class SubtleComponent {
  @ViewChild('subtleImage') subtleImage!: ElementRef<HTMLImageElement>;

  currentPost: number = 1;
  totalImages: number = 33;
  currentImage: SubtleImage = {id: 1, name: "subtle-1", path: "subtle/subtle-1.png"};
  imageList: SubtleImage[] = [];

  constructor(private render: Renderer2) {}

  ngOnInit(): void {
    this.initImageList();
    this.preloadImage();
  }

  initImageList() {
    for (let i = 1; i <= this.totalImages; i++) {
      this.imageList.push(
        {
          id: i,
          name: `subtle-${i}`,
          path: `subtle/subtle-${i}.png`
        }
      );
    }
  }

  preloadImage() {
    this.imageList.forEach(image => {
      const img = new Image();
      img.src = image.path;
    });
  }

  previousImage() {
    this.currentPost = this.currentPost === 1 ? this.totalImages : this.currentPost - 1;
    this.updateCurrentImage();
  }

  nextImage() {
    this.currentPost = this.currentPost === this.totalImages ? 1 : this.currentPost + 1;
    this.updateCurrentImage();
  }

  updateCurrentImage() {
    this.currentImage = this.imageList.find(image => image.id === this.currentPost) || this.imageList[0];
  }

  onImageMouseOver() {
    this.render.addClass(document.body, this.currentImage.name);
  }

  onImageMouseLeave() {
    this.render.removeClass(document.body, this.currentImage.name);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.previousImage();
        event.preventDefault();
        break;
      case 'ArrowRight':
        this.nextImage();
        event.preventDefault();
        break;
    }
  }

}
