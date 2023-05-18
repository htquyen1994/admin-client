
import { Routes } from '@angular/router';

export const AppRouting: Routes = [{
  path: '', pathMatch: 'full', loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent)
}];

