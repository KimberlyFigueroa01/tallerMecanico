import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';
import { Toast } from '../toast/toast';

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, Sidebar, RouterOutlet, Toast],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayout {}
