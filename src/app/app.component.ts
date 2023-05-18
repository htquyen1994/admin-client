import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, RouterLink, RouterOutlet, provideRouter, withDebugTracing, withPreloading } from '@angular/router';
import { AppRouting } from './app-routing.module';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterLink, RouterOutlet]
})
export class AppComponent {
  title = 'admin-client';
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    // provider to inject routes, preload all modules and trace route change events
    provideRouter(AppRouting, withPreloading(PreloadAllModules), withDebugTracing())
  ]
});
