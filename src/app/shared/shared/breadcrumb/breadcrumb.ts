import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, startWith } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Breadcrumb {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly navEvents = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null)
    ),
    { initialValue: null }
  );

  readonly crumbs = computed(() => {
    this.navEvents();
    return this.buildCrumbs(this.route.root);
  });

  private buildCrumbs(route: ActivatedRoute, url: string = ''): Array<{ label: string; url: string }> {
    const children = route.children;
    if (!children.length) {
      return [];
    }

    const next = children[0];
    const routePath = next.snapshot.url.map(segment => segment.path).join('/');
    const nextUrl = routePath ? `${url}/${routePath}` : url;
    const label = this.formatLabel(routePath || 'home');
    const crumb = routePath ? [{ label, url: nextUrl }] : [];

    return [...crumb, ...this.buildCrumbs(next, nextUrl)];
  }

  private formatLabel(value: string): string {
    if (!value) {
      return '';
    }
    return value
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, letter => letter.toUpperCase());
  }
}
