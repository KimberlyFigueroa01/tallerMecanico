import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface LineChartDatum {
  label: string;
  value: number;
}

@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChart {
  readonly data = input<LineChartDatum[]>([]);

  readonly points = computed(() => {
    const data = this.data();
    const max = Math.max(1, ...data.map(item => item.value));
    const padding = 6;
    const width = 100 - padding * 2;
    const chartHeight = 42;
    const base = 52;
    const step = data.length > 1 ? width / (data.length - 1) : 0;

    return data.map((item, index) => {
      const x = padding + (data.length > 1 ? index * step : width / 2);
      const y = base - (item.value / max) * chartHeight;
      return { ...item, x, y };
    });
  });

  readonly linePath = computed(() => {
    const points = this.points();
    return points
      .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`)
      .join(' ');
  });

  readonly areaPath = computed(() => {
    const points = this.points();
    if (!points.length) {
      return '';
    }
    const base = 52;
    const first = points[0];
    const last = points[points.length - 1];
    return `${this.linePath()} L${last.x},${base} L${first.x},${base} Z`;
  });

  readonly gridTemplate = computed(() => {
    const count = Math.max(1, this.data().length);
    return `repeat(${count}, minmax(0, 1fr))`;
  });
}
