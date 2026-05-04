import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

export interface TimelineItem {
  titulo: string;
  fecha: string;
  detalle: string;
}

@Component({
  selector: 'app-orden-timeline',
  imports: [DatePipe],
  templateUrl: './orden-timeline.html',
  styleUrl: './orden-timeline.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenTimeline {
  readonly items = input<TimelineItem[]>([]);
}
