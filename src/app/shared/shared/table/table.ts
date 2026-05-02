import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
}

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Table {
  readonly columns = input<TableColumn[]>([]);
  readonly rows = input<Record<string, unknown>[]>([]);
  readonly pageSize = input<number>(10);

  readonly search = signal('');
  readonly page = signal(1);

  readonly filteredRows = computed(() => {
    const term = this.search().toLowerCase().trim();
    if (!term) {
      return this.rows();
    }

    return this.rows().filter(row =>
      this.columns().some(col => {
        const value = row[col.key];
        return value !== null && value !== undefined && String(value).toLowerCase().includes(term);
      })
    );
  });

  readonly pagedRows = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredRows().slice(start, end);
  });

  readonly totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.filteredRows().length / this.pageSize()));
  });

  goToPage(page: number): void {
    const next = Math.min(Math.max(1, page), this.totalPages());
    this.page.set(next);
  }

  updateSearch(value: string): void {
    this.search.set(value);
    this.page.set(1);
  }
}
