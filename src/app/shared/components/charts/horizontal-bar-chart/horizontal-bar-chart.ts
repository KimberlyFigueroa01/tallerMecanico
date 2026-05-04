import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface HorizontalBarDatum {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-horizontal-bar-chart',
  imports: [],
  templateUrl: './horizontal-bar-chart.html',
  styleUrl: './horizontal-bar-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalBarChart {
  readonly data = input<HorizontalBarDatum[]>([]);

  readonly bars = computed(() => {
    const data = this.data();
    const max = Math.max(1, ...data.map(item => item.value));
    return data.map(item => ({
      ...item,
      width: (item.value / max) * 100,
      color: item.color ?? '#0f172a'
    }));
  });
}
