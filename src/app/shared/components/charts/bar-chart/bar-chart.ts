import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface BarChartDatum {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChart {
  readonly data = input<BarChartDatum[]>([]);

  readonly bars = computed(() => {
    const data = this.data();
    const max = Math.max(1, ...data.map(item => item.value));
    const count = Math.max(1, data.length);
    const padding = 6;
    const width = 100 - padding * 2;
    const chartHeight = 42;
    const base = 52;
    const step = width / count;
    const barWidth = step * 0.6;

    return data.map((item, index) => {
      const height = (item.value / max) * chartHeight;
      const x = padding + index * step + (step - barWidth) / 2;
      const y = base - height;
      return {
        ...item,
        x,
        y,
        height,
        width: barWidth,
        color: item.color ?? '#111827'
      };
    });
  });

  readonly gridTemplate = computed(() => {
    const count = Math.max(1, this.data().length);
    return `repeat(${count}, minmax(0, 1fr))`;
  });
}
