import { Component } from '@angular/core';
import { DataroomService } from '../../utils/dataroom-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  imports: [CommonModule],
  templateUrl: './loading-component.html',
  styleUrl: './loading-component.css',
})
export class LoadingComponent {
  loading$!: Observable<boolean>;

  constructor(private room: DataroomService) {}

  ngOnInit(): void {
    this.loading$ = this.room._loading$;
  }
}
