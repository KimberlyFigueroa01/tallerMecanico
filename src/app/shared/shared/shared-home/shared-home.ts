import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shared-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './shared-home.html',
  styleUrl: './shared-home.css',
})
export class SharedHome {}
